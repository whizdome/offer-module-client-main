"use client";

import NavTitle from "@/components/NavTitle";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/validations";
import TextInput from "@/components/inputs/TextInput";
import AppButton from "@/components/button";
import { ResetPasswordRequest } from "@/models/AuthModel";
import { useResetPasswordMutation } from "../authApiSlice";
import { message } from "antd";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { NoticeType } from "antd/es/message/interface";

export default function OfferIndividualResetPassword() {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const openNotification = (text: string, type?: NoticeType) => {
		messageApi.open({
			type: type ? type : "error",
			content: text,
			duration: 5,
		});
	};
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const token = searchParams.get("emailToken");
	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: resetPasswordSchema,
		onSubmit: async (values) => {
			try {
				let payload: ResetPasswordRequest = {
					token: token || "",
					email: email || "",
					password: values.password,
				};
				let res = (await resetPassword(payload)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occurred");
				} else {
					openNotification("Password changed successfully", "success");
					router.push(`/login`);
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
						<p className="text-ap-grey-950 text-lg font-semibold mt-2">
							Reset your password
						</p>
						<p className="text-ap-grey-400 mt-1 mb-6">
							Kindly fill in the information below.
						</p>
						<div className="flex flex-col gap-4">
							<TextInput
								name="password"
								type={showPassword ? "text" : "password"}
								label={"Password"}
								placeholder={"Password"}
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
								type={showPassword2 ? "text" : "password"}
								icon={
									showPassword ? (
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
								label="Confirm password"
								placeholder="Confirm password"
								formik={formik}
								onChange={formik.handleChange}
								value={formik.values.confirmPassword}
							/>
						</div>
					</div>
					<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
						<AppButton
							value={"Done"}
							className="ml-auto"
							type="submit"
							isLoading={isLoading}
							disabled={!formik.isValid || isLoading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
