"use client";

import React, { useState } from "react";
import { Dropdown, Layout, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import Avatar from "antd/es/avatar/avatar";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { Logo } from "@/assets";
import { deleteCookie, getCookie } from "cookies-next";
import { getInitials } from "@/utils";

const { Header } = Layout;

interface Props {
	showDrawer: () => void;
}

const HolderHeader: React.FC<Props> = ({ showDrawer }) => {
	const router = useRouter();
	const [userEmail, setUserEmail] = useState();

	const handleLogout = () => {
		deleteCookie("currentUser");
		router.push("/login");
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<p
					className="text-ap-grey-700 py-3 px-4 font-medium"
					onClick={handleLogout}
				>
					LOGOUT
				</p>
			),
		},
	];

	const currentUser = getCookie("currentUser")
		? JSON.parse(getCookie("currentUser") as string)
		: null;
	const currentUserEmail = currentUser?.username;
	const currentUserFullName = currentUser?.fullName;
	const currentUserRole = () => {
		if (currentUser?.roles?.includes("JointPartnership")) {
			return "Joint Partnership";
		}
		if (currentUser?.roles?.includes("Individual")) {
			return "Individual";
		}
		if (currentUser?.roles?.includes("Company")) {
			return "Company";
		}
		return "ShareHolder";
	};

	return (
		<Header
			className={`flex items-center justify-between sticky top-0 px-4 py-4 sm:px-10 z-10 border-b border-black border-opacity-10 bg-white`}
		>
			<div className="lg:hidden">
				<Link href={"/"}>
					<Logo />
				</Link>
			</div>
			<button
				onClick={showDrawer}
				className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900"
			>
				<svg
					id="toggleSidebarMobileHamburger"
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
				<svg
					id="toggleSidebarMobileClose"
					className="hidden w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			<Dropdown
				menu={{ items }}
				placement="bottom"
				className="hidden ml-auto lg:flex"
			>
				<div className="rounded-3xl flex p-2 items-center gap-2 bg-[#E3F3D4]">
					<Avatar
						size={28}
						style={{
							backgroundColor: "#43BA00",
							fontSize: "12px",
						}}
					>
						{getInitials(currentUserFullName)}
					</Avatar>
					<div className="flex flex-col mr-1">
						<p className="text-ap-grey-900 font-medium text-sm">
							{currentUserFullName || currentUserEmail}
						</p>
						<p className="text-ap-grey-600 text-xs">
							{currentUserFullName ? currentUserEmail : currentUserRole()}
						</p>
					</div>
					<FaChevronDown />
				</div>
			</Dropdown>
		</Header>
	);
};

export default HolderHeader;
