import React, { FC, useEffect, useState } from "react";
import AppSelect from "../inputs/AppSelect";
import TextInput from "../inputs/TextInput";
import { Modal } from "antd";
import { ButtonSize } from "../button/enum";
import AppButton from "../button";
import { statesInNigeria } from "@/utils/constants";

interface IFormState {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	address: string;
	country: string;
	stateOfOrigin: string;
	city: string;
}

interface IProps {
	loading: boolean;
	open: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	formState: IFormState;
	setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

const AddPartnerFormModal: FC<IProps> = ({
	loading,
	open,
	handleOk,
	handleCancel,
	formState,
	setFormState,
}) => {
	return (
		<Modal
			open={open}
			width={474}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<div key={1} className="flex justify-end mx-6">
					<AppButton
						size={ButtonSize.lg}
						value="Continue"
						type="button"
						isLoading={loading}
						onClick={handleOk}
						// disabled={isInValid || otpValue.length < 6 || !checked || loading}
					/>
				</div>,
			]}
		>
			<div className="px-6">
				<p className="text-ap-grey-950 text-lg font-semibold mt-6">
					Add partner
				</p>
				<p className="text-ap-grey-700 mt-1 mb-6">
					Kindly fill in the information below.
				</p>
				<DetailsForm formState={formState} setFormState={setFormState} />
			</div>
		</Modal>
	);
};

export default AddPartnerFormModal;

const DetailsForm = ({
	formState,
	setFormState,
}: {
	formState: IFormState;
	setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}) => {
	const titleOptions = ["Mr", "Mrs", "Miss", "Dr"];
	const countryOptions = ["Nigeria", "Others"];
	const [disableStates, setDisableStates] = useState(false);

	useEffect(() => {
		if (formState.country === "Others") {
			setDisableStates(true);
			setFormState({ ...formState, stateOfOrigin: "Others" });
		} else {
			setDisableStates(false);
			setFormState({ ...formState, stateOfOrigin: "" });
		}
	}, [formState.country]);
	return (
		<div className="flex flex-col gap-4 mb-4">
			<AppSelect options={titleOptions} onChange={(e) => {}} label="Title" />
			<TextInput
				label="First name"
				placeholder="Enter first name"
				value={formState.firstName}
				onChange={(e) => {
					setFormState({ ...formState, firstName: e.target.value });
				}}
			/>
			<TextInput
				label="Last name"
				placeholder="Enter Last name"
				value={formState.lastName}
				onChange={(e) => {
					setFormState({ ...formState, lastName: e.target.value });
				}}
			/>
			<TextInput
				label="Date of birth"
				placeholder="Enter Date of birth"
				type="date"
				value={formState.dateOfBirth}
				onChange={(e) => {
					setFormState({ ...formState, dateOfBirth: e.target.value });
				}}
			/>
			<TextInput
				label="Address"
				placeholder="Enter Address"
				value={formState.address}
				onChange={(e) => {
					setFormState({ ...formState, address: e.target.value });
				}}
			/>
			<AppSelect
				options={countryOptions}
				value={formState.country}
				onChange={(e) => {
					setFormState({ ...formState, country: e.target.value });
				}}
				label="Country"
			/>
			<AppSelect
				options={statesInNigeria}
				value={formState.stateOfOrigin}
				onChange={(e) => {
					setFormState({ ...formState, stateOfOrigin: e.target.value });
				}}
				disabled={disableStates}
				label="State of Residence"
			/>
			<TextInput
				label="City/Town"
				placeholder="Enter City/Town"
				value={formState.city}
				onChange={(e) => {
					setFormState({ ...formState, city: e.target.value });
				}}
			/>
		</div>
	);
};
