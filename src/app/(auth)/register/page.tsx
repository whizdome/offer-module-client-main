"use client";

import { useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { OfferIndividualSignupSchema } from "@/validations";
import RadioInput from "@/components/inputs/RadioInput";
import TextInput from "@/components/inputs/TextInput";
import PhoneInput from "@/components/inputs/PhoneInput";
import { Checkbox, message } from "antd";
import Link from "next/link";
import AppButton from "@/components/button";
import { FaArrowRight } from "react-icons/fa";
import { useRegisterMutation } from "../authApiSlice";
import TermsAndPrivacyModal from "@/components/modals/terms-privacy";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const options = [
	{ title: "An Individual", key: "0" },
	{ title: "A Company", key: "1" },
	{ title: "A Joint Partnership", key: "2" },
];

export default function OfferIndividualRegistration() {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const [register, { isLoading }] = useRegisterMutation();
	const router = useRouter();
	const [checked, setChecked] = useState(false);
	const [modalContent, setModalContent] = useState("terms");
	const [modalOpen, setModalOpen] = useState(false);
	const formik = useFormik({
		initialValues: {
			type: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: OfferIndividualSignupSchema,
		onSubmit: async (values) => {
			try {
				let payload = {
					shareholderRegistrationType: Number(values.type),
					email: values.email,
					phoneNumber: `+234${values.phoneNumber}`,
					password: values.password,
				};
				let res = (await register(payload)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occurred");
				} else {
					router.push(
						`/accountValidation?email=${formik.values.email}&phoneNumber=${formik.values.phoneNumber}`
					);
				}
			} catch (error) {
				console.error("Caught Error: ", JSON.stringify(error));
			}
		},
	});
	return (
		<div className="flex flex-col items-center justify-between">
			{contextHolder}
			<NavTitle handleGoBack={() => router.back()} />
			<form
				onSubmit={formik.handleSubmit}
				className="sm:w-[486px] w-full px-4 space-y-4"
			>
				<div className=" bg-white border border-ap-grey-100 shadow-xl">
					<div className="p-6">
						<p className="text-ap-grey-700 text-base font-medium mt-2">
							Already an Invearn user?{" "}
							<Link href="/login" className="text-ap-invearn-green">
								Log in
							</Link>
						</p>
						<p className="text-ap-grey-950 text-lg font-semibold mt-6">
							Registration
						</p>
						<p className="text-ap-grey-400 mt-1 mb-6">
							Kindly fill in the information below.
						</p>
						<div className="flex flex-col gap-4">
							<div>
								<p className="text-ap-grey-700 mb-3">Register as</p>
								<div className="space-y-3">
									{options.map((option, idx) => (
										<RadioInput
											key={idx}
											value={option.key}
											title={option.title}
											selected={formik.values.type}
											name="type"
											onChange={(val) => formik.setFieldValue("type", val)}
										/>
									))}
								</div>
							</div>
							<TextInput
								name="email"
								label="Email address"
								placeholder="Email address"
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							<PhoneInput
								name="phoneNumber"
								formik={formik}
								label="Phone number"
								placeholder="Phone number"
								value={formik.values.phoneNumber}
								onChange={(value) => formik.setFieldValue("phoneNumber", value)}
								info="e.g: +234 809 456 2343"
							/>
							<TextInput
								name="password"
								type={showPassword ? "text" : "password"}
								label={"Password"}
								placeholder={"Password"}
								className="hide-ms-reveal"
								icon={
									showPassword ? (
										<BsEyeSlashFill
											size={20}
											onClick={() => setShowPassword(!showPassword)}
										/>
									) : (
										<BsEyeFill
											size={20}
											onClick={() => setShowPassword(!showPassword)}
										/>
									)
								}
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							<TextInput
								name="confirmPassword"
								label="Confirm password"
								type={showPassword2 ? "text" : "password"}
								className="hide-ms-reveal"
								icon={
									showPassword2 ? (
										<BsEyeSlashFill
											size={20}
											onClick={() => setShowPassword2(!showPassword2)}
										/>
									) : (
										<BsEyeFill
											size={20}
											onClick={() => setShowPassword2(!showPassword2)}
										/>
									)
								}
								placeholder="Confirm password"
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.confirmPassword}
							/>
						</div>
					</div>
					<div className="px-4 mb-4 flex gap-2.5 items-center">
						<Checkbox
							checked={checked}
							onChange={(e) => setChecked(e.target.checked)}
						/>
						<p className="text-ap-grey-200 text-sm font-normal">
							I agree to this{" "}
							<span
								className="text-ap-grey-950 underline cursor-pointer"
								onClick={() => {
									setModalContent("terms");
									setModalOpen(true);
								}}
							>
								Terms of Use
							</span>
							, and{" "}
							<span
								className="text-ap-grey-950 underline cursor-pointer"
								onClick={() => {
									setModalContent("privacy");
									setModalOpen(true);
								}}
							>
								Privacy Policy
							</span>
							.
						</p>
					</div>
					<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
						<AppButton
							value="Submit"
							className="ml-auto"
							type="submit"
							disabled={!formik.isValid || !checked || isLoading}
							iconTwo={<FaArrowRight />}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</form>
			<TermsAndPrivacyModal
				type={modalContent}
				open={modalOpen}
				handleOk={() => setModalOpen(false)}
				handleCancel={() => setModalOpen(false)}
			/>
		</div>
	);
}
