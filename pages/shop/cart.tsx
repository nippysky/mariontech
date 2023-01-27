import React from "react";
import Navbar from "@/components/Navbar";
import {
  removeFromCart,
  selectItems,
  selectTotal,
} from "@/redux/slices/cartSlice";
import { IoClose } from "react-icons/io5";
import urlFor from "@/utils/sanity-image";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  // Redux Dispatch
  const dispatch = useDispatch();

  // Create An Array Of All Cart Item Names

  const cartItemNames = () => {
    let nameString: any[] = [];
    items.map((item: any) => nameString.push(item.name));
    return nameString.toString();
  };

  return (
    <>
      <Head>
        <title>Cart - MarionTech</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <section className="w-full px-5 lg:px-20 my-5">
        {/*Text & Button */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          {/* text */}
          <div className="lg:w-1/2 w-full flex lg:justify-start">
            <h1 className="font-medium text-clayBrown text-xl">
              {items.length === 0
                ? "Your Bag Is Empty"
                : "Your Weird Shopping Bag"}
            </h1>
          </div>

          {/* button */}
          <div className="lg:w-1/2 w-full flex md:justify-end mt-10 md:mt-0">
            <Link href={"/shop/"}>
              <button className="bg-mainBlue py-3 px-14 text-center font-semibold text-white rounded-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Map Cart Items From Redux Global Store */}
        {items.map((item: any, index: any) => (
          <motion.section
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ease: "easeOut", duration: 1 }}
            key={item._id}
            className={`w-full ${
              index % 2 === 0 ? "bg-mainBlue" : "bg-mainYellow"
            } p-10 my-10 flex flex-col-reverse lg:flex-row justify-between items-start`}
          >
            {/* IMAGE, QUANTITY, COLOR, SIZE */}
            <div className="flex gap-5 lg:w-1/2 w-full justify-start">
              <Image
                src={`${urlFor(item.image)}`}
                alt={item.name}
                width={200}
                height={200}
              />

              <div className="text-white flex flex-col justify-between">
                {/* Variation*/}
                <div>
                  <span className="font-regular">Variation: </span>
                  <span className="font-bold">
                    {item.variation === "" ? "No Variations" : item.variation}
                  </span>
                </div>

                {/* quantity */}
                <div>
                  <span className="font-regular">Quantity: </span>
                  <span className="font-bold">{item.quantity}</span>
                </div>
              </div>
            </div>

            {/* DELETE-BUTTON, NAME, PRICE */}
            <div className="lg:w-1/2 w-full text-white flex justify-end mb-10 lg:mb-0">
              <div className="flex flex-col gap-20 items-end">
                {/* delete button */}
                <div
                  className="cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  <IoClose color="white" size={30} />
                </div>

                {/* name, price */}
                <div className="flex flex-col items-end">
                  <h4 className="text-white tracking-widest uppercase text-xl font-medium">
                    {item.name}
                  </h4>

                  <h4 className="mt-5 text-xl font-bold tracking-wide">
                    ₦{item.price}
                  </h4>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Other Details */}
        {items.length > 0 && (
          <section className="w-full mt-20">
            <div className="w-full flex justify-between items-center mb-5">
              <p className="font-medium tracking-widest">PRODUCTS IN CART:</p>
              <p className="font-bold text-chocoBrown text-[1.2rem]">
                {items.length}
              </p>
            </div>

            <div className="w-full flex justify-between items-center mb-5">
              <p className="font-medium tracking-widest">TOTAL:</p>
              <p className="font-bold text-chocoBrown text-[1.2rem]">
                ₦{total}
              </p>
            </div>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=2349015103153&text=Hello%20*Marion.*%20I%20want%20to%20place%20an%20order%20for%20*${cartItemNames()}*`}
            >
              <button className="my-7 bg-[#25D366] text-center py-3 w-full text-white font-semibold rounded-lg">
                Buy On WhatsApp
              </button>
            </Link>

            <Link href={`/shop/checkout`}>
              <button className=" bg-mainBlue text-center py-3 w-full text-white font-semibold rounded-lg">
                Proceed To Pay
              </button>
            </Link>
          </section>
        )}
      </section>
    </>
  );
}
