import React, { useState,useEffect } from "react";
import logo from "../assets/logo.svg";
import nextbg from "../assets/nextyearshero.png";
import bennet from "../assets/Bennett-Naftali-New.png";
import naftali from "../assets/naftali.png";
import frame from "../assets/frame.png";
import naftalibg from "../assets/naftali_bg.png";
import background from "../assets/next_hero_img.png";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import parse from "html-react-parser";
import Header from "../layout/Header";

import blog1 from "../assets/blogs/blog1.png";
import blog2 from "../assets/blogs/blog2.png";
import blog3 from "../assets/blogs/blog3.png";
import blog4 from "../assets/blogs/blog4.png";
import { FaArrowRight } from "react-icons/fa";

const NextYears = ({ blog }) => {
  const handleClick = (index) => {
    document.getElementById(`blogPicture${index}`).click();
  };

  const [blogModalData, setBlogModalData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://p67.d21.myftpupload.com/wp-json/showFavorites/v2?post_type=post')
      .then(response => response.json())
      .then(json => setData(json.data))
      .catch(error => console.error(error));
  }, []);


console.log(data);
  //const blogData = blog.slice(0, 4);

  const blogs = [
    {
      description:
        "<p>Frankly, I think 100 years is too far to look into the future because we will see dramatic new scientific areas emerge 20 years from now. My grandfather immigrated to Israel in 1946 from Holland to be a Technion student in civil engineering. At that time, civil engineering and mechanical engineering were the most prestigious fields you could study. Back then, the disciplines of science that I work in, like computer science and electrical engineering, did not even exist as separate fields. In comparison, today progress happens even more quickly. This rapid progress is especially apparent in disciplines like quantum technologies and AI.</p><br/><p>There is a lot of public interest in quantum computing, and I don’t think there is any doubt that we will have quantum computers in 100 years, and that their discovery will be remembered as fundamental as the invention of computing itself. But much earlier, we are already benefiting today from certain quantum technologies, like atomic clocks for navigation and MRI machines for medical imaging.</p><br /><p>Another direction where the field of quantum is very promising right now, but is not yet appreciated, is in its potential to find new innovations for old problems and improve existing technologies, such as our lab’s work on scintillators and X-ray imaging. This idea of applying a new scientific concept into old problems is not unique to quantum. In photonics and nanophotonics, scientists are developing large-scale filters based on nanoparticles that can alter sunlight that is absorbed by apple trees to control their taste, size, and what time of year they ripen. New discoveries in fundamental science and new tech innovations are just beautiful—it’s hard to imagine where it stops.</p><br /><p>Much before quantum technologies ripen, we will see AI play a major role in science and even in making new scientific discoveries. This will happen in less than 100 years. We can already see this with the Ramanujan Machine project, where my colleagues and I published some of the pioneering papers that use computer algorithms for enhancing human discovery. This area of “AI for science” really alters the way we make progress in science and technology. Is it possible that AI is making us irrelevant? Or worse, could it become dangerous to our societies, in science and beyond it? It is important to ask in what way will we be able to adapt and use AI to make ourselves more effective as scientists. I think it is in our hands to affect which path it will be.</p>",
      featured_image: blog1,
      //   "https://firebasestorage.googleapis.com/v0/b/american-technion-society.appspot.com/o/9602038-blog2.jpeg?alt=media&token=f8fd2ec0-ddcb-4441-94c6-0f890edf1b73",
      id: "25c2b7aa-8945-461b-95c5-cc89be6b71db",
      name: "The Next Century in Quantum and AI",
      author: "Professor Ido Kaminer",
    },

    {
      description:
        "<p>The next 100 years in my field of bio-inspired engineering will be focused on early detection of cancer and neurodegenerative diseases. Right now, we might have the ability to treat cancer and we might have the ability to reduce the side effects—but can we detect it early, before it causes any harmful symptoms and before it spreads throughout the body? I think this is the main challenge: Keep treating, but do a better job of detecting.</p><br/><p>Hopefully, we do that using some of the biomimetic nanoparticles being developed by my team. Nature is the best engineer. It has billions of years of training and does billions of years of working experiments every day. I ask my team, “How can we use nature’s tools or mimic them to open new doors to new translational  therapeutics ? ”Think of it: We are in 2024 and we still have Parkinson’s, Alzheimer’s, and ALS patients. In my field, we are taking all the lessons we’ve learned from cancer and are applying them to the brain.</p><br/><p>I think the use of mRNA delivery systems in COVID-19 vaccines accelerated and profoundly expanded the ways the scientific community thinks about delivering medicine. But in the future, the route of delivery will change: no more needles. We are working on intranasal delivery, or the sniffing of mRNA particles to allow more affordable and portable delivery. When you smell a flower or a baby’s diaper, the molecules cross directly to your olfactory bulb in the brain. We have proof-of-concept experiments that if you sniff our nanoparticles, you find them in the olfactory bulb. And now the question is, what kinds of cells do you target in this bulb, and what can you deliver to them?</p><br/><p>I really believe that by giving the gift of life, you can make a worldwide impact. Disease and human health are issues that affect us all. No matter your race, religion, gender, nationality, or class, you know people who have cancer, who have a neurodegenerative disease, and families that have the burden of treating them. If you ask me what I hope my research at the Technion will do—and I truly believe this—it would be to give the gift of life and good health not only for people in the Middle East, but also for everyone on the planet. Science brings people together, and it may be one thing that can cure wounds that we are all now bleeding from.</p>",
      name: "Continue to Treat, but Focus on Detection",
      featured_image: blog2,
      id: "7fc30287-2e67-4385-83da-51b113625fda",
      author: "Professor Assaf Zinger",
    },

    {
      id: "d2142d3e-4f4b-439c-b8f6-8d2e6128c4c7",
      description:
        "<p>In the next 100 years—and even in the next three to four years—there will be a huge advance in what we call alternative proteins. Instead of what we see in science fiction, where we’re flying into space and eating a bunch of pills, I think we will just have better food that looks like, tastes like, and is as good as food sourced from animals, but it will not come from them. This change will happen because there simply is no other choice. Our planet cannot sustain the food supply chains we need in order to feed the population.</p><br/><p>The next generation of drug delivery won’t be limited to a simple capsule that contains a drug and maybe one other antibody or protein. It will be more sophisticated. And it’s already happening. Nano-Ghosts made in my lab from the membranes of stem cells transform particles so that they can be filled with the drugs. These Nano-Ghosts pass the blood-brain barrier—the blood vessels that feed and protect the brain—but can prevent some types of drugs from reaching it. We are looking at ways they can arrest disease in multiple sclerosis and glioblastoma. Empty Nano-Ghosts can reduce inflammation not only in tumors, but also in neurodegenerative diseases like muscular dystrophy. The system is not just a drug delivery mechanism; it’s a technology that can modulate the immune response.</p><br/><p>We need to bring together scientists from totally different research areas to think about a broader spectrum of research. Once we do that, I think we will see more advances. I take myself as an example. I was doing tissue engineering for medicine, but I saw a great opportunity to apply my knowledge to the area of cultivated meat to help promote sustainable food production. The process of creating a piece of heart tissue (the heart is also a muscle) and creating a steak from cultivated cow cells has a lot of similarities.</p><br/><p>We call Israel a high-tech startup nation. Biotech is the high tech of tomorrow, and Israel will be a startup nation in biotech. We have excellent scientists and excellent knowledge, and we are fast-thinking. We know how to be nimble to develop technologies very quickly so that we can bring them to market and drive wide-scale impact.</p>",
      featured_image: blog3,
      name: "Biotech Is the High Tech of Tomorrow",
      author: "Professor Marcelle Machluf ",
    },

    {
      featured_image: blog4,
      name: "How Will We Stay Healthy 100 Years From Now?",
      description:
        "<p>The next century will see a global health revolution driven by ubiquitous access to advanced noninvasive diagnostic tools that enable real-time monitoring and early detection of diseases for billions of people across the globe. Nanorobots could revolutionize medicine and surgery by traversing the human body to conduct repairs and administer targeted treatments. Artificial intelligence could sift through personal health data to detect the advent of diseases and medical conditions before symptomatic manifestations appear, creating an era where chronic ailments do not mar the essence of life, and wellness is not a battle but a harmonious dance. With universal access to advanced diagnostics and treatments, the barriers of inequality in health care could be demolished, fostering an ethical era where technology is intertwined with humanity’s collective consciousness and values.</p><br/><p>At the same time, self-sustaining nano sensors could act as omnipresent sentinels that monitor ecological changes and implement corrective measures autonomously. Coupled with revolutionary shifts in energy production, storage, and consumption, these environmental guardians could herald a new era of ecological balance and sustainability that mitigates the impacts of climate change and preserves the sanctity of life on Earth. As technology and biology become seamlessly integrated, the emergence of biohybrid systems could enhance natural human capabilities and extend life, marking a new epoch where augmented people are commonplace.</p><br/><p>Ultimately, this transformative trajectory could bring about a world of innovation and knowledge, with the Technion and Israel leading the charge toward a brighter and more harmonious future for all. The scientific discourses led by the Technion and Israel could be rich tapestries of interdisciplinary dialogues, encompassing myriad fields such as nanotechnology, AI, medicine, environmental science, and space exploration. These dialogues could foster the germination of ideas that possess the potential to solve the most pressing challenges of humanity and unlock the untapped potential of the universe.</p>",
      id: "f886986b-f069-4f44-a3b9-4134368b3629",
      author: "Professor Hossam Haick",
    },
  ];

  return (
    <>
      <div
        className="modal fade .modal-fullscreen"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Naftali Bennett
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section className="message">
                <div className="container-fluid">
                  <div className="message_inner">
                    <div className="image_wrapper">
                      <div className="person_wrapper">
                        <img src={naftali} alt="" />
                      </div>
                      <img src={frame} alt="" className="frame img-fluid" />
                    </div>
                    <div className="content">
                      <div className="heading">
                        <h6>Naftali Bennett: Technion Pride</h6>

                        <h3 className="cursive">
                          Naftali Bennett, Israel’s 13th prime minister and a
                          Haifa native, may have obtained a law degree, but the
                          high-tech entrepreneur has the spirit, drive, and
                          pride of the Technion at his core.
                        </h3>
                        <p>
                          “I grew up in the Technion; it was really central to
                          my identity,” the former prime minister said in a
                          recent interview with ATS staff. His father, Jim
                          Bennett, worked in the Technion’s fundraising
                          department. “Every Friday, my family would go to the
                          Technion pool, and I’d watch my f ather play
                          basketball. It was just a fundamental part of who I
                          was.” Growing up in the Technion’s shadow also created
                          high expectations and pride. “The Technion projected
                          an aura of excellence and science into the city.” The
                          Technion’s leading role in hig h tech and
                          entrepreneurship also clearly impacted the former
                          prime minister. In 1996, Mr. Bennett began pursuing a
                          degree in law at The Hebrew University of Jerusalem,
                          while at the same time starting work for a software
                          company. By 1999, he had co - founded an anti - fraud
                          company in New York called Cyota. He served as its
                          chief executive officer until Cyota was sold in 2005
                          to U.S. - based RSA Security for $145 million. Always
                          a staunch Zionist, he included a stipulation that the
                          Israeli arm remain intact. Toda y, 400 Israelis are
                          employed in the company’s offices in Be’er - Sheva and
                          Herzliya. Following a brief stint from 2006 to 2008 as
                          chief of staff to then - opposition leader Benjamin
                          Netanyahu, in 2009 Mr. Bennett became CEO of Soluto, a
                          startup specializing i n cloud computing services.
                          That company was sold to Asurion, another American
                          company, for $130 million in 2013. Prior to, during,
                          and following Mr. Bennett’s high - tech career, he
                          assumed strategic roles in the Israel Defense Forces.
                          He became a commander in the Maglan , a unit that
                          specializes in operating behind enemy lines. While he
                          was living in the United States, he repeatedly
                          traveled to Israel to perform reserve duty. He served
                          during both intifadas and in the second Lebanon War in
                          2006. Mr. Bennett’ s political career began in earnest
                          in 2012 when he became the leader of the Jewish Home
                          party. Between 2013 and 2021 he held significant
                          cabinet positions, including minister of economy,
                          minister of Jerusalem and diaspora affairs, minister
                          of religious se rvices, minister of education,
                          minister of defense, and finally prime minister in
                          2021, when he formed a broad coalition and led the
                          most diverse government in Israel’s history. And
                          throughout his political service, he looked to the
                          Technion for leadership and partnership in many
                          initiatives. “The Technion is one of Israel’s national
                          treasures — a national treasure that is central to
                          Israel’s success and national security,” Mr. Bennett
                          said. The former prime minister lauded the Technion’s
                          commitment to exc ellence in education. When he was
                          minister of education and saw the steady decline in
                          advanced high school mathematics as a national crisis,
                          he sought help from the Technion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade .modal-fullscreen"
        id="blogModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content relative">
            <div
              className="modal-header"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
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
                <br />
                <div className="w-full overflow-hidden">
                  <img
                    width={"100%"}
                    height={"200px"}
                    className="aspect-video"
                    src={blogModalData.image}
                  />
                </div>
                <h4 className="mt-4">{blogModalData.title}</h4>
                <div className="text-[17px] mt-2 mb-2">{blogModalData.author}</div>
                {parse(`${blogModalData.content}`)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="viewport">
        <div id="content">
          <Header current="Next" />
          <div
            className="relative h-[64vh] bg-cover bg-top"
            style={{ backgroundImage: `url(${nextbg})` }}
          >
            <div className="absolute bottom-[20%] right-0 bg-[#002147] h-[160px] w-full sm:w-[45%]">
              <div
                className="absolute w-full sm:w-1/2 top-1/2 text-center sm:text-left sm:left-12 transform -translate-y-1/2
                         text-white font-semibold text-3xl sm:text-4xl my-auto"
              >
                Reimagining the Next 100 Years
              </div>
            </div>
          </div>
          <div className="w-[90%] md:w-[65%] mx-auto mt-12">
            <div>
              <p>
                Over the past 100 years, fantastic leaps in the advancement of
                science and technology have revolutionized the world. The
                automobile replaced the horse and buggy; penicillin saved
                hundreds of millions of lives; and the invention of the
                computer, the World Wide Web, and digital communications and
                devices impacted our lives in ways our grandparents couldn’t
                have imagined. What will the next 100 years bring?
              </p>
              <br />
              <p>
                Imagine advancements in biotech that enable personalized
                treatments and cures for diseases. Could nanorobots deliver
                drugs directly to the site of disease or heal injuries? What
                about being able to detect and even prevent disease before it
                manifests? Will food be sourced from animals but not come from
                them? Will the Technion’s world-leading research in quantum
                technologies and artificial intelligence provide unmatched
                cybersecurity and unimaginably powerful computers that will also
                impact everything around us? We asked four leading Technion
                scientists to share their visions for scientific developments in
                the next 100 years.
              </p>
            </div>
            <div class="reimagining_blog row">
            {data.map((res) => (

	<div class="col-sm-6 mb-4">
		<div class="overflow-hidden cursor-pointer">
			<img src={res.image} 
      alt="Blog Image" 
      class="object-cover w-full h-full" 
      onClick={() => {
                     setBlogModalData(res);
                   }}/>
		</div>
		<div class="mb-2">
			<div class="flex flex-col gap- mt-2 h-full w-full text-[#002147] font-semibold">
				<h4 onClick={() => {
                       setBlogModalData(res);
                     }}>{res.title}</h4>
				<div class="text-[17px]">{res.author}</div>
        <Link
                     onClick={() => {
                       setBlogModalData(res);
                     }}
                     to="/"
                     id={`blogPicture${res.id}`}
                     className="flex  mt-1"
                     type="button"
                     data-bs-toggle="modal"
                     data-bs-target="#blogModal"
                   >
				<div className="flex items-center gap-1 text-[#094D9A] border-b-[3px] border-[#A7986D]">
                       Read More 
                       <FaArrowRight className="text-base"/>
                     </div>
                     
                   </Link>
			</div>
		</div>
	</div>
	))}
</div>
          </div>


          <div className="w-full bg-[#F3F7F6] py-8 mt-12 ">
            <div className="w-[90%] md:w-[70%] flex flex-col md:flex-row gap-4 md:items-center justify-center mx-auto">
              <div className="w-full sm:w-[48%]">
                <div className="w-full sm:size-[400px] mx-auto sm:mx-0 sm:ml-auto">
                  <div className="rounded-full size-72 mx-auto sm:mx-0 sm:size-96 overflow-hidden">
                    <img src={bennet} alt="Naftali" className=" " />
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="text-[23.48px] font-semibold text-[#094A94]">
                  Former Israeli Prime Minister
                </div>
                <div className="text-[41.88px] leading-10">Naftali Bennett</div>
                <div
                  style={{ fontFamily: "Adobe Caslon Pro" }}
                  className="mt-4 text-[19px] text-[#AA9767] font-bold italic w-full sm:w-[400px] "
                >
                  "Israel would not be the Startup Nation without the Technion,
                  full stop. I can't imagine a better ROI for Israel's
                  prosperity, national security, and social coherence than
                  investing in the Technion."
                </div>
                <a
                  href="#"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ backgroundColor: "#094D9A" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#002147")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#094D9A")
                  }
                  className="btn btn-accent mt-4 px-4 py-3 text-white"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <section className="content_block md:h-[450px] flex items-center">
            <div className="container-fluid">
              <div className="content_block_inner">
                <div className="heading">
                  <h2>Global Centennial Campaign for the Technion</h2>
                  <a
                    href="https://ats.org/centennial/"
                    target="_blank"
                    className="btn btn-secondary"
                  >
                    Learn More
                  </a>
                </div>
                <div className="font-semibold">
               
                  <p>
                    Your support of the Technion will help solve many of
                    humanity's most pressing global challenges. The Global
                    Centennial Campaign will advance multidisciplinary research
                    in four critical areas: climate change and sustainability,
                    human health, impact technologies, and Israel's security.
                  </p>
                 
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default NextYears;
