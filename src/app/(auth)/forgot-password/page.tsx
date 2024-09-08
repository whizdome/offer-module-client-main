"use client";

import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/validations";
import TextInput from "@/components/inputs/TextInput";
import AppButton from "@/components/button";
import { ForgotPasswordRequest } from "@/models/AuthModel";
import { useForgotPasswordMutation } from "../authApiSlice";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

export default function OfferIndividualResetPassword() {
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const openNotification = (text: string, type?: NoticeType) => {
		messageApi.open({
			type: type ? type : "error",
			content: text,
			duration: 5,
		});
	};
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: forgotPasswordSchema,
		onSubmit: async (values: ForgotPasswordRequest) => {
			try {
				let payload = {
					email: values.email,
				};
				let res = (await forgotPassword(payload)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occurred");
				} else {
					openNotification(
						"Password reset link has been sent to your Email Address",
						"success"
					);
					formik.resetForm();
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
							Forget password
						</p>
						<p className="text-ap-grey-400 mt-1 mb-6">
							Kindly fill in the information below.
						</p>
						<TextInput
							name="email"
							label="Email address"
							placeholder="Email address"
							formik={formik}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</div>
					<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
						<AppButton
							value={"Submit"}
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
