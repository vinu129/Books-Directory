/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../shared/utility/services/axiosBaseQuery.service";
import { API_BASE_URL } from "../../../../environment/environment";
import { IBooks, IBooksQueryParams } from "../models/books.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const booksApi: any = createApi({
  reducerPath: "booksApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["BooksDirectory"],
  endpoints: (builder) => ({
    // GET Services
    getBooks: builder.query<IBooks[], IBooksQueryParams>({
      query: ({
        pageNumber,
        limit,
        search,
        status,
        authors,
        categories,
        isFavorite,
      }) => {
        // Constructing query parameters for searcg and pagination
        let query = `?page=${pageNumber}&limit=${limit}&search=${search}`;

        // Applying filters
        if (authors || categories || status) {
          query += `&status=${status}&authors=${authors}&categories=${categories}`;
        }
        // Filtering by favorite books
        if (isFavorite) query += "&isFavorite=true";

        return {
          url: query,
          method: "GET",
        };
      },
      providesTags: ["BooksDirectory"],
    }),

    // GET book by Id
    getBookById: builder.query<IBooks, string>({
      query: (bookId: string) => ({
        url: `/${bookId}`,
        method: "GET",
      }),
      providesTags: ["BooksDirectory"],
      transformResponse: (res: any) => {
        return res.data.book;
      },
    }),

    // GET filter data
    getFilterDropdownData: builder.query<any, void>({
      query: () => ({
        url: `/filter`,
        method: "GET",
      }),
      providesTags: ["BooksDirectory"],
      transformResponse: (res: any) => {
        return res.data[0];
      },
    }),

    // UPDATE Data
    updateBook: builder.mutation<IBooks, IBooks>({
      query: ({ _id, ...data }) => ({
        url: `/${_id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["BooksDirectory"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetFilterDropdownDataQuery,
  useUpdateBookMutation,
} = booksApi;
