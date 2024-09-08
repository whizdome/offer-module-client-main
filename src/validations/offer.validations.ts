import * as Yup from "yup";

export const BasicDetailsIndividualFormSchema = () => {
	return Yup.object().shape({
		title: Yup.string().required("Required"),
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		dateOfBirth: Yup.string().required("Required"),	
		country: Yup.string().required("Required"),
		stateOfOrigin: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
	});
};

export const BasicDetailsCompanyFormSchema = () => {
	return Yup.object().shape({
		title: Yup.string().required("Required"),
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		dateOfBirth: Yup.string().required("Required"),	
		country: Yup.string().required("Required"),
		stateOfOrigin: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
    companyName: Yup.string().required("Required"),
    companyRegisteredAddress: Yup.string().required("Required"),
    companyRegistrationNumber: Yup.string().required("Required")
	});
};

export const NextOfKinFormSchema = () => {
	return Yup.object().shape({
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
    email: Yup.string()
			.email("A valid email address is required")
			.required("Required"),
		phoneNumber: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		relationship: Yup.string().required("Required"),	
		saveForLater: Yup.boolean().required("Required"),
	});
};

export const BankInformationFormSchema = () => {
	return Yup.object().shape({
		bankId: Yup.string().required("Required"),
		accountNumber: Yup.string().required("Required"),	
		saveForLater: Yup.boolean().required("Required"),
	});
};

export const BuyForMinorFormSchema = () => {
	return Yup.object().shape({
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
    email: Yup.string()
			.email("A valid email address is required"),
		middleName: Yup.string().required("Required"),
		relationship: Yup.string().required("Required")
	});
};