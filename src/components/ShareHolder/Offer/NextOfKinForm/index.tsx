"use client";

import React, { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "@/components/inputs/TextInput";
import AppSelect from "@/components/inputs/AppSelect";
import PhoneInput from "@/components/inputs/PhoneInput";
import AppButton from "@/components/button";
import { useCreateNextOfKinMutation } from "@/app/appApiSlice";
import { useFormik } from "formik";
import { NextOfKinFormSchema } from "@/validations/offer.validations";

interface Props {
	notification: any;
	handleProceed: () => void;
}

const NextOfKinForm: FC<Props> = ({ notification, handleProceed }) => {
	const [createNextOfKin, { isLoading }] = useCreateNextOfKinMutation();
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			address: "",
			email: "",
			relationship: "",
			saveForLater: false,
		},
		validationSchema: NextOfKinFormSchema,
		onSubmit: async (values) => {
			try {
				let payload = {
					firstName: values.firstName,
					lastName: values.lastName,
					phoneNumber: `+234${values.phoneNumber}`,
					address: values.address,
					email: values.email,
					relationship: values.relationship,
					saveForLater: values.saveForLater,
				};
				let res = (await createNextOfKin(payload)) as any;
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
	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4 ">
			<form
				onSubmit={formik.handleSubmit}
				className="bg-white border border-ap-grey-100 shadow-xl "
			>
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Next of kin
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
					<div className="flex flex-col gap-4 mb-4">
						<AppSelect
							label="Select relationship"
							placeholder="Select..."
							name="relationship"
							options={["Parent", "Sibling", "Spouse", "Child", "Others"]}
							value={formik.values.relationship}
							onChange={formik.handleChange}
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
						<PhoneInput
							formik={formik}
							label="Phone Number"
							placeholder="Enter phone number"
							value={formik.values.phoneNumber}
							onChange={(value) => {
								formik.setFieldValue("phoneNumber", value);
							}}
							info="e.g: +234 809 456 2343"
						/>
						<TextInput
							label="Email address"
							type="email"
							name="email"
							placeholder="Enter email address"
							formik={formik}
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						<TextInput
							name="address"
							label="Address"
							formik={formik}
							placeholder="Enter address"
							value={formik.values.address}
							onChange={formik.handleChange}
						/>
					</div>
				</div>

				<div className="border-t border-t-[#EDEEF1] py-6 flex justify-end items-center px-6">
					<AppButton
						typ="submit"
						value={"Proceed"}
						className="ml-auto"
						iconTwo={<FaArrowRight />}
						isLoading={isLoading}
						disabled={isLoading || !formik.isValid}
					/>
				</div>
			</form>
		</div>
	);
};

export default NextOfKinForm;
