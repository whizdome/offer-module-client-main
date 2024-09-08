"use client";

import React from "react";
import { IHolder } from "@/models/ShareHolder";
import { currencyFormatter, formatToCurrency } from "@/utils";
import PaystackButtonComponent from "../button/paystackButton";
import AppButton from "../button";
import { FaArrowRight } from "react-icons/fa";
import { useValidatePaymentMutation } from "@/app/appApiSlice";

interface Props {
	info: IHolder | null;
	data: any;
	handleProceed: () => void;
	onSubmit: () => void;
}

const RightReview: React.FC<Props> = ({
	info,
	data,
	handleProceed,
	onSubmit,
}) => {
	const [validatePayment, { isLoading }] = useValidatePaymentMutation();
	const fetchUserInfo = () => {
		if (data?.request?.rightType === 0) {
			return {
				"Investor name": info?.fullName,
				CHN: info?.chnNumber,
				"Right due": currencyFormatter(info?.rightDue),
				"Right amount": `NGN ${formatToCurrency(data?.response?.offerAmount, 2)}`,
			};
		} else if (data?.request?.rightType === 1) {
			return {
				"Investor name": info?.fullName,
				CHN: info?.chnNumber,
				"Right due": currencyFormatter(info?.rightDue),
				"Requested units": currencyFormatter(data?.request?.requestedUnit),
				"Renounced units": currencyFormatter(data?.request?.renouncedUnit),
				"Right amount": `NGN ${formatToCurrency(data?.response?.offerAmount, 2)}`,
			};
		} else if (data?.request?.rightType === 2) {
			return {
				"Investor name": info?.fullName,
				CHN: info?.chnNumber,
				"Right due": currencyFormatter(info?.rightDue),
				"Right amount": `NGN ${formatToCurrency(info?.amount, 2)}`,
				"Additional rights": currencyFormatter(data?.request?.additionalUnit),
				"Total units": currencyFormatter(data?.request?.requestedUnit),
				"Toal amount": `NGN ${formatToCurrency(data?.response?.offerAmount, 2)}`,
			};
		}
		return {};
	};

	const paystackCallback = async (reference: string) => {
		let res = (await validatePayment({ referenceId: reference })) as any;
		if (res) {
			onSubmit();
		}
	};
	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Review right application
					</p>
					<p className="text-ap-grey-700 mt-1 mb-2">
						See details to your Right request
					</p>
				</div>
				<div className="bg-ap-grey-50 px-6 py-4 space-y-3">
					{Object.entries(fetchUserInfo()).map(([key, value], index) => (
						<div
							key={key}
							className="flex flex-row justify-between items-center"
						>
							<p
								className={`text-ap-grey-500 ${key === "Renounced Units" ? "italic font-light text-xs" : ""}`}
							>
								{key}
							</p>
							<p
								className={`text-ap-grey-950 font-medium text-end ${key === "Renounced Units" ? "italic font-light text-xs" : ""}`}
							>
								{value}
							</p>
						</div>
					))}
				</div>
				<div className="border-t border-[#EDEEF1] py-6 flex justify-end px-6 ">
					{data?.response?.offerAmount &&
					Number(data.response?.offerAmount) > 10000000 ? (
						<AppButton
							value={"Make Payment"}
							className="ml-auto"
							onClick={handleProceed}
							iconTwo={<FaArrowRight />}
						/>
					) : (
						<PaystackButtonComponent
							text="Make Payment"
							isLoading={isLoading}
							reference={data?.response?.reference}
							paystackCallback={paystackCallback}
							email={data?.response?.email}
							amount={data?.response?.amount * 100}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default RightReview;
