"use client";

import { useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "@/validations";
import TextInput from "@/components/inputs/TextInput";
import AppButton from "@/components/button";

export default function Broker() {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(1);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: async (values) => {},
	});
	return (
		<div className="flex flex-col items-center justify-between">
			<NavTitle
				title="UBA Right Issue"
				handleGoBack={() => {
					if (activeStep === 1) {
						router.replace("/");
					} else {
						let temp = activeStep - 1;
						setActiveStep(temp);
					}
				}}
			/>
			<form
				onSubmit={formik.handleSubmit}
				className="lg:w-[486px] w-full px-4 space-y-4"
			>
				<div className=" bg-white border border-ap-grey-100 shadow-xl">
					<div className="p-6">
						<p className="text-ap-grey-950 text-lg font-semibold mt-2">
							Log in
						</p>
						<p className="text-ap-grey-400 mt-1 mb-6">
							Kindly fill in the information below.
						</p>
						<div className="flex flex-col gap-4">
							<TextInput
								name="email"
								label="Email address"
								placeholder="Email address"
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<TextInput
								name="password"
								label="Password"
								placeholder="Password"
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</div>
					</div>
					<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
						<AppButton
							value={"Log in"}
							className="ml-auto"
							type="submit"
							disabled={!formik.isValid}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
