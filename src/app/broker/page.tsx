"use client";

import { useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import RightIssueRequest from "@/components/Broker/RightIssueRequest";

export default function Broker() {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(1);
	return (
		<div className="flex flex-col items-center justify-between">
			<NavTitle
				title="UBA Right Issue"
				handleGoBack={() => {
					if (activeStep === 1) {
						router.replace("/");
					} else {
						let temp = activeStep - 1;
						setActiveStep(temp);
					}
				}}
			/>
			<RightIssueRequest />
		</div>
	);
}
