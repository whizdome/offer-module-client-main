"use client";

import clsx from "clsx";
import React from "react";
import FormError from "../formError";
import { PatternFormat } from "react-number-format";

interface PhoneInputProps {
	label?: string;
	name?: string;
	formik?: any;
	placeholder?: string;
	value?: string;
	className?: string;
	required?: boolean;
	info?: string;
	onChange: (val: string) => void;
}

const PhoneInput = ({
	label,
	name,
	formik,
	value,
	placeholder,
	info,
	onChange,
	className,
	required = false,
}: PhoneInputProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="text-ap-grey-950 mb-2">
				{label}
				{required && <span className="text-ap-red-600">*</span>}
			</label>
			<PatternFormat
				id={name}
				name={name}
				format="+234 ### ### ####"
				value={value}
				placeholder={placeholder}
				valueIsNumericString={true}
				className={clsx(
					"p-4 border hover:border-gray-500 focus:shadow-outline focus:ring-0 focus:outline-none text-ap-grey-700",
					value
						? "border-ap-grey-800 text-ap-grey-700"
						: "border-gray-300 text-ap-grey-300",
					className
				)}
				onValueChange={(values, sourceInfo) => {
					onChange(values.value);
				}}
			/>
			{name && formik?.errors[name] && (
				<FormError
					errors={formik && formik?.errors}
					name={name}
					value={formik && formik.values[name]}
				/>
			)}
			{info && (
				<span className={"text-ap-grey-400 text-sm font-normal mt-2"}>
					{info}
				</span>
			)}
		</div>
	);
};

export default PhoneInput;
