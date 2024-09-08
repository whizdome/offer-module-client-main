import React, { FC } from "react";
import AppSelect from "../inputs/AppSelect";
import TextInput from "../inputs/TextInput";
import { Modal } from "antd";
import { ButtonSize } from "../button/enum";
import AppButton from "../button";
import { useFormik } from "formik";
import PhoneInput from "../inputs/PhoneInput";
import { BuyForMinorFormSchema } from "@/validations/offer.validations";

interface IProps {
	open: boolean;
	handleCancel: () => void;
	formState: any;
	setFormState: React.Dispatch<React.SetStateAction<any>>;
}

const BuyForMinorFormModal: FC<IProps> = ({
	open,
	handleCancel,
	formState,
	setFormState,
}) => {
	const formik = useFormik({
		initialValues: {
			firstName: formState?.firstName,
			middleName: formState?.middleName,
			lastName: formState?.lastName,
			relationship: formState?.relationship,
			phoneNumber: formState?.phoneNumber,
			email: formState?.email,
		},
		validationSchema: BuyForMinorFormSchema,
		onSubmit: async (values) => {
			setFormState(values);
			handleCancel();
		},
	});
	return (
		<Modal
			open={open}
			width={474}
			onCancel={handleCancel}
			footer={[
				<div key={1} className="flex justify-end mx-6">
					<AppButton
						size={ButtonSize.lg}
						value="Continue"
						type="button"
						onClick={() => formik.handleSubmit()}
						disabled={!formik.isValid}
					/>
				</div>,
			]}
		>
			<div className="px-6">
				<p className="text-ap-grey-950 text-lg font-semibold mt-6">
					Buy for Minor
				</p>
				<p className="text-ap-grey-700 mt-1 mb-6">
					Kindly fill in the information below.
				</p>
				<div className="flex flex-col gap-4 mb-4">
					<TextInput
						label="Minor's first name"
						placeholder="Enter minor's first name"
						name="firstName"
						value={formik.values.firstName}
						onChange={formik.handleChange}
					/>
					<TextInput
						label="Minor's middle name"
						placeholder="Enter minor's middle name"
						name="middleName"
						value={formik.values.middleName}
						onChange={formik.handleChange}
					/>
					<TextInput
						label="Minor's last name"
						placeholder="Enter minor's last name"
						name="lastName"
						value={formik.values.lastName}
						onChange={formik.handleChange}
					/>
					<AppSelect
						label="Select relationship"
						placeholder="Select..."
						name="relationship"
						options={["Sibling", "Child", "Others"]}
						value={formik.values.relationship}
						onChange={formik.handleChange}
					/>
					<PhoneInput
						formik={formik}
						label="Phone Number (Optional)"
						placeholder="Enter phone number"
						value={formik.values.phoneNumber}
						onChange={(value) => {
							formik.setFieldValue("phoneNumber", value);
						}}
						info="e.g: +234 809 456 2343"
					/>
					<TextInput
						label="Email address (Optional)"
						type="email"
						name="email"
						placeholder="Enter email address"
						formik={formik}
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default BuyForMinorFormModal;
