import React, { useState } from 'react'
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

import img1 from "../assets/carousel/family_hero_img.png"
import img2 from "../assets/carousel/invovation_hero_img.png"
import img3 from "../assets/carousel/loginbg.jpg"
import img4 from "../assets/carousel/next_hero_img.png"
import img5 from "../assets/carousel/roadmap_placeholder.png"
import img6 from "../assets/carousel/story.png"

const Carrousel = () => {

    let images = [
        {
          key: 1,
          content: (
            <img src={img1} alt='image' className='w-[200px] h-[480px]' />
          )
        },
        {
          key: 2,
          content: (
            <img src={img2} alt='image' className='w-[200px] h-[480px]' />
          )
        },
        {
          key: 3,
          content: (
            <img src={img3} alt='image' className='w-[200px] h-[480px]' />
          )
        },
        {
          key: 4,
          content: (
            <img src={img4} alt='image' className='w-[200px] h-[480px]' />
          )
        },
        {
          key: 5,
          content: (
            <img src={img5} alt='image' className='w-[200px] h-[480px]' />
          )
        }
      ];
      
    let  slides = [
        {
          key: 1,
          content: (
            <div className=' h-[200px] overflow-hidden'>
                <img src={img1} alt="1" className='w-full h-full'/>
            </div>
            )
        },
        {
          key: 2,
          content: (
            <div className=' h-[200px] overflow-hidden'>
                <img src={img2} alt="2" className='w-full h-full'/>
            </div>
            )
        },
        {
          key: 3,
          content: (
            <div className=' h-[200px] overflow-hidden'>
                <img src={img3} alt="3" className='w-full h-full'/>
            </div>
            )
        },
        {
          key: 4,
          content: (
            <div className=' h-[200px] overflow-hidden'>
                <img src={img4} alt="4" className='w-full h-full'/>
            </div>
            )
        },
        {
          key: 5,
          content: (
            <div className=' h-[200px] overflow-hidden'>
                <img src={img5} alt="5" className='w-full h-full'/>
            </div>
            )
        },
        {
            key: 6,
            content: (
              <div className=' h-[200px] overflow-hidden'>
                  <img src={img6} alt="6" className='w-full h-full'/>
              </div>
              )
          }
      ]

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showArrows, setShowArrows] = useState(true);
    const [goToSlide, setGoToSlide] = useState(null);
  return (
    <div className='w-full h-full'>
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  )
}

export default Carrousel
