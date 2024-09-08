"use client";

import { ButtonState } from "@/components/button/enum";
import AppFooter from "@/components/footer";
import AppHeader from "@/components/header";
import HolderHeader from "@/components/ShareHolder/Offer/Layout/Header";
import HolderSiderBar from "@/components/ShareHolder/Offer/Layout/SiderBar";
import { Layout } from "antd";

export default function OfferShareholderAuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-full w-full">
			<Layout className="min-h-screen justify-between layout-background">
				<AppHeader buttonVariant={ButtonState.PRIMARY} />
				{children}
				<div className="sticky bottom-0">
					<AppFooter />
				</div>
			</Layout>
		</main>
	);
}
