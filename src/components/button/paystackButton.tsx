import React from "react";
import { usePaystackPayment } from "react-paystack";
import AppButton from ".";
import { FaArrowRight } from "react-icons/fa";
import { paystackPK } from "@/utils/constants";

interface PaystackButtonProps {
	paystackCallback: (val: string) => void;
	email: string;
	amount: number;
	text: string;
	reference: string;
	isLoading: boolean;
	disabled?: boolean;
	className?: string;
}

const PaystackButtonComponent: React.FC<PaystackButtonProps> = ({
	paystackCallback,
	email,
	amount,
	text,
	reference,
	isLoading,
	disabled,
	className,
}) => {
	const config = {
		reference,
		email,
		amount,
		publicKey: paystackPK,
	};

	const onSuccess = (data?: any) => {
		paystackCallback(data.reference);
	};

	const onClose = () => {};

	const initializePayment = usePaystackPayment(config);
	return (
		<AppButton
			value={text}
			iconTwo={<FaArrowRight />}
			className={className || ""}
			isLoading={isLoading}
			disabled={isLoading || disabled}
			onClick={() => {
				initializePayment({ onSuccess, onClose });
			}}
		/>
	);
};

export default PaystackButtonComponent;
