"use client";

import { ButtonState } from "@/components/button/enum";
import AppFooter from "@/components/footer";
import AppHeader from "@/components/header";
import { useAppSelector } from "@/redux/store";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RightShareholderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { activeCompany } = useAppSelector((state) => state.app);
	useEffect(() => {
		if (!activeCompany) router.replace("/");
	}, [activeCompany]);
	return (
		<main className="h-full w-full">
			<Layout className="min-h-screen justify-between layout-background">
				<AppHeader buttonVariant={ButtonState.PRIMARY} />
				{children}
				<AppFooter />
			</Layout>
		</main>
	);
}
