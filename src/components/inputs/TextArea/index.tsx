"use client";

import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";
import FormError from "../formError";
import TextArea from "antd/es/input/TextArea";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	name?: string;
	formik?: any;
	placeholder?: string;
	value?: string;
	className?: string;
	required?: boolean;
	onChange?: InputHTMLAttributes<HTMLTextAreaElement>["onChange"];
	[key: string]: any;
}

const AppTextArea = ({
	label,
	name,
	formik,
	value,
	placeholder,
	onFocus,
	onChange,
	className,
	required = false,
	...props
}: TextAreaProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={name} className="text-ap-grey-950 mb-2">
				{label}
				{required && <span className="text-ap-red-600">*</span>}
			</label>
			<div
				className={clsx(
					"text-ap-grey-700 border hover:border-gray-500 focus:shadow-outline focus:ring-0 flex items-center",
					value
						? "border-ap-grey-800 text-ap-grey-700"
						: "border-gray-300 text-ap-grey-300",
					className
				)}
			>
				<TextArea
					placeholder={placeholder}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					rows={4}
				/>
			</div>
			{name && formik?.errors[name] && (
				<FormError
					errors={formik && formik?.errors}
					name={name}
					value={formik && formik.values[name]}
				/>
			)}
			{props?.info && (
				<span className={"text-ap-grey-400 text-sm font-normal mt-2"}>
					{props.info}
				</span>
			)}
		</div>
	);
};

export default AppTextArea;
