import React from "react";
import Navbar from "./Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Hero() {
  return (
    <>
      <section className="w-full px-5 lg:px-20">
        <Navbar />
      </section>

      <section className="w-full relative">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src="/brand/slide1.png" loading="lazy" alt="Marion Slide 1" />
          </div>

          <div>
            <img src="/brand/Slide2.png" loading="lazy" alt="Marion Slide 2" />
          </div>
        </Carousel>
      </section>
    </>
  );
}
