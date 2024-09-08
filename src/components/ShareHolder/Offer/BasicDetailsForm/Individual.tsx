"use client";

import { useCreateBasicDetailMutation } from "@/app/appApiSlice";
import AppButton from "@/components/button";
import AppSelect from "@/components/inputs/AppSelect";
import TextInput from "@/components/inputs/TextInput";
import { statesInNigeria } from "@/utils/constants";
import { BasicDetailsIndividualFormSchema } from "@/validations/offer.validations";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
	notification: any;
	handleProceed: () => void;
}

const BasicDetailsIndividualForm: FC<Props> = ({
	notification,
	handleProceed,
}) => {
	const [disableStates, setDisableStates] = useState(false);
	const [createBasicDetail, { isLoading }] = useCreateBasicDetailMutation();
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const titleOptions = ["Mr", "Mrs", "Miss", "Dr"];
	const countryOptions = ["Nigeria", "Others"];

	const formik = useFormik({
		initialValues: {
			title: "",
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			address: "",
			country: "",
			stateOfOrigin: "",
			city: "",
		},
		validationSchema: BasicDetailsIndividualFormSchema,
		onSubmit: async (values) => {
			try {
				let payload = {
					basicDetailCommand: [
						{
							firstName: values.firstName,
							lastName: values.lastName,
							dateOfBirth: values.dateOfBirth,
							address: values.address,
							country: values.country,
							stateOfOrigin: values.stateOfOrigin,
							city: values.city,
						},
					],
					saveForLater: false,
				};
				let res = (await createBasicDetail(payload)) as any;
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

	useEffect(() => {
		if (formik.values.country === "Others") {
			setDisableStates(true);
			formik.setFieldValue("stateOfOrigin", "Others");
		} else {
			setDisableStates(false);
			formik.setFieldValue("stateOfOrigin", "");
		}
	}, [formik.values.country]);

	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4  ">
			<form
				onSubmit={formik.handleSubmit}
				className=" bg-white border border-ap-grey-100 shadow-xl "
			>
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Basic details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
					<div className="flex flex-col gap-4 mb-4">
						<AppSelect
							formik={formik}
							name="title"
							options={titleOptions}
							value={formik.values.title}
							onChange={formik.handleChange}
							label="Title"
						/>
						<TextInput
							formik={formik}
							name="firstName"
							label="First name"
							placeholder="Enter first name"
							value={formik.values.firstName}
							onChange={formik.handleChange}
						/>
						<TextInput
							formik={formik}
							name="lastName"
							label="Last name"
							placeholder="Enter Last name"
							value={formik.values.lastName}
							onChange={formik.handleChange}
						/>
						<TextInput
							formik={formik}
							name="dateOfBirth"
							type="date"
							label="Date of birth"
							placeholder="Enter Date of birth"
							value={formik.values.dateOfBirth}
							onChange={formik.handleChange}
						/>
						<TextInput
							formik={formik}
							name="address"
							label="Address"
							placeholder="Enter Address"
							value={formik.values.address}
							onChange={formik.handleChange}
						/>
						<AppSelect
							formik={formik}
							name="country"
							options={countryOptions}
							value={formik.values.country}
							onChange={formik.handleChange}
							label="Country"
						/>
						<AppSelect
							formik={formik}
							name="stateOfOrigin"
							options={statesInNigeria}
							value={formik.values.stateOfOrigin}
							onChange={formik.handleChange}
							disabled={disableStates}
							label="State of Residence"
						/>
						<TextInput
							label="City/Town"
							formik={formik}
							name="city"
							placeholder="Enter City/Town"
							value={formik.values.city}
							onChange={formik.handleChange}
						/>
					</div>
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex px-6">
					<AppButton
						type="submit"
						value={"Submit"}
						className="ml-auto"
						iconTwo={<FaArrowRight />}
						isLoading={isLoading}
						disabled={!formik.isValid || isLoading}
					/>
				</div>
			</form>
		</div>
	);
};

export default BasicDetailsIndividualForm;
