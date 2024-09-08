import { ConfigProvider, Table, TableProps } from "antd";
import React, { useState } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";
import EmptyState from "@/assets/svg/empty-state.svg";
import InstructionBox from "../../InstructionBox";
import AppButton from "../../button";
import { ButtonState } from "../../button/enum";
import BrokerNewRightRequestModal from "../../modals/new-right-issue-request-modal";

type ColumnsType<T extends object> = TableProps<T>["columns"];
type TablePagination<T extends object> = NonNullable<
	Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
	TablePagination<any>["position"]
>[number];

interface DataType {
	key: string;
	batchNo: string;
	noClientRequest: string;
	totalUnit: string;
	totalAmount: number;
	status: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: "Batch no.",
		dataIndex: "registrarNo",
		key: "registrarNo",
		fixed: "left",
		width: 100,
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Number of client request",
		dataIndex: "name",
		key: "name",
		width: 120,
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Total Unit",
		dataIndex: "chn",
		key: "chn",
		width: 120,
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Total Amount",
		dataIndex: "rightDue",
		key: "rightDue",
		width: 120,
		render: (text) => <a>{text}</a>,
	},

	{
		title: "Status",
		key: "action",
		width: 120,
		render: (_, record) => <p></p>,
	},
];

const RightIssueRequest = () => {
	const top: TablePaginationPosition = "none";
	const bottom: TablePaginationPosition = "bottomCenter";
	const instructions = [
		"Download & fill the template provided below",
		"Click on “New request",
		"Pay the “Total right amount",
		"Upload the filled downloaded template &  proof of payment",
	];

	const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

	return (
		<div className="lg:w-[80%] xl:w-[60%] w-[90%] space-y-4">
			<InstructionBox instructions={instructions} />

			<div className="p-6 w-full flex flex-col bg-white shadow-xl">
				<div className="header flex flex-col gap-6 md:gap-0 md:flex-row md:items-center justify-between mb-6">
					<div className="flex flex-col gap-1 ">
						<p className="text-ap-grey-950 text-xl font-semibold">
							Right Issue request
						</p>
						<p className="text-[#888] text-sm font-normal">
							Kindly fill in the information below.
						</p>
					</div>

					<div className="flex gap-3">
						<AppButton
							icon={<FaPlus />}
							value={"New Request"}
							onClick={() => {
								setIsNewRequestModalOpen(true);
							}}
						/>
						<AppButton
							iconTwo={<FaDownload />}
							variant={ButtonState.OUTLINE}
							value={"Download Template"}
						/>
					</div>
				</div>
				<ConfigProvider renderEmpty={CustomizeRenderEmpty}>
					<Table
						className="border"
						columns={columns}
						dataSource={[]}
						pagination={{ position: [top, bottom] }}
						scroll={{ x: 200 }}
					/>
				</ConfigProvider>
			</div>

			<BrokerNewRightRequestModal
				open={isNewRequestModalOpen}
				handleCancel={() => {
					setIsNewRequestModalOpen(false);
				}}
				handleOk={() => {
					setIsNewRequestModalOpen(false);
				}}
			/>
		</div>
	);
};

export default RightIssueRequest;

const CustomizeRenderEmpty = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<EmptyState />

			<p className="font-medium text-lg text-[#101828] mb-1">
				No request found
			</p>

			<p className="text-[#475467] mb-6">
				Click “add new request” button to get started{" "}
			</p>
			<AppButton icon={<FaPlus />} value={"New Request"} />
		</div>
	);
};
