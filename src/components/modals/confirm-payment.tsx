import { Modal } from "antd";
import React, { FC, useState } from "react";
import { ButtonSize, ButtonState } from "../button/enum";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { formatToCurrency } from "@/utils";
import AppButton from "../button";
import PaystackButtonComponent from "../button/paystackButton";

export interface IProps {
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	shareUnit: number;
	paymentInfo: any;
	isLoading: boolean;
	paystackCallback: any;
}

const ConfirmPaymentModal: FC<IProps> = ({
	open,
	handleOk,
	handleCancel,
	shareUnit,
	paymentInfo,
	isLoading,
	paystackCallback,
}) => {
	const fetchInfo = () => {
		return {
			"Share Units": shareUnit,
			Amount: `NGN ${formatToCurrency(paymentInfo?.amount, 2)}`,
		};
	};
	return (
		<Modal
			open={open}
			width={400}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={null}
		>
			<div className="flex flex-col gap-6 items-center justify-between p-4 lg:p-6">
				<FaMoneyBillTransfer size={96} />
				<div className="w-full flex flex-col gap-2 items-center">
					<h2 className="font-semibold text-base text-[#333]">
						Confirm Payment
					</h2>
					<div className="w-full bg-ap-grey-50 px-6 py-4 space-y-3">
						{Object.entries(fetchInfo()).map(([key, value], index) => (
							<div
								key={key}
								className="flex flex-row justify-between items-center"
							>
								<p className="text-ap-grey-500">{key}</p>
								<p
									className={`text-ap-grey-950 font-medium text-end ${key === "Renounced Units" ? "italic font-light text-xs" : ""}`}
								>
									{value}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="w-full flex gap-2">
					<PaystackButtonComponent
						text="Make Payment"
						isLoading={isLoading}
						reference={paymentInfo?.reference || ""}
						paystackCallback={paystackCallback}
						email={paymentInfo?.email || ""}
						amount={(paymentInfo?.amount || 0) * 100}
						className="w-1/2"
					/>
					<AppButton
						value={"Cancel"}
						size={ButtonSize.lg}
						variant={ButtonState.OUTLINE}
						type={"Button"}
						onClick={handleCancel}
						className="w-1/2"
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmPaymentModal;
