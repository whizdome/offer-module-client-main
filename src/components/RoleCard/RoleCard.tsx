"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RoleCard = ({
	icon,
	title,
	description,
	link,
	disabled,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	link?: string;
	disabled?: boolean;
}) => {
	const router = useRouter();
	return (
		<div className="p-6 md:w-[300px]   mx-auto bg-white border border-ap-grey-100 shadow-md flex flex-col items-start">
			<div className="mb-7 mt-4">{icon}</div>
			<div>
				<div className="text-xl font-medium mb-3 text-black">{title}</div>
				<p className="text-gray-500">{description}</p>
				{disabled ? (
					<button
						className="mt-12 text-ap-success font-semibold flex items-center"
						disabled
					>
						Coming Soon...
					</button>
				) : (
					<button
						className="mt-12 text-ap-success font-semibold flex items-center"
						onClick={() => link && router.push(link)}
					>
						Proceed <span className="ml-2">→</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default RoleCard;
