"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "../header";
import StanbicPebble from "@/assets/img/stanbic-hero-pebble.png";
import WemaPebble from "@/assets/img/wema-hero-pebble.png";
import UBAPebble from "@/assets/img/uba-hero-pebble.png";
import GtPebble from "@/assets/img/gt-hero-pebble.png";
import Blur1Pebble from "@/assets/img/blur1-hero-pebble.png";
import Blur2Pebble from "@/assets/img/blur2-hero-pebble.png";
import Image from "next/image";
import AppButton from "../button";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { ButtonState } from "../button/enum";
import clsx from "clsx";

import ubaLogo from "@/assets/img/banks/uba.png";
import { useRouter } from "next/navigation";
import OfferDetails from "../OfferDetails";
import moment from "moment";
import { useAppDispatch } from "@/redux/store";
import { currencyFormatter, formatToCurrency } from "@/utils";
import {
	updateOfferingsList,
	updateSetCompany,
	useGetOfferingsQuery,
} from "@/app/appApiSlice";
import { IEquityOfferingResponse } from "@/models/EquityIssue";
import { Skeleton } from "antd";
import WordRotate from "../WordRotate";
import AppImage from "../AppImage";
import FAQ from "./FAQ";

const LandingPage = ({ handleProceed }: { handleProceed: () => void }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const options = ["All", "Right", "Offer"];
	const FAQoptions = ["General", "Offer info", "Glossary"];
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [selectedFAQOption, setSelectedFAQOption] = useState(FAQoptions[0]);

	const [viewingDetails, setViewingDetails] = useState(false);

	const {
		data: offeringsList,
		refetch,
		isFetching,
	} = useGetOfferingsQuery(
		["Right", "Offer"].includes(selectedOption)
			? { EquityOfferingType: selectedOption === "Offer" ? 0 : 1 }
			: {}
	);

	const [selectedOfferingId, setSelectedOfferingId] = useState<string | null>(
		null
	);

	useEffect(() => {
		if (offeringsList?.data) dispatch(updateOfferingsList(offeringsList.data));
	}, [offeringsList]);

	const handleApply = (item: IEquityOfferingResponse) => {
		dispatch(updateSetCompany(item));
		handleProceed();
	};

	useEffect(() => {
		refetch();
	}, [selectedOption]);

	if (viewingDetails && offeringsList?.data && selectedOfferingId) {
		const offerDetails = offeringsList?.data.find(
			(item) => item.id === selectedOfferingId
		);
		return (
			<OfferDetails
				handleProceed={handleProceed}
				goBack={() => {
					setViewingDetails(false);
				}}
				offerDetails={offerDetails || ({} as IEquityOfferingResponse)}
			/>
		);
	}

	return (
		<div className="relative min-h-screen">
			<div className="hero-background relative min-h-screen">
				<AppImage
					alt="pebble"
					src={StanbicPebble}
					className="absolute -left-4 lg:left-32 top-20 lg:top-[40%]"
				/>
				<AppImage
					alt="pebble"
					src={WemaPebble}
					className="absolute -left-4 lg:left-[20%] bottom-[30%]"
				/>
				<AppImage
					alt="pebble"
					src={UBAPebble}
					className="absolute right-20 lg:right-[10%] bottom-24 lg:top-[25%]"
				/>
				<AppImage
					alt="pebble"
					src={GtPebble}
					className="absolute right-10 lg:right-[25%] bottom-[30%]"
				/>
				<AppImage
					alt="pebble"
					src={Blur1Pebble}
					className="absolute -left-4 lg:left-32 bottom-[10%]"
				/>
				<AppImage
					alt="pebble"
					src={Blur2Pebble}
					className="absolute right-36 lg:right-[20%] top-36 lg:top-[20%]"
				/>
				<AppHeader isDarkBg />.
				<p className="mx-auto mt-[30%] w-[70%] leading-[50px] lg:mt-[12%] px-4 text-4xl md:text-5xl lg:text-[68px] text-white font-semibold lg:w-[790px] text-center lg:leading-[75px]">
					Put your money where{" "}
					<span className="text-ap-success">
						your{" "}
						{
							<WordRotate
								words={["Rights", "Mouth", "Offer"]}
								className="inline-block"
							/>
						}{" "}
						is
					</span>
				</p>
				<p className="text-ap-grey-300 text-center text-lg md:text-2xl mt-6 ">
					Seamless access to public offers and rights issues
				</p>
				<div className="flex gap-4 justify-center mt-10">
					<AppButton
						value={"Get Started"}
						iconTwo={<FaArrowDown />}
						onClick={() => router.push("#availableRights")}
						className="w-56 !text-base z-10"
					/>
				</div>
			</div>

			<div
				className="lg:py-28 py-12 max-w-screen-xl mx-auto"
				id="availableRights"
			>
				<p className="lg:text-4xl text-2xl font-semibold text-center text-ap-grey-950">
					Available Rights and Offers
				</p>
				<div className="flex items-center mx-auto justify-center mt-10">
					{options.map((item, index) => {
						return (
							<div
								key={index}
								className={clsx(
									"py-3 px-4 w-[70px] text-ap-grey-950 text-center font-medium text-[16px] cursor-pointer",
									item === selectedOption && "bg-ap-success text-white"
								)}
								onClick={() => setSelectedOption(item)}
							>
								{item}
							</div>
						);
					})}
				</div>
				{isFetching ? (
					<Skeleton className="mt-12" />
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mx-4  mt-12">
						{offeringsList?.data?.map((info, index) => {
							return (
								<div
									key={index}
									className="flex flex-col justify-center shadow-xl rounded-lg   bg-white"
								>
									<div className="p-6">
										<div className="flex justify-between items-center">
											<AppImage
												src={info.logo || ubaLogo}
												alt={`${info.symbol} Logo`}
												width={60}
												height={60}
											/>

											<AppButton
												value={info?.type}
												variant={ButtonState.OUTLINE}
												className="rounded-full"
											/>
										</div>

										<p className="font-semibold text-[16px] text-ap-grey-950 mt-2">
											{info.name}
										</p>

										<div className="flex mt-4">
											<div className="w-1/2">
												<p className="text-ap-grey-400">Deal</p>
												<p className="text-ap-grey-950 font-semibold">
													{currencyFormatter(info.volume)}
												</p>
											</div>
											<div>
												<p className="text-ap-grey-400">Unit Price</p>
												<p className="text-ap-grey-950 font-semibold">
													{formatToCurrency(info.price, 2)} NGN
												</p>
											</div>
										</div>

										<div className="flex mt-4">
											<div className="w-1/2">
												<p className="text-ap-grey-400">Start Date</p>
												<p className="text-ap-grey-950 mt-2 w-fit rounded-full font-semibold">
													{moment(info.startDate).format("MMMM DD, YYYY")}
												</p>
											</div>
											<div>
												<p className="text-ap-grey-400">End Date</p>
												<p className="text-ap-grey-950 mt-2 w-fit rounded-full font-semibold">
													{moment(info.endDate).format("MMMM DD, YYYY")}
												</p>
											</div>
										</div>
									</div>
									<div className="border-t border-ap-grey-100 px-6 py-4 flex">
										<AppButton
											value={"View Details"}
											variant={ButtonState.OUTLINE}
											className="border-0 w-1/2"
											iconTwo={<FaArrowRight />}
											onClick={() => {
												setViewingDetails(true);
												setSelectedOfferingId(info.id);
											}}
										/>
										<AppButton
											value={"Apply Now"}
											className="w-1/2"
											onClick={() => handleApply(info)}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<div
				className="bg-[#011627] py-12 lg:py-28 px-10 lg:px-40 flex flex-col justify-center"
				id="faq"
			>
				<p className="lg:text-4xl text-2xl font-semibold text-center text-white">
					Frequently Asked Questions
				</p>
				<div className="flex items-center mx-auto justify-center mt-10">
					{FAQoptions.map((item, index) => {
						return (
							<div
								key={index}
								className={clsx(
									"py-3 px-5 text-white text-center font-medium text-sm cursor-pointer",
									item === selectedFAQOption && "bg-ap-success"
								)}
								onClick={() => setSelectedFAQOption(item)}
							>
								{item}
							</div>
						);
					})}
				</div>
				<div className="my-9 flex flex-col w-full items-center gap-3">
					<FAQ selected={selectedFAQOption} />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
