import React, { useState, useEffect } from "react";
import background from "../assets/family_hero_img.png";
import storiesbg from "../assets/stories-bg.png";
import storieshero from "../assets/stories-hero.jpg";
import logo from "../assets/logo.svg";
import connecting from "../assets/connecting_community.png";
import { v4 as uuid } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import Header from "../layout/Header";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";



import { FaArrowRight } from "react-icons/fa6";

const Family = ({ data }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [storyEmail, setStoryEmail] = useState("");
  const [file, setFile] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgUpload, setImgUpload] = useState(false);
  const [fileLoader, setFileLoader] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [approved, setApproved] = useState([]);
  const [storySubmission, setStorySubmission] = useState(false);
  const [blogModalData, setBlogModalData] = useState({});

  // Img Uploader
  useEffect(() => {
    setImgUpload(true);
    console.log(file.length);
    const uploadImg = () => {
      const modal = document.getElementById("open-inovation-modal");
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
    const unique_id = uuid();
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
      setImgUrl([]);
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
    console.log("drag detected");
  };

  const handleDrop = (e) => {
    console.log(e);
    console.log(e.dataTransfer.files[0]);
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      // Assuming you want to handle only the first dropped file
      const droppedFile = droppedFiles[0];

      // Update state or perform actions with the dropped file
      setFile([...file, droppedFile]);
      setImgUpload(true);
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
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
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

  const gridData = approved
    .sort((a, b) => {
      return b.id - a.id;
    })
    .slice(0, 10);

  const staticGrid = approved
    .sort((a, b) => {
      return b.id - a.id;
    })
    .slice(0, 3);

  // console.log(staticGrid);

  const [text, setText] = useState("");
  const maxCharacterCount = 1000; // Set your desired maximum character count

  const handleChange = (event) => {
    const inputText = event;
    if (inputText.length <= maxCharacterCount) {
      setText(inputText);
    }
  };
  Fancybox.bind('[data-fancybox="gallery"]', {
    //
  });
  return (
    <React.Fragment>
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
                {blogModalData.description && (
                  <p>{parse(`${blogModalData.description}`)}</p>
                )}
                {parse(`${blogModalData.quote}`)}
                {blogModalData.designation && (
                  <p>{blogModalData.designation}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        id="open-inovation-modal"
        style={{ visibility: "collapse", position: "absolute" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#storyModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade myModal"
        id="storyModal"
        tabIndex="-1"
        aria-labelledby="storyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="storyModalLabel">
                Submit a Story
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {storySubmission ? (
              <div className="modal-body">
                <h4>Thank you for your Submission</h4>
              </div>
            ) : (
              <div className="modal-body">
                <p className="pb-2">
                  Share your story from your memorable visit to the campus.
                  Let's build a collage of cherished experiences together.
                  Upload your photo and share your favorite Technion memory in
                  the text box below. Please keep your submission under 200
                  characters.
                </p>
                <div className="body">
                  <div className="imageWrapper">
                    <img src={imgUrl[0]} width={"100%"} />
                    {fileLoader ? (
                      <p>Loading ...</p>
                    ) : (
                      <button
                        className="disabled"
                        onClick={() => {
                          document.getElementById("fileElem").click();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C17.11 2.75 21.25 6.89 21.25 12C21.25 17.11 17.11 21.25 12 21.25Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.89 10.08L10.11 13.92"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.11 10.08L13.89 13.92"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Add More Images
                      </button>
                    )}
                  </div>
                  <div className="contentForm">
                    <input
                      className="form-control"
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={storyEmail}
                      onChange={(e) => setStoryEmail(e.target.value)}
                      required
                    />
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                      }}
                      config={{
                        toolbar: ["bold", "italic"],
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <p className="sm">
                By submitting your photo and quote, you agree to comply with our
                Terms of Use. Ensure that you have the right to share the
                content, and refrain from violating any copyright or
                intellectual property rights. Our team reserves the right to
                review and approve submissions.
              </p>
              <div className="btn_wrapper">
                <button
                  id="close-btn"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {!fileLoader && (
                  <button
                    type="button"
                    className={
                      storySubmission
                        ? "btn btn-accent disabled"
                        : "btn btn-accent bg-[#002147]"
                    }
                    onClick={() => dataUploader()}
                  >
                    Submit Story
                  </button>
                )}
                {fileLoader && fileLoader && (
                  <button
                    type="button"
                    className="btn btn-accent disabled"
                    onClick={() => dataUploader()}
                  >
                    Submit Story
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="viewport">
        <div id="content">
          <Header current="Stories" />

          <div
            className="relative h-[64vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${storieshero})` }}
          >
            <div className="absolute bottom-[20%] right-0 bg-[#002147] h-[160px] w-full sm:w-[45%]">
              <div
                className="absolute w-full sm:w-1/2 top-1/2 text-center sm:text-left sm:left-12 transform -translate-y-1/2
                         text-white my-auto"
              >
                <div className="text-4xl font-semibold ">Technion Stories</div>
                <div className="mt-2 font-base">
                  You're part of the Technion story. Share your cherished
                  moments with our global community
                </div>
              </div>
            </div>
          </div>

          <div className="w-[94%] md:w-[70%] mx-auto my-12">
            <div className="w-[90%] mx-auto bg-[#D9D9D9] py-48 mt-12">
              <h4 className="text-wrap text-center">
                Placeholder for Cathy & Jim Deutchman Video
              </h4>
            </div>

            

            <div className="flex flex-col md:flex-row justify-center md:justify-between mt-16">
              <div className="text-[#002147] w-[94%] md:w-[65%] mx-auto md:mx-0">
                <div className="text-[41.88px]">Share Your Story</div>
                <div className="mt-2">
                  Join us in commemorating our 100th anniversary by becoming a
                  part of the Technion community and capturing the essence of
                  your favorite campus memories! We invite you to share your
                  cherished moments with our global community.
                </div>
              </div>
              <div className="mx-auto md:w-[25%]">
                <div
                  // className="drop_box"
                  className={`drop_box ${
                    isDragOver ? "drag-over" : ""
                  } border-2 border-dotted bg-[#F9F9F9] px-4`}
                  // onDragOver={(e) => handleDragOver(e)}
                  // onDrop={(e) => handleDrop(e)}
                  // onClick={() => handleDropClick()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleDropClick}
                >
                  <div id="drop-area">
                    <form className="my-form">
                      {fileLoader ? (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 200"
                            className=""
                          >
                            <circle
                              fill="#114A99"
                              stroke="#114A99"
                              strokeWidth="15"
                              r="15"
                              cx="40"
                              cy="65"
                            >
                              <animate
                                attributeName="cy"
                                calcMode="spline"
                                dur="2"
                                values="65;135;65;"
                                keySplines=".5 0 .5 1;.5 0 .5 1"
                                repeatCount="indefinite"
                                begin="-.4"
                              ></animate>
                            </circle>
                            <circle
                              fill="#114A99"
                              stroke="#114A99"
                              strokeWidth="15"
                              r="15"
                              cx="100"
                              cy="65"
                            >
                              <animate
                                attributeName="cy"
                                calcMode="spline"
                                dur="2"
                                values="65;135;65;"
                                keySplines=".5 0 .5 1;.5 0 .5 1"
                                repeatCount="indefinite"
                                begin="-.2"
                              ></animate>
                            </circle>
                            <circle
                              fill="#114A99"
                              stroke="#114A99"
                              strokeWidth="15"
                              r="15"
                              cx="160"
                              cy="65"
                            >
                              <animate
                                attributeName="cy"
                                calcMode="spline"
                                dur="2"
                                values="65;135;65;"
                                keySplines=".5 0 .5 1;.5 0 .5 1"
                                repeatCount="indefinite"
                                begin="0"
                              ></animate>
                            </circle>
                          </svg>
                          Loading...
                        </div>
                      ) : (
                        <div style={{ paddingTop: "35px" }} >
                          <svg
                            width="78"
                            height="66"
                            viewBox="0 0 78 66"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_30_808)">
                              <path
                                d="M22 15.1667C22 16.9722 21.3583 18.5069 20.075 19.7708C18.7917 21.0347 17.2333 21.6667 15.4 21.6667C13.5667 21.6667 12.0083 21.0347 10.725 19.7708C9.44167 18.5069 8.8 16.9722 8.8 15.1667C8.8 13.3611 9.44167 11.8264 10.725 10.5625C12.0083 9.29861 13.5667 8.66667 15.4 8.66667C17.2333 8.66667 18.7917 9.29861 20.075 10.5625C21.3583 11.8264 22 13.3611 22 15.1667ZM57.2 28.1667V43.3333H8.8V36.8333L19.8 26L25.3 31.4167L42.9 14.0833L57.2 28.1667ZM60.5 4.33333H5.5C5.20208 4.33333 4.94427 4.44054 4.72656 4.65495C4.50885 4.86936 4.4 5.12326 4.4 5.41667V46.5833C4.4 46.8767 4.50885 47.1306 4.72656 47.3451C4.94427 47.5595 5.20208 47.6667 5.5 47.6667H60.5C60.7979 47.6667 61.0557 47.5595 61.2734 47.3451C61.4911 47.1306 61.6 46.8767 61.6 46.5833V5.41667C61.6 5.12326 61.4911 4.86936 61.2734 4.65495C61.0557 4.44054 60.7979 4.33333 60.5 4.33333ZM66 5.41667V46.5833C66 48.0729 65.4615 49.3481 64.3844 50.4089C63.3073 51.4696 62.0125 52 60.5 52H5.5C3.9875 52 2.69271 51.4696 1.61563 50.4089C0.538542 49.3481 0 48.0729 0 46.5833V5.41667C0 3.92708 0.538542 2.65191 1.61563 1.59115C2.69271 0.530382 3.9875 0 5.5 0H60.5C62.0125 0 63.3073 0.530382 64.3844 1.59115C65.4615 2.65191 66 3.92708 66 5.41667Z"
                                fill="#2F61A6"
                                fillOpacity="0.2"
                              />
                            </g>
                            <rect
                              x="41"
                              y="29.5"
                              width="35"
                              height="35"
                              rx="17.5"
                              fill="#114A99"
                            />
                            <rect
                              x="41"
                              y="29.5"
                              width="35"
                              height="35"
                              rx="17.5"
                              stroke="white"
                              strokeWidth="3"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M57.7929 41.2929C58.1834 40.9024 58.8166 40.9024 59.2071 41.2929L64.2071 46.2929C64.5976 46.6834 64.5976 47.3166 64.2071 47.7071C63.8166 48.0976 63.1834 48.0976 62.7929 47.7071L59.5 44.4142V52C59.5 52.5523 59.0523 53 58.5 53C57.9477 53 57.5 52.5523 57.5 52V44.4142L54.2071 47.7071C53.8166 48.0976 53.1834 48.0976 52.7929 47.7071C52.4024 47.3166 52.4024 46.6834 52.7929 46.2929L57.7929 41.2929Z"
                              fill="white"
                            />
                            <defs>
                              <clipPath id="clip0_30_808">
                                <rect width="66" height="52" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <h4 className="text-left">Drag & Drop here</h4>
                          <p className="text-left">to upload your photo</p>
                          <input
                            style={{ visibility: "collapse" }}
                            type="file"
                            id="fileElem"
                            multiple
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => {
                              setFile(e.target.files);
                              setImgUpload(true);
                            }}
                          />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 max-w-xl mx-auto p-10">
      <a data-fancybox="gallery" href="https://lipsum.app/id/60/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/60/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/61/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/61/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/62/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/62/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/63/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/63/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/64/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/64/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/65/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/65/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/66/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/66/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/67/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/67/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/68/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/68/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/69/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/69/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/70/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/70/200x150" />
      </a>
      <a data-fancybox="gallery" href="https://lipsum.app/id/71/1600x1200">
        <img class="rounded" src="https://lipsum.app/id/71/200x150" />
      </a>
    </div>
          </div>

          <div className="bg-[#F5F5F5] py-12">
            <div className="text-[41px] text-center">
              Giving that Spans Generations
            </div>
            <div className="w-[85%] mx-auto mt-12 pb-8 flex flex-wrap gap-4 justify-between ">
              {approved.map((item, index) => (
                <div className="w-[380px]">
                  <div>
                    <img
                      src={item.featured_image}
                      alt="family"
                      className="w-[380px] h-[270px]"
                    />
                  </div>
                  <div className="mt-4 text-[17px] text-[#091f40]">
                    {item.name}
                  </div>
                  <div className="quote_txt">
                    {item.quote.split("</p>")[0].split("<p>")[1]}
                  </div>
                  <div className="mt-2 text-[#091f40] h-[100px]">
                    <button
                    onClick={() => {
                      setBlogModalData(item);
                    }}
                    className="flex mt-2 items-center gap-1 text-[#094D9A] border-b-[3px] border-[#A7986D] underline-offset-4"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#blogModal"
                  >
                    Read More 
                    <FaArrowRight className="text-base"/>
                  </button>
                  </div>
                  {/* <button
                    onClick={() => {
                      setBlogModalData(item);
                    }}
                    className="flex items-center gap-1 text-[#091F40] border-b-[3px] border-[#A7986D] underline-offset-4"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#blogModal"
                  >
                    Read More 
                    <FaArrowRight className="text-base"/>
                  </button> */}
                </div>
              ))}
            </div>
          </div>

          <section
            className="content_block md:h-[450px] flex items-center"
            style={{ backgroundImage: `url(${storiesbg})` }}
          >
            <div className="container-fluid">
              <div className="content_block_inner">
                <div className="heading">
                  <h2>Connecting Alumni to a Global Communtiy</h2>
                  <a
                    href="https://secure.ats.org/page/59616/data/1"
                    target="_blank"
                    className="btn btn-secondary"
                  >
                    Connect With Us
                  </a>
                </div>
                <div className="font-semibold">
                  {/* <div className="qoute">
                    <h4>
                      The Technion-Israel Institute of Technology has played a
                      crucial role in the establishment and vitality of Israel
                      and in improving the lives of people worldwide since
                      opening its doors in 1924. And no other institution holds
                      more promise for Israel’s future.
                    </h4>
                  </div> */}
                  <p>
                    Technion graduates make incredible, life- changing
                    contributions to the world every single day. We're proud
                    that you are part of our alumni community. Join us for
                    fascinating talks, hands-on workshops, online lectures,
                    networking opportunities in the U.S., and campus visits and
                    class reunions in Israel.
                  </p>
                  {/* <a href="#" className="btn btn-ghost">
                    EXPLORE KEYSTONE OPPORTUNITIES{" "}
                  </a> */}
                </div>
              </div>
            </div>
          </section>

          {/* <section className="testimonials">
            <Slider {...settings}>
              {approved.map((res, index) => {
                return (
                  <div className="container-fluid">
                    <div className="message_inner">
                      <div className="img-container">
                        <img src={res.featured_image} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </section> */}

          {/* <section className="stories">
            <div className="container-fluid">
              <div className="stories_inner">
                <div className="heading">
                  <h2>Technion Stories</h2>
                  <p className="mw-50">
                    Join us in commemorating our 100th anniversary by becoming a
                    part of the Technion community and capturing the essence of
                    your favorite campus memories! Share your cherished moments
                    with our global community
                  </p>
                </div>
                <div className="stories_grid">
                  {gridData.map((res, index) => (
                    <React.Fragment key={index}>
                      {res.featured_image.map((image, i) => (
                        <div className="grid_box" key={i}>
                          <img src={image} alt="" />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}

                  <div
                    // className="drop_box"
                    className={`drop_box ${isDragOver ? "drag-over" : ""}`}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e)}
                    onClick={() => handleDropClick()}
                  >
                    <div id="drop-area">
                      <form className="my-form">
                        {fileLoader ? (
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 200 200"
                            >
                              <circle
                                fill="#114A99"
                                stroke="#114A99"
                                strokeWidth="15"
                                r="15"
                                cx="40"
                                cy="65"
                              >
                                <animate
                                  attributeName="cy"
                                  calcMode="spline"
                                  dur="2"
                                  values="65;135;65;"
                                  keySplines=".5 0 .5 1;.5 0 .5 1"
                                  repeatCount="indefinite"
                                  begin="-.4"
                                ></animate>
                              </circle>
                              <circle
                                fill="#114A99"
                                stroke="#114A99"
                                strokeWidth="15"
                                r="15"
                                cx="100"
                                cy="65"
                              >
                                <animate
                                  attributeName="cy"
                                  calcMode="spline"
                                  dur="2"
                                  values="65;135;65;"
                                  keySplines=".5 0 .5 1;.5 0 .5 1"
                                  repeatCount="indefinite"
                                  begin="-.2"
                                ></animate>
                              </circle>
                              <circle
                                fill="#114A99"
                                stroke="#114A99"
                                strokeWidth="15"
                                r="15"
                                cx="160"
                                cy="65"
                              >
                                <animate
                                  attributeName="cy"
                                  calcMode="spline"
                                  dur="2"
                                  values="65;135;65;"
                                  keySplines=".5 0 .5 1;.5 0 .5 1"
                                  repeatCount="indefinite"
                                  begin="0"
                                ></animate>
                              </circle>
                            </svg>
                            Loading...
                          </div>
                        ) : (
                          <div style={{ paddingTop: "35px" }}>
                            <svg
                              width="78"
                              height="66"
                              viewBox="0 0 78 66"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_30_808)">
                                <path
                                  d="M22 15.1667C22 16.9722 21.3583 18.5069 20.075 19.7708C18.7917 21.0347 17.2333 21.6667 15.4 21.6667C13.5667 21.6667 12.0083 21.0347 10.725 19.7708C9.44167 18.5069 8.8 16.9722 8.8 15.1667C8.8 13.3611 9.44167 11.8264 10.725 10.5625C12.0083 9.29861 13.5667 8.66667 15.4 8.66667C17.2333 8.66667 18.7917 9.29861 20.075 10.5625C21.3583 11.8264 22 13.3611 22 15.1667ZM57.2 28.1667V43.3333H8.8V36.8333L19.8 26L25.3 31.4167L42.9 14.0833L57.2 28.1667ZM60.5 4.33333H5.5C5.20208 4.33333 4.94427 4.44054 4.72656 4.65495C4.50885 4.86936 4.4 5.12326 4.4 5.41667V46.5833C4.4 46.8767 4.50885 47.1306 4.72656 47.3451C4.94427 47.5595 5.20208 47.6667 5.5 47.6667H60.5C60.7979 47.6667 61.0557 47.5595 61.2734 47.3451C61.4911 47.1306 61.6 46.8767 61.6 46.5833V5.41667C61.6 5.12326 61.4911 4.86936 61.2734 4.65495C61.0557 4.44054 60.7979 4.33333 60.5 4.33333ZM66 5.41667V46.5833C66 48.0729 65.4615 49.3481 64.3844 50.4089C63.3073 51.4696 62.0125 52 60.5 52H5.5C3.9875 52 2.69271 51.4696 1.61563 50.4089C0.538542 49.3481 0 48.0729 0 46.5833V5.41667C0 3.92708 0.538542 2.65191 1.61563 1.59115C2.69271 0.530382 3.9875 0 5.5 0H60.5C62.0125 0 63.3073 0.530382 64.3844 1.59115C65.4615 2.65191 66 3.92708 66 5.41667Z"
                                  fill="#2F61A6"
                                  fillOpacity="0.2"
                                />
                              </g>
                              <rect
                                x="41"
                                y="29.5"
                                width="35"
                                height="35"
                                rx="17.5"
                                fill="#114A99"
                              />
                              <rect
                                x="41"
                                y="29.5"
                                width="35"
                                height="35"
                                rx="17.5"
                                stroke="white"
                                strokeWidth="3"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M57.7929 41.2929C58.1834 40.9024 58.8166 40.9024 59.2071 41.2929L64.2071 46.2929C64.5976 46.6834 64.5976 47.3166 64.2071 47.7071C63.8166 48.0976 63.1834 48.0976 62.7929 47.7071L59.5 44.4142V52C59.5 52.5523 59.0523 53 58.5 53C57.9477 53 57.5 52.5523 57.5 52V44.4142L54.2071 47.7071C53.8166 48.0976 53.1834 48.0976 52.7929 47.7071C52.4024 47.3166 52.4024 46.6834 52.7929 46.2929L57.7929 41.2929Z"
                                fill="white"
                              />
                              <defs>
                                <clipPath id="clip0_30_808">
                                  <rect width="66" height="52" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <h4>Drag & Drop here</h4>
                            <p>to upload your photo</p>
                            <input
                              style={{ visibility: "collapse" }}
                              type="file"
                              id="fileElem"
                              multiple
                              accept="image/*"
                              className="form-control"
                              onChange={(e) => {
                                setFile(e.target.files);
                                setImgUpload(true);
                              }}
                            />
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="hero"
            style={{ backgroundImage: `url(${background})`, marginTop: "72px" }}
          >
            <div className="container-fluid">
              <div className="hero_inner">
                <div>
                  <h1>Technion Stories</h1>
                  <p>
                    You’re a part of the Technion story. Share your cherished
                    moments with our global community.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="connecting_community">
            <div className="connecting_inner">
              <div className="community_img" style={{ margin: "3rem 0" }}>
                <img
                  src={connecting}
                  width={"101%"}
                  height={"100%"}
                  style={{ position: "relative", zIndex: "-1" }}
                />
              </div>
              <div className="community_content">
                <div>
                  <h1>Connecting Alumni to a Global Community </h1>
                  <br />
                  <p>
                    Technion graduates make incredible, life-changing
                    contributions to the world every single day.
                  </p>
                  <p>
                    We’re proud that you are part of our alumni community. Join
                    us for fascinating talks, hands-on workshops, online
                    lectures, networking opportunities in the U.S., and campus
                    visits and class reunions in Israel.
                  </p>
                  <div className="btn-container">
                    <a
                      className="btn btn-primary"
                      href="https://secure.ats.org/page/59616/data/1"
                      target="_blank"
                    >
                      Connect with us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="testimonials">
            <Slider {...settings}>
              {approved.map((res, index) => {
                return (
                  <div className="container-fluid">
                    <div className="message_inner">
                      <div className="img-container">
                        <img src={res.featured_image} />
                      </div>
                      <div className="content">
                        {parse(`${res.quote}`)}
                        <div>
                          <p>
                            <br />
                            <br />
                            <b>{res.name}</b>
                            <br />
                            {res.designation}
                            <br />
                            <br />
                            <button
                              onClick={() => {
                                setBlogModalData(res);
                              }}
                              className="btn btn-accent"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#blogModal"
                            >
                              Read More{" "}
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </section> */}

          {/* --------------------------- */}

          {/* 
                    <section className="content_block support_technion">
                        <div className="container-fluid">
                            <div className="content_block_inner">
                                <div className='support_div support1'>
                                    <h1 style={{ textAlign: "start" }}>Support The Technion <br />& ATS</h1>
                                    <a style={{ display: "flex", gap: "7px", textDecoration: "none" }} target='_blank'
                                        href='https://secure.ats.org/page/61000/donate/1'
                                    >DONATE NOW
                                    </a>
                                </div>
                                <div className="heading">
                                    <p style={{ color: "black" }}>
                                        For me, to be an active Technion alumna means to be proud of the background I share with thousands of other alumni around the world. Participating in the ATS Alumni events makes me feel part of a powerful community away from home.
                                    </p>
                                    <p style={{ color: "black" }}><b>- MICHAL KAPLAN LACEWICKI</b></p>
                                </div>
                                <div className='support_div support2'>
                                    <h1 style={{ textAlign: "start" }}>Support The Technion <br />& ATS</h1>
                                    <a style={{ display: "flex", gap: "7px", textDecoration: "none" }} target='_blank'
                                        href='https://secure.ats.org/page/61000/donate/1'
                                    >DONATE NOW
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section> */}

          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Family;
