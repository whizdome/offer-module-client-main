"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactElement } from "react";
import { FaSpinner } from "react-icons/fa";
import { ButtonSize, ButtonState } from "./enum";

export interface IProps {
	value?: string | ReactElement;
	variant?: ButtonState;
	size?: ButtonSize;
	icon?: ReactElement;
	iconTwo?: ReactElement;
	isLoading?: boolean;
	[key: string]: any;
}

const AppButton: FC<IProps> = ({
	value = "Click Me",
	variant = ButtonState.PRIMARY,
	size = ButtonSize.lg,
	icon,
	iconTwo,
	className,
	disabled,
	isLoading = false,
	...props
}) => {
	return (
		<button
			className={clsx(
				className,
				variant,
				size,
				"disabled:cursor-not-allowed disabled:opacity-50"
			)}
			disabled={disabled}
			{...props}
		>
			{isLoading && (
				<div className="animate-spin">
					<FaSpinner />
				</div>
			)}
			{icon && <span>{icon}</span>}
			<span>{value}</span>
			{iconTwo && <span>{iconTwo}</span>}
		</button>
	);
};

export default AppButton;
