"use client";

import aboutRightSideImage from "@/assets/images/aboutRightSideImage.png";
import LiquidEther from "@/components/LiquidEther";
import MyGradientButton from "@/components/ui/core/MyButton/MyGradientButton";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// right side images
import iphoneAir from "@/assets/images/iphone17airblue.png";
import ipad from "@/assets/images/ipadprom4.png";
import watch from "@/assets/images/watch.png";
import MyButton from "@/components/ui/core/MyButton/MyButton";

export default function AboutBanner() {
  return (
    <section
      // style={{ backgroundImage: `url(${aboutBannerBg.src})` }}
      className="relative bg-cover bg-black bg-no-repeat min-h-screen overflow-hidden"
    >
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      <div className="absolute inset-0 w-full h-full">
        <LiquidEther
          colors={["#032159", "#1EA4EA", "#66EFFF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-20 container mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-white/70 text-sm mb-16">
              <Link href="/">Home</Link>
              <span>{">"}</span>
              <span className="text-white">About us</span>
            </nav>

            {/* Section Label */}

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl md:text-[34px] font-bold text-white !leading-tight">
                Born in Cayman. Built for Cayman. Powered by Tech
              </h1>
              <div>
                <p className="mt-4 text-gray-200 leading-relaxed">
                  We’re a new kind of electronics company. Our mission? To
                  redefine how the Cayman Islands shops for technology.
                </p>
                <p className="mt-4 text-gray-200 leading-relaxed">
                  We noticed the delays, the limited selection, the shipping
                  costs, and the frustrating wait times. Hence, we decided to
                  build something better: a smart, responsive & fast{" "}
                  <b>on-island-first</b> store that delivers the world’s best
                  tech, <b>right to your door</b>, seven days a week, every day
                  of the year.
                </p>

                <p className="mt-4 font-semibold text-white">
                  We believe buying electronics should be:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-gray-200">
                  <li>Easy</li>
                  <li>Fast</li>
                  <li>Local</li>
                  <li>And always available when you need it most</li>
                </ul>

                <p className="mt-4 text-gray-200">
                  We’re not here to just sell products. We’re here to build a{" "}
                  <b>community of tech lovers</b>, and help Cayman stay
                  connected, entertained, and ahead of the curve.
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              {/* Trusted Professionals */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_568_5964)">
                      <path
                        d="M7.52562 41.6309L0.0707474 49.0857C-0.0546276 49.2052 -0.00775258 49.4214 0.166997 49.4732L9.1455 52.2006C10.4192 52.5881 11.4117 53.5806 11.7991 54.8542L14.5265 63.8327C14.5782 64.0075 14.7945 64.0544 14.914 63.929L24.8887 53.9542C17.5086 52.121 11.4157 47.52 7.52562 41.6309Z"
                        fill="#F8F8F8"
                      />
                      <path
                        d="M63.9293 49.0857L56.4744 41.6309C52.612 47.4779 46.538 52.1094 39.111 53.9544L49.0858 63.9291C49.2053 64.0545 49.4215 64.0076 49.4733 63.8329L52.2006 54.8544C52.5881 53.5806 53.5806 52.5881 54.8544 52.2007L63.8329 49.4734C64.0081 49.4212 64.0544 49.2049 63.9293 49.0857Z"
                        fill="#F8F8F8"
                      />
                      <path
                        d="M57.5331 25.5336C57.5331 11.4552 46.0796 0.000488281 32 0.000488281C17.9204 0.000488281 6.46687 11.4552 6.46687 25.5336C6.46687 38.263 15.8392 48.8725 28.0764 50.7667C43.5772 53.178 57.5331 41.1127 57.5331 25.5336ZM12.0967 31.756C7.88587 18.2934 18.0226 4.68411 32 4.68411C47.6141 4.68411 57.9345 21.4652 50.3232 35.4796C41.5365 51.5985 17.627 49.3466 12.0967 31.756Z"
                        fill="#F8F8F8"
                      />
                      <path
                        d="M32 8.43408C22.5715 8.43408 14.8991 16.1052 14.8991 25.5337C14.8991 39.4052 30.6263 47.4947 41.8885 39.4771C44.3015 37.7643 46.2665 35.4228 47.5309 32.6872C52.7848 21.3765 44.4094 8.43408 32 8.43408ZM40.631 23.1351C40.4175 23.2936 30.0284 31.0045 29.9687 31.0487C29.2184 31.608 28.1509 31.533 27.4837 30.8262C22.7116 25.7405 23.0934 26.1466 22.9789 26.0263C22.177 25.1725 22.3444 23.7913 23.3476 23.1565C23.3489 23.1552 23.3501 23.154 23.3514 23.154C24.0964 22.6865 25.0901 22.7952 25.7139 23.4602C26.723 24.5357 26.0437 23.8118 29.075 27.0413C29.4017 26.7977 33.2465 23.9455 38.536 20.0202C39.3672 19.4027 40.5422 19.5765 41.1584 20.4077C41.7231 21.1657 41.7211 22.3273 40.631 23.1351Z"
                        fill="#F8F8F8"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_568_5964">
                        <rect width="64" height="64" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">Trusted</h3>
                <p className="text-white/80 text-sm">Professionals</p>
              </div>

              {/* Eco-Friendly Products */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <path
                      d="M53.642 50.4041L57.833 42.8711C58.032 42.5161 58.151 42.1301 58.189 41.7251L59.004 32.9851C59.019 32.8281 58.944 32.7201 58.899 32.6711C58.853 32.6211 58.753 32.5361 58.595 32.5361C58.398 32.5361 58.227 32.6771 58.191 32.8711L56.78 40.3361C56.641 41.0691 56.289 41.7351 55.762 42.2621L53.163 44.8611L53.161 44.8641L48.888 49.1361C48.497 49.5271 47.865 49.5271 47.474 49.1361C47.083 48.7451 47.083 48.1131 47.474 47.7221L49.413 45.7831L51.747 43.4491C51.884 43.3111 51.96 43.1281 51.96 42.9331C51.96 42.7381 51.884 42.5551 51.746 42.4161C51.473 42.1411 51.03 42.1301 50.741 42.3881L43.2 49.1241C42.574 49.6841 42.215 50.4861 42.214 51.3251L42.21 60.0021H47.394L47.39 57.2881C47.39 57.0221 47.495 56.7671 47.683 56.5801L52.974 51.2891C53.236 51.0271 53.46 50.7301 53.641 50.4061L53.642 50.4041Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M21.741 60.0002L21.737 51.3232C21.737 50.4842 21.377 49.6812 20.751 49.1222L13.211 42.3862C12.921 42.1282 12.481 42.1382 12.206 42.4142C12.068 42.5522 11.992 42.7352 11.992 42.9312C11.992 43.1272 12.068 43.3092 12.204 43.4462L14.539 45.7812L16.478 47.7202C16.869 48.1112 16.869 48.7432 16.478 49.1342C16.087 49.5252 15.455 49.5252 15.064 49.1342L10.791 44.8622L10.789 44.8592L8.189 42.2592C7.662 41.7332 7.31 41.0672 7.172 40.3332L5.761 32.8692C5.724 32.6752 5.554 32.5342 5.356 32.5342C5.199 32.5342 5.099 32.6192 5.053 32.6692C5.008 32.7192 4.933 32.8262 4.948 32.9832L5.763 41.7232C5.801 42.1282 5.921 42.5142 6.118 42.8692L10.31 50.4022C10.491 50.7262 10.715 51.0242 10.976 51.2842L16.268 56.5762C16.456 56.7642 16.561 57.0182 16.561 57.2842L16.557 59.9982H21.741V60.0002Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M28.55 41.2381C28.814 41.1471 28.918 40.9431 28.956 40.8291C28.994 40.7161 29.036 40.4911 28.882 40.2591C28.46 39.6201 28.333 38.8311 28.536 38.0931C28.738 37.3551 29.249 36.7401 29.937 36.4061L32.112 35.3501C32.344 35.2371 32.428 35.0401 32.457 34.9331C32.486 34.8261 32.514 34.6151 32.371 34.4001L31.73 33.4331C31.174 32.5961 31.136 31.5331 31.631 30.6591L32.736 28.7061C33.346 27.6301 34.602 27.1191 35.786 27.4641L39.599 28.5711C40.296 28.7731 40.867 29.2381 41.206 29.8801C41.545 30.5231 41.608 31.2571 41.381 31.9471L41.25 32.3491C41.163 32.6131 41.252 32.9031 41.471 33.0711L42.25 33.6741C42.418 33.8031 42.64 33.8451 42.842 33.7811L44.842 33.1641C45.708 32.8961 46.641 33.0851 47.335 33.6691L49.156 35.2041C49.787 34.2121 50.343 33.1691 50.797 32.0701L47.969 26.5231C47.897 26.3811 47.776 26.2711 47.628 26.2111L45.858 25.5051C44.843 25.1001 44.188 24.1321 44.188 23.0401V21.6441C44.188 20.2821 45.209 19.1471 46.564 19.0041L47.221 18.9351C47.453 18.9111 47.656 18.7631 47.75 18.5501L48.144 17.6681C48.499 16.8721 49.224 16.3021 50.08 16.1421L50.554 16.0531C48.559 11.6011 45.011 8.00408 40.6 5.93408L32.883 7.77408C32.587 7.84408 32.38 8.10608 32.38 8.41108V9.11408C32.38 9.29508 32.452 9.46208 32.582 9.58708C32.712 9.71108 32.883 9.76908 33.062 9.76808L36.528 9.62108C37.621 9.57108 38.653 10.2231 39.084 11.2331L40.77 15.1951C41.26 16.3471 40.891 17.6621 39.873 18.3921L38.131 19.6391C37.166 20.3311 35.845 20.2931 34.918 19.5461L33.979 18.7881C33.767 18.6171 33.465 18.5951 33.231 18.7361L30.903 20.1331C30.613 20.3071 30.504 20.6671 30.647 20.9731L31.264 22.2841C31.731 23.2761 31.548 24.4331 30.797 25.2321L27.072 29.1981C26.566 29.7361 25.871 30.0351 25.142 30.0351C25.076 30.0351 25.009 30.0321 24.942 30.0271L22.059 29.8161C21.275 29.7591 20.561 29.3611 20.1 28.7221L18.925 27.0961C18.766 26.8761 18.548 26.8321 18.432 26.8251C18.32 26.8161 18.095 26.8381 17.911 27.0361C16.968 28.0651 15.525 28.2371 14.427 27.5031L11.735 25.7001C12.25 33.3801 17.031 39.8981 23.737 42.8951L28.548 41.2371L28.55 41.2381Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M32.421 5.829L37.182 4.694C35.525 4.256 33.795 4 32.002 4C21.144 4 12.273 12.561 11.721 23.283L15.542 25.842C15.812 26.023 16.168 25.981 16.389 25.74C16.981 25.094 17.745 24.778 18.551 24.829C19.351 24.876 20.079 25.275 20.548 25.925L21.723 27.552C21.837 27.71 22.013 27.808 22.205 27.823L25.09 28.034C25.286 28.043 25.479 27.973 25.615 27.829L29.34 23.863C29.526 23.666 29.57 23.382 29.455 23.136L28.838 21.825C28.255 20.587 28.701 19.122 29.875 18.419L32.203 17.022C33.155 16.453 34.373 16.536 35.236 17.232L36.175 17.99C36.404 18.176 36.73 18.183 36.967 18.013L38.708 16.766C38.959 16.586 39.05 16.262 38.929 15.978L37.243 12.016C37.138 11.768 36.896 11.613 36.613 11.619L33.148 11.766C32.425 11.801 31.727 11.537 31.199 11.032C30.671 10.527 30.38 9.845 30.38 9.115V8.412C30.38 7.178 31.218 6.116 32.419 5.83L32.421 5.829ZM21.42 11.527C19.084 13.411 17.345 15.9 16.393 18.726C16.252 19.144 15.863 19.407 15.445 19.407C15.339 19.407 15.232 19.39 15.126 19.354C14.603 19.178 14.321 18.611 14.498 18.087C15.573 14.899 17.533 12.093 20.165 9.97C20.595 9.622 21.225 9.69 21.571 10.12C21.918 10.55 21.85 11.18 21.421 11.526L21.42 11.527ZM24.916 9.395C24.707 9.488 24.5 9.584 24.297 9.685C24.154 9.756 24.003 9.789 23.853 9.789C23.485 9.789 23.131 9.586 22.957 9.233C22.711 8.739 22.913 8.138 23.408 7.893C23.637 7.779 23.869 7.67 24.103 7.566C24.608 7.342 25.199 7.569 25.423 8.074C25.648 8.578 25.421 9.17 24.916 9.394V9.395Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M48 36.8431L46.049 35.1991C45.878 35.0551 45.649 35.0091 45.434 35.0741L43.435 35.6911C42.612 35.9481 41.712 35.7841 41.029 35.2551L40.25 34.6531C39.362 33.9681 39.001 32.7921 39.351 31.7261L39.482 31.3241C39.538 31.1531 39.523 30.9711 39.439 30.8131C39.356 30.6551 39.215 30.5401 39.043 30.4901L35.23 29.3831C34.937 29.2971 34.628 29.4241 34.478 29.6911L33.373 31.6431C33.251 31.8591 33.261 32.1211 33.397 32.3281L34.038 33.2941C34.462 33.9311 34.589 34.7211 34.388 35.4591C34.187 36.1991 33.676 36.8141 32.987 37.1491L30.812 38.2051C30.58 38.3181 30.496 38.5141 30.467 38.6211C30.438 38.7271 30.41 38.9391 30.552 39.1551C31.008 39.8441 31.117 40.6891 30.851 41.4721C30.585 42.2551 29.985 42.8591 29.203 43.1281L26.782 43.9621C28.451 44.4071 30.196 44.6671 32.003 44.6671C38.497 44.6671 44.275 41.5961 48.001 36.8421L48 36.8431Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M49.972 18.4842L49.578 19.3662C49.193 20.2282 48.37 20.8252 47.432 20.9232L46.776 20.9922C46.442 21.0272 46.19 21.3072 46.19 21.6432V23.0392C46.19 23.3092 46.352 23.5472 46.602 23.6462L48.373 24.3532C48.972 24.5932 49.462 25.0412 49.754 25.6132L51.677 29.3842C52.093 27.7662 52.338 26.0792 52.338 24.3332C52.338 22.1022 51.963 19.9602 51.296 17.9492L50.451 18.1072C50.24 18.1462 50.061 18.2872 49.974 18.4832L49.972 18.4842Z"
                      fill="#F8F8F8"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">Eco-Friendly</h3>
                <p className="text-white/80 text-sm">Products</p>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <path
                      d="M47.93 43.7402L45.108 56.8422C44.71 58.6842 43.082 60.0002 41.198 60.0002H30.614C26.308 60.0002 24.456 58.3902 22 56.0002H19V40.0002H21.066C25.806 36.7742 28.344 32.1382 29.75 27.4962C29.984 26.7282 30.64 26.1382 31.442 26.0782C35.298 25.7882 38.148 29.3382 37.17 32.9462C36.498 35.4262 35.868 37.6462 34.616 39.9982H44.908C46.878 40.0002 48.344 41.8162 47.93 43.7402Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M32.538 5.18802L34.95 10.076C35.038 10.254 35.206 10.376 35.402 10.404L40.796 11.188C41.288 11.26 41.484 11.864 41.128 12.212L37.224 16.018C37.082 16.156 37.018 16.354 37.052 16.55L37.974 21.922C38.058 22.412 37.544 22.786 37.104 22.554L32.278 20.018C32.104 19.926 31.894 19.926 31.72 20.018L26.894 22.554C26.454 22.786 25.94 22.412 26.024 21.922L26.946 16.55C26.98 16.356 26.914 16.156 26.774 16.018L22.87 12.212C22.514 11.864 22.71 11.26 23.202 11.188L28.596 10.404C28.792 10.376 28.96 10.252 29.048 10.076L31.46 5.18802C31.682 4.74202 32.318 4.74202 32.538 5.18802Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M50.538 9.97196L52.95 14.86C53.038 15.038 53.206 15.16 53.402 15.188L58.796 15.972C59.288 16.044 59.484 16.648 59.128 16.996L55.226 20.8C55.084 20.938 55.02 21.136 55.054 21.332L55.976 26.704C56.06 27.194 55.546 27.568 55.106 27.336L50.28 24.8C50.106 24.708 49.896 24.708 49.722 24.8L44.896 27.336C44.456 27.568 43.942 27.194 44.026 26.704L44.948 21.332C44.982 21.138 44.916 20.938 44.776 20.8L40.872 16.994C40.516 16.646 40.712 16.042 41.204 15.97L46.598 15.186C46.794 15.158 46.962 15.034 47.05 14.858L49.462 9.96996C49.682 9.52596 50.318 9.52596 50.538 9.97196Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M14.538 9.9722L16.95 14.8602C17.038 15.0382 17.206 15.1602 17.402 15.1882L22.796 15.9722C23.288 16.0442 23.484 16.6482 23.128 16.9962L19.226 20.8002C19.084 20.9382 19.02 21.1362 19.054 21.3322L19.976 26.7042C20.06 27.1942 19.546 27.5682 19.106 27.3362L14.28 24.8002C14.106 24.7082 13.896 24.7082 13.722 24.8002L8.896 27.3362C8.456 27.5682 7.942 27.1942 8.026 26.7042L8.948 21.3322C8.982 21.1382 8.916 20.9382 8.776 20.8002L4.87 16.9962C4.514 16.6482 4.71 16.0442 5.202 15.9722L10.596 15.1882C10.794 15.1602 10.962 15.0362 11.05 14.8602L13.462 9.9722C13.682 9.5262 14.318 9.5262 14.538 9.9722Z"
                      fill="#F8F8F8"
                    />
                    <path
                      d="M9 38H15C15.552 38 16 38.448 16 39V57C16 57.552 15.552 58 15 58H9C8.448 58 8 57.552 8 57V39C8 38.448 8.448 38 9 38Z"
                      fill="#F8F8F8"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">Satisfaction</h3>
                <p className="text-white/80 text-sm">Guarantee</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`rounded-[10px] p-[2px] gradient-border w-fit`}
                aria-hidden="true"
              >
                <Link href={"/shop"}>
                  <MyButton label="Shop now" isArrow />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - 3 Product Images */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Apple Watch - top right */}
            <motion.div
              initial={{ opacity: 0, x: 80, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute -top-10 -right-16"
            >
              <Image
                quality={100}
                priority
                src={watch}
                alt="Apple Watch"
                className="w-[260px] md:w-[300px] object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* iPhone Air - center */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute inset-0 -top-10 md:left-14 left-6 flex items-center justify-center"
            >
              <Image
                quality={100}
                priority
                src={iphoneAir}
                alt="iPhone Air"
                className="w-[400px] md:w-[230px] object-cover drop-shadow-2xl"
              />
            </motion.div>

            {/* iPad - bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-10 -left-10"
            >
              <Image
                quality={100}
                priority
                src={ipad}
                alt="iPad Pro"
                className="w-[220px] md:w-[250px] object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
