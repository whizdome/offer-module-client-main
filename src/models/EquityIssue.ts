export interface IEquityOfferingResponse {
	id: string;
	isActive: boolean;
	description: string;
	dateCreated: string;
	dateUpdated: string;
	startDate: string;
	endDate: string;
	clientCompanyId: string;
	price: number;
	name: string;
	rightsHeader: string;
	pricingSupplementURL: string;
	prospectusURL: string;
	volume: number;
	symbol: string;
	minimumUnit: number;
	multiples: number;
	logo: string;
	banner?: string;
	type: string;
}

export interface IEquityOfferingPayload {
	EquityOfferingType?: number;
	searchText?: string;
	pageNumber?: number;
	pageSize?: number;
	isActive?: boolean;
}

export interface IOfferApplicationListPayload {
	searchText?: string;
	pageNumber?: number;
	pageSize?: number;
}

export interface IOfferResponse {
	id: string;
	isActive: boolean;
	description: string;
	dateCreated: string;
	dateUpdated: string;
	clientCompanyName: string;
	offerProfileId: string;
	chn: string;
	brokerageFirm: string;
	sharesUnit: number;
	totalAmount: number;
}

