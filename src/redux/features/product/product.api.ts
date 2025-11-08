import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/product/list",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/details/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/product/category/list",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getAllTags: builder.query({
      query: () => ({
        url: "/product/tags",
        method: "GET",
      }),
      providesTags: ["tag"],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: (payload) => ({
        url: `/review/create/${payload.productId}`,
        method: "POST",
        body: payload?.data,
      }),
    }),
    getBestSelling: builder.query({
      query: () => ({
        url: "/product/best-selling",
        method: "GET",
      }),
    })
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
  useCreateContactMutation,
  useCreateReviewMutation,
  useGetBestSellingQuery,
} = productApi;
