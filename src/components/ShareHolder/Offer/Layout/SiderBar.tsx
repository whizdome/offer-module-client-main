"use client";

import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Logo } from "@/assets";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { BsGridFill } from "react-icons/bs";
import { FaFileLines } from "react-icons/fa6";
import { deleteCookie } from "cookies-next";
import { FiLogOut } from "react-icons/fi";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

export interface Props {
	collapsed: boolean;
}

const HolderSiderBar: React.FC<Props> = ({ collapsed = false }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedKey, setSelectedKey] = useState<string>("");

	useEffect(() => {
		if (
			pathname === "/shareholder/offers" ||
			pathname === "/shareholder/offers/buy"
		) {
			setSelectedKey("application");
		} else if (pathname === "/shareholder/offers/list") {
			setSelectedKey("applicationList");
		}
	}, [pathname]);

	const handleLogout = () => {
		// Clear the authentication cookie
		deleteCookie("currentUser");

		// Redirect to the login page
		router.push("/login");
	};
	const items: MenuItem[] = [
		getItem(
			<Link href="/shareholder/offers">Get Started</Link>,
			"application",
			<BsGridFill />
		),
		// getItem(<Link href="#">My Rights</Link>, "rights", <FaFileLines />),
		getItem(
			<Link href="/shareholder/offers/list">My Offers</Link>,
			"applicationList",
			<FaFileLines />
		),
	];
	return (
		<Sider
			className={`!bg-white z-20 border-r border-black border-opacity-10 !fixed h-screen overflow-auto top-0`}
			width={250}
			collapsed={collapsed}
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={(broken) => {}}
			onCollapse={(collapsed, type) => {}}
		>
			<div className="p-6">
				<Link href={"/"}>
					<Logo />
				</Link>
			</div>
			<Menu selectedKeys={[selectedKey]} mode="inline" items={items} />
			<div className="block lg:hidden w-full bottom-0 absolute">
				<div className="flex items-center gap-2 m-1 p-6 text-red-500">
					<FiLogOut size={18} />
					<button className=" w-full text-left" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
		</Sider>
	);
};

export default HolderSiderBar;
