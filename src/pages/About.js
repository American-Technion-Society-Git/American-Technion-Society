import React, { useState } from "react";
import logo from "../assets/logo.svg";
import parse from "html-react-parser";
import background from "../assets/invovation_hero_img.png";
import bennet from "../assets/Bennett-Naftali-New.png";
import GoldaMeir from "../assets/Golda_Meir.jpg";
import naftalibg from "../assets/naftali_bg.png";
import { Link } from "react-router-dom";
import Roadmap from "../layout/Roadmap";
import Footer from "../layout/Footer";

import naturalGas from "../assets/Discovering-Natural-Gas.jpeg"

import yearsbg from "../assets/Historic-Technion.jpeg";

import Header from "../layout/Header";
import { FaArrowRight } from "react-icons/fa";

const About = ({ blog, roadmap }) => {
  const [blogModalData, setBlogModalData] = useState({});

  // const blogData = blog.slice(0, 6);

  const blogData = [
    {
      id: "002898da-74d8-46dc-9a5c-e356a4968b78",
      name: "Building the Infrastructure for a New State",
      description:
        "<p>By 1932, the Technion’s 65 graduates were building and designing the roads, bridges, and tunnels in pre-state Israel (Palestine). They were employed by the government’s Department of Public Works, constructing the port of Haifa, planning the Haifa-Baghdad Railway, and working for municipalities and private firms. In 1948, the birth of the State of Israel presented the University with great challenges. Newly trained architects designed neighborhoods and buildings to house hundreds of thousands of immigrants and refugees. The destiny of the nascent nation relied heavily on the skilled human resources the Technion produced to build its economy and military and to make the desert bloom.</p>",
      featured_image:
        "https://technionarchive.blob.core.windows.net/historical/IL-TEC-ARC_B300-83-29_0001_0001.jpg",
    },
    {
      id: "a53b2a23-9143-4371-a6c0-9452e8684ca9",
      name: "Ensuring Food Security",
      description:
        "<p>The Technion was instrumental in supporting Israel’s early agricultural development to ensure the nation could feed its growing population. Students originally maintained and reengineered tractors and equipment for farming. As Israel transitioned to become the Startup Nation, driven in large part by the Technion, the University helped drive the country’s growing prowess in agri-tech. From smart technologies to monitor and predict crop stress to the development of high-protein food alternatives such as milk produced without cows, honey without bees, and meat from a cow’s cells, the Technion is leading Israel’s food-tech revolution and will help provide sustainable food security solutions for the world.</p>",
      featured_image:
        "https://firebasestorage.googleapis.com/v0/b/american-technion-society.appspot.com/o/931631-blog4.jpeg?alt=media&token=55b6181a-efb4-4284-ab75-0a6dc88c9894",
    },
    {
      id: "ac225dac-8248-4ec9-b756-26282cc05a49",
      name: "Israel’s Defense and Security",
      description:
        "<p>From the very beginning, Technion students were a major resource for the Haganah, the pre-State paramilitary organization. Its Haifa unit was the largest in the country, and the Technion’s workshops secretly manufactured vital items, such as cartridge clips, gun parts, signaling keys, and heliographs, which helped launch the unique partnership between the Technion and the nation’s defense industry. During World War II, Technion engineers and skilled technicians opened and operated the region’s first wool-spinning plants, steel foundries for machinery, and chemical plants for pharmaceuticals, paints, and glue.</p>  <p classname='mt-4'> Perhaps the Technion’s most significant war contribution was its cooperation with Britain’s Royal Air Force in manufacturing replacement parts for warplanes. Minesweepers were built, warships repaired, and bolts manufactured. Technion laboratories tested and created new building materials, produced carbon for gas masks, improved the quality of flour, repaired electrical equipment and motors, developed instruments to detect the sound of planes, and more.</p><br/><p>After the War of Independence, surplus military planes were brought from Europe to the Technion to be reengineered for Israel’s new air force. Its first aircraft technicians were trained on Technion grounds. In the 1950s, the Technion’s aerospace engineering department was established. From that time forward, graduates have been key players in the development of Israel’s military and civilian aircraft, satellite, and defense systems.</p><br/><p>When Israel faced a barrage of missiles from Iraq during the Gulf War, it became clear that the nation’s defense weapons at the time were not sufficient. In 1991, a team of Technion alumni at Israel Aerospace Industries helped develop Israel’s first long-range antimissile defense system, the Arrow, and in 2008, another group of alumni made significant advancements to what is now the Arrow 3. when Israel experienced a massive rocket bombardment by Hezbollah in 2006, the need for a short-range antimissile defense system was identified. A team comprised of many Technion alumni at Rafael Advanced Defense Systems led the development of Iron Dome.</p><br/><p>Technion students and alumni continue to staff elite high-tech IDF units and work in Israel’s aerospace industry today and will continue to solve Israel’s defense challenges tomorrow.</p>",
      featured_image:
        "https://firebasestorage.googleapis.com/v0/b/american-technion-society.appspot.com/o/2044713-blog2.jpeg?alt=media&token=87d4f6c9-4346-49e1-b768-3e9cc5903714",
    },
    {
      id: "be42e293-0c53-441b-9a73-12e5652195b9",
      name: "Discovering Natural Gas",
      description:
        "<p>The discovery of gas fields in the Mediterranean 6 miles off Israel’s coast in 2010 was considered a major development for economic security; for energy independence, which had long been a strategic vulnerability; and in positioning Israel as a key player in the regional energy market. But first, Israel needed to find the petroleum and natural gas engineers to bring the gas to shore safely and process it efficiently. As with all new technological challenges, Israel turned to the Technion.</p><br/><p>The University immediately launched a master of energy engineering program with a focus on natural gas and petroleum engineering. Formal studies began in December 2011. Today, 70%  of Israel’s energy comes from natural gas. It has reduced carbon emissions by 32% and has saved the country about $6 billion in energy costs and $47.8 billion in pollution-related costs. With more natural gas than it can consume or export, Israel is currently in talks to supply gas to the European Union via a pipeline to Cyprus, which would be an economic boon for the tiny country.</p></p>",
      featured_image:
        naturalGas,
    },
    {
      description:
        "<p>In the 1990s, among the 700,000 new immigrants from the Soviet Union were 11,000 scientists, 58,000 engineers, and thousands of potential students. Many of them brought advanced skills that would benefit the country. Absorbing them was both a challenge and a great opportunity for the nation and the Technion. Careful planning and resource allocation allowed the Technion to grow its campus and invest in language and skill training, including the development of a series of books called “Hebrew for Technology and Science” written by Technion Hebrew teachers, which were used throughout the country.</p><br/><p>By the end of the decade, 17 scientists had joined the faculty, 550 were employed in laboratories, hundreds more found their way to private industry via the Technion, and hundreds of Russian students had enrolled and graduated. The investment the Technion made in them was exponentially paid back by their contributions to science and technology, helping pave the way to the Startup Nation boom.</p>",
      featured_image:
        "https://technionarchive.blob.core.windows.net/historical/IL-TEC-ARC_B300-61-50_0001_0001.jpg",
      id: "e19b936c-5e98-41fe-9f65-b722ed8c9bd2",
      name: "Absorbing Soviet Scientist",
    },
    {
      description:
        "<p>Since the 1937 founding of Mekorot, Israel’s national water company, Technion graduates have helped build and manage water resources, including the pipelines to Jerusalem in 1948 and to the Negev in 1955, as well as the national water carrier. They improved technologies, components, and facilities for desalination and gray-water recycling. One alumnus perfected drip irrigation which revolutionized global farming. These technologies have turned Israel from a water-deficient country to a water-abundant country. Today, Israel leads the world in water reclamation, recycling more than 90% of its wastewater to use in the agricultural and industrial sectors. In comparison, the U.S. recycles less than 10%.</p>",
      featured_image:
        "https://firebasestorage.googleapis.com/v0/b/american-technion-society.appspot.com/o/727129-blog3.jpeg?alt=media&token=cd77fd2d-d3e3-4313-add6-202d688de21e",
      id: "ed4fe980-f023-47ed-81bb-df191104d33a",
      name: "Making the Desert Bloom",
    },
  ];

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

        <div
          className="relative h-[64vh] bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${yearsbg})` }}
        >
          <div className="absolute bottom-[20%] right-0 bg-[#002147] h-[160px] w-full sm:w-[45%]">
            <div
              className="absolute w-full sm:w-1/2 top-1/2 text-center sm:text-left sm:left-12 transform -translate-y-1/2
                         text-white font-semibold text-3xl sm:text-4xl my-auto"
            >
              100 Years of Innovation
            </div>
          </div>
        </div>

        <div className="w-full bg-[#F3F7F6] pb-12 pt-24">
          <div className="w-[90%] md:w-[70%] flex flex-col md:flex-row gap-4 md:items-center justify-center mx-auto">
            <div className="w-full sm:w-[48%]">
              <div className="relative -mt-12 size-56 sm:size-[400px] mx-auto sm:mx-0 sm:ml-auto">
                <div className="absolute z-40  rounded-full size-44 sm:size-[230px] top-[52.5%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                  <img
                    src={GoldaMeir}
                    alt="Golda"
                    className="absolute transform "
                  />
                </div>
                <img
                  src={bennet}
                  alt="naftalibg"
                  className="absolute z-0 w-full h-full"
                />
              </div>
            </div>
            <div className="sm:w-[55%] mt-4">
              <div
                style={{ fontFamily: "Adobe Caslon Pro" }}
                className="mt-4 font-bold italic text-[21px] text-[#AA9767] sm:w-[400px]"
              >
                “The Technion has helped visualize, plan, and implement Israel’s
                growth. It has aided in transforming a tiny country into a great
                center of science and research, sharing its advances with
                others.”
              </div>
              <div className="mt-4 text-[17px] text-[#094A94]">
                FORMER PRIME MINISTER OF ISRAEL
              </div>
              <div className="text-[17px] text-[#094A94]">GOLDA MEIR</div>
            </div>
          </div>
        </div>

        <Roadmap roadmap={roadmap} roadmapPage={false} />

        <section className="blog_posts">
          <div className="container-fluid">
            <div className="blog_inner">
              <div className="heading">
                <h2>The University that Built a Nation</h2>
                <br />
                <p>
                  For 100 years, Technion administrators, faculty, and students
                  felt an existential obligation to secure and build the Jewish
                  homeland. This calling, combined with entrepreneurial and
                  technical know-how, will help the Technion community advance
                  Israel for the next 100 years and beyond as they strive to
                  find solutions to any challenge Israel faces and foster a
                  better world.
                </p>
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
                          {parse(`${res.description.substr(0,195)}`)}
                          <a
                            onClick={() => {
                              setBlogModalData(res);
                            }}
                            className="text-[#091f40]"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#blogModal"
                          >
                            <div className="flex items-center gap-1 text-[#094D9A] border-b-[3px] border-[#A7986D]">
                            Read More 
                            <FaArrowRight className="text-base"/>
                          </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
