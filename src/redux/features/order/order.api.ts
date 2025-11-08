import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/order/me",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),
    createSingleOrder: builder.mutation({
      query: (data) => ({
        url: "/order/single",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    createCartOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useGetMyOrdersQuery, useCreateSingleOrderMutation, useCreateCartOrderMutation } = orderApi;
