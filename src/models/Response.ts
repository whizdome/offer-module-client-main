export interface Response<T = any> {
	timeStamp: string;
	errorFlag: boolean;
	data?: T;
	message: string;
	statusCode: number;
	detail: string;
	instance: string;
	validationErrors: [
		{
			entity: string;
			field: string;
			type: string;
			value: string;
			rawValue: string;
			error: string;
			code: string;
			description: string;
		},
	];
	type?: string;
	title?: string;
	status?: number;
	errors?: { [key: string]: string[] };
}

export interface PaginatedPayload<T = any> {
	data: T[];
  pageNumber?: number;
  pageSize?: number;
  pageCount?: number;
  description: string;
  statusCode: number;
	recordCount?: number;
}
