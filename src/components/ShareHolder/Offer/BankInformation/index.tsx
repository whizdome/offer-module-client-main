"use client";

import React, { FC, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "@/components/inputs/TextInput";
import AppButton from "@/components/button";
import AppSelectList from "@/components/inputs/AppSelectList";
import {
	useCheckBankDetailsMutation,
	useCreateBankDetailsMutation,
	useGetBankListQuery,
} from "@/app/appApiSlice";
import { useFormik } from "formik";
import { BankInformationFormSchema } from "@/validations/offer.validations";
import NumericInput from "@/components/inputs/NumericInput";

interface Props {
	notification: any;
	handleProceed: () => void;
}

const BankInformationForm: FC<Props> = ({ notification, handleProceed }) => {
	const { data } = useGetBankListQuery();
	const [accountName, setAccountName] = useState("");
	const [bankList, setBankList] = useState([]);
	const [checkBankDetails, { isLoading: validateLoading }] =
		useCheckBankDetailsMutation();
	const [createBankDetails, { isLoading }] = useCreateBankDetailsMutation();
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const formik = useFormik({
		initialValues: {
			bankId: "",
			accountNumber: "",
			saveForLater: false,
		},
		validationSchema: BankInformationFormSchema,
		onSubmit: async (values) => {
			try {
				let res = (await createBankDetails(values)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occured");
				} else {
					handleProceed();
				}
			} catch (error) {
				console.log("Caught Error: ", JSON.stringify(error)); // Debug
			}
		},
	});

	const validateAccount = async () => {
		const bank = data?.data?.find(
			(item: any) => item.id === formik.values.bankId
		);
		let payload = {
			accountNumber: formik.values.accountNumber,
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
		if (data?.data) {
			let temp: any = [];
			data.data.map((item: any) => {
				temp.push({
					label: item.name,
					value: item.id,
				});
			});
			setBankList(temp);
		}
	}, [data]);

	useEffect(() => {
		if (formik.values.accountNumber.length === 10 && formik.values.bankId) {
			validateAccount();
		} else {
			setAccountName("");
		}
	}, [formik.values.accountNumber, formik.values.bankId]);

	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4 ">
			<form
				onSubmit={formik.handleSubmit}
				className="bg-white border border-ap-grey-100 shadow-xl "
			>
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Bank details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
					<div className="flex flex-col gap-4 mb-4">
						<AppSelectList
							label="Select Bank"
							placeholder="Select..."
							name="bankId"
							options={bankList}
							formik={formik}
							value={formik.values.bankId}
							onChange={formik.handleChange}
						/>
						<NumericInput
							formik={formik}
							label="Account Number"
							placeholder="Enter account number"
							value={formik.values.accountNumber}
							thousandSeparator={false}
							maxLength={10}
							allowLeadingZeros={true}
							allowNegative={false}
							onChange={(val) => formik.setFieldValue("accountNumber", val)}
						/>
						<p className="font-medium text-base text-ap-grey-900">
							{accountName}
						</p>
					</div>
				</div>
				<div className="border-t border-t-[#EDEEF1] py-6 flex justify-end items-center px-6">
					<AppButton
						value={"Proceed"}
						className="ml-auto"
						iconTwo={<FaArrowRight />}
						isLoading={isLoading || validateLoading}
						disabled={
							isLoading || !formik.isValid || validateLoading || !accountName
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default BankInformationForm;
