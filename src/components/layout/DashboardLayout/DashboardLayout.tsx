/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import logo from "@/assets/images/logo.png";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutHandler } from "@/utils/handleLogout";
import { ConfigProvider } from "antd";
import {
  ChevronsUpDown,
  DollarSign,
  History,
  LogOut,
  Menu,
  Rss,
  ShoppingBag,
  TableProperties,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [customRole, setCustomRole] = useState<string>(
    pathname?.startsWith("/super-admin")
      ? "SUPER_ADMIN"
      : pathname?.startsWith("/admin")
      ? "ADMIN"
      : pathname?.startsWith("/sub-admin")
      ? "SUB_ADMIN"
      : pathname?.startsWith("/supervisor")
      ? "SUPERVISOR"
      : pathname?.startsWith("/employee")
      ? "EMPLOYEE"
      : ""
  );
  const role = user?.role || customRole;

  const roleRoutes: Record<string, string> = {
    SUPER_ADMIN: "super-admin",
    ADMIN: "admin",
    SUB_ADMIN: "sub-admin",
    SUPERVISOR: "supervisor",
    EMPLOYEE: "employee",
  };

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value);
    const route = roleRoutes[value];
    if (route) {
      router.push(`/${route}`);
    }
  };

  const menuItems = [
    {
      icon: TbLayoutDashboardFilled,
      text: "Overview",
      path: "/admin",
    },
    {
      icon: Users,
      text: "All Users",
      path: "/admin/users",
    },
    {
      icon: TableProperties,
      text: "All Products",
      path: "/admin/products",
    },
    // {
    //   icon: DollarSign,
    //   text: "Total Sale",
    //   path: "/admin/sales",
    // },
    {
      icon: ChevronsUpDown,
      text: "Categories",
      path: "/admin/categories",
    },
    {
      icon: ShoppingBag,
      text: "All Orders",
      path: "/admin/orders",
    },
    {
      icon: Rss,
      text: "All Blogs",
      path: "/admin/blogs",
    },
    {
      icon: History,
      text: "Subscription",
      path: "/admin/subscription",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#073F70",
        },
      }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center justify-center">
            {/* <h4 className="text-2xl font-semibold">Logo</h4> */}
            <Image
              src={logo.src}
              width={100}
              height={100}
              alt="logo"
              className="w-48 h-auto mx-auto"
              priority
              quality={100}
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems?.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg hover:bg-primary hover:text-white transition-all duration-300 ${
                pathname === item.path
                  ? "bg-primary text-white"
                  : "text-text-primary"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </Link>
          ))}
        </nav>
        {/* log out button  */}
        <div className="p-4 fixed bottom-2 w-full">
          <button
            onClick={() => {
              logoutHandler(dispatch, router);
            }}
            className="flex items-center px-4 py-3 text-sm rounded-lg bg-red-50 text-gray-700 hover:bg-red-100 w-full transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 block lg:hidden"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            <h4 className="flex items-center justify-center text-2xl font-semibold">
              {pathname === "/admin"
                ? "Overview"
                : pathname
                    ?.split("/")[2]
                    ?.split("-")
                    ?.join(" ")
                    ?.charAt(0)
                    ?.toUpperCase() +
                  pathname?.split("/")[2]?.split("-")?.join(" ")?.slice(1)}
            </h4>

            {/* changing role on frontend for testing */}
            {/* <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <Select
                  value={customRole}
                  style={{ width: 150 }}
                  onChange={handleCustomRoleChange}
                  options={[
                    { value: "SUPER_ADMIN", label: "Super Admin" },
                    { value: "ADMIN", label: "Admin" },
                    { value: "SUB_ADMIN", label: "Sub Admin" },
                    { value: "SUPERVISOR", label: "Supervisor" },
                    { value: "EMPLOYEE", label: "Employee" },
                  ]}
                />
              </div>
            </div> */}

            {/* Search */}
            {/* <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div> */}

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-5 mt-16 bg-dashboard-content-bg">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-text-secondary bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </ConfigProvider>
  );
};

export default DashboardLayout;
