import React, { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.svg";
import naftali from "./assets/naftali.png";
import naftalibg from "./assets/naftali_bg.png";
import frame from "./assets/frame.png";
import bennet from "./assets/Bennett-Naftali-New.png";
import Globalbg from "./assets/GlobalCenttennial.png";
// import videoSrc from "./assets/hero-bg-video.mp4";
import videoSrc from "./assets/hero-cropped-bg-video1.mp4";
import videoSrc2 from "./assets/hero-bg-video1.mp4";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import Roadmap from "./layout/Roadmap";
import Footer from "./layout/Footer";
import parse from "html-react-parser";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "./layout/Header";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

import blog1 from "./assets/blogs/blog1.png";
import blog2 from "./assets/blogs/blog2.png";
import blog3 from "./assets/blogs/blog3.png";
import blog4 from "./assets/blogs/blog4.png";

const Home = ({ data, blog, roadmap, values }) => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [storyEmail, setStoryEmail] = useState("");

  const [file, setFile] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUpload, setImgUpload] = useState(false);
  const [fileLoader, setFileLoader] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [approved, setApproved] = useState([]);
  const [storySubmission, setStorySubmission] = useState(false);
  const [blogModalData, setBlogModalData] = useState({});
  const [posts, setData] = useState([]);


  const linkRef = useRef(null);

  // Function to handle manual click
  const handleClick = (index) => {
    document.getElementById(`blogPicture${index}`).click();
  };

  const blogs = [
    {
      description:
        "<p>Frankly, I think 100 years is too far to look into the future because we will see dramatic new scientific areas emerge 20 years from now. My grandfather immigrated to Israel in 1946 from Holland to be a Technion student in civil engineering. At that time, civil engineering and mechanical engineering were the most prestigious fields you could study. Back then, the disciplines of science that I work in, like computer science and electrical engineering, did not even exist as separate fields. In comparison, today progress happens even more quickly. This rapid progress is especially apparent in disciplines like quantum technologies and AI.</p><br/><p>There is a lot of public interest in quantum computing, and I don’t think there is any doubt that we will have quantum computers in 100 years, and that their discovery will be remembered as fundamental as the invention of computing itself. But much earlier, we are already benefiting today from certain quantum technologies, like atomic clocks for navigation and MRI machines for medical imaging.</p><br /><p>Another direction where the field of quantum is very promising right now, but is not yet appreciated, is in its potential to find new innovations for old problems and improve existing technologies, such as our lab’s work on scintillators and X-ray imaging. This idea of applying a new scientific concept into old problems is not unique to quantum. In photonics and nanophotonics, scientists are developing large-scale filters based on nanoparticles that can alter sunlight that is absorbed by apple trees to control their taste, size, and what time of year they ripen. New discoveries in fundamental science and new tech innovations are just beautiful—it’s hard to imagine where it stops.</p><br /><p>Much before quantum technologies ripen, we will see AI play a major role in science and even in making new scientific discoveries. This will happen in less than 100 years. We can already see this with the Ramanujan Machine project, where my colleagues and I published some of the pioneering papers that use computer algorithms for enhancing human discovery. This area of “AI for science” really alters the way we make progress in science and technology. Is it possible that AI is making us irrelevant? Or worse, could it become dangerous to our societies, in science and beyond it? It is important to ask in what way will we be able to adapt and use AI to make ourselves more effective as scientists. I think it is in our hands to affect which path it will be.</p>",
      featured_image: blog1,
      //   "https://firebasestorage.googleapis.com/v0/b/american-technion-society.appspot.com/o/9602038-blog2.jpeg?alt=media&token=f8fd2ec0-ddcb-4441-94c6-0f890edf1b73",
      id: "25c2b7aa-8945-461b-95c5-cc89be6b71db",
      name: "The Next Century in Quantum and AI",
      author: "Professor Ido Kaminer"
    },

    {
      description:
        "<p>The next 100 years in my field of bio-inspired engineering will be focused on early detection of cancer and neurodegenerative diseases. Right now, we might have the ability to treat cancer and we might have the ability to reduce the side effects—but can we detect it early, before it causes any harmful symptoms and before it spreads throughout the body? I think this is the main challenge: Keep treating, but do a better job of detecting.</p><br/><p>Hopefully, we do that using some of the biomimetic nanoparticles being developed by my team. Nature is the best engineer. It has billions of years of training and does billions of years of working experiments every day. I ask my team, “How can we use nature’s tools or mimic them to open new doors to new translational  therapeutics ? ”Think of it: We are in 2024 and we still have Parkinson’s, Alzheimer’s, and ALS patients. In my field, we are taking all the lessons we’ve learned from cancer and are applying them to the brain.</p><br/><p>I think the use of mRNA delivery systems in COVID-19 vaccines accelerated and profoundly expanded the ways the scientific community thinks about delivering medicine. But in the future, the route of delivery will change: no more needles. We are working on intranasal delivery, or the sniffing of mRNA particles to allow more affordable and portable delivery. When you smell a flower or a baby’s diaper, the molecules cross directly to your olfactory bulb in the brain. We have proof-of-concept experiments that if you sniff our nanoparticles, you find them in the olfactory bulb. And now the question is, what kinds of cells do you target in this bulb, and what can you deliver to them?</p><br/><p>I really believe that by giving the gift of life, you can make a worldwide impact. Disease and human health are issues that affect us all. No matter your race, religion, gender, nationality, or class, you know people who have cancer, who have a neurodegenerative disease, and families that have the burden of treating them. If you ask me what I hope my research at the Technion will do—and I truly believe this—it would be to give the gift of life and good health not only for people in the Middle East, but also for everyone on the planet. Science brings people together, and it may be one thing that can cure wounds that we are all now bleeding from.</p>",
      name: "Continue to Treat, but Focus on Detection",
      featured_image: blog2,
      id: "7fc30287-2e67-4385-83da-51b113625fda",
      author: "Professor Assaf Zinger"
    },

    {
      id: "d2142d3e-4f4b-439c-b8f6-8d2e6128c4c7",
      description:
        "<p>In the next 100 years—and even in the next three to four years—there will be a huge advance in what we call alternative proteins. Instead of what we see in science fiction, where we’re flying into space and eating a bunch of pills, I think we will just have better food that looks like, tastes like, and is as good as food sourced from animals, but it will not come from them. This change will happen because there simply is no other choice. Our planet cannot sustain the food supply chains we need in order to feed the population.</p><br/><p>The next generation of drug delivery won’t be limited to a simple capsule that contains a drug and maybe one other antibody or protein. It will be more sophisticated. And it’s already happening. Nano-Ghosts made in my lab from the membranes of stem cells transform particles so that they can be filled with the drugs. These Nano-Ghosts pass the blood-brain barrier—the blood vessels that feed and protect the brain—but can prevent some types of drugs from reaching it. We are looking at ways they can arrest disease in multiple sclerosis and glioblastoma. Empty Nano-Ghosts can reduce inflammation not only in tumors, but also in neurodegenerative diseases like muscular dystrophy. The system is not just a drug delivery mechanism; it’s a technology that can modulate the immune response.</p><br/><p>We need to bring together scientists from totally different research areas to think about a broader spectrum of research. Once we do that, I think we will see more advances. I take myself as an example. I was doing tissue engineering for medicine, but I saw a great opportunity to apply my knowledge to the area of cultivated meat to help promote sustainable food production. The process of creating a piece of heart tissue (the heart is also a muscle) and creating a steak from cultivated cow cells has a lot of similarities.</p><br/><p>We call Israel a high-tech startup nation. Biotech is the high tech of tomorrow, and Israel will be a startup nation in biotech. We have excellent scientists and excellent knowledge, and we are fast-thinking. We know how to be nimble to develop technologies very quickly so that we can bring them to market and drive wide-scale impact.</p>",
      featured_image: blog3,
      name: "Biotech Is the High Tech of Tomorrow",
      author: "Professor Marcelle Machluf "
    },

    {
      featured_image: blog4,
      name: "How Will We Stay Healthy 100 Years From Now?",
      description:
        "<p>The next century will see a global health revolution driven by ubiquitous access to advanced noninvasive diagnostic tools that enable real-time monitoring and early detection of diseases for billions of people across the globe. Nanorobots could revolutionize medicine and surgery by traversing the human body to conduct repairs and administer targeted treatments. Artificial intelligence could sift through personal health data to detect the advent of diseases and medical conditions before symptomatic manifestations appear, creating an era where chronic ailments do not mar the essence of life, and wellness is not a battle but a harmonious dance. With universal access to advanced diagnostics and treatments, the barriers of inequality in health care could be demolished, fostering an ethical era where technology is intertwined with humanity’s collective consciousness and values.</p><br/><p>At the same time, self-sustaining nano sensors could act as omnipresent sentinels that monitor ecological changes and implement corrective measures autonomously. Coupled with revolutionary shifts in energy production, storage, and consumption, these environmental guardians could herald a new era of ecological balance and sustainability that mitigates the impacts of climate change and preserves the sanctity of life on Earth. As technology and biology become seamlessly integrated, the emergence of biohybrid systems could enhance natural human capabilities and extend life, marking a new epoch where augmented people are commonplace.</p><br/><p>Ultimately, this transformative trajectory could bring about a world of innovation and knowledge, with the Technion and Israel leading the charge toward a brighter and more harmonious future for all. The scientific discourses led by the Technion and Israel could be rich tapestries of interdisciplinary dialogues, encompassing myriad fields such as nanotechnology, AI, medicine, environmental science, and space exploration. These dialogues could foster the germination of ideas that possess the potential to solve the most pressing challenges of humanity and unlock the untapped potential of the universe.</p>",
      id: "f886986b-f069-4f44-a3b9-4134368b3629",
      author: "Professor Hossam Haick"
    },
  ];

  const blogData = blog.slice(0, 4);
  console.log(posts);

  // console.log(blog);
  delete values[1];
  // Img Uploader
  useEffect(() => {
    setImgUpload(false);
    const uploadImg = () => {
      const modal = document.getElementById("open-modal");
      for (let i = 0; i < file.length; i++) {
        const uniqueName =
          Math.floor(Math.random() * 100 * 100000) + "-" + file.name;
        const storageRef = ref(storage, uniqueName);
        const uploadTask = uploadBytesResumable(storageRef, file[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setFileLoader(true);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                setFileLoader(true);
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log("error");
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setFileLoader(false);
              setImgUrl((current) => [...current, downloadURL]);
              setImgUpload(false);
              imgUrl.length < 1 && modal.click();
              setStorySubmission(false);
            });
          }
        );
      }
    };
    imgUpload && uploadImg();
  }, [file]);

  // Img Data
  const dataUploader = async () => {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCDate();
    const year = new Date().getUTCFullYear();
    const hour = new Date().getUTCHours();
    const minutes = new Date().getUTCMinutes();
    const seconds = new Date().getUTCSeconds();
    const miliseconds = new Date().getUTCMilliseconds();
    const currentDate =
      year +
      "" +
      month +
      "" +
      day +
      "" +
      hour +
      "" +
      minutes +
      "" +
      seconds +
      "" +
      miliseconds;
    const unique_id = currentDate;

    setStorySubmission(true);
    try {
      const docRef = await setDoc(doc(db, "testimonials", unique_id), {
        quote: description,
        name: name,
        storyEmail: storyEmail,
        approved: false,
        featured_image: imgUrl,
        id: unique_id,
      });
      setDescription("");
      setStoryEmail("");
      setName("");
      setImgUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      // Assuming you want to handle only the first dropped file

      // Update state or perform actions with the dropped file
      setFile(droppedFiles);
      setImgUpload(true);
      console.log(file);
    }
  };

  const handleDropClick = () => {
    // Trigger the file input click when the drop_box is clicked
    const fileInput = document.getElementById("fileElem");
    fileInput.click();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3500,
    cssEase: "linear",
  };

  // Seperating Data
  useEffect(() => {
    const seperatingData = () => {
      setApproved(data.filter((res) => res.approved == true));
    };

    seperatingData();
  }, [data]);


  useEffect(() => {
    fetch('https://p67.d21.myftpupload.com/wp-json/showFavorites/v2?post_type=post')
      .then(response => response.json())
      .then(json => setData(json.data))
      .catch(error => console.error(error));
  }, []);

  const sliderData = approved
    .sort((a, b) => {
      return b.id - a.id;
    })
    .slice(0, 3);
  const gridData = approved
    .sort((a, b) => {
      return b.id - a.id;
    })
    .slice(0, 10);
  const [text, setText] = useState("");
  const maxCharacterCount = 1000; // Set your desired maximum character count

  const handleChange = (event) => {
    const inputText = event;
    if (inputText.length <= maxCharacterCount) {
      setText(inputText);
    }
  };

  function Capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <React.Fragment>
      <Header current="Home" />

      <div
        className="modal fade .modal-fullscreen"
        id="blogModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-full md:w-[60%]">
          <div className="modal-content ">
            <div className="modal-header ">
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
                <img width={"100%"} src={blogModalData.image} />
                <h4 className="mt-4">{blogModalData.title}</h4>
                <div class="text-[17px]">{blogModalData.author}</div>
                <br />
                {blogModalData.content && (
                  <p>{parse(`${blogModalData.content}`)}</p>
                )}
                {blogModalData.quote && (
                  <p>{parse(`${blogModalData.quote}`)}</p>
                )}
                {blogModalData.designation && (
                  <p>{blogModalData.designation}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade .modal-fullscreen"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content rounded-none">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">
                Naftali Bennett
              </h5> */}
              <IoMdClose
                type="button"
                size={35}
                className="border-[3px] border-[#AA9767] text-[#AA9767] ml-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></IoMdClose>
            </div>
            <div className="modal-body">
              <section className="message bg-white">
                <div className="container-fluid">
                  <div className="message_inner">
                    <div className="image_wrapper">
                      <div className="rounded-full size-96 overflow-hidden">
                        <img src={bennet} alt="Naftali" className=" " />
                      </div>
                    </div>
                    <div className="content">
                      <div className="heading">
                        <h4>Naftali Bennett: Technion Pride</h4>
                        <p className="cursive font-bold mt-3 leading-normal">
                          Naftali Bennett, Israel’s 13th prime minister and a
                          Haifa native, may have obtained a law degree, but the
                          high-tech entrepreneur has the spirit, drive, and
                          pride of the Technion at his core.
                        </p>
                        <p className="mt-3">
                          “I grew up in the Technion; it was really central to
                          my identity,” the former prime minister said in a
                          recent interview with ATS staff.
                        </p>
                        <br />
                        <p>
                          His father, Jim Bennett, worked in the Technion’s
                          fundraising department. “Every Friday, my family would
                          go to the Technion pool, and I’d watch my f ather play
                          basketball. It was just a fundamental part of who I
                          was.”
                        </p>
                        <br />
                        <p>
                          Growing up in the Technion’s shadow also created high
                          expectations and pride. “The Technion projected an
                          aura of excellence and science into the city.” The
                          Technion’s leading role in hig h tech and
                          entrepreneurship also clearly impacted the former
                          prime minister. In 1996, Mr. Bennett began pursuing a
                          degree in law at The Hebrew University of Jerusalem,
                          while at the same time starting work for a software
                          company.
                        </p>
                        <br />
                        <p>
                          By 1999, he had co - founded an anti - fraud company
                          in New York called Cyota. He served as its chief
                          executive officer until Cyota was sold in 2005 to U.S.
                          - based RSA Security for $145 million. Always a
                          staunch Zionist, he included a stipulation that the
                          Israeli arm remain intact. Toda y, 400 Israelis are
                          employed in the company’s offices in Be’er - Sheva and
                          Herzliya. Following a brief stint from 2006 to 2008 as
                          chief of staff to then - opposition leader Benjamin
                          Netanyahu, in 2009 Mr. Bennett became CEO of Soluto, a
                          startup specializing i n cloud computing services.
                          That company was sold to Asurion, another American
                          company, for $130 million in 2013.
                        </p>
                        <br />
                        <p>
                          Prior to, during, and following Mr. Bennett’s high -
                          tech career, he assumed strategic roles in the Israel
                          Defense Forces. He became a commander in the Maglan ,
                          a unit that specializes in operating behind enemy
                          lines. While he was living in the United States, he
                          repeatedly traveled to Israel to perform reserve duty.
                          He served during both intifadas and in the second
                          Lebanon War in 2006.
                        </p>
                        <br />
                        <p>
                          Mr. Bennett’ s political career began in earnest in
                          2012 when he became the leader of the Jewish Home
                          party. Between 2013 and 2021 he held significant
                          cabinet positions, including minister of economy,
                          minister of Jerusalem and diaspora affairs, minister
                          of religious se rvices, minister of education,
                          minister of defense, and finally prime minister in
                          2021, when he formed a broad coalition and led the
                          most diverse government in Israel’s history.
                        </p>
                        <br />
                        <p>
                          And throughout his political service, he looked to the
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
                        <br />
                        <p>
                          “The Technion sent people into the high schools to
                          encourage these studies, and the Technion was the
                          first university in Israel to change the incentive
                          structure for these kids. And when I believed Israel
                          needed to take a quantum leap in quantum studies, i t
                          was the Technion that took charge.”
                        </p>
                        <br />
                        <p>
                          Mr. Bennett also praised the Technion’s determination
                          to advance STEM studies by women, Arab Israelis, and
                          the ultra - Orthodox. “At the Technion today, one out
                          of every two freshmen is a woman. That’s amazing in
                          scien ce and technology.” Beyond education, Mr.
                          Bennett is keenly aware of the Technion’s role in the
                          development and security of Israel, calling the
                          Technion the backbone behind the nation’s air force,
                          defense services, and world - renowned high - tech
                          industry.
                        </p>
                        <br />
                        <p>
                          “The Technion is part of the foundation of Israel’s
                          national security and economy,” he said. He believes
                          that to thrive in the region, Israel needs to be a
                          generation ahead — not just in defense, but also in
                          water conservation and technologies, energy,
                          cybersecurity, climate change, and more. Strength in
                          science and technology gives Israel its edge, and
                          according to Mr. Bennett, the Technion and its alumni
                          make that possible.{" "}
                        </p>
                        <br />
                        <p>
                          “Israel would not be the Startup Nation without the
                          Technion, full stop. I can ’t imagine a better ROI for
                          Israel’s prosperity, national security, and social
                          coherence than investing in the Technion.”
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

      <button
        id="open-modal"
        style={{ visibility: "collapse", position: "absolute" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#storyModal"
      >
        Launch demo modal
      </button>


      <section className="hero relative overflow-hidden shadow-sm">
        <video autoPlay loop muted className="object-contain">
          <source src={videoSrc} />
        </video>
      </section>

      <section className="usps md:w-[71.5%] mx-auto">
        <div className="container-fluid">
          <div className="usps_inner ">
            <div className="heading">
              <h4 className="text-[25px]">The Technion Centennial</h4>
              <h2>Reimagining the Next 100 Years</h2>
            </div>
            
            {values.map((res, index) => {
              ScrollTrigger.refresh();
              return (
                <div key={index} className="row mb-4">
                  <h4>{res.title}</h4>
                  <p className="mt-2 leading-loose">{res.description}</p>
                </div>
              );
            })}
            <div className="mt-8">
              <div
                style={{ fontFamily: "Adobe Caslon Pro" }}
                className="text-[21px] italic leading-loose"
              >
                “It’s fortunate that the Technion existed before the State of
                Israel. If it had been the other way around, who knows what
                would have happened. The Technion created the State of Israel
                and deserves the credit for this.”
              </div>
              <div className="text-righ font-light text-[14px] mt-2">
                PRIME MINISTER AND PRESIDENT OF ISRAEL
              </div>
              <div className="text-righ font-light text-[14px] mt-1">
                SHIMON PERES
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-[94%] md:w-[70%] mx-auto bg-[#D9D9D9] py-48 mt-6">
        <h4 className="text-wrap text-center text-[21px] md:text-[25px]">
          Placeholder for Centennial Video
        </h4>
      </div>

      <section className="content_block p-0  md:h-[450px] flex items-center mt-12">
        {/* <div className="bg-[]"></div> */}
        <div className="container-fluid p-0 w-[94%]">
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
            <div className="content_wrapper bg-transparent p-0">
              <p className="bg-transparent text-white font-[550]">
                Your support of the Technion will help solve many of humanity’s
                most pressing global challenges. The Global Centennial Campaign
                will advance multidisciplinary research in four critical areas:
                climate change and sustainability, human health, impact
                technologies, and Israel’s security.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-[94%] md:w-[70%] mx-auto my-8">
        <div className="heading">
          <h1 style={{ color: "#002147" }}>Reimagining the Next 100 Years</h1>
          <br />
          <p>
            Over the past 100 years, fantastic leaps in science and technology
            have revolutionized the world. What will the next 100 years bring?
            We asked four leading Technion scientists to share their visions for
            the big scientific advances that will change the ways we live.
          </p>
        </div>
       

        <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-y-4 mt-4">
          {posts.map((res, index) => {
            ScrollTrigger.refresh();
            const route = res.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <div
                key={index}
                className="relative w-[300px] h-[200px] md:w-[495px] md:h-[300px] overflow-hidden group mb-3"
              >
                <img
                  src={res.image}
                  alt="Blog Image"
                  className="absolute z-40 hover:z-0 hover:opacity-20 object-cover w-full h-full"
                  onClick={() => {
                    setBlogModalData(res);
                  }}
                />
                <div
                  className="
                    absolute top-0 left-0 w-full h-full bg-[#031523] hover:z-40  bg-opacity-80 cursor-pointer
                  "
                  onClick={() => handleClick(index)}
                >
                  <div className="flex flex-col gap-2 items-center justify-center text-center h-full w-full px-8 text-white font-semibold">
                    <h4
                      onClick={() => {
                        setBlogModalData(res);
                      }}
                      // data-bs-toggle="modal" data-bs-target="#blogModal"
                    >
                      {res.title}
                    </h4>

                    <Link
                      // ref={linkRef}
                      onClick={() => {
                        setBlogModalData(res);
                      }}
                      to="/"
                      id={`blogPicture${index}`}
                      className="text-white gap-[6px]"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#blogModal"
                    >
                      <div className="flex items-center gap-1 border-b-[3px] border-[#A7986D]">
                            Read More 
                            <FaArrowRight className="text-base"/>
                          </div>
                          
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <section className="message">
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
                                <h6>
                                    Naftali Bennett: Technion Pride
                                </h6>

                                <h3 className="cursive">Naftali Bennett, Israel’s 13th prime minister and a Haifa native, may have obtained a law
                                    degree, but the high-tech entrepreneur has the spirit, drive, and pride of the Technion at his
                                    core.</h3>
                            </div>

                            <a href="#" className="btn btn-accent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</a>
                        </div>
                    </div>
                </div>
            </section> */}

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
            <div style={{ fontFamily: "Adobe Caslon Pro" }} className="mt-4 text-[19px] text-[#AA9767] font-bold italic w-full sm:w-[400px] ">
              "Israel would not be the Startup Nation without the Technion, full
              stop. I can't imagine a better ROI for Israel's prosperity,
              national security, and social coherence than investing in the
              Technion."
            </div>
            <a
              href="#"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ backgroundColor: "#094D9A" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#002147")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#094D9A")}
              className="btn btn-accent mt-4 px-4 py-3 text-white"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      <Roadmap roadmap={roadmap} roadmapPage={true} />

      {/* <section className="stories">
                <div className="container-fluid">
                    <div className="stories_inner">
                        <div className="heading">
                            <h2>
                             
                                Technion Stories
                                 
                            </h2>
                            <p className='mw-50'>
                            What’s your Technion story? We want to hear it! Share your favorite Technion memory with our community.
                            </p>
                        </div>
                        <div className="stories_grid">
                    
                            
                        {gridData.map((res, index) => (
                            <React.Fragment key={index}>
                              {res.featured_image.map((image, i) => (
                                <div className="grid_box" key={i}>
                                  <img src={image} alt='' />
                                </div>
                              ))}
                            </React.Fragment>
                          ))}

                            <div
                                // className="drop_box"
                                className={`drop_box ${isDragOver ? 'drag-over' : ''}`}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e)}
                                onClick={() => handleDropClick()}
                            >
                                <div id="drop-area">
                                    <form className="my-form">
                                        {fileLoader ?
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#114A99" stroke="#114A99" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#114A99" stroke="#114A99" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#114A99" stroke="#114A99" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                                                Loading...
                                            </div>
                                            :
                                            <div style={{ paddingTop: "35px" }}>
                                                <svg width="78" height="66" viewBox="0 0 78 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_30_808)">
                                                        <path d="M22 15.1667C22 16.9722 21.3583 18.5069 20.075 19.7708C18.7917 21.0347 17.2333 21.6667 15.4 21.6667C13.5667 21.6667 12.0083 21.0347 10.725 19.7708C9.44167 18.5069 8.8 16.9722 8.8 15.1667C8.8 13.3611 9.44167 11.8264 10.725 10.5625C12.0083 9.29861 13.5667 8.66667 15.4 8.66667C17.2333 8.66667 18.7917 9.29861 20.075 10.5625C21.3583 11.8264 22 13.3611 22 15.1667ZM57.2 28.1667V43.3333H8.8V36.8333L19.8 26L25.3 31.4167L42.9 14.0833L57.2 28.1667ZM60.5 4.33333H5.5C5.20208 4.33333 4.94427 4.44054 4.72656 4.65495C4.50885 4.86936 4.4 5.12326 4.4 5.41667V46.5833C4.4 46.8767 4.50885 47.1306 4.72656 47.3451C4.94427 47.5595 5.20208 47.6667 5.5 47.6667H60.5C60.7979 47.6667 61.0557 47.5595 61.2734 47.3451C61.4911 47.1306 61.6 46.8767 61.6 46.5833V5.41667C61.6 5.12326 61.4911 4.86936 61.2734 4.65495C61.0557 4.44054 60.7979 4.33333 60.5 4.33333ZM66 5.41667V46.5833C66 48.0729 65.4615 49.3481 64.3844 50.4089C63.3073 51.4696 62.0125 52 60.5 52H5.5C3.9875 52 2.69271 51.4696 1.61563 50.4089C0.538542 49.3481 0 48.0729 0 46.5833V5.41667C0 3.92708 0.538542 2.65191 1.61563 1.59115C2.69271 0.530382 3.9875 0 5.5 0H60.5C62.0125 0 63.3073 0.530382 64.3844 1.59115C65.4615 2.65191 66 3.92708 66 5.41667Z" fill="#2F61A6" fillOpacity="0.2" />
                                                    </g>
                                                    <rect x="41" y="29.5" width="35" height="35" rx="17.5" fill="#114A99" />
                                                    <rect x="41" y="29.5" width="35" height="35" rx="17.5" stroke="white" strokeWidth="3" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M57.7929 41.2929C58.1834 40.9024 58.8166 40.9024 59.2071 41.2929L64.2071 46.2929C64.5976 46.6834 64.5976 47.3166 64.2071 47.7071C63.8166 48.0976 63.1834 48.0976 62.7929 47.7071L59.5 44.4142V52C59.5 52.5523 59.0523 53 58.5 53C57.9477 53 57.5 52.5523 57.5 52V44.4142L54.2071 47.7071C53.8166 48.0976 53.1834 48.0976 52.7929 47.7071C52.4024 47.3166 52.4024 46.6834 52.7929 46.2929L57.7929 41.2929Z" fill="white" />
                                                    <defs>
                                                        <clipPath id="clip0_30_808">
                                                            <rect width="66" height="52" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <h4>
                                                    Drag & Drop here
                                                </h4>
                                                <p>to upload your photo</p>
                                                <input style={{ visibility: "collapse" }} type="file" id="fileElem" multiple accept="image/*" className="form-control"
                                                    onChange={(e) => {
                                                        setFile(e.target.files)
                                                        setImgUpload(true)
                                                    }}
                                                />
                                            </div>
                                        }
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <Slider {...settings}>
                    {
                        sliderData.map((res, index) => {
                            ScrollTrigger.refresh();
                            return (
                                <div key={index} className="container-fluid">
                                    <div className="message_inner">
                                        <div className='img-container'>
                                            <img src={res.featured_image} />
                                        </div>
                                        <div className="content">
                                            {parse(`${res.quote}`)}
                                            <div>
                                                

                                                    <br /><br />
                                                    <b>{Capitalize(res.name)}<br /></b>
                                                    {res.designation}<br /><br />
                                                    <button onClick={() => {
                                                        setBlogModalData(res)
                                                    }} className='btn btn-accent'
                                                        type="button" data-bs-toggle="modal" data-bs-target="#blogModal"
                                                    >Read More </button>
                                                </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </section> */}
      <Footer />
    </React.Fragment>
  );
};

export default Home;
