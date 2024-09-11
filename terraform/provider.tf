name: CI/CD Pipeline with Terraform and EKS

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  terraform-setup:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_REGION: ${{ secrets.AWS_REGION }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: 1.4.0

      - name: Terraform Init
        run: terraform -chdir=terraform init

      - name: Terraform Apply
        run: terraform -chdir=terraform apply -auto-approve -var-file=terraform.tfvars

  build-and-deploy:
    runs-on: ubuntu-latest
    needs: terraform-setup
    env:
      AWS_REGION: ${{ secrets.AWS_REGION }}
      AWS_ACCOUNT_ID: ${{ secrets.AWS_ACCOUNT_ID }}
      EKS_CLUSTER_NAME: ${{ secrets.EKS_CLUSTER_NAME }}
      HOSTED_ZONE_ID: ${{ secrets.HOSTED_ZONE_ID }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20.x"

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: npm run build

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Amazon ECR
        id: ecr-login
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and tag Docker image
        run: |
          IMAGE_TAG=$(date +%Y%m%d%H%M%S)
          docker build -t ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/my-app:${IMAGE_TAG} .
          echo "IMAGE_TAG=$IMAGE_TAG" >> $GITHUB_ENV

      - name: Push Docker image to ECR
        run: |
          docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/my-app:${{ env.IMAGE_TAG }}

      - name: Install Trivy
        run: |
          sudo apt-get update && sudo apt-get install -y wget apt-transport-https gnupg lsb-release
          wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
          echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
          sudo apt-get update && sudo apt-get install -y trivy

      - name: Run Trivy scan on Docker image
        run: trivy image ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/my-app:${{ env.IMAGE_TAG }}

      - name: Set up kubectl
        run: |
          aws eks update-kubeconfig --name ${{ env.EKS_CLUSTER_NAME }} --region ${{ env.AWS_REGION }}

      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
          kubectl apply -f k8s/ingress.yaml

      - name: Update Route 53 for admin.tripplescale.co
        run: |
          ALB_DNS=$(kubectl get ingress my-app-ingress -o jsonpath="{.status.loadBalancer.ingress[0].hostname}")
          aws route53 change-resource-record-sets --hosted-zone-id ${{ env.HOSTED_ZONE_ID }} --change-batch '{
            "Changes": [{
              "Action": "UPSERT",
              "ResourceRecordSet": {
                "Name": "admin.tripplescale.co",
                "Type": "A",
                "AliasTarget": {
                  "HostedZoneId": "Z35SXDOTRQ7X7K",
                  "DNSName": "'$ALB_DNS'",
                  "EvaluateTargetHealth": false
                }
              }
            }]
          }'
