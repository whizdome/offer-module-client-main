"use client";

import { useEffect, useState } from "react";
import NavTitle from "@/components/NavTitle";
import { useRouter, useSearchParams } from "next/navigation";
import OtpVerificationInput from "@/components/otp";
import AppButton from "@/components/button";
import { ButtonSize, ButtonState } from "@/components/button/enum";
import { FaArrowRight } from "react-icons/fa";
import { maskEmailAddress, maskPhoneNumber } from "@/utils";
import {
	useResendOTPMutation,
	useValidateCustomerOTPMutation,
} from "../authApiSlice";
import { message } from "antd";
import { FaSpinner } from "react-icons/fa6";

export default function OfferIndividualRegistration() {
	const [messageApi, contextHolder] = message.useMessage();
	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const [resendOTP, { isLoading: otpLoading }] = useResendOTPMutation();
	const [validateCustomerOTP, { isLoading }] = useValidateCustomerOTPMutation();
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const phoneNumber = searchParams.get("phoneNumber");
	const [otpValue, setOTPValue] = useState("");
	const [isInValid, setIsInValid] = useState(false);
	const [timer, setTimer] = useState(0);

	const startTimer = () => {
		setTimer(180);
	};

	useEffect(() => {
		if (timer > 0) {
			const countdown = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
			return () => clearInterval(countdown);
		}
	}, [timer]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
	};

	const handleResendOTP = async () => {
		(await resendOTP({ email: email || "" })) as any;
		startTimer();
	};

	const onSubmit = async () => {
		//API call to confirm
		try {
			let payload = {
				email: email || "",
				otp: otpValue,
			};
			let res = (await validateCustomerOTP(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occurred");
			} else {
				router.push("/login");
			}
		} catch (error) {
			console.error("Caught Error: ", JSON.stringify(error));
		}
	};
	return (
		<div className="flex flex-col items-center justify-between">
			<NavTitle handleGoBack={() => router.back()} />
			{contextHolder}
			<div className="md:w-[486px] w-full px-4 space-y-4">
				<div className=" bg-white border border-ap-grey-100 shadow-xl">
					<div className="p-6">
						<p className="text-ap-grey-950 text-lg font-semibold mt-2">
							Kindly input the OTP sent to you
						</p>
						<p className="text-ap-grey-700 mt-1 mb-6">
							A 6 digit code has been sent to your phone number & email address{" "}
							{`${maskPhoneNumber(phoneNumber || "")}, ${maskEmailAddress(email || "")}`}
						</p>
						<div className="flex flex-col gap-4 text-xs font-normal mb-6">
							<OtpVerificationInput
								length={6}
								onChangeOTP={setOTPValue}
								isInvalidOTP={isInValid}
								setIsInvalid={setIsInValid}
							/>
							<p className="flex text-ap-grey-400 gap-1 items-center">
								Didn’t receive a code?
								{otpLoading ? (
									<FaSpinner />
								) : timer > 0 ? (
									<span className="text-ap-grey-400">
										Resend OTP in {formatTime(timer)}
									</span>
								) : (
									<span
										className="text-ap-success underline cursor-pointer"
										onClick={handleResendOTP}
									>
										Resend OTP
									</span>
								)}
							</p>
						</div>
						<div className="flex justify-end mx-6">
							<AppButton
								size={ButtonSize.lg}
								variant={ButtonState.PRIMARY}
								value="Proceed"
								type="button"
								isLoading={isLoading}
								disabled={
									!email || isLoading || isInValid || otpValue.length < 6
								}
								onClick={onSubmit}
								iconTwo={<FaArrowRight />}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
