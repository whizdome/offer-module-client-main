import React from "react";
import AppButton from "../button";
import { FaArrowLeft, FaDownload, FaRegCheckCircle } from "react-icons/fa";
import { ButtonState } from "../button/enum";
import AppHeader from "../header";
import Image from "next/image";
import { camelCaseToCapitalized } from "@/utils";
import moment from "moment";
import { useAppDispatch } from "@/redux/store";
import UBAlogo from "@/assets/img/banks/uba.png";
import { IEquityOfferingResponse } from "@/models/EquityIssue";
import { updateSetCompany } from "@/app/appApiSlice";
import AppImage from "../AppImage";
import Link from "next/link";

const OfferDetails = ({
	handleProceed,
	goBack,
	offerDetails,
}: {
	handleProceed: () => void;
	goBack: () => void;
	offerDetails: IEquityOfferingResponse;
}) => {
	const dispatch = useAppDispatch();
	const instructions = [
		`Click "Apply Now"`,
		"Complete your Bio-data information",
		"Input Clearing House information (this is optional)",
		"Input the amount of shares you will like to buy",
		"Click Make Payment to process transaction",
		"The shares will be allotted to your CSCS account once approved by the regulator.",
	];

	const underBanner = {
		startDate: offerDetails.startDate,
		endDate: offerDetails.endDate,
		unitPrice: `${offerDetails.price} NGN`,
	};
	const backgroundImageUrl = offerDetails?.banner
		? offerDetails.banner
		: "/images/banner.png";

	const handleApply = (item: IEquityOfferingResponse) => {
		dispatch(updateSetCompany(item));
		handleProceed();
	};
	return (
		<div className="min-h-screen layout-background">
			<AppHeader />
			<div className="max-w-screen-xl xl:px-0 sm:px-20 mx-auto px-4">
				<AppButton
					value="Back"
					icon={<FaArrowLeft />}
					variant={ButtonState.OUTLINE}
					className="border-0 my-6 px-0 !text-ap-grey-600"
					onClick={goBack}
				/>

				<div className="flex items-center gap-4">
					<AppImage
						src={offerDetails.logo || UBAlogo}
						alt={`${offerDetails.symbol} Logo`}
						className="w-12 md:w-20 "
						width={70}
						height={70}
					/>
					<p className="text-ap-grey-950 font-semibold text-lg md:text-2xl">
						{offerDetails.rightsHeader}
					</p>
				</div>
				<div
					className={`mt-10 w-full h-[200px] py-5 px-6 bg-cover bg-center bg-no-repeat`}
					style={{ backgroundImage: `url(${backgroundImageUrl})` }}
				>
					<p className="font-semibold text-xl md:text-[32px] text-ap-red-600">
						{offerDetails.name}{" "}
					</p>
					<p className="font-semibold text-xl md:text-[32px] text-ap-red-600">
						{offerDetails.type}
					</p>
					<AppButton
						value={"Apply Now"}
						className="bg-ap-red-600 mt-5"
						onClick={() => handleApply(offerDetails)}
					/>
				</div>

				<div className="bg-white mb-36 mt-6 w-full py-6">
					<div className="header flex justify-between items-center px-6 pb-6">
						<p className="text-ap-grey-500 font-medium text-lg">
							{offerDetails.symbol} {offerDetails.type} information
						</p>
						<div className="flex flex-col md:flex-row gap-4 items-end justify-end">
							{offerDetails?.prospectusURL && (
								<Link href={offerDetails.prospectusURL} target="_blank">
									<AppButton
										value={"Prospectus"}
										variant={ButtonState.OUTLINE}
										iconTwo={<FaDownload />}
									/>
								</Link>
							)}
							{offerDetails?.pricingSupplementURL && (
								<Link href={offerDetails.pricingSupplementURL} target="_blank">
									<AppButton
										value={"Pricing Sheet"}
										variant={ButtonState.OUTLINE}
										iconTwo={<FaDownload />}
									/>
								</Link>
							)}
						</div>
					</div>
					<div className="flex justify-evenly items-center mb-6">
						{Object.entries(underBanner).map(([key, value]) => {
							return (
								<div key={value}>
									<p className="text-ap-grey-500 text-[16px]">
										{camelCaseToCapitalized(key)}
									</p>
									<p className="text-ap-grey-950 font-semibold  text-[16px] md:text-xl">
										{key.includes("Date")
											? moment(value).format("MMMM DD, YYYY")
											: value || "-"}
									</p>
								</div>
							);
						})}
					</div>

					<div className="border border-ap-grey-50 m-6 p-6">
						<p className="text-ap-grey-950 font-medium mb-2 text-lg">
							About Offering
						</p>
						<p className="text-ap-grey-500 text-[16px]">
							{offerDetails.description || "-"}
						</p>

						<p className="text-ap-grey-950 font-medium mt-8 mb-2 text-lg">
							How it works
						</p>
						<div className="flex flex-col gap-2 mt-4">
							{instructions.map((item, idx) => (
								<div className="flex gap-2 items-center" key={idx}>
									<FaRegCheckCircle size={19} color="#43BA00" />
									<p className="text-ap-grey-700 flex-1">{item}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferDetails;
