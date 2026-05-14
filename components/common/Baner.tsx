'use client'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import '../app/globals.css';

import banner2 from '../../public/banner2.jpg' 
import banner3 from '../../public/banner3.jpg' 



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Banner() {
  return (
    <div className="pt-[80px] md:pt-[100px] lg:pt-[100px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <Image src={banner3} alt='Eco Bắc Giang logo'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={banner2} alt='Eco Bắc Giang logo'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={banner3} alt='Eco Bắc Giang logo'/>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
