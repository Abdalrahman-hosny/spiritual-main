import React, { useEffect } from 'react'
import Herosection from './Herosection'
import Navbar from '../Navbar/Navbar'
import Features from './Features'
import CourseSlider from './CourseSlider'
import HowWork from './HowWork'
import Footer from '../Footer/Footer'

export default function HomePage() {
  useEffect(()=>{
       window.scrollTo({
        top: 0,
        behavior: "smooth", // smooth scrolling
      });
  },[])
  return (
    <div className='min-h-screen overflow-hidden'>
        <Navbar bg={`hero bg-black/90`} />
      <Herosection/>
      <Features/>
      <CourseSlider/>
      <VideoSection/>
      <HowWork/>
      <Footer/>
     
    </div>
  )
}


const VideoSection = () => {
  return (
    <div className="flex justify-center items-center w-full px-4 py-10">
      <div className="w-[1241px] max-w-full h-[600px] ">
        <iframe
          className="w-full h-full rounded-[30px]"
          src="https://www.youtube.com/embed/jK75iRv33mI?si=2TR3A2QE7CL4WBCB"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};





