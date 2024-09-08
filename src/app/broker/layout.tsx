import { ButtonState } from "@/components/button/enum";
import AppFooter from "@/components/footer";
import AppHeader from "@/components/header";
import { Layout } from "antd";

export default function ShareholderLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
