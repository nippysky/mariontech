import React from "react";
import ProdutItem from "./ProdutItem";
import { motion } from "framer-motion";

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

export default function ShopFeed({ products }: { products: ProductsObject }) {
  return (
    <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-20 place-items-center place-content-center">
      {products.map((product: any) => (
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
  );
}
