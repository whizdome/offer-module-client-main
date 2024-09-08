"use client";

import { useEffect, useState } from "react";
import {
	updateSetCompany,
	useProfileGetOfferingsQuery,
} from "@/app/appApiSlice";
import AppButton from "@/components/button";
import { ButtonState } from "@/components/button/enum";
import { currencyFormatter, formatToCurrency } from "@/utils";
import { Skeleton } from "antd";
import clsx from "clsx";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IEquityOfferingResponse } from "@/models/EquityIssue";
import { useAppDispatch } from "@/redux/store";
import AppImage from "@/components/AppImage";

export default function OfferIndividual() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const options = ["All", "Right", "Offer"];
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const {
		data: offeringsList,
		refetch,
		isFetching,
	} = useProfileGetOfferingsQuery(
		["Right", "Offer"].includes(selectedOption)
			? { EquityOfferingType: selectedOption === "Offer" ? 0 : 1 }
			: {}
	);

	const handleApply = (item: IEquityOfferingResponse) => {
		dispatch(updateSetCompany(item));
		if (item?.type === "Public Offer") {
			router.push("/shareholder/offers/buy");
		} else {
			router.push("/shareholder/rights");
		}
	};

	useEffect(() => {
		refetch();
	}, [selectedOption]);
	return (
		<div className="mim-h-screen">
			<div className="py-10 max-w-screen-xl mx-9" id="availableRights">
				<p className="lg:text-4xl text-2xl font-semibold text-ap-grey-950">
					Get started
				</p>
				<div className="flex items-center mt-9">
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
					<Skeleton className="mt-6" />
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
						{offeringsList?.data?.map((info, index) => {
							return (
								<div
									key={index}
									className="flex flex-col justify-center shadow-xl rounded-lg   bg-white"
								>
									<div className="p-6">
										<div className="flex justify-between items-center">
											<AppImage
												src={info.logo}
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
											<div className="w-full flex flex-col items-end">
												<p className="text-ap-grey-400">Unit Price</p>
												<p className="text-ap-grey-950 font-semibold">
													{formatToCurrency(info.price, 2)} NGN
												</p>
											</div>
										</div>

										<div className="flex mt-4">
											<div className="w-1/2">
												<p className="text-ap-grey-400">Start Date</p>
												<p className="text-ap-grey-950 w-fit rounded-full font-semibold">
													{moment(info.startDate).format("MMMM DD, YYYY")}
												</p>
											</div>
											<div className="w-full flex flex-col items-end">
												<p className="text-ap-grey-400">End Date</p>
												<p className="text-ap-grey-950 w-fit rounded-full font-semibold">
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
											onClick={() => {
												const queryString = new URLSearchParams(
													Object.entries(info).reduce(
														(acc, [key, value]) => {
															acc[key] = String(value);
															return acc;
														},
														{} as Record<string, string>
													)
												).toString();

												if (info?.type === "Public Offer") {
													router.push(
														`/shareholder/offers/${info?.id}?${queryString}`
													);
												} else {
													router.push(
														`/shareholder/rights/${info?.id}?${queryString}`
													);
												}
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
		</div>
	);
}
