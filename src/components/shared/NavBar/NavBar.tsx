"use client";

import logo from "@/assets/images/logo.png";
import { cartProductsQuantitySelector } from "@/redux/features/cart/cartSlice";
import { wishlistProductsCountSelector } from "@/redux/features/wishlist/wishlistSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/", active: true },
    { label: "Shop", href: "/shop" },
    { label: "About us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    // { label: "Stay Connected", href: "/stay-connected" },
  ];

  // cart
  const totalProductsLength = useAppSelector(cartProductsQuantitySelector) || 0;
  const totalWishlistLength =
    useAppSelector(wishlistProductsCountSelector) || 0;

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const user: any = useAppSelector(selectCurrentUser);
  //  {
  //   name: "John Doe",
  //   email: "Q9RQH@example.com",
  //   image: "https://randomuser.me/api/portraits/men/46.jpg",
  //   role: "USER",
  // };

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#0f0f0f] backdrop-blur-sm border-b border-slate-700/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <img src={logo.src} alt="Logo" className="h-[54px] w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-white border border-blue-400 bg-blue-400/10"
                      : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link href="/shop">
            <button className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-slate-700/50 transition-colors">
              <SearchOutlined className="text-lg" />
            </button>
            </Link> */}
            <Link href="/wishlist">
              <button className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-slate-700/50 transition-colors relative">
                <HeartOutlined className="text-lg" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalWishlistLength}
                </span>
              </button>
            </Link>
            <Link href="/cart">
              <button className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-slate-700/50 transition-colors relative">
                <ShoppingCartOutlined className="text-lg" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalProductsLength}
                </span>
              </button>
            </Link>
            {!user ? (
              <Link href="/login">
                <button className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                  <UserOutlined className="text-lg" />
                </button>
              </Link>
            ) : (
              <ProfileDropdown
                userImage={user?.image}
                userName={user?.name}
                role={user?.role}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <Link href="/shop">
              <button className="text-gray-300 hover:text-white p-2">
                <SearchOutlined className="text-lg" />
              </button>
            </Link> */}
            <Link href="/cart">
              <button className="text-gray-300 hover:text-white p-2">
                <ShoppingCartOutlined className="text-lg" />
              </button>
            </Link>
            <Link href="/wishlist">
              <button className="text-gray-300 hover:text-white p-2">
                <HeartOutlined className="text-lg" />
              </button>
            </Link>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              className="text-gray-300 hover:!text-white border-none"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div>
            <img src={logo.src} alt="Logo" className="h-auto w-auto" />
          </div>
        }
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        width={280}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                pathname === item.href
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t pt-4 mt-6">
            <div className="flex flex-col space-y-3">
              {!user ? (
                <Link href="/login">
                  <button className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                    <UserOutlined />
                    <span>Account</span>
                  </button>
                </Link>
              ) : (
                <ProfileDropdown
                  userImage={user?.image}
                  userName={user?.name}
                  role={user?.role}
                />
              )}
              {/* <button className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                <HeartOutlined />
                <span>Wishlist</span>
              </button> */}
            </div>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default NavBar;
