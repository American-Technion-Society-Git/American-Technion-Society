import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import ScrollSpy from "react-ui-scrollspy";
import { useNavigate } from "react-router-dom";

import dividerLine from "../assets/100yearsline.png";
import Line from "../assets/Line.png";
import ellipse from "../assets/Elipses.png";

const Roadmap = ({ roadmap, roadmapPage }) => {
  let scrollDirection;

  const navigate = useNavigate();

  useEffect(() => {
    // Scroll window to top
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    // Ensure ScrollTrigger is available
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      function draggableFunc(roadmap_height) {
        ScrollTrigger.create({
          trigger: ".slider",
          pin: true,
          start: "center center",
          immediateRender: false,
          autoRefreshEvents: "load",
          end: () => "+=" + roadmap_height,
        });

        // Initialize Draggable
        gsap.registerPlugin(Draggable);

        const draggableDiv = document.getElementById("draggableDiv");
        scrollDirection = 0;
        let requestId;
        ScrollTrigger.refresh();

        Draggable.create(draggableDiv, {
          type: "y", // Only draggable in the Y-axis
          edgeResistance: 0.9, // Adjust resistance to slow down when reaching the edges
          bounds: { minY: -4 * 16, maxY: 4 * 16 }, // Limit drag to 4rem in both directions (16px per rem)
          onDrag: function () {
            // Triggered during dragging
            if (this.y < 0) {
              // If dragging upwards
              scrollDirection = -400;
            } else {
              // If dragging downwards
              scrollDirection = 400;
            }

            // Trigger continuous scroll
            cancelAnimationFrame(requestId);
            scroll();
          },
          onDragEnd: function () {
            // Triggered when the drag ends
            cancelAnimationFrame(requestId);
            gsap.to(draggableDiv, { y: 0, duration: 0.5, ease: "power2.out" }); // Animate back to the original position
          },
        });

        function scroll() {
          window.scrollBy(0, scrollDirection);
          requestId = requestAnimationFrame(scroll);
        }
      }

      if (roadmap.length > 0) {
        let roadmap_height =
          document.querySelector(".roadmap_list1").clientHeight - 400;
        draggableFunc(roadmap_height);
        ScrollTrigger.refresh();
      }
    }
  }, [roadmap]); // Include roadmap as a dependency for the useEffect

  const data = roadmapPage ? roadmap.slice(0, 3) : roadmap;

  const [index, setIndex] = useState(0);
  const [year, setYear] = useState();

  useEffect(() => {
    setYear([data[0]?.year]);
  }, [data]);

  const increaseYear = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setYear(data[index + 1].year);
    }
  };

  const decreaseYear = () => {
    if (index > 0) {
      setIndex(index - 1);
      setYear(data[index - 1].year);
    }
  };

  return (
    <>
      <div className="bg-[#b6a781] pb-12 ">
        <div className="font-semibold text-4xl text-center text-white py-12">
          Technion Stories
        </div>

        <div className="relative w-[95%] md:w-[70%] mx-auto ">
          <div className="scroll-area sm:h-[1100px] sm:overflow-y-hidden ">
            {roadmap.length > 0 &&
              data.map((res, index) => (
                <div className="relative flex gap-2 h-[420px] roadmap_list1 group overflow-hidden">
                  <div className="w-[35%] sm:w-[45%]  mt-2">
                    <div className="ml-auto mr-4 size-[120px] sm:size-[180px] md:size-[250px] rounded-full overflow-hidden">
                      <img
                        src={res.featured_image}
                        alt="Year Image"
                        className="size-[150% size-[120px] sm:size-[180px] md:size-[380px] object-cover md:object-center "
                      />
                    </div>
                  </div>
                  <div className="w-[6%] overflow-hidden">
                    <img src={dividerLine} alt="line" className="w-6 mx-auto" />
                  </div>
                  <div className="w-[59%] sm:w-[45%] font-semibold mt-4">
                    <div className="text-[#094D9A] text-3xl md:text-4xl">{res.year}</div>
                    <p className="w-[100%] sm:w-[60%] text-white text-[14px] leading-snug sm:text-[16px] md:text-[18px] font-medium">
                      {res.name}
                    </p>
                  </div>
                  {/* <div className="absolute top-[58%] left-[30%] transform -translate-y-1/2 transition-transform duration-[1000ms] translate-x-[100vw] group-hover:translate-x-0">
                    <img
                      src={ellipse}
                      alt="elipse"
                      className=" opacity-[0.92] size-[100%]"
                    />
                  </div> */}
                </div>
              ))}
          </div>

          {!roadmapPage && (
            <div className="hidden sm:block sm:absolute top-0 right-0">
              <div className="slide sticky top-0 right-0 z-40">
                <div
                  className="arrow up_arrow mx-auto
                    size-[1.8rem]
                    sm:size-[2rem]
                    md:size-[2.825rem]
                  "
                  style={{}}
                  onClick={() => {
                    // window.scrollBy(0, -400);
                    decreaseYear();
                    document.querySelector(".scroll-area").scrollBy(0, -420);
                  }}
                >
                  <svg
                    className="w-[12px] h-[6px] md:w-[14px] md:h-[8px]"
                    // width="14"
                    // height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 7L7 1L1 7"
                      stroke="#7F7F7F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <ul className="">
                  <img
                    src={Line}
                    alt="line"
                    className="mx-auto w-[3px] h-[52px] sm:h-[72px] pointer-events-none select-none"
                  />
                  <div
                    className="pointer-events-none select-none border-2 border-[#cecece] bg-white drop-shadow-xl
                    flex items-center justify-center rounded-full text-[#094D9A] font-bold
                    size-10 
                    sm:size-14 sm:text-lg
                    md:size-20 md:text-xl
                    "
                  >
                    {year}
                  </div>
                  <img
                    src={Line}
                    alt="line"
                    className="mx-auto w-[3px] h-[52px] sm:h-[72px] pointer-events-none select-none"
                  />
                </ul>
                <div
                  className="arrow down_arrow mx-auto
                    size-[1.8rem]
                    sm:size-[2rem]
                    md:size-[2.825rem]
                  "
                  onClick={() => {
                    // window.scrollBy(0, 400);
                    increaseYear();
                    document.querySelector(".scroll-area").scrollBy(0, 420);
                  }}
                >
                  <svg
                    className="w-[12px] h-[6px] md:w-[14px] md:h-[8px]"
                    // width="14"
                    // height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 1L7 7L1 1"
                      stroke="#7F7F7F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        {roadmapPage && (
          <div className="flex justify-center mt-8">
            <button
              className="text-white font-semibold bg-[#094D9A] hover:bg-[#002147] px-4 py-4"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "instant" });
                navigate("/100-years-of-innovation");
              }}
            >
              View Full Timeline
            </button>
          </div>
        )}
      </div>

      {/* <section className="roadmap">
                <div className="container-fluid">
                    <div className="roadmap_inner">
                        <div className="heading">
                            <h2>

                                100 Years of Innovation

                            </h2>
                        </div>
                        <div className="slider">
                            <div className="arrow up_arrow" onClick={() => {
                                window.scrollBy(0, -400);
                            }}>
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7L7 1L1 7" stroke="#7F7F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <ul className="year" id="draggableDiv">
                                {
                                    data.map((res, index) => {
                                        return <li key={index} className='yeartag' data-to-scrollspy-id={`year${res.year}`}>{res.year}</li>
                                    })
                                }
                            </ul>
                            <div className="arrow down_arrow" onClick={() => {
                                window.scrollBy(0, 400);
                            }}>
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 1L7 7L1 1" stroke="#7F7F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="roadmap_list">
                            {
                                roadmap.length > 0 &&
                                <ScrollSpy>
                                    {
                                        data.map((res, index) => {
                                            ScrollTrigger.refresh();
                                            return (

                                                <div id={`year${res.year}`} key={index} className="roadmap_box">
                                                    <div className="image">
                                                        <img src={res.featured_image} alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <p className="cursive">{res.year}</p>
                                                        <h4>
                                                            {res.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </ScrollSpy>
                            }
                        </div>
                        {roadmapPage &&
                            <div style={{display:"flex",justifyContent:"center",marginTop:"5rem"}}>
                                <button className='btn btn-primary' onClick={()=>{
                                    window.scrollTo({ top:0, behavior: "instant"})
                                    navigate('/100-years-of-innovation')
                                }}>Explore More</button>
                            </div>}
                    </div>
                </div>
            </section> */}
    </>
  );
};

export default Roadmap;
