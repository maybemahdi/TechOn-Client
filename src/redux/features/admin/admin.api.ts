import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/order/overview",
          method: "GET",
          params: params,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/update/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["product"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/product/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    getAllOrders: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/order/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),
    changeOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/order/update/${data.id}?status=${data.status}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    getAllBlogForAdmin: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/blog/get/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllSubscribers: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/subscribe/list",
          method: "GET",
          params: params,
        };
      },
    }),
    getAllUser: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();
        queries?.forEach((item: any) => params.append(item.name, item.value));
        return {
          url: "/user/all",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
    changeUserStatus: builder.mutation({
      query: (data) => ({
        url: `/user/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
  useGetAllBlogForAdminQuery,
  useDeleteBlogMutation,
  useCreateBlogMutation,
  useGetAllSubscribersQuery,
  useGetAllUserQuery,
  useChangeUserStatusMutation,
} = adminApi;
