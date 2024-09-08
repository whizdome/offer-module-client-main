"use client";

import React, { FC, useCallback, useState } from "react";
import { Modal } from "antd";
import AppButton from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "../inputs/TextInput";
import { ITriggerOTPPayload } from "@/models/ShareHolder";
import PhoneInput from "../inputs/PhoneInput";
import { maskEmailAddress, maskPhoneNumber } from "@/utils";

export interface IProps {
	loading: boolean;
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	userContact: ITriggerOTPPayload | null;
	setUserContact: any;
}

const ContactDetailsModal: FC<IProps> = ({
	loading,
	open,
	handleOk,
	handleCancel,
	userContact,
	setUserContact,
}) => {
	const [emailChanged, setEmailChanged] = useState(false);
	const [numberChanged, setNumberChanged] = useState(false);

	const CloseModal = () => {
		setEmailChanged(false);
		setNumberChanged(false);
		handleCancel();
	};

	return (
		<Modal
			open={open}
			onOk={handleOk}
			onCancel={CloseModal}
			footer={[
				<div
					key={1}
					className="flex justify-end border-t border-[#EDEEF1] py-5 px-6 "
				>
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Proceed"
						type="button"
						isLoading={loading}
						disabled={
							loading || !userContact?.email || !userContact?.phoneNumber
						}
						onClick={handleOk}
						iconTwo={<FaArrowRight />}
					/>
				</div>,
			]}
		>
			<div className="p-6">
				<p className="text-ap-grey-950 text-lg font-semibold mt-2">
					Kindly provide your contact details
				</p>
				<p className="text-ap-grey-700 mt-1 mb-6">
					An OTP would be sent to the contact details provided.{" "}
				</p>

				<TextInput
					label="Email address"
					placeholder="Email address"
					className="mb-5"
					value={
						!emailChanged
							? maskEmailAddress(userContact?.email || "")
							: userContact?.email
					}
					onFocus={() => {
						if (!emailChanged) {
							setEmailChanged(true);
							setUserContact({ ...userContact, email: "" });
						}
					}}
					onChange={(e) =>
						setUserContact({ ...userContact, email: e.target.value })
					}
				/>
				{!numberChanged ? (
					<TextInput
						label="Phone number"
						placeholder="Phone number"
						value={maskPhoneNumber(userContact?.phoneNumber)}
						onFocus={() => {
							setNumberChanged(true);
							setUserContact({ ...userContact, phoneNumber: "" });
						}}
					/>
				) : (
					<PhoneInput
						label="Phone number"
						placeholder="Phone number"
						value={userContact?.phoneNumber || ""}
						onChange={(value) =>
							setUserContact({ ...userContact, phoneNumber: value })
						}
						info="e.g: +234 809 456 2343"
					/>
				)}
			</div>
		</Modal>
	);
};

export default ContactDetailsModal;
