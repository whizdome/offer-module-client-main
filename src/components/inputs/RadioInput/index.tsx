"use client";

import React from "react";

interface Props {
	selected: string;
	name: string;
	value: string;
	title: string;
	onChange: (text: string) => void;
}

const RadioInput: React.FC<Props> = ({
	selected,
	name,
	value,
	title,
	onChange,
}) => {
	return (
		<label className="flex items-center space-x-2">
			<input
				type="radio"
				name={name}
				checked={value === selected}
				className="h-5 w-5 text-ap-grey-600 bg-[#F9FAFB] border border-[#D1D5DB]"
				onChange={() => onChange(value)}
			/>
			<span className="text-ap-grey-700">{title}</span>
		</label>
	);
};

export default RadioInput;
