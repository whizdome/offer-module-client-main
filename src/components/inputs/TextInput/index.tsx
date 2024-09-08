"use client";

import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";
import FormError from "../formError";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name?: string;
	formik?: any;
	type?: InputHTMLAttributes<HTMLInputElement>["type"];
	placeholder?: string;
	value?: string;
	className?: string;
	required?: boolean;
	icon?: any;
	onFocus?: InputHTMLAttributes<HTMLInputElement>["onFocus"];
	onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
	[key: string]: any;
}

const TextInput = ({
	label,
	name,
	formik,
	type = "text",
	value,
	icon,
	placeholder,
	onFocus,
	onChange,
	className,
	required = false,

	...props
}: TextInputProps) => {
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
				<input
					type={type}
					id={name}
					name={name}
					placeholder={placeholder}
					value={value}
					className="p-4 focus:outline-none w-full"
					required={required}
					onFocus={onFocus}
					onChange={onChange}
					{...props}
				/>
				{icon && <span className="cursor-pointer mr-2">{icon}</span>}
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

export default TextInput;
