"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ButtonSize, ButtonState } from "../button/enum";
import AppButton from "../button";

interface OfferProps {
	targetDate: Date;
	handleProceed: () => void;
}

interface TimeRemaining {
	total: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const OfferBanner: React.FC<OfferProps> = ({ targetDate, handleProceed }) => {
	const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
		calculateTimeRemaining(targetDate)
	);

	useEffect(() => {
		if (timeRemaining.total > 0) {
			const interval = setInterval(() => {
				setTimeRemaining(calculateTimeRemaining(targetDate));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [timeRemaining, targetDate]);

	if (timeRemaining.total <= 0) {
		return null;
	}
	return (
		<div className="flex flex-col items-center justify-center max-w-3xl">
			<div className="flex items-center space-x-2 mb-4 text-black">
				<div className="flex space-x-2">
					<TimeUnit value={timeRemaining.days} label="Days" />
					<p className="font-semibold text-xl md:text-4xl">:</p>
					<TimeUnit value={timeRemaining.hours} label="Hrs" />
					<p className="font-semibold text-xl md:text-4xl">:</p>
					<TimeUnit value={timeRemaining.minutes} label="Mins" />
					<p className="font-semibold text-xl md:text-4xl">:</p>
					<TimeUnit value={timeRemaining.seconds} label="Sec" />
				</div>
				<p className="font-normal text-tiny md:text-sm">Left</p>
			</div>
			<div className="text-ap-grey-500 border border-ap-grey-500 px-2 sm:px-4 py-1 sm:py-2 rounded-full mb-2">
				<span className="text-xs md:text-base font-medium">
					Thursday 26 August, 2024 - Wednesday 27 September 2024
				</span>
			</div>
			<h1 className="text-4xl md:text-7xl !leading-tight font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#E71615] to-[#5F0808]">
				United Bank of Africa Right Issue
			</h1>
			<h2 className="text-base md:text-2xl font-medium text-center text-ap-grey-800 mb-6">
				<span className="font-bold">20 Billion</span> Right issue at{" "}
				<span className="font-bold">N193.3</span> per share
			</h2>
			<AppButton
				size={ButtonSize.lg}
				variant={ButtonState.PRIMARY}
				value="Buy now"
				type="button"
				onClick={handleProceed}
				iconTwo={<FaArrowRight />}
			/>
		</div>
	);
};

interface TimeUnitProps {
	value: number;
	label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
	<div className="flex flex-col items-center">
		<p className="font-semibold text-xl md:text-4xl">
			{value.toString().padStart(2, "0")}
		</p>
		<p className="font-normal text-tiny md:text-sm">{label}</p>
	</div>
);

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
	const now = new Date();
	const total = Date.parse(targetDate.toString()) - Date.parse(now.toString());
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));

	return { total, days, hours, minutes, seconds };
};

export default OfferBanner;
