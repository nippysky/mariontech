import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import client from "../../utils/client";
import urlFor from "../../utils/sanity-image";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type ProductsObject = {
  _id: string;
  name: string;
  slug: string;
  image: any;
  price: number;
  variation: string[];
  description: any;
  otherImages: any[];
}[];

type Product = {
  _id: string;
  name: string;
  slug: string;
  image: any;
  price: number;
  variation: string[];
  description: any;
  otherImages: any[];
};

export default function ProductDetails({
  allProducts,
  product,
}: {
  allProducts: ProductsObject;
  product: Product;
}) {
  const router = useRouter();

  const [variation, setVariation] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  console.log({ item: product });

  // Redux Dispatch
  const dispatch = useDispatch();

  // ADD ITEM TO Cart
  const addItemToCart = () => {
    if (product.variation && product.variation.length > 0 && variation === "") {
      toast.error("Kindly select product variation");
      return;
    }

    const newProduct = { ...product, price: product.price * quantity };
    const finalProduct = { ...newProduct, variation, quantity };

    dispatch(addToCart(finalProduct));
    toast.success(`${product.name} added to cart successfully`);
  };

  return (
    <>
      <Head>
        <title>{product.name} - MarionTech</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <section className="w-full px-5 lg:px-32 py-3 mt-3">
        {/* go back arrow */}
        <div className="lg:w-1/4 w-full">
          <div
            className="flex text-black cursor-pointer"
            onClick={() => router.back()}
          >
            <span>
              <BsArrowLeft size={22} />
            </span>
            <span className="relative bottom-[1px] left-2 font-medium">
              Go Back
            </span>
          </div>
        </div>

        {/* PRODUCT details */}
        <section className="w-full flex-col lg:flex lg:flex-row gap-10 my-10">
          {/* image */}
          <motion.div
            className="lg:w-1/2 w-full flex justify-center lg:justify-start"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <div>
              <Image
                src={`${urlFor(product.image)}`}
                alt={product.name}
                width={400}
                height={500}
                priority
              />
            </div>
          </motion.div>

          {/* SHOPPING details */}
          <motion.div
            className="lg:w-1/2 w-full mt-5 lg:mt-0"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <div>
              {/* title- Long name */}
              <h1 className="font-medium tracking-wider uppercase text-2xl text-center lg:text-left">
                {product.name}
              </h1>

              {/* Price and Size */}
              <div className="w-full flex-col lg:flex lg:flex-row gap-10 justify-between my-10">
                {/* price */}
                <div className="lg:w-1/2 w-full">
                  <small className="font-semibold text-gray-500">Price</small>
                  <h4 className="font-bold text-mainBlue text-2xl mt-3">
                    ₦{product.price * quantity}
                  </h4>
                </div>

                {/* variation */}
                <div className="lg:w-1/2 w-full mt-7 lg:mt-0">
                  <small className="font-semibold text-gray-500">
                    Variation
                  </small>
                  {!product.variation || product.variation.length === 0 ? (
                    <p className="mt-3 text-[0.85rem]">
                      This product does not have variation
                    </p>
                  ) : (
                    <select
                      onChange={(event) => setVariation(event.target.value)}
                      value={variation}
                      required
                      id="reason"
                      name="reason"
                      className="w-full h-14 bg-gray-200 border-none focus:ring-0 mt-3 rounded-lg"
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {product.variation.map((variation: any) => (
                        <option key={variation} value={variation}>
                          {variation}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Quantuty and Color */}
            <div className="w-full flex-col lg:flex lg:flex-row gap-10 justify-between my-10">
              <div className="lg:w-1/2 w-full">
                <small className="font-semibold text-gray-500">
                  Number Of Items
                </small>

                <div className="w-full mt-3 flex gap-5 items-center justify-start">
                  {/* minus */}
                  <div
                    className="text-[2.5rem] text-clayBrown cursor-pointer active:bg-gray-200"
                    onClick={() => {
                      if (quantity === 1) return;
                      setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </div>

                  {/* count box */}
                  <div className="bg-gray-200 w-[50px] h-[50px] text-center text-clayBrown flex justify-center items-center text-[2rem] font-bold rounded-lg">
                    {quantity}
                  </div>

                  {/* plus */}
                  <div
                    className="text-[2.5rem] text-clayBrown cursor-pointer active:bg-gray-200"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Buy From Whatapp Button */}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=2349015103153&text=Hi%20*Marion.*%20I%20am%20interested%20in%20the%20*${product.name}*%20for%20*₦${product.price}*%20in%20your%20store.%20I%20need%20*${quantity}*%20of%20them.`}
            >
              <button className="w-full bg-[#25D366] text-center font-semibold text-white py-4 my-3 active:bg-mainYellow rounded-lg">
                Buy From Whatsapp
              </button>
            </Link>

            {/* Add To Cart Button */}
            <button
              className="w-full bg-mainBlue text-center font-semibold text-white py-4 my-3 active:bg-mainYellow rounded-lg"
              onClick={addItemToCart}
            >
              Add To Cart
            </button>
          </motion.div>
        </section>

        {/* DESCRIPTION */}
        <section className="my-20">
          <h1 className="text-2xl font-semibold">Description</h1>

          <div className="mt-10">
            <p className=" tracking-wide leading-7">{product.description}</p>

            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-20 place-items-center place-content-center mt-10">
              {product.otherImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="border border-mainBlue p-3"
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ease: "easeOut", duration: 1 }}
                >
                  <Image
                    src={`${urlFor(image)}`}
                    alt={image.name}
                    width={360}
                    height={360}
                    priority
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MORE FROM COLLECTION */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 100 }}
          transition={{ ease: "easeOut", duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="text-2xl font-semibold">More Products</h1>

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center place-content-center mt-10">
            {allProducts.slice(0, 3).map((product: any) => (
              <div key={product._id} className="border border-mainYellow p-3">
                <a href={`/shop/${product.slug.current}`}>
                  {/* image */}
                  <div className="">
                    <Image
                      src={`${urlFor(product.image)}`}
                      alt={product.name}
                      width={360}
                      height={360}
                      priority
                    />
                  </div>

                  {/* name */}
                  <p className="tracking-widest uppercase font-medium my-2">
                    {product.name}
                  </p>
                  {/* price */}
                  <p className="text-mainBlue font-bold text-xl my-2">
                    ₦{product.price}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </motion.section>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  type ProductsObject = {
    _id: string;
    name: string;
    slug: string;
    image: any;
    price: number;
    variation: string[];
    description: any;
    otherImages: any[];
  }[];

  type Product = {
    _id: string;
    name: string;
    slug: string;
    image: any;
    price: number;
    variation: string[];
    description: any;
    otherImages: any[];
  };

  const slug = context.params.slug;
  const fetchProducts: ProductsObject = await client.fetch(
    `*[_type == "products"]`
  );
  const product: Product = await client.fetch(
    `*[_type == "products" && slug.current == $slug][0]`,
    { slug }
  );
  const allProducts: ProductsObject = fetchProducts.sort(
    () => Math.random() - 0.5
  );

  if (!product || !allProducts) return { notfound: true };

  return {
    props: { allProducts, product },
  };
}
