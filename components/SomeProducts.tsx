import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import ProdutItem from "./ProdutItem";
import Banner from "../public/brand/Banner.jpeg";
import Link from "next/link";

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

export default function SomeProducts({
  products,
}: {
  products: ProductsObject;
}) {
  return (
    <>
      <section className="w-full flex flex-col lg:flex-row gap-10 justify-between px-5 lg:px-20 my-10">
        <div className="w-full lg:w-1/2 flex justify-start">
          <h1 className="text-2xl font-semibold capitalize tracking-wide text-black">
            Shop From Us
          </h1>
        </div>

        <div className="w-full lg:w-1/2 justify-start lg:justify-end flex">
          <Link href={"/shop"}>
            <button className="w-full bg-mainYellow text-center font-semibold uppercase text-white tracking-wider py-3 px-5 hover:bg-mainBlue rounded-lg">
              See More Products
            </button>
          </Link>
        </div>
      </section>

      <section className="w-full px-5 lg:px-20 flex flex-col lg:flex-row gap-20 justify-between items-start mb-20">
        {/* List Some Products */}
        <section className="lg:w-[80%] w-full grid md:grid-cols-2 lg:grid-cols-3 gap-20 place-items-center place-content-center">
          {products.slice(0, 6).map((product: any) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.1 }}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="border-[0.02rem] border-mainYellow p-3"
            >
              <ProdutItem
                name={product.name}
                image={product.image}
                slug={product.slug.current}
                price={product.price}
              />
            </motion.div>
          ))}
        </section>

        {/* Banner */}
        <section className="lg:w-[20%] w-full flex lg:justify-end justify-center">
          <Image
            src={Banner}
            alt={"Marion Banner"}
            height={600}
            width={300}
            priority
          />
        </section>
      </section>
    </>
  );
}
