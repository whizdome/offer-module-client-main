"use client";

import React from "react";
import { Layout } from "antd";
import { Logo } from "@/assets";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
	return (
		<Footer className="flex flex-col sm:flex-row items-center sm:justify-between justify-center gap-4 border border-black border-opacity-10 bg-white px-4 sm:px-10">
			<p className="text-[#929399] font-normal text-sm">
				Copyright © 2024 Invearn. All Rights Reserved.
			</p>
			{/* <p className="text-[#7A7A7A] font-normal text-sm">
				Privacy Policy | Terms and Conditions
			</p> */}
		</Footer>
	);
};

export default AppFooter;
