"use client";

import React from "react";
import TextInput from "../../inputs/TextInput";
import AppButton from "../../button";
import { FaArrowRight } from "react-icons/fa";
import { useFormik } from "formik";
import { CompleteBrokerSignupSchema } from "@/validations";

interface Props {
	handleProceed: (val: any) => void;
}

const BrokerSetPasswordForm: React.FC<Props> = ({ handleProceed }) => {
	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: CompleteBrokerSignupSchema,
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
						Create password
					</p>
					<p className="text-ap-grey-400 mt-1 mb-6">
						Kindly fill in the information below.
					</p>
					<div className="flex flex-col gap-4">
						<TextInput
							name="password"
							label="Password"
							placeholder="Password"
							required
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<TextInput
							name="confirmPassword"
							label="Confirm password"
							placeholder="Confirm password"
							required
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
						/>
					</div>
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
					<AppButton
						value={"Proceed"}
						className="ml-auto"
						type="submit"
						disabled={!formik.isValid || !formik.dirty}
						iconTwo={<FaArrowRight />}
					/>
				</div>
			</div>
		</form>
	);
};

export default BrokerSetPasswordForm;
