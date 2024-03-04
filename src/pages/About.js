import React, { useState } from "react";
import logo from "../assets/logo.svg";
import parse from "html-react-parser";
import background from "../assets/invovation_hero_img.png";
import { Link } from "react-router-dom";
import Roadmap from "../layout/Roadmap";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const About = ({ blog, roadmap }) => {
  const [blogModalData, setBlogModalData] = useState({});

  const blogData = blog.slice(0, 6);

  return (
    <>
      <div
        className="modal fade .modal-fullscreen"
        id="blogModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 5.91L6 18.09"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 5.91L18 18.09"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <h1>{blogModalData.name}</h1>
                <br />
                <img width={"100%"} src={blogModalData.featured_image} />
                <br />
                <br />
                <p>{parse(`${blogModalData.description}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Header current="100" />

        {/* <section className="hero" style={{ backgroundImage: `url(${background})` }}>
                    <div className="container-fluid">

                        <div className="hero_inner">
                            <div>
                                <h1>

                                    Coming of Age

                                </h1>
                                <p>
                                “The Technion has helped visualize, plan, and implement Israel’s growth. It has aided in transforming a tiny country into a great center of science and research, sharing its advances with others.” 
Former Prime Minister Of Israel Golda Meir

                                </p>
                            </div>
                        </div>
                    </div>

                </section> */}

        <div className="w-full bg-[#F3F7F6] py-36">
          <div className="w-[70%] flex mx-auto">
            <div className="w-[45%]"></div>
            <div className="w-[55%]">
              <div className="mt-2">
                “The Technion has helped visualize, plan, and implement Israel’s
                growth. It has aided in transforming a tiny country into a great
                center of science and research, sharing its advances with
                others.”
              </div>
              <div className="mt-4">FORMER PRIME MINISTER OF ISRAEL</div>
              <div className="">GOLDA MEIR</div>
            </div>
          </div>
        </div>

        <Roadmap roadmap={roadmap} roadmapPage={false} />

        {/* <section className="blog_posts">
          <div className="container-fluid">
            <div className="blog_inner">
              <div className="heading">
                <h2>The University that Built a Nation</h2>
              </div>
              <div className="wrapper">
                {blogData.map((res, index) => {
                  const route = res.name.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <div key={index} className="post_wrapper">
                      <div className="thumbnail">
                        <img
                          src={res.featured_image}
                          alt=""
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#blogModal"
                        />
                      </div>
                      <div className="content_wrapper">
                        <div className="inner_wrapper">
                          <h4
                            onClick={() => {
                              setBlogModalData(res);
                            }}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#blogModal"
                          >
                            {res.name}
                          </h4>
                          <p>{parse(`${res.description}`)}</p>
                          <a
                            onClick={() => {
                              setBlogModalData(res);
                            }}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#blogModal"
                          >
                            Read More{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section> */}

        <Footer />
      </div>
    </>
  );
};

export default About;
