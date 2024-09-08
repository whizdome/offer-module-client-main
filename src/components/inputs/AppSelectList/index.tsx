"use client";

import React, { ChangeEventHandler } from "react";
import { ChevronDown } from "@/assets";
import clsx from "clsx";
import FormError from "../formError";

interface AppSelectProps {
	label?: string;
	name?: string;
	value?: string;
	formik?: any;
	defaultValue?: string;
	options: { label: string; value: string }[];
	required?: boolean;
	className?: string;
	onChange: ChangeEventHandler<HTMLSelectElement>;
	[key: string]: any;
}

const AppSelectList = ({
	label,
	name,
	value,
	formik,
	defaultValue,
	options,
	required = false,
	className,
	onChange,
	...props
}: AppSelectProps) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="search" className="text-ap-grey-950">
				{label}
				{required && <span className="text-ap-success">*</span>}
			</label>

			<div className="relative inline-block w-full text-gray-300">
				<select
					{...props}
					name={name}
					required={required}
					value={value || ""}
					className={clsx(
						"p-4 border block appearance-none hover:border-gray-500 focus:shadow-outline  w-full focus:ring-0 focus:outline-none",
						value || defaultValue
							? "border-ap-grey-800 text-ap-grey-700"
							: "border-gray-300 text-ap-grey-300",
						className
					)}
					onChange={onChange}
				>
					<option value="" disabled>
						Select...
					</option>
					{options.map((option, index: number) => (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-300">
					<ChevronDown />
				</div>
			</div>
			{name && formik?.errors[name] && (
				<FormError
					errors={formik && formik?.errors}
					name={name}
					value={formik && formik.values[name]}
				/>
			)}
		</div>
	);
};

export default AppSelectList;
