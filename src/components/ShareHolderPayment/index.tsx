"use client";

import React, { useState } from "react";
import { FaArrowRight, FaRegCopy, FaCheck } from "react-icons/fa";
import { message, Tooltip } from "antd";
import FileUpload from "../Upload";
import InstructionBox from "../InstructionBox";
import AppButton from "../button";
import { IHolder } from "@/models/ShareHolder";
import { formatToCurrency } from "@/utils";
import { useValidateHNIPaymentMutation } from "@/app/appApiSlice";

const instructions = [
	"Pay the Total right amount to the account details below.",
	"Upload the Proof of payment",
];

interface Props {
	info: IHolder | null;
	data: any;
	handleProceed: () => void;
}

const ShareHolderPayment: React.FC<Props> = ({ info, data, handleProceed }) => {
	const [validateHNIPayment, { isLoading }] = useValidateHNIPaymentMutation();
	const userInformation = {
		"Account number": "01234567890",
		"Account name": "Africa Prudential",
		"Bank name": "United Bank of Africa",
		"Right Amount": `NGN ${formatToCurrency(data?.response.offerAmount, 2)}`,
		"Transaction Fee": `NGN ${formatToCurrency(data?.response.transactionFee + data?.response.invearnFee, 2)}`,
		"Total Amount due": `NGN ${formatToCurrency(data?.response.amount, 2)}`,
		"Include this in the narration": data?.response?.reference,
	};

	const [messageApi, contextHolder] = message.useMessage();

	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};

	const [fileList, setFileList] = useState<any>([]);
	const [copied, setCopied] = useState<boolean[]>(new Array(5).fill(false));

	const handleCopy = (idx: number, value: string) => {
		navigator.clipboard.writeText(value);
		const temp = [...copied];
		temp[idx] = true;
		setCopied(temp);
		setTimeout(() => {
			temp[idx] = false;
			setCopied([...temp]);
		}, 3000);
	};

	const getFileName = (file: any) => file.name;

	const getFileBase64 = (file: any) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64Image: any = reader.result;
				const splitUp = base64Image.split(",");
				resolve(splitUp[1]);
			};
			reader.onerror = (error) => reject(error);
		});
	};

	const getFileURL = async (file: any) => {
		const base64String = await getFileBase64(file);
		return base64String as string;
	};

	const onSubmit = async () => {
		try {
			const proofOfPaymentImage = await getFileURL(fileList[0].originFileObj);
			const payload = {
				referenceId: data?.response?.reference,
				proofOfPaymentImage,
				proofOfPaymentName: getFileName(fileList[0]),
			};
			let res = (await validateHNIPayment(payload)) as any;
			if (res?.error) {
				openNotification(res?.error?.data.description || "An Error Occurred");
			} else {
				handleProceed();
			}
		} catch (error) {
			console.error("Caught Error: ", JSON.stringify(error));
		}
	};

	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			{instructions.length > 0 && (
				<InstructionBox instructions={instructions} />
			)}
			{contextHolder}
			<div className="bg-white border border-ap-grey-100 shadow-xl">
				<div className="px-6 py-4">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Kindly make payment and upload proof of payment
					</p>
					<p className="text-ap-grey-700 mt-1 mb-2">
						See below account details to make payment
					</p>
				</div>
				<div className="bg-ap-grey-50 px-6 py-4 space-y-3">
					{Object.entries(userInformation).map(([key, value], idx) => (
						<div
							key={key}
							className="flex flex-row justify-between items-center"
						>
							<p className="text-ap-grey-500">{key}</p>
							<div className="flex items-center gap-3">
								<p className="text-ap-grey-950 font-medium">{value}</p>
								{copied[idx] ? (
									<Tooltip title="Copied">
										<span className="cursor-pointer">
											<FaCheck fill="#686B" />
										</span>
									</Tooltip>
								) : (
									<Tooltip title="Copy">
										<span
											className="cursor-pointer"
											onClick={() => handleCopy(idx, value)}
										>
											<FaRegCopy fill="#686B72" opacity={0.5} />
										</span>
									</Tooltip>
								)}
							</div>
						</div>
					))}
				</div>
				<div>
					<FileUpload files={fileList} setFiles={setFileList} />
				</div>
				<div className="border-t border-[#EDEEF1] py-6 flex px-6 ">
					<AppButton
						value="Submit"
						className="ml-auto"
						onClick={onSubmit}
						iconTwo={<FaArrowRight />}
						isLoading={isLoading}
						disabled={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ShareHolderPayment;
