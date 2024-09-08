"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import OtpVerificationInput from "@/components/otp";
import { maskPhoneNumber } from "@/utils";
import AppButton from "@/components/button";
import { ButtonSize, ButtonState } from "@/components/button/enum";
import {
	useResendBvnOTPMutation,
	useValidateBVNMutation,
} from "@/app/appApiSlice";

export interface IProps {
	info: any;
	notification: any;
	handleProceed: () => void;
}

const OTPConfirmation: React.FC<IProps> = ({
	info,
	notification,
	handleProceed,
}) => {
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const [resendOTP] = useResendBvnOTPMutation();
	const [validateBVN, { isLoading }] = useValidateBVNMutation();
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
		(await resendOTP()) as any;
		startTimer();
	};

	const onSubmit = async () => {
		try {
			let payload = {
				otp: otpValue,
			};
			let res = (await validateBVN(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				handleProceed();
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};
	return (
		<div className="sm:w-[470px] mx-4 space-y-4">
			<div className="bg-white border border-ap-grey-100 shadow-xl">
				<div className="p-6">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Kindly input the OTP sent to you
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						A 6 digit code has been sent to your the phone number linked with
						your BVN {maskPhoneNumber(info?.phoneNumber)}
					</p>
					<div className="flex flex-col gap-4 text-xs font-normal mb-6">
						<OtpVerificationInput
							length={6}
							onChangeOTP={setOTPValue}
							isInvalidOTP={isInValid}
							setIsInvalid={setIsInValid}
						/>
						<p className="text-ap-grey-400">
							Didn’t receive a code?{" "}
							{timer > 0 ? (
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
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex justify-end px-6">
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Proceed"
						type="button"
						isLoading={isLoading}
						disabled={isInValid || otpValue.length < 6 || isLoading}
						onClick={onSubmit}
						iconTwo={<FaArrowRight />}
					/>
				</div>
			</div>
		</div>
	);
};

export default OTPConfirmation;
