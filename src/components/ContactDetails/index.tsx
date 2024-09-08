"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "../inputs/TextInput";
import AppButton from "../button";

const ContactDetailsCard = () => {
	return (
		<div className="lg:w-[470px] mx-4 space-y-4">
			<div className=" bg-white border border-ap-grey-100 shadow-xl">
				<div className="p-6">
					<p className="text-ap-grey-950 text-lg font-semibold mt-2">
						Kindly provide your contact details
					</p>
					<p className="text-ap-grey-700 mt-1 mb-6">
						An OTP would be sent to the contact details provided.{" "}
					</p>

					<TextInput
						label="Email address"
						placeholder="Email address"
						className="mb-5"
					/>
					<TextInput label="Phone number" placeholder="Phone number" />
				</div>
				<div className="border-t border-[#EDEEF1] py-5 flex px-6 ">
					<AppButton
						value={"Proceed"}
						className="ml-auto"
						iconTwo={<FaArrowRight />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactDetailsCard;
