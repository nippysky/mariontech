import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

export default function Cart() {
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
    </>
  );
}
