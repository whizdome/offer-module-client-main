import { ChangePasswordRequest, CustomerRegisterRequest, ForgotPasswordRequest, LoginRequest, LoginResponsePayload, ResendOTPRequest, ResetPasswordRequest, ValidateCustomerOTPRequest } from "@/models/AuthModel";
import { Response } from "@/models/Response";
import { apiSlice } from "@/redux/apiSlice";
import { createSlice } from "@reduxjs/toolkit";

export interface MainAppState {
}

const initialState: MainAppState = {
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
		
  },
});

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		register: builder.mutation<Response<any>, CustomerRegisterRequest>({
			query: (request) => ({
				url: "CustomerAuth/CreateCustomer",
				method: "POST",
				body: request,
			}),
		}),

		login: builder.mutation<Response<LoginResponsePayload>, LoginRequest>({
			query: (request) => ({
				url: "CustomerAuth/login",
				method: "POST",
				body: request,
			}),
		}),

		resendOTP: builder.mutation<Response<any>, ResendOTPRequest>({
			query: (request) => ({
				url: "CustomerAuth/resendOTP",
				method: "PATCH",
				body: request
			}),
		}),

		validateCustomerOTP: builder.mutation<Response<any>, ValidateCustomerOTPRequest>({
			query: (request) => ({
				url: "CustomerAuth/ValidateCustomerOTP",
				method: "PATCH",
				body: request
			}),
		}),

		changePassword: builder.mutation<Response<any>, ChangePasswordRequest>({
			query: (request) => ({
				url: "CustomerAuth/ChangePassword",
				method: "PATCH",
				body: request
			}),
		}),

		forgotPassword: builder.mutation<Response<any>, ForgotPasswordRequest>({
			query: (request) => ({
				url: "CustomerAuth/ForgotPassword",
				method: "POST",
				body: request
			}),
		}),

		resetPassword: builder.mutation<Response<any>, ResetPasswordRequest>({
			query: (request) => ({
				url: "CustomerAuth/ResetPassword",
				method: "PATCH",
				body: request
			}),
		}),
  }),
  overrideExisting: true,
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useResendOTPMutation,
	useValidateCustomerOTPMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation
} = extendedApi;

export const {  } = authSlice.actions;
