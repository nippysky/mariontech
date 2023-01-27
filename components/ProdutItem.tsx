import urlFor from "@/utils/sanity-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Prop = {
  name: string;
  image: unknown;
  slug: string;
  price: number;
};

export default function ProdutItem({ name, image, slug, price }: Prop) {
  return (
    <Link href={`/shop/${slug}`}>
      {/* image */}
      <div className="">
        <Image
          src={`${urlFor(image)}`}
          alt={name}
          width={360}
          height={360}
          priority
        />
      </div>

      {/* name */}
      <p className="tracking-widest uppercase font-medium my-2">{name}</p>
      {/* price */}
      <p className="text-mainBlue font-bold text-xl my-2">₦{price}</p>
    </Link>
  );
}
