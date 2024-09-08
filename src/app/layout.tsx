import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/Provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Offer Module",
	description: "Offer Module - All things Rights and Offers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GoogleAnalytics />
			<body className={inter.className}>
				<StoreProvider>
					<main>{children}</main>
				</StoreProvider>
			</body>
		</html>
	);
}
