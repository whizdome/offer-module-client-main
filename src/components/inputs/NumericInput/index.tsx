"use client";

import clsx from "clsx";
import React from "react";
import FormError from "../formError";
import { NumericFormat, PatternFormat } from "react-number-format";
import { error } from "console";

interface NumericInputProps {
	label?: string;
	name?: string;
	formik?: any;
	placeholder?: string;
	value?: number | string;
	className?: string;
	required?: boolean;
	info?: string;
	maxLimit?: number;
	prefix?: string;
	error?: string;
	onChange: (val: string) => void;
	thousandSeparator?: boolean;
	[key: string]: any;
}

const NumericInput = ({
	label,
	name,
	formik,
	value,
	placeholder,
	info,
	maxLimit,
	prefix,
	error,
	onChange,
	className,
	required = false,
	thousandSeparator = true,

	...props
}: NumericInputProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="text-ap-grey-950 mb-2">
				{label}
				{required && <span className="text-ap-red-600">*</span>}
			</label>
			<NumericFormat
				id={name}
				name={name}
				prefix={prefix}
				value={value}
				allowNegative={false}
				thousandSeparator={thousandSeparator ? "," : ""}
				isAllowed={
					maxLimit
						? (values) => {
								const { floatValue }: any = values;
								return floatValue < maxLimit;
							}
						: undefined
				}
				placeholder={placeholder}
				valueIsNumericString={true}
				className={clsx(
					"p-4 border hover:border-gray-500 focus:shadow-outline focus:ring-0 focus:outline-none text-ap-grey-700",
					value
						? "border-ap-grey-800 text-ap-grey-700"
						: "border-gray-300 text-ap-grey-300",
					className
				)}
				onValueChange={(values) => {
					onChange(values.value);
				}}
				{...props}
			/>
			{name && formik?.errors[name] && (
				<FormError
					errors={formik && formik?.errors}
					name={name}
					value={formik && formik.values[name]}
				/>
			)}
			{error && <p className={"text-ap-red-600 text-xs mt-1"}>{error}</p>}
			{info && (
				<span className={"text-ap-grey-400 text-sm font-normal mt-2"}>
					{info}
				</span>
			)}
		</div>
	);
};

export default NumericInput;
