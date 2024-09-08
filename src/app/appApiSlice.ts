import queryString from "query-string";
import { apiSlice } from "@/redux/apiSlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BankDetailPayload, BasicDetailsPayload, CreateMinorPayload, IHolder, InitializeHNIPaymentPayload, InitializeOfferPaymentPayload, InitializeOfferPaymentResponse, InitializePaymentPayload, InitializePaymentResponse, ISearchHoldersPayload, ISearchHoldersResponse, ITriggerOTPPayload, IValidateOTPPayload, NeedBVNHelpPayload, NextOfKinPayload, UpdateBVNPayload, ValidateAccountNumberPayload, ValidateBVNPayload, ValidateHNIPaymentPayload, ValidatePaymentPayload } from "@/models/ShareHolder";
import { PaginatedPayload, Response } from "@/models/Response";
import { IEquityOfferingPayload, IEquityOfferingResponse, IOfferApplicationListPayload, IOfferResponse } from "@/models/EquityIssue";

export interface MainAppState {
  searchHoldersList: IHolder[];
	offeringsList: IEquityOfferingResponse[];
	activeCompany: IEquityOfferingResponse | null;
}

const initialState: MainAppState = {
  searchHoldersList: [],
	offeringsList: [],
	activeCompany: null, 
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
		updateOfferingsList: (state, action: PayloadAction<IEquityOfferingResponse[]>) => {
			return { ...state, offeringsList: action.payload };
		},
		updateSetCompany: (state, action: PayloadAction<IEquityOfferingResponse>) => {
			return { ...state, activeCompany: action.payload };
		},
    updateSearchHoldersList: (state, action: PayloadAction<IHolder[]>) => {
      return { ...state, searchHoldersList: action.payload };
    },
  },
});

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		getOfferings: builder.query<
			Response<IEquityOfferingResponse[]>,
			IEquityOfferingPayload
		>({
			query: (query) => ({
				url: `EquityOffering/GetEquityOfferings?${queryString.stringify({...query, IsActive: true})}`,
				method: "GET",
			}),
		}),

		// Rights Endpoints
    searchHolders: builder.mutation<Response<ISearchHoldersResponse>, ISearchHoldersPayload>({
			query: (query) => ({
				url: `RightHolder/FilterRights?${queryString.stringify(query)}`,
				method: "GET",
			}),
		}),
    triggerOTP: builder.mutation<Response<any>, ITriggerOTPPayload>({
			query: (body) => ({
				url: `Subscription/CreateHolder`,
				method: "POST",
        body
			}),
		}),
    validateOTP: builder.mutation<Response<any>, IValidateOTPPayload>({
			query: (body) => ({
				url: `Subscription/ValidateHolder`,
				method: "PATCH",
        body
			}),
		}),
    initializePayment: builder.mutation<Response<InitializePaymentResponse>, InitializePaymentPayload>({
			query: (body) => ({
				url: `Payment/InitializePayment`,
				method: "POST",
        body
			}),
		}),
    initializeHNIPayment: builder.mutation<Response<InitializePaymentResponse>, InitializeHNIPaymentPayload>({
			query: (body) => ({
				url: `Payment/InitializeHNIPayment`,
				method: "POST",
        body
			}),
		}),
    validatePayment: builder.mutation<Response<any>, ValidatePaymentPayload>({
			query: (body) => ({
				url: `Payment/ValidatePayment`,
				method: "POST",
        body
			}),
		}),
    validateHNIPayment: builder.mutation<Response<any>, ValidateHNIPaymentPayload>({
			query: (body) => ({
				url: `Payment/ValidateHNIPayment`,
				method: "POST",
        body
			}),
		}),

		// Offers Endpoints
		profileGetOfferings: builder.query<
			Response<IEquityOfferingResponse[]>,
			IEquityOfferingPayload
		>({
			query: (query) => ({
				url: `OfferProfile/GetEquityOfferings?${queryString.stringify({...query, IsActive: true})}`,
				method: "GET",
			}),
		}),

		getOfferProfileStage: builder.query<
			Response<any>,
			void
		>({
			query: () => ({
				url: `OfferProfile/OfferProfileStage`,
				method: "GET",
			}),
		}),
		
		updateBVN: builder.mutation<Response<any>, UpdateBVNPayload>({
			query: (body) => ({
				url: `OfferProfile/UpdateBVN`,
				method: "POST",
        body
			}),
		}),

		validateBVN: builder.mutation<Response<any>, ValidateBVNPayload>({
			query: (body) => ({
				url: `OfferProfile/ValidateBVN`,
				method: "PATCH",
        body
			}),
		}),

		resendBvnOTP: builder.mutation<Response<any>, void>({
			query: () => ({
				url: "OfferProfile/ResendBVNValidationOTP",
				method: "GET",
			}),
		}),

		createBasicDetail: builder.mutation<Response<any>, BasicDetailsPayload>({
			query: (body) => ({
				url: `BasicDetail/CreateBasicDetail`,
				method: "POST",
        body
			}),
		}),

		CreateNextOfKin: builder.mutation<Response<any>, NextOfKinPayload>({
			query: (body) => ({
				url: `NextOfKin/CreateNextOfKin`,
				method: "POST",
        body
			}),
		}),

		getBankList: builder.query<
			Response<any>,
			void
		>({
			query: () => ({
				url: `Bank/GetBanks`,
				method: "GET",
			}),
		}),
		checkBankDetails: builder.mutation<Response<any>, ValidateAccountNumberPayload>({
			query: (query) => ({
				url: `BankDetail/ValidateAccountNumber?${queryString.stringify(query)}`,
				method: "GET"
			}),
		}),

		createBankDetails: builder.mutation<Response<any>, BankDetailPayload>({
			query: (body) => ({
				url: `BankDetail/CreateBankDetails`,
				method: "POST",
        body
			}),
		}),
    initializeOfferPayment: builder.mutation<Response<any>, InitializeOfferPaymentPayload>({
			query: (body) => ({
				url: `Payment/InitializePublicOfferPayment`,
				method: "POST",
        body
			}),
		}),
    validateOfferPayment: builder.mutation<Response<any>, ValidatePaymentPayload>({
			query: (body) => ({
				url: `Payment/ValidatePublicOfferPayment`,
				method: "POST",
        body
			}),
		}),
    CreateMinor: builder.mutation<Response<any>, CreateMinorPayload>({
			query: (body) => ({
				url: `MinorDetail/CreateMinor`,
				method: "POST",
        body
			}),
		}),
		getOfferApplicationList: builder.query<
		PaginatedPayload<IOfferResponse[]>,
			IOfferApplicationListPayload
		>({
			query: (query) => ({
				url: `OfferApplication/OfferApplicationList?${queryString.stringify(query)}`,
				method: "GET",
			}),
		}),
		bvnHelp: builder.mutation<Response<any>, NeedBVNHelpPayload>({
			query: (body) => ({
				url: `BVNManualVerification/InitiateManualBVNRequest`,
				method: "POST",
        body
			}),
		}),
		
  }),
  overrideExisting: true,
});

export const {
	useGetOfferingsQuery,
  useSearchHoldersMutation,
  useTriggerOTPMutation,
  useValidateOTPMutation,
  useInitializePaymentMutation,
  useInitializeHNIPaymentMutation,
  useValidatePaymentMutation,
	useValidateHNIPaymentMutation,
	useGetOfferProfileStageQuery,
	useProfileGetOfferingsQuery,
	useUpdateBVNMutation,
	useResendBvnOTPMutation,
	useValidateBVNMutation,
	useCreateBasicDetailMutation,
	useCreateNextOfKinMutation,
	useGetBankListQuery,
	useCheckBankDetailsMutation,
	useCreateBankDetailsMutation,
	useInitializeOfferPaymentMutation,
	useValidateOfferPaymentMutation,
	useCreateMinorMutation,
	useGetOfferApplicationListQuery,
	useBvnHelpMutation
} = extendedApi;

export const { updateSearchHoldersList, updateOfferingsList, updateSetCompany } = appSlice.actions;
