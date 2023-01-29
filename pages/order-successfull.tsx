import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function OrderSuccessfull() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Order Successfull - MarionTech</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-full h-screen px-5 lg:px-20 bg-mainBlue flex justify-center items-center">
        <div className="animate animate-pulse">
          <h1 className="text-3xl text-white font-bold text-center my-2">
            Order Successfull...
          </h1>
          <p className="text-mainYellow tracking-wide text-center my-2">
            You order is on it's way.
          </p>
        </div>
      </section>
    </>
  );
}
