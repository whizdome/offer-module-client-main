"use client";

import { useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import BrokerRegistrationForm from "@/components/Broker/Authentication/Registration";
import BrokerSetPasswordForm from "@/components/Broker/Authentication/SetPassword";

export default function BrokerRegistration() {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(1);
	const [formFields, setFormFields] = useState({
		brokerageFirm: "",
		fullName: "",
		role: "",
		address: "",
		email: "",
		phoneNumber: "",
	});
	return (
		<div className="flex flex-col items-center justify-between">
			<NavTitle
				handleGoBack={() => {
					if (activeStep === 1) {
						router.back();
					} else {
						let temp = activeStep - 1;
						setActiveStep(temp);
					}
				}}
			/>
			{activeStep === 1 && (
				<BrokerRegistrationForm
					formValues={formFields}
					handleProceed={(val) => {
						setFormFields({ ...formFields, ...val });
						setActiveStep(2);
					}}
				/>
			)}
			{activeStep === 2 && (
				<BrokerSetPasswordForm
					handleProceed={(val) => {
						setFormFields({ ...formFields, ...val });
						// setActiveStep(2);
					}}
				/>
			)}
		</div>
	);
}
