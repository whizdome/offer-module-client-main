"use client";

import React, { FC, useEffect, useState } from "react";
import TextInput from "../../../inputs/TextInput";
import AppSelect from "../../../inputs/AppSelect";
import { brokerList } from "@/utils/constants";
import NumericInput from "@/components/inputs/NumericInput";
import {
	useCreateMinorMutation,
	useInitializeOfferPaymentMutation,
	useValidateOfferPaymentMutation,
} from "@/app/appApiSlice";
import {
	CreateMinorPayload,
	InitializeOfferPaymentResponse,
} from "@/models/ShareHolder";
import { IEquityOfferingResponse } from "@/models/EquityIssue";
import { formatToCurrency } from "@/utils";
import AppButton from "@/components/button";
import ConfirmPaymentModal from "@/components/modals/confirm-payment";
import { Switch } from "antd";
import BuyForMinorFormModal from "@/components/modals/buy-for-minor-form";

interface Props {
	notification: any;
	activeCompany: IEquityOfferingResponse;
	handleProceed: () => void;
}

const ShareDetailsForm: FC<Props> = ({
	notification,
	activeCompany,
	handleProceed,
}) => {
	const [initializePayment, { isLoading }] =
		useInitializeOfferPaymentMutation();
	const [createMinor, { isLoading: minorLoading }] = useCreateMinorMutation();
	const [validatePayment, { isLoading: validateLoading }] =
		useValidateOfferPaymentMutation();
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const [chn, setCHN] = useState("");
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [amount, setAmount] = useState(0);
	const [broker, setBroker] = useState("");
	const [brokerText, setBrokerText] = useState("");
	const [units, setUnits] = useState(0);
	const [showBuyForMinorModal, setShowBuyForMinorModal] = useState(false);
	const [buyForMinor, setBuyForMinor] = useState(false);
	const [minorData, setMinorData] = useState<CreateMinorPayload | null>(null);
	const [paymentData, setPaymentData] =
		useState<InitializeOfferPaymentResponse | null>(null);

	const onSubmit = async () => {
		try {
			let payload = {
				chn,
				forMinor: buyForMinor,
				equityOfferingId: activeCompany?.id,
				brokerageFirm: broker === "Others" ? brokerText : broker,
				shareUnit: units,
			};
			if (buyForMinor) {
				if (!minorData || Object.keys(minorData).length === 0) {
					openNotification("Please provide the minor's information.");
					return; // Prevents further API calls
				}
				const createMinorResponse = (await createMinor(
					minorData as CreateMinorPayload
				)) as any;
				// Check if createMinor was successful before continuing
				if (createMinorResponse?.error) {
					console.log("Create minor error", createMinorResponse?.error);
					openNotification(
						createMinorResponse?.error?.data?.description || "An Error Occurred"
					);
					return;
				}
			}
			let res = (await initializePayment(payload)) as any;
			if (res?.error) {
				console.log("error", res?.error);
				openNotification(res?.error?.data?.description || "An Error Occurred");
			} else {
				setPaymentData(res?.data?.data);
				setOpenPaymentModal(true);
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};
	const paystackCallback = async (reference: string) => {
		setOpenPaymentModal(false);
		let res = (await validatePayment({ referenceId: reference })) as any;
		if (res) {
			handleProceed();
		}
	};
	useEffect(() => {
		setAmount(units * activeCompany.price);
	}, [units]);

	const onSwitchToggle = (checked: boolean) => {
		setBuyForMinor(checked);
		if (checked) setShowBuyForMinorModal(true);
	};
	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Share Details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
				</div>
				<div className="flex justify-between items-center bg-[#F5F6F6] px-6 py-4">
					<div className="">
						<p className="text-ap-grey-900 font-normal">Buy for a minor</p>
						<p className="text-[#888888] font-normal text-sm mt-1 flex items-center">
							Buy for people under the age of 18
						</p>
					</div>
					<div className="flex gap-1">
						<span
							className={`${buyForMinor ? "cursor-pointer text-ap-green" : "cursor-disabled text-ap-grey-400"}`}
							onClick={() => setShowBuyForMinorModal(true)}
						>
							Edit
						</span>
						<Switch checked={buyForMinor} onChange={onSwitchToggle} />
					</div>
				</div>
				<div className="px-6 py-4">
					<div className="flex flex-col gap-4 mb-4">
						<TextInput
							label="Enter Clearing House Number (Optional)"
							placeholder="Enter CHN"
							value={chn}
							onChange={(e) => {
								setCHN(e.target.value);
							}}
							// info={
							// 	<p className="text-ap-grey-600 text-[12px]">
							// 		Don’t have CHN?{" "}
							// 		<span className="text-ap-green cursor-pointer">
							// 			{" "}
							// 			Auto generate{" "}
							// 		</span>
							// 	</p>
							// }
						/>
						<AppSelect
							value={broker}
							label="Select Brokerage firm"
							options={brokerList}
							onChange={(e) => {
								setBrokerText("");
								setBroker(e.target.value);
							}}
						/>
						{broker === "Others" && (
							<TextInput
								value={brokerText}
								onChange={(e) => setBrokerText(e.target.value)}
								label="Enter broker name"
								placeholder="..."
							/>
						)}
						<NumericInput
							label="Enter Shares unit"
							placeholder="Enter Shares unit"
							value={units}
							onChange={(value) => {
								setUnits(Number(value));
							}}
							error={
								units < activeCompany.minimumUnit
									? `Number of shares must be minumum of ${activeCompany.minimumUnit} units`
									: units % activeCompany.multiples !== 0
										? `Number of shares must be in multiples of ${activeCompany.multiples}`
										: ""
							}
						/>
					</div>
				</div>
				<div className="bg-[#E3EBE6] px-6 py-5">
					<p className="text-ap-grey-950">Amount to be paid</p>
					<p className="text-ap-grey-950 font-bold text-[32px] mt-1 mb-3 flex items-center">
						NGN{formatToCurrency(amount, 2)}
					</p>
				</div>
				<div className="py-6 flex justify-end items-center px-6 ">
					<AppButton
						value={"Continue"}
						className="ml-auto"
						onClick={onSubmit}
						isLoading={isLoading || minorLoading || validateLoading}
						disabled={
							isLoading ||
							minorLoading ||
							validateLoading ||
							units < 100 ||
							!amount ||
							(!broker && !brokerText)
						}
					/>
				</div>
			</div>
			<BuyForMinorFormModal
				formState={minorData}
				setFormState={setMinorData}
				open={showBuyForMinorModal}
				handleCancel={() => setShowBuyForMinorModal(false)}
			/>
			<ConfirmPaymentModal
				open={openPaymentModal}
				handleOk={() => {}}
				handleCancel={() => setOpenPaymentModal(false)}
				shareUnit={units}
				paymentInfo={paymentData}
				isLoading={isLoading}
				paystackCallback={paystackCallback}
			/>
		</div>
	);
};

export default ShareDetailsForm;
