"use client";

import { useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginSchema } from "@/validations";
import TextInput from "@/components/inputs/TextInput";
import AppButton from "@/components/button";
import Link from "next/link";
import { message } from "antd";
import { useLoginMutation } from "../authApiSlice";
import { LoginRequest } from "@/models/AuthModel";
import { setCookie } from "cookies-next";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function OfferIndividualLogin() {
	const [showPassword, setShowPassword] = useState(false);
	const [login, { isLoading }] = useLoginMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: async (values: LoginRequest) => {
			try {
				let payload = {
					email: values.email,
					password: values.password,
				};
				let res = (await login(payload)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occurred");
					if (res?.error?.data.code === "12") {
						router.push(`/accountValidation?email=${values.email}`);
					}
				} else {
					// Set auth
					const userData = res.data?.data;
					const expiryTime = userData?.expiryTime;

					let cookieExpiration;
					if (expiryTime) {
						cookieExpiration = new Date(expiryTime);
					}

					setCookie("currentUser", JSON.stringify(userData), {
						expires: cookieExpiration,
					});
					router.push(`/shareholder/offers`);
				}
			} catch (error) {
				console.error("Caught Error: ", JSON.stringify(error));
			}
		},
	});
	return (
		<div className="flex flex-col items-center justify-between">
			{contextHolder}
			<NavTitle handleGoBack={() => router.replace("/")} />
			<form
				onSubmit={formik.handleSubmit}
				className="sm:w-[486px] w-full px-4 space-y-4"
			>
				<div className=" bg-white border border-ap-grey-100 shadow-xl">
					<div className="p-6">
						<p className="text-ap-grey-700 text-base font-medium mt-2">
							{"Don't"} have an account?{" "}
							<Link href="/register" className="text-ap-invearn-green">
								register
							</Link>
						</p>
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
								type={showPassword ? "text" : "password"}
								label={"Password"}
								className="hide-ms-reveal"
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
						</div>
						<Link href="/forgot-password">
							<p className="mt-2 font-medium text-xs underline text-ap-success">
								Forgot password?
							</p>
						</Link>
					</div>
					<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
						<AppButton
							value={"Log in"}
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
