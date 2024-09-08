"use client";

import {
	useGetOfferApplicationListQuery,
	useGetOfferProfileStageQuery,
} from "@/app/appApiSlice";
import AppButton from "@/components/button";
import OfferApplicationModal from "@/components/modals/offer-application";
import SubmissionSuccessModal from "@/components/modals/success";
import NavTitle from "@/components/NavTitle";
import {
	IOfferApplicationListPayload,
	IOfferResponse,
} from "@/models/EquityIssue";
import { currencyFormatter } from "@/utils";
import { message, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

type ColumnsType<T extends object> = TableProps<T>["columns"];
type TablePagination<T extends object> = NonNullable<
	Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition = NonNullable<
	TablePagination<any>["position"]
>[number];

export default function OfferApplicationList() {
	const { data: offerProfile, isLoading } = useGetOfferProfileStageQuery();
	const [top, setTop] = useState<TablePaginationPosition>("none");
	const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
	const [modalOpen, setModalOpen] = useState(false);
	const [successModalOpen, setSuccessModalOpen] = useState(false);
	const [page, setPage] = useState<number>(1);
	const [requestParams, setRequestParams] =
		useState<IOfferApplicationListPayload>({
			searchText: "",
			pageNumber: 1,
			pageSize: 10,
		});
	const {
		data: offeringsList,
		refetch,
		isFetching,
	} = useGetOfferApplicationListQuery(requestParams);
	const [messageApi, contextHolder] = message.useMessage();
	const columns: ColumnsType<IOfferResponse[]> = [
		{
			title: "S/N",
			dataIndex: "index",
			key: "index",
			render: (text, record, index) => index + 1,
		},
		{
			title: "Brokerage firm",
			dataIndex: "brokerageFirm",
			key: "brokerageFirm",
			responsive: ["md"],
		},
		{
			title: "Company",
			dataIndex: "clientCompanyName",
			key: "clientCompanyName",
		},

		{
			title: "CHN",
			dataIndex: "chn",
			key: "chn",
			responsive: ["md"],
		},
		{
			title: "Share Unit",
			dataIndex: "sharesUnit",
			key: "sharesUnit",
			render: (text) => <span>{currencyFormatter(text)}</span>,
		},
		{
			title: "Amount",
			key: "totalAmount",
			dataIndex: "totalAmount",
			render: (text) => <span>{currencyFormatter(text)}</span>,
		},
	];
	const showModal = () => {
		setModalOpen(true);
	};

	const handleOk = () => {
		refetch();
		setModalOpen(false);
		setSuccessModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleCloseSuccessModal = () => {
		setSuccessModalOpen(false);
	};

	useEffect(() => {
		refetch();
	}, [requestParams]);

	useEffect(() => {
		setRequestParams({ ...requestParams, pageNumber: page });
	}, [page]);
	return (
		<div className="mim-h-screen lg:p-12">
			{contextHolder}
			{/* <NavTitle title="Offer Issue Applications" /> */}
			<div className="w-full flex flex-col gap-10 items-center justify-between">
				<div className="p-6 flex flex-col gap-6 bg-white shadow-xl">
					<div className="flex justify-between items-center">
						<div className="flex flex-col gap-2">
							<p className="text-ap-grey-950 text-xl font-semibold">
								Offer Issue Applications
							</p>
							<p className="text-[#888] text-sm font-normal">
								Kindly see the details of your applications.
							</p>
						</div>
						{offerProfile?.data === "Completed" && (
							<AppButton
								onClick={showModal}
								value="New application"
								icon={<FaPlus size={20} />}
							/>
						)}
					</div>
					<Table
						loading={isFetching}
						className="border"
						columns={columns}
						dataSource={offeringsList?.data}
						pagination={{
							position: [top, bottom],
							current: page,
							onChange: setPage,
							total: offeringsList?.recordCount,
							pageSize: offeringsList?.pageSize,
							showSizeChanger: false,
						}}
					/>
				</div>
			</div>
			<OfferApplicationModal
				notification={messageApi}
				open={modalOpen}
				handleOk={handleOk}
				handleCancel={handleCloseModal}
			/>
			<SubmissionSuccessModal
				open={successModalOpen}
				handleCancel={handleCloseSuccessModal}
			/>
		</div>
	);
}
