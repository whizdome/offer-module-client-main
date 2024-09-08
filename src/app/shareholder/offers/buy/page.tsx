"use client";

import { useGetOfferProfileStageQuery } from "@/app/appApiSlice";
import NavTitle from "@/components/NavTitle";
import BankInformationForm from "@/components/ShareHolder/Offer/BankInformation";
import BasicDetailsCompanyForm from "@/components/ShareHolder/Offer/BasicDetailsForm/Company";
import BasicDetailsIndividualForm from "@/components/ShareHolder/Offer/BasicDetailsForm/Individual";
import BasicDetailsPartnerForm from "@/components/ShareHolder/Offer/BasicDetailsForm/Partner";
import NextOfKinForm from "@/components/ShareHolder/Offer/NextOfKinForm";
import OfferStep from "@/components/ShareHolder/Offer/OfferStep";
import OTPConfirmation from "@/components/ShareHolder/Offer/OTPConfirmation";
import ShareDetailsForm from "@/components/ShareHolder/Offer/ShareDetailsForm";
import ValidateBVN from "@/components/ShareHolder/Offer/ValidateBVN";
import SubmissionSuccess from "@/components/SubmissionSuccess";
import { useAppSelector } from "@/redux/store";
import { message, Skeleton } from "antd";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getCurrentUser = () => {
	const currentAuth = getCookie("currentUser");

	if (currentAuth) {
		return JSON.parse(currentAuth) || {};
	}

	return {};
};

const getStep = (step: string) => {
	switch (step) {
		case "BVN Validation":
			return 1;
		case "Basic Detail":
			return 2;
		case "Next of Kin":
			return 3;
		case "Bank Detail":
			return 4;
		case "Completed":
			return 5;
		default:
			return 1;
	}
};

export default function BuyOffer() {
	const { activeCompany } = useAppSelector((state) => state.app);
	const [messageApi, contextHolder] = message.useMessage();
	const {
		data: offerProfile,
		refetch,
		isLoading,
	} = useGetOfferProfileStageQuery();
	const router = useRouter();
	const currentUser = getCurrentUser();
	const [isDone, setIsDone] = useState(false);
	const [activeStep, setActiveStep] = useState(getStep(offerProfile?.data));
	const [validateBVN, setValidateBVN] = useState(false);
	const [bvnPhoneNumber, setBvnPhoneNumber] = useState("");
	useEffect(() => {
		setActiveStep(getStep(offerProfile?.data));
	}, [offerProfile]);
	useEffect(() => {
		if (!activeCompany) router.replace("/shareholder/offers");
	}, [activeCompany]);
	return (
		<div className="mim-h-screen lg:p-12">
			{contextHolder}
			<NavTitle
				title={
					activeCompany ? `${activeCompany?.name} ${activeCompany?.type}` : ""
				}
				handleGoBack={() => {
					if (activeStep === 1) {
						if (validateBVN) {
							setValidateBVN(false);
						} else {
							router.back();
						}
					} else if (activeStep === 6) {
						router.back();
					} else {
						router.back();
						// let temp = activeStep - 1;
						// setActiveStep(temp);
					}
				}}
			/>
			{isLoading ? (
				<Skeleton />
			) : isDone ? (
				<div className="w-full flex items-center justify-center">
					<SubmissionSuccess />
				</div>
			) : (
				<div className="w-full flex flex-col gap-10 items-center justify-between">
					{offerProfile?.data !== "Completed" && (
						<OfferStep step={activeStep} />
					)}
					{activeStep === 1 &&
						(validateBVN ? (
							<OTPConfirmation
								info={{ phoneNumber: bvnPhoneNumber }}
								notification={messageApi}
								handleProceed={() => setActiveStep(2)}
							/>
						) : (
							<ValidateBVN
								notification={messageApi}
								handleProceed={(val) => {
									setBvnPhoneNumber(val);
									setValidateBVN(true);
								}}
							/>
						))}
					{activeStep === 2 && (
						<>
							{currentUser?.roles.includes("JointPartnership") && (
								<BasicDetailsPartnerForm
									notification={messageApi}
									handleProceed={() => setActiveStep(3)}
								/>
							)}
							{currentUser?.roles.includes("Individual") && (
								<BasicDetailsIndividualForm
									notification={messageApi}
									handleProceed={() => setActiveStep(3)}
								/>
							)}

							{currentUser?.roles.includes("Company") && (
								<BasicDetailsCompanyForm
									notification={messageApi}
									handleProceed={() => setActiveStep(3)}
								/>
							)}
						</>
					)}
					{activeStep === 3 && (
						<NextOfKinForm
							notification={messageApi}
							handleProceed={() => setActiveStep(4)}
						/>
					)}
					{activeStep === 4 && (
						<BankInformationForm
							notification={messageApi}
							handleProceed={() => setActiveStep(5)}
						/>
					)}
					{activeCompany && activeStep === 5 && (
						<ShareDetailsForm
							notification={messageApi}
							activeCompany={activeCompany}
							handleProceed={() => setIsDone(true)}
						/>
					)}
				</div>
			)}
		</div>
	);
}
