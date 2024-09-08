"use client";

import React, { useEffect, useState } from "react";
import Button from "../button";
import { ButtonSize, ButtonState } from "../button/enum";
import { getCookie, setCookie } from "cookies-next";
import AppImage from "../AppImage";

const ConsentBanner: React.FC = () => {
	const [isClient, setIsClient] = useState(false);
	const [consent, setConsent] = useState<string | undefined>(undefined);

	useEffect(() => {
		setIsClient(true);
		setConsent(getCookie("consent"));
	}, []);

	const handleAccept = () => {
		setCookie("consent", "true");
		setConsent("true");
	};

	const handleDecline = () => {
		setCookie("consent", "false");
		setConsent("false");
	};

	if (!isClient || consent !== undefined) return null;

	return (
		<div className="consent-banner z-50 bg-white max-w-[375px] fixed bottom-5 sm:right-5 shadow-md flex flex-col gap-6 items-center justify-between p-4 lg:p-6">
			<AppImage
				className="relative"
				src={"/images/cookie.png"}
				width={96}
				height={96}
				alt={"Img"}
			/>
			<div className="flex flex-col gap-2 items-center">
				<h2 className="font-semibold text-base text-[#333]">
					Our website uses cookies
				</h2>
				<p className="font-normal text-xs text-ap-grey-400">
					{`Invearn uses cookies on our website to enhance your browsing
					experience and provide personalized content and services. By clicking
					"Accept", you consent to the use of all cookies.`}
				</p>
			</div>
			<div className="w-full flex gap-2">
				<Button
					value={"Accept"}
					size={ButtonSize.lg}
					variant={ButtonState.PRIMARY}
					type={"Button"}
					onClick={handleAccept}
					className="w-1/2"
				/>
				<Button
					value={"Decline"}
					size={ButtonSize.lg}
					variant={ButtonState.OUTLINE}
					type={"Button"}
					onClick={handleDecline}
					className="w-1/2"
				/>
			</div>
		</div>
	);
};

export default ConsentBanner;
