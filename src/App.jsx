import React, { use } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

const App = () => {
  const [showCanvas, setshowCanvas] = useState(false);
  const [mousecursor, setmousecursor] = useState(null)
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    smooth: true;

    function circlemousefollower(){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#growingspan').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    })
}

  circlemousefollower();
    
  }, []);

 useEffect(() => {
  const handleClick = (e) => {
    const isShowing = showCanvas;

    if (!isShowing) {
      gsap.set(growingSpan.current, {
        scale: 0,
      });
      console.log(e, e.clientX, e.clientY)

      gsap.to(growingSpan.current, {
        scale: 1000,
        duration: 1.2,
        
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(growingSpan.current, {
            scale: 0,
            clearProps: 'all', 
            
          });
          
        },
      });

      gsap.to('body', {
        color: '#000',
        backgroundColor: '#fd2c2a',
        duration: 1.2,
        ease: 'power2.inOut',
        
        
      });
    } else {
      gsap.to('body', {
        color: '#000',
        backgroundColor: '#fdf8f8',
        duration: 1.2,
        ease: 'power2.inOut',
        

      });
    }
    console.log( e.clientX, e.clientY)
    setshowCanvas(!isShowing); 
  };

  const headingElement = headingref.current;
  headingElement.addEventListener('click', handleClick);

  return () => headingElement.removeEventListener('click', handleClick);
}, [showCanvas]);
  return (
    <>
    <span
    ref={growingSpan}
    id="growingspan"
    className="growing z-[-2} block  fixed  w-5 h-5 rounded-full bg-[#fd2c2a]">
    </span>
      <div className=" relative w-full min-h-screen z-[1]  font-PPNeueMontreal">
        {showCanvas &&
          data[0].map((canvasdets, idx) => <Canvas details={canvasdets} />)}
        <div className="relative z[0]"  >
          <nav className="w-full  border-b  border-gray-200 px-3 py-3 flex items-center justify-between font-inter">
            {/* Left: Logo */}
            <div className="text-base font-sm text-black">
              Thirtysixstudio
            </div>

            {/* Right: Menu Links + More Icon */}
            <div className="flex items-center space-x-6 text-sm text-black">
              <a href="#" className="hover:underline">
                What we do
              </a>
              <a href="#" className="hover:underline">
                Who we are
              </a>
              <a href="#" className="hover:underline">
                How we give back
              </a>
              <a href="#" className="hover:underline">
                Talk to us
              </a>
            </div>
          </nav>
          <div className=" textcontainer py-12 w-full px-[25.5%]">
            <div className="text w-[40%]   ">
              <h3 className="text-3xl relative z-[-100]">
                At Thirtysixstudio, we build digital assets and immersive
                experiences for purposeful brands.
              </h3>
              <p className="text-[13px] py-8  w-[120%]">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking what digital craft can do
                for present- day ads and campaigns.
              </p>
              <p className="text-[15px]">Scroll</p>
            </div>
          </div>

          <div className="w-full border-b border-gray-200 ">
            <h1 ref={headingref} className=" text-[18.5rem] my-19  ">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
      <div className="h-screen relative z-[1]  font[helvetica] w-[83%] px-40 ml-80 ">
        <div className=" flex  pl-20 ">
          {showCanvas &&
          data[1].map((canvasdets, idx) => <Canvas details={canvasdets} />)}
         
          <div className="  flex relative z[1] w-full ">
            <h3 className="  font-sm text-xl py-12 w-[20%] ">01--WHAT WE DO</h3>
            <p className=" text-3xl py-12 ml-85 w-[35%]">
              We aim to elevate digital production in the advertising space,
              bringing your ideas to life.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col pl-78 mt-35 ml-8 ">
          <p className="py-9 mx-78  w-[40%]">
            As a contemporary studio, we use cutting-edge design practices and
            the latest technologies to deliver current digital work.
          </p>
          <p className="  mx-78  w-[40%]">
            Our commitment to innovation and simplicity, paired with our agile
            approach, ensures your journey with us is smooth and enjoyable from
            start to finish.
          </p>
        </div>
      </div>
      
    </>
  );
};

export default App;
