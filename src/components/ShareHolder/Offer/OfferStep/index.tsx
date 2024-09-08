"use client";

import clsx from "clsx";
import React from "react";
import { FaCheck } from "react-icons/fa";

const OfferStep = ({ step = 1 }: { step: number }) => {
	const steps = [
		"BVN validation",
		"Basic detail",
		"Next of Kin",
		"Bank details",
		"Share details",
	];

	return (
		<div className="sm:flex hidden items-center gap-3">
			{steps.map((item, index) => {
				return (
					<div key={index} className="flex items-center gap-1">
						<span
							className={clsx(
								"border-2 border-ap-grey-400 rounded-full h-[22px] w-[22px] flex items-center justify-center",
								(step === index + 1 || step > index + 1) && "!border-[#43BA00]"
							)}
						>
							{step > index + 1 && <FaCheck size={12} color="#43BA00" />}
						</span>
						<span
							className={clsx(
								"text-[16px] text-gray-400",
								(step === index + 1 || step > index + 1) && "!text-[#43BA00]"
							)}
						>
							{item}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default OfferStep;
