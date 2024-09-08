"use client";

import { useBvnHelpMutation } from "@/app/appApiSlice";
import { Modal } from "antd";
import React, { FC, useState } from "react";
import AppSelect from "../inputs/AppSelect";
import AppButton from "@/components/button";
import { FaArrowRight } from "react-icons/fa6";
import TextInput from "../inputs/TextInput";
import AppTextArea from "../inputs/TextArea";

export interface IProps {
	open: boolean;
	handleCancel: () => void;
	notification: any;
}

const BVNIssueModal: FC<IProps> = ({ open, handleCancel, notification }) => {
	const [sendBVNHelp, { isLoading }] = useBvnHelpMutation();
	const openNotification = (text: string, type?: string) => {
		notification.open({
			type: type ? type : "error",
			content: text,
			duration: 5,
		});
	};
	const [issueType, setIssueType] = useState("");
	const [description, setDescription] = useState("");
	const [bvnValue, setBVNValue] = useState("");

	const onSubmit = async () => {
		try {
			let payload = {
				issueType,
				description,
				bvn: bvnValue,
			};
			let res = (await sendBVNHelp(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occured");
			} else {
				openNotification("Request sent successfully!", "success");
				handleCancel();
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	return (
		<Modal open={open} width={486} onCancel={handleCancel} footer={null}>
			<div className="w-full">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						BVN Issue
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						If you encounter any issues, let us know by selecting an option from
						the dropdown menu below.
					</p>

					<div className="flex flex-col gap-4 mb-4">
						<AppSelect
							value={issueType}
							label="Issues"
							options={[
								"I did not get OTP",
								"I do not have access to my BVN Phone Number",
								"Others",
							]}
							onChange={(e) => {
								setIssueType(e.target.value);
							}}
						/>
						<TextInput
							label="Enter your BVN"
							placeholder="Enter BVN"
							value={bvnValue}
							onChange={(e) => {
								setBVNValue(e.target.value);
							}}
						/>
						<AppTextArea
							label="Describe the issue"
							placeholder="Describe issue"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							rows={4}
						/>
					</div>
				</div>
				<div className="py-6 flex justify-end items-center px-6 ">
					<AppButton
						value={"Submit"}
						onClick={onSubmit}
						iconTwo={<FaArrowRight />}
						isLoading={isLoading}
						disabled={isLoading || !issueType || !bvnValue || !description}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default BVNIssueModal;
