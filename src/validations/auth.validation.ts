import { passwordRegExp } from "@/utils/constants";
import * as Yup from "yup";

export const OfferIndividualSignupSchema = () => {
	return Yup.object().shape({
		type: Yup.string().required("Required"),
		phoneNumber: Yup.string().required("Required"),
		email: Yup.string()
			.email("A valid email address is required")
			.required("Required"),	
		password: Yup.string()
			.required("Please enter your password")
			.matches(
				passwordRegExp,
				"Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
			),
		confirmPassword: Yup.string()
			.required("")
			.oneOf([Yup.ref("password"), ""], "Passwords must match"),
	});
};

export const BrokerSignupSchema = () => {
	return Yup.object().shape({
		brokerageFirm: Yup.string().required("Required"),
		fullName: Yup.string().required("Required"),
		role: Yup.string().required("Required"),
		address: Yup.string().required("Required"),
		phoneNumber: Yup.string().required("Required"),
		email: Yup.string()
			.email("A valid email address is required")
			.required("Required"),	
	});
};

export const CompleteBrokerSignupSchema = Yup.object().shape({
	password: Yup.string()
		.required("Please enter your password")
		.matches(
			passwordRegExp,
			"Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
		),
	confirmPassword: Yup.string()
		.required("")
		.oneOf([Yup.ref("password"), ""], "Passwords must match"),
});


export const loginSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter a valid email address"),
		// password: Yup.string()
		// 	.required("Please Enter your password")
		// 	.matches(
		// 		passwordRegExp,
		// 		"Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 special  Character"
		// 	),
	});
};

export const forgotPasswordSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Email is required"),
	});
};

export const resetPasswordSchema = () => {
	return Yup.object().shape({
		password: Yup.string()
			.required("Password is required")
			.matches(
				passwordRegExp,
				"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref("password"), ""],
			"Passwords must match"
		),
	});
};