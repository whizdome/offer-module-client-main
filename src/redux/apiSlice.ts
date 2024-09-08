import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

const getToken = async () => {
    const currentAuth = getCookie("currentUser");
  
    if (currentAuth) {
      // const session = currentAuth || "";
      return JSON.parse(currentAuth)?.token || "";
    }
  
    return '';
};

export const apiSlice = createApi({
	reducerPath: "apiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://offer-api-module.azurewebsites.net/v1/api/",
    prepareHeaders: async (headers) => {
        const accessToken = await getToken();
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }

        return headers;
    },
	}),
	endpoints: (builder) => ({}),
});

export const {} = apiSlice;
