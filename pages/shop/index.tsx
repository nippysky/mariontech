import Navbar from "@/components/Navbar";
import ShopFeed from "@/components/ShopFeed";
import Head from "next/head";
import React from "react";
import client from "../../utils/client";

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

export default function Shop({ products }: { products: ProductsObject }) {
  return (
    <>
      <Head>
        <title>Shop Page - MarionTech</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <section className="w-full px-5 lg:px-32 py-10 my-10">
        <ShopFeed products={products} />
      </section>

      <footer>{/* <Footer /> */}</footer>
    </>
  );
}

export async function getStaticProps() {
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

  const fecthProduct: ProductsObject = await client.fetch(
    `*[_type == "products"]`
  );
  const products = fecthProduct.sort(() => Math.random() - 0.5);

  if (!products) {
    return {
      notfound: true,
    };
  }

  return {
    props: {
      products,
    },
    revalidate: 360,
  };
}
