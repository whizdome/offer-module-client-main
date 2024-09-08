"use client";

import React, { FC, useEffect, useState } from "react";
import { Checkbox, Modal } from "antd";
import AppButton from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import OtpVerificationInput from "../otp";

import { maskEmailAddress, maskPhoneNumber } from "@/utils";

export interface IProps {
	loading: boolean;
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	info: any;
	otpValue: string;
	setOTPValue: any;
	resendOTP: () => void;
}

const AccountOTPModal: FC<IProps> = ({
	loading,
	open,
	handleOk,
	handleCancel,
	info,
	otpValue,
	setOTPValue,
	resendOTP,
}) => {
	const [isInValid, setIsInValid] = useState(false);
	// const [checked, setChecked] = useState(false);
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

	const handleResendOTP = () => {
		resendOTP();
		startTimer();
	};

	return (
		<Modal
			open={open}
			width={424}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<div key={1} className="flex justify-end mx-6">
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Proceed"
						type="button"
						isLoading={loading}
						disabled={isInValid || otpValue.length < 6 || loading}
						onClick={handleOk}
						iconTwo={<FaArrowRight />}
					/>
				</div>,
			]}
		>
			<div className="p-6">
				<p className="text-ap-grey-950 text-lg font-semibold mt-2">
					Kindly input the OTP sent to you
				</p>
				<p className="text-ap-grey-700 mt-1 mb-6">
					A 6 digit code has been sent to your phone number & email address{" "}
					{`${maskPhoneNumber(info?.phoneNumber)}, ${maskEmailAddress(info?.email)}`}
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
				{/* <div className="flex gap-2.5 items-center">
					<Checkbox
						checked={checked}
						onChange={(e) => setChecked(e.target.checked)}
					/>
					<p className="text-ap-grey-200 text-sm font-normal">
						I agree to this{" "}
						<Link href="">
							<span className="text-ap-grey-950 underline">Terms of Use</span>
						</Link>
						, and{" "}
						<Link href="">
							<span className="text-ap-grey-950 underline">Privacy Policy</span>
						</Link>
						.
					</p>
				</div> */}
			</div>
		</Modal>
	);
};

export default AccountOTPModal;
