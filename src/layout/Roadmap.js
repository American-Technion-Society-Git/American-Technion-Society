import React, { useEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import ScrollSpy from "react-ui-scrollspy";
import { useNavigate } from 'react-router-dom';


const Roadmap = ({ roadmap, roadmapPage }) => {
    let scrollDirection;

    const navigate = useNavigate()

    useEffect(() => {
        // Scroll window to top
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        // Ensure ScrollTrigger is available
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            function draggableFunc(roadmap_height) {
                ScrollTrigger.create({
                    trigger: '.slider',
                    pin: true,
                    start: 'center center',
                    immediateRender: false,
                    autoRefreshEvents: "load",
                    end: () => '+=' + roadmap_height,
                });

                // Initialize Draggable
                gsap.registerPlugin(Draggable);

                const draggableDiv = document.getElementById('draggableDiv');
                scrollDirection = 0;
                let requestId;
                ScrollTrigger.refresh();

                Draggable.create(draggableDiv, {
                    type: 'y', // Only draggable in the Y-axis
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
                        gsap.to(draggableDiv, { y: 0, duration: 0.5, ease: 'power2.out' }); // Animate back to the original position
                    },
                });

                function scroll() {
                    window.scrollBy(0, scrollDirection);
                    requestId = requestAnimationFrame(scroll);
                }
            }

            if (roadmap.length > 0) {
                let roadmap_height = document.querySelector('.roadmap_list').clientHeight - 400;
                draggableFunc(roadmap_height);
                ScrollTrigger.refresh();
            }
        }
    }, [roadmap]); // Include roadmap as a dependency for the useEffect


    const data = roadmapPage ? roadmap.slice(0, 5) : roadmap



    return (
        <section className="roadmap">
            <div className="container-fluid">
                <div className="roadmap_inner">
                    <div className="heading">
                        <h6>
                            American Technion Society
                        </h6>
                        <h2>

                            100 Years Of Innovation

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
        </section>
    )
}

export default Roadmap
