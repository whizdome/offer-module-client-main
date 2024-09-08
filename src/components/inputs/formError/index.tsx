import React, { FC } from "react";
import { hasCaps, hasDigit, hasSpecialCharacter } from "@/utils/constants";
import { FaCircleCheck } from "react-icons/fa6";

export interface FormErrorProps {
	errors: Record<string, any>;
	name: string;
	value: string;
}

const FormError: FC<FormErrorProps> = ({ errors, name, value }) => {
	return (
		<div>
			{name === "password" ? (
				<div className={"mt-2"}>
					{errors && errors[name] && (
						<>
							<div
								className={`flex text-xs text-ap-grey-400 items-center mb-2`}
							>
								<FaCircleCheck
									fill={value.length >= 8 ? "#24A890" : "#C7C7C7"}
								/>{" "}
								<span className={"ml-2"}>Minimum of 8 characters</span>
							</div>
							<div
								className={`flex text-xs text-ap-grey-400 items-center mb-2`}
							>
								<FaCircleCheck fill={hasCaps(value) ? "#24A890" : "#C7C7C7"} />
								<span className={"ml-2"}>At least 1 uppercase letter</span>
							</div>
							<div
								className={`flex text-xs text-ap-grey-400 items-center mb-2`}
							>
								<FaCircleCheck fill={hasDigit(value) ? "#24A890" : "#C7C7C7"} />
								<span className={"ml-2"}></span>At least 1 number
							</div>
							<div
								className={`flex text-xs text-ap-grey-400 items-center mb-2`}
							>
								<FaCircleCheck
									fill={hasSpecialCharacter(value) ? "#24A890" : "#C7C7C7"}
								/>
								<span className={"ml-2"}>
									Inclusion of at least one special character, e.g., ! @ # ?
								</span>
							</div>
						</>
					)}
				</div>
			) : (
				<p className={"text-ap-red-600 text-xs mt-1"}>
					{errors && errors[name]}
				</p>
			)}
		</div>
	);
};
export default FormError;
