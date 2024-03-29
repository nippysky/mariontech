import Hero from "@/components/Hero";
import SomeProducts from "@/components/SomeProducts";
import client from "@/utils/client";
import Head from "next/head";

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

export default function Home({ products }: { products: ProductsObject }) {
  return (
    <>
      <Head>
        <title>Marion Technolgy - Home</title>
        <meta name="description" content="Marion Technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Hero />
        <SomeProducts products={products} />
      </main>
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
