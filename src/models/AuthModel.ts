export interface CustomerRegisterRequest {
	shareholderRegistrationType: number;
	email: string;
	phoneNumber: string;
	password: string;
}

export interface CustomerRegisterPayload {}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface TokenValidationRequest {
	token: string;
}

export interface LoginResponsePayload {
	token: string;
	refreshToken: string;
	username: string;
	fullName: string;
	expiryTime: string;
	roles: string[]
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResendOTPRequest {
	email: string;
}

export interface ResetPasswordRequest {
	token: string;
	email: string;
	password: string;
}

export interface ValidateCustomerOTPRequest {
	email: string;
	otp: string;
}
