import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;
    headers.set("accept", "application/json");
    if (access_token) {
      headers.set("authorization", `Bearer ${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.data?.message ===
    "Please check your email address to verify your account"
  ) {
    return result;
  }
  if (result?.error?.data?.err?.message === "jwt expired") {
    Swal.fire({
      icon: "error",
      title: "Session Expired",
      text: "Please login again to continue",
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Stay Logged Out",
    }).then((result) => {
      if (result.isConfirmed) {
        api.dispatch(logout());
        window.location.href = "/login";
      } else if (result.isDismissed) {
        api.dispatch(logout());
      }
    });
    return result;
  }

  if (result?.error?.status === 404) {
    toast.error((result?.error?.data as { message: string })?.message);
  }
  if (result?.error?.status === 403) {
    toast.error((result?.error?.data as { message: string })?.message);
  }

  if (result.error?.status === 401) {
    try {
      const refreshToken = (api.getState() as RootState).auth.refresh_token;

      if (!refreshToken) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again to continue",
        }).then((result) => {
          if (result.isConfirmed) {
            api.dispatch(logout());
            window.location.href = "/login";
          }
        });
        return result;
      }

      // Make a request to refresh the token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}refresh-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const data = await res.json();
      if (data?.success) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({ user, token: data.data.token, refresh_token: refreshToken })
        );

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again to continue",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Stay Logged Out",
        }).then((result) => {
          if (result.isConfirmed) {
            api.dispatch(logout());
            // signOut();
            window.location.href = "/login";
          } else if (result.isDismissed) {
            api.dispatch(logout());
            // signOut();
            window.location.href = "/login";
          }
        });
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "example", "product", "category", "order", "blog", "tag"],
  endpoints: () => ({}),
});
