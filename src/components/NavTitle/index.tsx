"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface OfferProps {
	title?: string;
	handleGoBack?: () => void;
}

const NavTitle: React.FC<OfferProps> = ({ title, handleGoBack }) => {
	return (
		<div className="w-full flex flex-col mb-6">
			{handleGoBack && (
				<div
					className="flex items-center gap-2 text-xs font-semibold text-ap-grey-600 py-3 px-4 cursor-pointer"
					onClick={handleGoBack}
				>
					<FaArrowLeft />
					<span>Back</span>
				</div>
			)}
			<div className="w-full text-center text-ap-grey-950 font-semibold text-2xl">
				{title}
			</div>
		</div>
	);
};

export default NavTitle;
