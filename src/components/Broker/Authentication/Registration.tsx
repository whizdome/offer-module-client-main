"use client";

import React from "react";
import TextInput from "../../inputs/TextInput";
import AppButton from "../../button";
import AppSelect from "../../inputs/AppSelect";
import { useFormik } from "formik";
import { BrokerSignupSchema } from "@/validations";
import { FaArrowRight } from "react-icons/fa";
import { brokerList } from "@/utils/constants";

interface Props {
	formValues?: any;
	handleProceed: (val: any) => void;
}

const BrokerRegistrationForm: React.FC<Props> = ({
	formValues = {},
	handleProceed,
}) => {
	const formik = useFormik({
		initialValues: {
			brokerageFirm: formValues.brokerageFirm,
			fullName: formValues.fullName,
			role: formValues.role,
			address: formValues.address,
			phoneNumber: formValues.phoneNumber,
			email: formValues.email,
		},
		validationSchema: BrokerSignupSchema,
		onSubmit: async (values) => {
			handleProceed(values);
		},
	});
	return (
		<form
			onSubmit={formik.handleSubmit}
			className="lg:w-[486px] w-full px-4 space-y-4"
		>
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="p-6">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Broker Registration
					</p>
					<p className="text-ap-grey-400 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
					<div className="flex flex-col gap-4">
						<AppSelect
							name="brokerageFirm"
							label="Select Brokerage firm"
							options={brokerList}
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.brokerageFirm}
						/>
						<TextInput
							name="fullName"
							label="Full name"
							placeholder="Full name"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.fullName}
						/>
						<TextInput
							name="role"
							label="Role"
							placeholder="Role"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.role}
						/>
						<TextInput
							name="address"
							label="Office Address"
							placeholder="Office address"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.address}
						/>
						<TextInput
							name="phoneNumber"
							label="Phone number"
							placeholder="Phone number"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.phoneNumber}
						/>
						<TextInput
							name="email"
							label="Email address"
							placeholder="Email address"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.email}
							info="Enter your company's official email address."
						/>
					</div>
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
					<AppButton
						value="Submit"
						className="ml-auto"
						type="submit"
						disabled={!formik.isValid}
						iconTwo={<FaArrowRight />}
					/>
				</div>
			</div>
		</form>
	);
};

export default BrokerRegistrationForm;
