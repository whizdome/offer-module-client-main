"use client";

import {
	useInitializeOfferPaymentMutation,
	useProfileGetOfferingsQuery,
	useValidateOfferPaymentMutation,
} from "@/app/appApiSlice";
import { InitializeOfferPaymentResponse } from "@/models/ShareHolder";
import { Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import AppSelectList from "../inputs/AppSelectList";
import AppSelect from "../inputs/AppSelect";
import TextInput from "../inputs/TextInput";
import { brokerList, paystackPK } from "@/utils/constants";
import NumericInput from "../inputs/NumericInput";
import { formatToCurrency } from "@/utils";
import AppButton from "@/components/button";
import ConfirmPaymentModal from "./confirm-payment";

export interface IProps {
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	notification: any;
}

const OfferApplicationModal: FC<IProps> = ({
	open,
	handleOk,
	handleCancel,
	notification,
}) => {
	const { data } = useProfileGetOfferingsQuery({ EquityOfferingType: 0 });
	const [initializePayment, { isLoading }] =
		useInitializeOfferPaymentMutation();
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
	const [amount, setAmount] = useState(0);
	const [broker, setBroker] = useState("");
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [offeringList, setOfferingList] = useState([]);
	const [brokerText, setBrokerText] = useState("");
	const [selectedOffer, setSelectedOffer] = useState<any>(null);
	const [units, setUnits] = useState(0);
	const [paymentData, setPaymentData] =
		useState<InitializeOfferPaymentResponse | null>(null);

	const onSubmit = async () => {
		try {
			let payload = {
				chn,
				equityOfferingId: selectedOffer?.id,
				brokerageFirm: broker === "Others" ? brokerText : broker,
				shareUnit: units,
			};
			let res = (await initializePayment(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
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
			setAmount(0);
			setCHN("");
			setBroker("");
			setBrokerText("");
			setUnits(0);
			setSelectedOffer({});
			setPaymentData(null);
			handleOk();
		}
	};

	useEffect(() => {
		if (data?.data) {
			let temp: any = [];
			data.data.map((item: any) => {
				temp.push({
					label: item.name,
					value: item.id,
				});
			});
			setOfferingList(temp);
		}
	}, [data]);

	useEffect(() => {
		setAmount(units * selectedOffer?.price);
	}, [units, selectedOffer]);

	useEffect(() => {
		// if (units && selectedOffer?.id && (broker || brokerText)) {
		// 	onSubmit();
		// }
	}, [units, broker, brokerText, selectedOffer]);

	return (
		<Modal
			open={open}
			width={486}
			// onOk={handleOk}
			onCancel={handleCancel}
			footer={null}
		>
			<div className="w-full">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Share Details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>

					<div className="flex flex-col gap-4 mb-4">
						<TextInput
							label="Enter Clearing House Number (Optional)"
							placeholder="Enter CHN"
							value={chn}
							onChange={(e) => {
								setCHN(e.target.value);
							}}
						/>
						<AppSelectList
							label="Select Offer"
							placeholder="Select..."
							name="equityOfferingId"
							options={offeringList}
							value={selectedOffer?.id}
							onChange={(e) => {
								let id = e.target.value;
								const offer = data?.data?.find((item: any) => item.id === id);
								setSelectedOffer(offer);
							}}
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
								selectedOffer
									? units < selectedOffer?.minimumUnit
										? `Number of shares must be minumum of ${selectedOffer?.minimumUnit} units`
										: units % selectedOffer?.multiples !== 0
											? `Number of shares must be in multiples of ${selectedOffer?.multiples}`
											: ""
									: ""
							}
						/>
					</div>
				</div>
				<div className="bg-[#E3EBE6] px-6 py-5">
					<p className="text-ap-grey-950">Amount to be paid</p>
					<p className="text-ap-grey-950 font-bold text-[32px] mt-1 mb-3 flex items-center">
						NGN{formatToCurrency(amount || 0, 2)}
					</p>
				</div>
				<div className="py-6 flex justify-end items-center px-6 ">
					<AppButton
						value={"Continue"}
						className="ml-auto"
						onClick={onSubmit}
						isLoading={isLoading || validateLoading}
						disabled={
							isLoading ||
							validateLoading ||
							units < 100 ||
							!amount ||
							!selectedOffer ||
							(!broker && !brokerText)
						}
					/>
					{/* <PaystackButtonComponent
						text="Make Payment"
						isLoading={isLoading}
						reference={paymentData?.reference || ""}
						paystackCallback={paystackCallback}
						disabled={
							units < 100 ||
							!amount ||
							!selectedOffer ||
							(!broker && !brokerText) ||
							!paymentData?.reference ||
							!paymentData?.email
						}
						email={paymentData?.email || ""}
						amount={(paymentData?.amount || 0) * 100}
					/> */}
				</div>
			</div>
			<ConfirmPaymentModal
				open={openPaymentModal}
				handleOk={() => {}}
				handleCancel={() => setOpenPaymentModal(false)}
				shareUnit={units}
				paymentInfo={paymentData}
				isLoading={isLoading}
				paystackCallback={paystackCallback}
			/>
		</Modal>
	);
};

export default OfferApplicationModal;
