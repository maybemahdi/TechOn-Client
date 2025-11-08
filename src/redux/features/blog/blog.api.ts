import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
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
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/details/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    // createBlog: builder.mutation({
    //   query: (data) => ({
    //     url: "/blog/create",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["blog"],
    // }),
    // deleteBlog: builder.mutation({
    //   query: (id) => ({
    //     url: `/blog/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["blog"],
    // }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  // useCreateBlogMutation,
  // useDeleteBlogMutation,
} = blogApi;
