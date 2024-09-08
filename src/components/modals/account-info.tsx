"use client";

import React, { FC } from "react";
import { Modal, Tooltip } from "antd";
import AppButton from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { FaArrowRight } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { currencyFormatter } from "@/utils";

export interface IProps {
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	info: any;
}

const AccountInfoModal: FC<IProps> = ({
	open,
	handleOk,
	handleCancel,
	info,
}) => {
	return (
		<Modal
			open={open}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<div key={1} className="flex justify-end mx-6">
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Proceed"
						type="button"
						onClick={handleOk}
						iconTwo={<FaArrowRight />}
					/>
				</div>,
			]}
		>
			<div className="py-4 px-6 flex flex-col gap-1">
				<h3 className="text-ap-grey-950 text-xl font-semibold">Preview</h3>
				<p className="text-ap-grey-700 text-sm font-normal">
					Kindly proceed if this is your account
				</p>
			</div>
			<div className="bg-ap-grey-50 p-6 flex flex-col gap-5">
				<div className="w-full flex">
					<div className="w-1/2 flex flex-col">
						<p className="text-sm text-ap-grey-500 font-normal">Full name</p>
						<p className="font-medium text-sm text-ap-grey-950 capitalize">
							{info?.fullName}
						</p>
					</div>
					<div className="w-1/2 flex flex-col">
						<p className="text-sm text-ap-grey-500 font-normal">
							Registrar account number
						</p>
						<p className="font-medium text-sm text-ap-grey-950 capitalize">
							{info?.registrarAccount}
						</p>
					</div>
				</div>
				<div className="w-full flex">
					<div className="w-1/2 flex flex-col">
						<p className="text-sm text-ap-grey-500 font-normal">Right due</p>
						<p className="font-medium text-sm text-ap-grey-950 capitalize">
							******
						</p>
					</div>
					<div className="w-1/2 flex flex-col">
						<p className="flex gap-1 items-center text-sm text-ap-grey-500 font-normal">
							<span>Total qualifying unit</span>{" "}
							<Tooltip placement="rightTop" title={"information"}>
								<IoIosInformationCircleOutline />
							</Tooltip>
						</p>
						<p className="font-medium text-sm text-ap-grey-950 capitalize">
							******
						</p>
					</div>
				</div>
				<div className="w-full flex">
					<div className="w-1/2 flex flex-col">
						<p className="text-sm text-ap-grey-500 font-normal">
							Total amount due
						</p>
						<p className="font-medium text-sm text-ap-grey-950 capitalize">
							NGN ******
						</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AccountInfoModal;
