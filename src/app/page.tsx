"use client";

import { useEffect, useState } from "react";
import AccountList from "@/components/accountList";
import ProfileSearch from "@/components/ProfileSearch";
import RightRequest from "@/components/RightRequest";
import RightReview from "@/components/RightReview";
import NavTitle from "@/components/NavTitle";
import { useRouter } from "next/navigation";
import ShareHolderPayment from "@/components/ShareHolderPayment";
import SubmissionSuccess from "@/components/SubmissionSuccess";
import { IHolder, ISearchHoldersPayload } from "@/models/ShareHolder";
import { RTkQueryResponse } from "@/models/RTKQuery";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PaginationProps } from "antd";
import { useSearchHoldersMutation } from "@/app/appApiSlice";

export default function RightIndividual() {
	const [searchHolders] = useSearchHoldersMutation();
	const dispatch = useAppDispatch();
	const { activeCompany } = useAppSelector((state) => state.app);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [isSearchError, setIsSearchError] = useState(false);
	const [activeStep, setActiveStep] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSearchKey, setSelectedSearchKey] = useState("");
	const [accountListPageNumber, setAccountListPageNumber] = useState(1);
	const [selectedAccount, setSelectedAccount] = useState<IHolder | null>(null);
	const [searchHoldersList, setSearchHoldersList] = useState<any>(null);
	const [rightsRequestData, setRightsRequestData] = useState(null);

	const onChange: PaginationProps["onChange"] = (page) => {
		setAccountListPageNumber(page);
	};
	const clearError = () => {
		setIsSearchError(false);
	};
	const handleSearch = async () => {
		if (searchTerm && activeCompany?.id) {
			setIsSearchError(false);
			setLoading(true);
			try {
				let request: ISearchHoldersPayload = {
					[selectedSearchKey]: searchTerm,
					pageNumber: accountListPageNumber,
					EquityOfferingId: activeCompany.id,
				};
				let res = (await searchHolders(request)) as RTkQueryResponse<IHolder[]>;
				if (res?.error) {
					setLoading(false);
					// Error
					setIsSearchError(true);
				} else {
					setLoading(false);
					if (res?.data) setSearchHoldersList(res?.data);
					// if (res?.data?.data) {
					// 	dispatch(updateSearchHoldersList(res.data.data));
					// } else {
					// 	dispatch(updateSearchHoldersList([]));
					// }
					if (res?.data?.data && res?.data?.data?.length > 0) {
						setActiveStep(2);
					} else {
						setIsSearchError(true);
					}
				}
			} catch (error) {
				setLoading(false);
				console.log("Caught Error: ", JSON.stringify(error)); // Debug
			}
		}
	};

	useEffect(() => {
		handleSearch();
	}, [accountListPageNumber]);
	return (
		<div className="flex flex-col items-center justify-between">
			<NavTitle
				title={`${activeCompany?.name} ${activeCompany?.type}`}
				handleGoBack={() => {
					if (activeStep === 1) {
						router.back();
					} else if (activeStep === 6) {
						setActiveStep(1);
					} else {
						let temp = activeStep - 1;
						setActiveStep(temp);
					}
				}}
			/>
			<div className="w-full flex flex-col items-center justify-between">
				{activeStep === 1 && (
					<ProfileSearch
						error={isSearchError}
						clearError={clearError}
						isLoading={loading}
						searchKey={searchTerm}
						setSearchKey={setSearchTerm}
						selectedType={selectedSearchKey}
						setSelectedType={setSelectedSearchKey}
						handleProceed={handleSearch}
					/>
				)}
				{activeStep === 2 && (
					<AccountList
						selectedItem={selectedAccount}
						setSelectedItem={setSelectedAccount}
						loading={loading}
						list={searchHoldersList}
						handleProceed={() => setActiveStep(3)}
						pageNumber={accountListPageNumber}
						setPageNumber={onChange}
					/>
				)}
				{activeStep === 3 && (
					<RightRequest
						info={selectedAccount!}
						setData={setRightsRequestData}
						handleProceed={() => setActiveStep(4)}
					/>
				)}
				{activeStep === 4 && (
					<RightReview
						info={selectedAccount}
						data={rightsRequestData}
						handleProceed={() => setActiveStep(5)}
						onSubmit={() => setActiveStep(6)}
					/>
				)}
				{activeStep === 5 && (
					<ShareHolderPayment
						info={selectedAccount}
						data={rightsRequestData}
						handleProceed={() => setActiveStep(6)}
					/>
				)}
				{activeStep === 6 && <SubmissionSuccess />}
			</div>
		</div>
	);
}
