import Image from "next/image";
import Link from "next/link";
import React from "react";
import WebLogo from "../public/brand/WebLogo.svg";
import { BsShop } from "react-icons/bs";

import { useRouter } from "next/router";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/cartSlice";

export default function Navbar() {
  const { asPath } = useRouter();
  const items = useSelector(selectItems);

  return (
    <header className="w-full flex justify-between items-center py-3">
      {/* Logo */}
      <Link href={"/"}>
        <div>
          <Image
            src={WebLogo}
            alt={"Mationtech Logo"}
            height={20}
            width={150}
            priority
          />
        </div>
      </Link>

      {/* Icon Links */}
      <nav className="flex gap-10 lg:gap-14 justify-end items-center">
        {/* shop */}
        <Link href={"/shop"}>
          <div
            className={`flex items-end justify-center gap-2 text-[0.85rem] font-medium tracking-widest ${
              asPath === "/shop"
                ? "bg-mainYellow px-3 py-2 rounded-xl"
                : "text-white"
            }`}
          >
            <span
              className={`${
                asPath === "/shop" ? "text-white" : "text-mainBlue"
              }`}
            >
              <BsShop size={20} />
            </span>
            <span
              className={`hidden lg:inline uppercase relative top-1 ${
                asPath === "/shop" ? "text-white" : "text-mainBlue"
              }`}
            >
              Shop
            </span>
          </div>
        </Link>

        {/* cart */}
        <div
          className={` ${
            asPath === "/shop/cart"
              ? "bg-mainBlue text-white px-3 py-2 rounded-xl"
              : "text-mainBlue"
          } flex justify-center`}
        >
          <a href={"/shop/cart"}>
            <div className={`flex relative`}>
              {/* bag */}
              <RiShoppingCartLine size={25} />
              {/* count circle */}
              <div
                className={`w-[16px] h-[16px] bg-mainYellow rounded-full absolute bottom-0 -right-2 flex justify-center items-center text-mainBlue ${
                  asPath === "/shop/cart" ? "bg-white text-mainBlue" : null
                }`}
              >
                <small className="text-[0.65rem] font-bold">
                  {items.length}
                </small>
              </div>
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
}
