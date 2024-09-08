"use client";

import React, { useEffect, useState } from "react";
import AppButton from "../button";
import { FaArrowRight } from "react-icons/fa";
import { message, Select, Tooltip } from "antd";
import TextInput from "../inputs/TextInput";
import AppSelect from "../inputs/AppSelect";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IHolder } from "@/models/ShareHolder";
import { currencyFormatter } from "@/utils";
import { brokerList } from "@/utils/constants";
import NumericInput from "../inputs/NumericInput";
import {
	useCheckBankDetailsMutation,
	useGetBankListQuery,
	useInitializePaymentMutation,
} from "@/app/appApiSlice";
import AppSelectList from "../inputs/AppSelectList";

interface Props {
	info: IHolder;
	setData: any;
	handleProceed: () => void;
}

const RightRequest: React.FC<Props> = ({ info, setData, handleProceed }) => {
	const [initializePayment, { isLoading }] = useInitializePaymentMutation();
	const [checkBankDetails, { isLoading: validateLoading }] =
		useCheckBankDetailsMutation();
	const userInformation = {
		"Full Name": info.fullName,
		"Registrar Account Number": info.registrarAccount,
		"Right due": currencyFormatter(info.rightDue),
		"Total qualifying unit": currencyFormatter(info.qualifiedUnits),
		// "Total amount due": "450",
	};

	const options = [
		{
			key: 0,
			label: "I want just my Eligible rights",
			tooltip: "This option allows you to claim only your eligible rights.",
		},
		{
			key: 1,
			label: "I want Partial Rights",
			tooltip:
				"Choose this option if you want to claim a portion of your rights.",
		},
		{
			key: 2,
			label: "I want my right and additional units",
			tooltip:
				"Select this option to claim your rights and purchase additional units.",
		},
		// {
		// 	key: 3,
		// 	label: "I want to trade my rights",
		// 	tooltip: "This option allows you to trade your rights in the market.",
		// },
	];

	const { data: bankData } = useGetBankListQuery();
	const [accountName, setAccountName] = useState("");
	const [bankList, setBankList] = useState([]);
	const [accountNumber, setAccountNumber] = useState("");
	const [bankId, setBankId] = useState("");
	const [selectedRightOption, setSelectedRightOption] = useState<number>(0);
	const [broker, setBroker] = useState("");
	const [brokerText, setBrokerText] = useState("");
	const [taxID, setTaxID] = useState("");
	const [requestedUnit, setRequestedUnit] = useState(0);
	const [partialUnit, setPartialUnit] = useState(0);
	const [additionalUnit, setAdditionalUnit] = useState(0);
	const isPartialRightSelected = selectedRightOption === 1;
	const isAdditionalRightSelected = selectedRightOption === 2;

	const [messageApi, contextHolder] = message.useMessage();

	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};

	const onSubmit = async () => {
		if (isPartialRightSelected) {
			setRequestedUnit(partialUnit);
		} else if (isAdditionalRightSelected) {
			setRequestedUnit(Number(info.rightDue) + additionalUnit);
		} else {
			setRequestedUnit(info.rightDue as number);
		}
	};

	const handleInitiateTransaction = async () => {
		try {
			let payload = {
				rightType: selectedRightOption,
				rightHolderId: info.id as string,
				brokerName: broker === "Others" ? brokerText : broker,
				taxId: taxID,
				requestedUnit,
				renouncedUnit:
					requestedUnit < Number(info.rightDue)
						? Number(info.rightDue) - Number(requestedUnit)
						: 0,
				additionalUnit: isAdditionalRightSelected ? additionalUnit : 0,
			};
			let res = (await initializePayment(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				setData({ request: payload, response: res?.data?.data });
				handleProceed();
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	useEffect(() => {
		if (requestedUnit) handleInitiateTransaction();
	}, [requestedUnit]);

	const validateAccount = async () => {
		const bank = bankData?.data?.find((item: any) => item.id === bankId);
		let payload = {
			accountNumber: accountNumber,
			bankCode: bank.code,
		};
		try {
			let res = (await checkBankDetails(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				setAccountName(res.data.data.data.accountName);
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	useEffect(() => {
		if (bankData?.data) {
			let temp: any = [];
			bankData.data.map((item: any) => {
				temp.push({
					label: item.name,
					value: item.id,
				});
			});
			setBankList(temp);
		}
	}, [bankData]);

	useEffect(() => {
		if (accountNumber.length === 10 && bankId) {
			validateAccount();
		} else {
			setAccountName("");
		}
	}, [accountNumber, bankId]);

	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Right Request
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Please search by either of the follow input
					</p>
				</div>
				<div className="bg-ap-grey-50 px-6 py-4">
					<div className="grid grid-cols-2 gap-4">
						{Object.entries(userInformation).map(([key, value], index) => (
							<div key={key} className="flex flex-col">
								<p className="flex gap-1 items-center text-sm text-ap-grey-500 font-normal">
									{key}
									{index === 2 && (
										<Tooltip title="Total Number of units you can purchase">
											<IoIosInformationCircleOutline />
										</Tooltip>
									)}
								</p>
								<p className="font-medium text-ap-grey-950">{value}</p>
							</div>
						))}
					</div>
				</div>
				<div className="px-6 py-4" id="right-options">
					<p className="text-ap-grey-500 mb-3">How do you want your right?</p>
					<div className="space-y-3">
						{options.map((option, index) => (
							<div key={index} className="flex items-center space-x-2">
								<input
									type="radio"
									id={`option-${index}`}
									name="rights-option"
									className="form-radio"
									checked={option.key === selectedRightOption}
									onChange={() => setSelectedRightOption(option.key)}
								/>
								<label
									htmlFor={`option-${index}`}
									className="flex gap-1 items-center text-sm text-ap-grey-950 font-normal"
								>
									{option.label}
									<Tooltip title={option.tooltip}>
										<span className="text-ap-grey-500 text-xs">
											<IoIosInformationCircleOutline />
										</span>
									</Tooltip>
								</label>
							</div>
						))}
					</div>

					<div className="space-y-2 pt-4">
						{isPartialRightSelected && (
							<NumericInput
								maxLimit={info.rightDue}
								label="Enter partial unit that you want"
								value={partialUnit}
								onChange={(value) => setPartialUnit(Number(value))}
							/>
						)}
						{isAdditionalRightSelected && (
							<NumericInput
								label="Enter additional right unit that you want"
								value={additionalUnit}
								onChange={(value) => setAdditionalUnit(Number(value))}
							/>
						)}
						<AppSelect
							value={broker}
							label="Select your broker"
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
						<TextInput
							value={taxID}
							onChange={(e) => setTaxID(e.target.value)}
							label="Enter Tax ID (Optional)"
							placeholder="..."
						/>
						<div className="flex flex-col gap-4 mb-4">
							<AppSelectList
								label="Select Bank"
								placeholder="Select..."
								name="bankId"
								options={bankList}
								value={bankId}
								onChange={(e) => setBankId(e.target.value)}
							/>
							<NumericInput
								label="Account Number"
								placeholder="Enter account number"
								value={accountNumber}
								thousandSeparator={false}
								maxLength={10}
								allowLeadingZeros={true}
								allowNegative={false}
								onChange={(val) => setAccountNumber(val)}
							/>
							<p className="font-medium text-base text-ap-green">
								{accountName}
							</p>
						</div>
					</div>
				</div>

				<div className="border-t border-[#EDEEF1] py-5 px-6 flex  ">
					<AppButton
						value={"Submit"}
						className="ml-auto"
						onClick={onSubmit}
						iconTwo={<FaArrowRight />}
						isLoading={isLoading || validateLoading}
						disabled={
							isLoading ||
							validateLoading ||
							!accountName ||
							!broker ||
							(broker === "Others" && !brokerText) ||
							(isPartialRightSelected && partialUnit < 1) ||
							(isAdditionalRightSelected && additionalUnit < 1)
						}
					/>
				</div>
			</div>
			{contextHolder}
		</div>
	);
};

export default RightRequest;
