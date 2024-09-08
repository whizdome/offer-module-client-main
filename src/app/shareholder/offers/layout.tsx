"use client";

import AppFooter from "@/components/footer";
import HolderHeader from "@/components/ShareHolder/Offer/Layout/Header";
import HolderSiderBar from "@/components/ShareHolder/Offer/Layout/SiderBar";
import { useGuard } from "@/hooks/useGuard";
import { Layout } from "antd";
import { useState } from "react";

export default function OfferShareholderAuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useGuard();
	const [collapsed, setCollapsed] = useState(false);
	const showDrawer = () => {
		setCollapsed(!collapsed);
	};
	return (
		<main className="min-h-screen w-full">
			<Layout className="h-full justify-between">
				<Layout className="">
					<HolderSiderBar collapsed={collapsed} />
					<Layout className="layout-background lg:ml-[250px]">
						<HolderHeader showDrawer={showDrawer} />
						{children}
					</Layout>
				</Layout>
				<div className="sticky bottom-0 lg:ml-[250px]">
					<AppFooter />
				</div>
			</Layout>
		</main>
	);
}
