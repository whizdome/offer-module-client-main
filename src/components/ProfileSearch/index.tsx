"use client";

import React, { useState } from "react";
import CloseCircle from "@/assets/svg/close-circle-red.svg";
import AppButton from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { FaArrowRight } from "react-icons/fa";
import InfoBox from "../InfoBox";
import RadioInput from "../inputs/RadioInput";
import TextInput from "../inputs/TextInput";

interface Props {
	searchKey: string;
	setSearchKey: any;
	selectedType: string;
	setSelectedType: any;
	error: boolean;
	clearError: () => void;
	isLoading: boolean;
	handleProceed: () => void;
}

const ProfileSearch: React.FC<Props> = ({
	searchKey,
	setSearchKey,
	selectedType,
	setSelectedType,
	error = false,
	clearError,
	isLoading,
	handleProceed,
}) => {
	const options = [
		{ title: "Clearing house number (CHN)", key: "chn" },
		{ title: "Full name", key: "name" },
		{ title: "Email address", key: "email" },
		{ title: "Phone number", key: "phoneNumber" },
		{ title: "Register Account Number", key: "registrationNumber" },
	];
	const errorMessage = {
		title: "Data doesn’t match any record",
		description: (
			<span>
				Please try searching using any of the details provided below, or contact
				our customer care team at{" "}
				<a className="text-red-600" href="mailto:cx@africaprudential.com">
					cx@africaprudential.com
				</a>{" "}
				for further assistance.
			</span>
		),
	};
	return (
		<div className="sm:w-[486px] w-full px-4 space-y-4">
			{error && <InfoBox icon={<CloseCircle />} list={[errorMessage]} />}
			<div className="bg-white border border-ap-grey-100 shadow-xl ">
				<div className="flex flex-col gap-6 p-6">
					<p className="text-ap-grey-950 text-xl font-semibold">
						Search for your profile
					</p>

					<div className="flex flex-col gap-4">
						<TextInput
							name="searchKey"
							id="search"
							onChange={(e) => {
								clearError();
								setSearchKey(e.target.value);
							}}
							label="Search for your profile"
							placeholder="Search for your profile as an existing investor"
						/>
					</div>

					<div>
						<p className="text-ap-grey-700 mb-3">
							Select your preferred search details
						</p>
						<div className="space-y-3">
							{options.map((option, idx) => (
								<RadioInput
									key={idx}
									value={option.key}
									title={option.title}
									selected={selectedType}
									name="type"
									onChange={(val) => setSelectedType(val)}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="border-t border-[#EDEEF1] py-5 flex px-6 justify-end">
					<AppButton
						size={ButtonSize.lg}
						variant={ButtonState.PRIMARY}
						value="Search"
						type="button"
						isLoading={isLoading}
						disabled={error || !selectedType || !searchKey || isLoading}
						onClick={handleProceed}
						iconTwo={<FaArrowRight />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileSearch;
