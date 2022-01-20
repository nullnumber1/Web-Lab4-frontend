import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPoint} from "../models/IPoint";

const baseUrl = "https://lab4web.herokuapp.com/";

export const pointAPI = createApi({
    reducerPath: "pointAPI",
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Authorization", `Bearer_ ${localStorage.getItem("authToken")}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        fetchAllPoints: build.query<IPoint[], string>({
            query: () => ({
                url: "/api/v1/model/points"
            }),
            providesTags: result => ['Post']
        }),
        fetchNewRadiusPoints: build.query<IPoint[], string>({
            query: (r) => ({
                url: `/api/v1/model/points/graph?r=${Number(r)}`
            }),
            providesTags: result => ['Post']
        }),
        submitNewPoint: build.mutation<IPoint, IPoint>({
            query: (post) => ({
                url: "/api/v1/model/points",
                method: "POST",
                body: post
            }),
            invalidatesTags: ['Post']
        })
    })
})