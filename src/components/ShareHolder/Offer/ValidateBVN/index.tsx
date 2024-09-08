"use client";

import { useUpdateBVNMutation } from "@/app/appApiSlice";
import AppButton from "@/components/button";
import TextInput from "@/components/inputs/TextInput";
import BVNIssueModal from "@/components/modals/bvn-issue";
import React, { FC, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export interface IProps {
	notification: any;
	handleProceed: (val: string) => void;
}

const ValidateBVN: FC<IProps> = ({ notification, handleProceed }) => {
	const [bvnValue, setBVNValue] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openNotification = (text: string) => {
		notification.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};
	const [updateBVN, { isLoading }] = useUpdateBVNMutation();
	const onSubmit = async () => {
		try {
			let payload = {
				bvn: bvnValue,
			};
			let res = (await updateBVN(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				handleProceed(res?.data?.data);
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleModalCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="p-6">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Validate your BVN
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						An OTP would be sent to the contact details provided.{" "}
					</p>
					<TextInput
						label="Enter your BVN"
						placeholder="Enter BVN"
						className="mb-4"
						value={bvnValue}
						onChange={(e) => {
							setBVNValue(e.target.value);
						}}
					/>
					<p className="text-xs font-normal text-ap-green mb-4">
						To get your BVN dial *565*0# on your registered number.
					</p>
					<p className="text-xs font-normal text-gray-400">
						We collect your BVN for verification and compliance with financial
						regulations. This helps us protect you from fraud and provide better
						services.
					</p>
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex justify-between px-6">
					<span
						className="p-2.5 text-ap-invearn-green font-semibold text-xs cursor-pointer"
						onClick={showModal}
					>
						Need help?
					</span>
					<AppButton
						value={"Proceed"}
						iconTwo={<FaArrowRight />}
						isLoading={isLoading}
						disabled={!bvnValue || isLoading}
						onClick={onSubmit}
					/>
				</div>
			</div>
			<BVNIssueModal
				notification={notification}
				open={isModalOpen}
				handleCancel={handleModalCancel}
			/>
		</div>
	);
};

export default ValidateBVN;
