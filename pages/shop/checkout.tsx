import React, { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, selectItems, selectTotal } from "@/redux/slices/cartSlice";
import { useRouter } from "next/router";

import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();

  //   Store User Entry
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // Redux Dispatch
  const dispatch = useDispatch();

  const items: object[] = useSelector(selectItems);
  const total: number = useSelector(selectTotal);

  // Create An Array Of All Cart Item Names
  const cartItemNames = () => {
    let nameString: any[] = [];
    items.map((item: any) => nameString.push(item.name));
    return nameString.toString();
  };

  const deliveryFee: number = 2500;
  const finalTotal: number = total + deliveryFee;

  // Handle Paystack Payment
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    name: name,
    phone: phone,
    address: address,
    amount: finalTotal * 100,
    publicKey: "pk_test_c2269f877802b324fdb3abc7554c34d137d13780",
  };

  const initializePayment = usePaystackPayment(config);

  // HANDLE ON SUCCESS EVENT
  // @ts-ignore
  const onSuccess = (ref) => {
    toast.success(
      `You payment was of  ₦${finalTotal} : ${ref.reference} was successfull`
    );

    // redirect to profile page
    router.replace("/order-successfull");

    // empty cart items
    dispatch(emptyCart());
  };

  // HANDLE CLOSE EVENT ON PAYSTACK MODAL
  const onClose = () => {
    toast.warn(`You dismissed the transaction.`);
  };

  // HANDLE BUTTON-PAY ONCLICK EVENT
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "" || name === "" || phone === "" || address === "") {
      toast.error("All Fields are required.");
      return;
    }

    if (
      email.length === 0 ||
      name.length === 0 ||
      phone.length === 0 ||
      address.length === 0
    ) {
      toast.error("All Fields are required.");
      return;
    }

    if (email.indexOf("@") < 0) {
      toast.warning("Check that you entered your email address correctly");
      return;
    }

    // Submit To API
    const orderDetails = {
      email,
      name,
      phone,
      address,
      orderItems: cartItemNames(),
    };

    // Submit Data To API
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    }).then((res) => res.json());

    // @ts-ignore
    initializePayment(onSuccess, onClose);

    setEmail("");
    setName("");
    setPhone("");
    setAddress("");
  }

  return (
    <>
      <Head>
        <title>Checkout - Own Your Weird</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-5 lg:px-20">
        <Navbar />
      </header>

      <form className="w-full px-5 lg:px-20 my-5" onSubmit={handleSubmit}>
        <div className="w-full mb-10 text-[0.85rem]">
          <Link href={"/shop/cart"}>
            <span className="font-semibold underline">Cart</span>
          </Link>
          <span> / Checkout</span>
        </div>

        {/*USER FORM */}
        <div className="w-full">
          {/* email and name */}
          <div className="w-full flex flex-col lg:flex-row gap-20 my-5">
            <div className="mt-14 lg:w-1/2 w-full">
              <label
                className="font-semibold relative bottom-5 tracking-wide"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
                className="w-full h-14 p-5 bg-blue-100 border-none focus:ring-0 rounded-lg"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
              />
            </div>

            <div className="lg:mt-14 mt-0 lg:w-1/2 w-full">
              <label
                className="font-semibold relative bottom-5 tracking-wide"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                required
                className="w-full h-14 p-5 bg-blue-100 border-none focus:ring-0 rounded-lg"
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Full Name"
              />
            </div>
          </div>

          {/* phone and address */}
          <div className="w-full flex flex-col lg:flex-row gap-20 my-5">
            <div className="mt-14 lg:w-1/2 w-full">
              <label
                className="font-semibold relative bottom-5 tracking-wide"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
                required
                className="w-full h-14 p-5 bg-blue-100 border-none focus:ring-0 rounded-lg"
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone Number"
              />
            </div>

            <div className="lg:mt-14 mt-0 lg:w-1/2 w-full">
              <label
                className="font-semibold relative bottom-5 tracking-wide"
                htmlFor="address"
              >
                What Address Do we Waybill To?
              </label>
              <textarea
                onChange={(event) => setAddress(event.target.value)}
                value={address}
                required
                rows={3}
                placeholder="Enter Your Delivery Address"
                className="w-full p-5 bg-blue-100 border-none focus:ring-0 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/*  TOTAL CALCULATION BOX */}
        <div className="my-10 bg-white border border-mainYellow rounded-lg py-5 px-10">
          {/* total */}
          <div className="flex items-center w-full mb-7">
            <div className="flex justify-start w-1/2">
              <p className="font-semibold tracking-widest text-gray-400">
                TOTAL CART PRICE:
              </p>
            </div>
            <div className="flex justify-end w-1/2">
              <p className="font-medium tracking-wide text-gray-400 text-right">
                ₦{total}
              </p>
            </div>
          </div>

          {/* delivery fee */}
          <div className="flex items-center w-full mb-7">
            <div className="flex justify-start w-1/2">
              <p className="font-semibold tracking-widest text-gray-400">
                DELIVERY FEE:
              </p>
            </div>
            <div className="flex justify-end w-1/2">
              <p className="font-medium tracking-wide text-gray-400 text-right">
                {total <= 0 ? ` ₦${0}` : ` ₦${deliveryFee}`}
              </p>
            </div>
          </div>

          {/* final total */}
          <div className="flex items-center w-full my-7">
            <div className="flex justify-start w-1/2">
              <p className="font-semibold tracking-widest text-gray-400">
                FINAL PAYMENT:
              </p>
            </div>
            <div className="flex justify-end w-1/2">
              <p className="font-semibold tracking-wide text-xl text-mainBlue text-right">
                ₦{finalTotal}
              </p>
            </div>
          </div>
        </div>

        {/* PAYMENT GATEWAY BUTTON */}
        <button
          className="w-full bg-mainBlue text-white font-medium tracking-wide py-3 rounded-lg"
          type="submit"
        >
          PAY
        </button>
      </form>
    </>
  );
}
