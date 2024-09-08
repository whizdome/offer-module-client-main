"use client";

import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import type { TableProps } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import AccountInfoModal from "../modals/account-info";
import AccountOTPModal from "../modals/account-otp";
import {
	IHolder,
	ISearchHoldersResponse,
	ITriggerOTPPayload,
} from "@/models/ShareHolder";
import ContactDetailsModal from "../modals/contact-details";
import { currencyFormatter } from "@/utils";
import { removePrefix } from "@/utils/constants";
import {
	useTriggerOTPMutation,
	useValidateOTPMutation,
} from "@/app/appApiSlice";

interface Props {
	selectedItem: IHolder | null;
	setSelectedItem: any;
	loading: boolean;
	list: ISearchHoldersResponse;
	handleProceed: () => void;
	pageNumber: number;
	setPageNumber: any;
}

type ColumnsType<T extends object> = TableProps<T>["columns"];
type TablePagination<T extends object> = NonNullable<
	Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
	TablePagination<any>["position"]
>[number];

const AccountList: React.FC<Props> = ({
	selectedItem,
	setSelectedItem,
	loading,
	list,
	handleProceed,
	pageNumber,
	setPageNumber,
}) => {
	const [triggerOTP, { isLoading: isSendOTPLoading }] = useTriggerOTPMutation();
	const [validateOTP, { isLoading: isOTPValidationLoadiing }] =
		useValidateOTPMutation();
	const [top, setTop] = useState<TablePaginationPosition>("none");
	const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
	const [userContact, setUserContact] = useState<ITriggerOTPPayload | null>(
		null
	);
	const [otpValue, setOTPValue] = useState("");

	const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
	const [isAccountOTPModalOpen, setIsAccountOTPModalOpen] = useState(false);
	const [isContactDetailModalOpen, setIsContactDetailModalOpen] =
		useState(false);

	const [messageApi, contextHolder] = message.useMessage();

	const openNotification = (text: string) => {
		messageApi.open({
			type: "error",
			content: text,
			duration: 5,
		});
	};

	const showModal = (item: IHolder) => {
		setIsAccountInfoModalOpen(true);
		setSelectedItem(item);
	};

	const handleActiveInfoOk = () => {
		setIsAccountInfoModalOpen(false);
		showContactDetailModal();
	};

	const handleActiveInfoCancel = () => {
		setIsAccountInfoModalOpen(false);
	};

	const showContactDetailModal = (item?: IHolder) => {
		if (item) {
			setUserContact({
				email: item.emailAddress || "",
				phoneNumber: removePrefix(item.phoneNumber!),
				rightHolderId: item.id!,
			});
			setSelectedItem(item);
		}
		setIsContactDetailModalOpen(true);
	};

	const handleContactDetail = async () => {
		//Submit info to endpoint
		try {
			if (userContact) {
				let res = (await triggerOTP(userContact)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occured");
				} else {
					setIsContactDetailModalOpen(false);
					showAccountOTPModal();
				}
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	const handleContactDetailCancel = () => {
		setUserContact(null);
		setIsContactDetailModalOpen(false);
	};

	const showAccountOTPModal = () => {
		setIsAccountOTPModalOpen(true);
	};

	const handleAccountOTP = async () => {
		//Submit info to endpoint
		try {
			if (selectedItem?.id && otpValue) {
				let data = {
					otp: otpValue,
					rightHolderId: selectedItem.id,
				};
				let res = (await validateOTP(data)) as any;
				if (res?.error) {
					openNotification(res?.error?.data.description || "An Error Occured");
				} else {
					setOTPValue("");
					handleAccountOTPCancel();
					handleProceed();
				}
			}
		} catch (error) {
			console.log("Caught Error: ", JSON.stringify(error)); // Debug
		}
	};

	const handleAccountOTPCancel = () => {
		setOTPValue("");
		setIsAccountOTPModalOpen(false);
	};

	const columns: ColumnsType<IHolder> = [
		{
			title: "Registrar no.",
			dataIndex: "registrarAccount",
			key: "registrarAccount",
		},
		{
			title: "Name",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "CHN",
			dataIndex: "chnNumber",
			key: "chnNumber",
			responsive: ["md"],
		},
		{
			title: "Right due",
			dataIndex: "rightDue",
			key: "rightDue",
			responsive: ["md"],
			render: (text, record) => <span>******</span>,
		},
		{
			title: "Amount",
			key: "amount",
			dataIndex: "amount",
			responsive: ["md"],
			render: (text) => <span>******</span>,
		},
		{
			title: "",
			key: "action",
			render: (_, record) => (
				<>
					<div
						className="hidden md:flex items-center gap-4 hover:text-ap-success cursor-pointer"
						onClick={() => showContactDetailModal(record)}
					>
						<p>Proceed</p>
						<FaArrowRight />
					</div>
					<div
						className="md:hidden flex items-center gap-4 hover:text-ap-success cursor-pointer"
						onClick={() => showModal(record)}
					>
						<FaRegEye />
						<p>Preview</p>
					</div>
				</>
			),
		},
	];

	return (
		<div className="p-6 flex flex-col gap-6 bg-white shadow-xl">
			<div className="flex flex-col gap-2">
				<p className="text-ap-grey-950 text-xl font-semibold">
					Select your account
				</p>
				<p className="text-[#888] text-sm font-normal">
					Kindly select the details of your account.
				</p>
			</div>
			<Table
				loading={loading}
				className="border"
				columns={columns}
				dataSource={list.data}
				pagination={{
					position: [top, bottom],
					current: pageNumber,
					onChange: setPageNumber,
					total: list.recordCount,
					pageSize: 20,
					showSizeChanger: false,
				}}
			/>
			<AccountInfoModal
				info={selectedItem}
				open={isAccountInfoModalOpen}
				handleOk={handleActiveInfoOk}
				handleCancel={handleActiveInfoCancel}
			/>
			<ContactDetailsModal
				loading={isSendOTPLoading}
				userContact={userContact}
				setUserContact={setUserContact}
				open={isContactDetailModalOpen}
				handleOk={handleContactDetail}
				handleCancel={handleContactDetailCancel}
			/>
			<AccountOTPModal
				otpValue={otpValue}
				setOTPValue={setOTPValue}
				loading={isOTPValidationLoadiing}
				info={userContact}
				open={isAccountOTPModalOpen}
				resendOTP={handleContactDetail}
				handleOk={handleAccountOTP}
				handleCancel={handleAccountOTPCancel}
			/>
			{contextHolder}
		</div>
	);
};

export default AccountList;
