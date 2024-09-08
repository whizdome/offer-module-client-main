"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { ButtonSize, ButtonState } from "../button/enum";
import AppButton from "../button";
import { Logo, LogoWhite } from "@/assets";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const { Header } = Layout;

const AppHeader: React.FC<{
	isDarkBg?: boolean;
	buttonVariant?: ButtonState;
}> = ({ isDarkBg, buttonVariant = ButtonState.PRIMARY }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<Header
			className={`flex items-center justify-between sticky top-0 px-4 sm:px-20 z-10 border border-black border-opacity-10 transition-colors duration-300 bg-transparent ${
				isScrolled && "bg-opacity-70 backdrop-blur-lg "
			}`}
		>
			<Link href={"/"}>{isDarkBg ? <LogoWhite /> : <Logo />}</Link>
			{isDarkBg && (
				<div className="flex gap-4 text-white text-sm font-semibold">
					<Link
						className="py-3 px-4 cursor-pointer hover:text-ap-green"
						href="/#availableRights"
					>
						Offers
					</Link>
					<Link
						className="py-3 px-4 cursor-pointer hover:text-ap-green"
						href="/#faq"
					>
						FAQ
					</Link>
				</div>
			)}
			<AppButton
				size={ButtonSize.lg}
				variant={buttonVariant}
				className={clsx(
					buttonVariant === ButtonState.OUTLINE && "text-white border-white"
				)}
				value="Log in"
				type="button"
				onClick={() => router.push("/login")}
			/>
		</Header>
	);
};

export default AppHeader;
