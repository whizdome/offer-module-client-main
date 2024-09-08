export interface IHolder {
  id?: string
  amount?: string;
  description?: string
  dateCreated?: string
  dateUpdated?: string
  chnNumber?: string
  totalHoldings?: number
  offerType?: string
  offerId?: string
  qualificationDate?: string
  tenantId?: string
  rightDue?: number
  qualifiedUnits?: number
  registrarAccount?: string
  emailAddress?: string
  phoneNumber?: string
  firstName?: string
  lastName?: string
  middleName?: string
  fullName?: string
}

export interface ISearchHoldersPayload {
  chn?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  RegistrationNumber?: string;
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
  EquityOfferingId: string;
}

export interface ISearchHoldersResponse {
  data: IHolder[];
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  description?: string;
  statusCode?: number;
  recordCount?: number;
}

export interface ITriggerOTPPayload {
  email: string;
  phoneNumber: string;
  rightHolderId: string;
}

export interface IValidateOTPPayload {
  otp: string;
  rightHolderId: string;
}

export interface InitializePaymentPayload {
  rightType: number,
  rightHolderId: string,
  brokerName: string,
  taxId: string,
  requestedUnit: number,
  renouncedUnit: number,
  additionalUnit: number
}

export interface InitializePaymentResponse {
  data: {
    id: string,
    isActive: boolean,
    description: string,
    dateCreated: string,
    dateUpdated: string,
    reference: string,
    email: string,
    rightHolderId: string,
    amount: number
  };
  description: string;
  statusCode: number;
  recordCount: number;
}

export interface InitializeHNIPaymentPayload {
  rightType: number,
  rightHolderId: string,
  brokerName: string,
  taxId: string,
  requestedUnit: number,
  renouncedUnit: number,
  additionalUnit: number,
  proofOfPaymentImage: string,
  proofOfPaymentName: string
}

export interface ValidatePaymentPayload {
  referenceId: string,
}

export interface ValidateHNIPaymentPayload {
  referenceId: string,
  proofOfPaymentImage: string,
  proofOfPaymentName: string
}

// For Offers
export interface UpdateBVNPayload {
  bvn: string;
}

export interface NeedBVNHelpPayload {
  bvn: string;
  issueType: string;
  description: string;
}

export interface ValidateBVNPayload {
  otp: string;
}

export interface IBasicDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  country: string;
  stateOfOrigin: string;
  city: string;
  companyName?: string;
  companyRegisteredAddress?: string;
  companyRegistrationNumber?: string;
}

export interface BasicDetailsPayload {
  basicDetailCommand: IBasicDetails[],
  saveForLater: boolean;
}

export interface NextOfKinPayload {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
  relationship: string,
  saveForLater: boolean
}

export interface BankDetailPayload {
  bankId: string,
  accountNumber: string,
  saveForLater: boolean
}

export interface ValidateAccountNumberPayload {
  bankCode: string,
  accountNumber: string,
}

export interface InitializeOfferPaymentPayload {
  forMinor?: boolean,
  chn?: string,
  equityOfferingId: string,
  brokerageFirm: string,
  shareUnit: number
}

export interface InitializeOfferPaymentResponse {
  id: string,
  isActive: boolean,
  description: string,
  dateCreated: string,
  dateUpdated: string,
  reference: string,
  email: string,
  rightHolderId: string,
  amount: number,
  offerAmount: number
  transactionFee: number
  invearnId: number
}

export interface CreateMinorPayload {
  firstName: string,
  middleName: string,
  lastName: string,
  relationship: string,
  phoneNumber: string,
  email: string,
}