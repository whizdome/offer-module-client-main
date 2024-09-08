import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Response } from "./Response";

type RTkQueryFetchErrorStatus =
	| "FETCH_ERROR"
	| "PARSING_ERROR"
	| "TIMEOUT_ERROR"
	| "CUSTOM_ERROR";
export interface RTkQueryFetchError<T = any> {
	status: RTkQueryFetchErrorStatus | number;
	data?: T;
	originalStatus?: number;
	error: string;
}
export interface RTkQueryResponse<T = any> {
	data?: Response<T>;
	error?: RTkQueryFetchError;
}
