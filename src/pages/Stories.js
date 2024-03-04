import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Stories = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [storyEmail, setStoryEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUpload, setImgUpload] = useState(false);
  const [fileLoader, setFileLoader] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [storySubmission, setStorySubmission] = useState(false);

  // Img Uploader
  useEffect(() => {
    setImgUpload(false);
    setBtnDisabled(true);
    const uploadImg = () => {
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

              setStorySubmission(false);
            });
          }
        );
      }
    };
    imgUpload && uploadImg();
    setBtnDisabled(false);
  }, [file]);

  const submitStory = async () => {
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
        designation: designation,
        approved: false,
        featured_image: imgUrl,
        id: unique_id,
      });
      document.getElementById("story-page-open-modal").click();
      setDescription("");
      setStoryEmail("");
      setDesignation("");
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
      const droppedFile = droppedFiles[0];

      // Update state or perform actions with the dropped file
      setFile(droppedFile);
      setImgUpload(true);
    }
  };

  const handleDropClick = () => {
    // Trigger the file input click when the drop_box is clicked
    const fileInput = document.getElementById("fileElem");
    fileInput.click();
  };

  return (
    <>
      <div
        className="modal fade myModal"
        id="storyPageModal"
        tabIndex="-1"
        aria-labelledby="storyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="storyModalLabel">
                Story Submitted
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body thanks">
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.8646 0.5C16.3895 0.5 0.519531 16.37 0.519531 35.8451C0.519531 55.3203 16.3895 71.1902 35.8646 71.1902C55.3398 71.1902 71.2097 55.3203 71.2097 35.8451C71.2097 16.37 55.3398 0.5 35.8646 0.5ZM48.5535 30.8614L36.1121 43.3029C35.5819 43.8331 34.9103 44.0805 34.2387 44.0805C33.5672 44.0805 32.8603 43.8331 32.3655 43.3029L26.1447 37.0822C25.0844 36.0572 25.0844 34.3606 26.1447 33.3356C27.1697 32.3106 28.8663 32.3106 29.8913 33.3356L34.2387 37.6831L44.8069 27.1149C45.832 26.0899 47.4932 26.0899 48.5535 27.1149C49.5785 28.1399 49.5785 29.8364 48.5535 30.8614Z"
                  fill="#114A99"
                />
              </svg>

              <h4>Thank you for your Submission</h4>
            </div>

            <div className="modal-footer">
              <div className="btn_wrapper">
                <button
                  id="close-btn"
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
      </div>

      <button
        id="story-page-open-modal"
        style={{ visibility: "collapse", position: "absolute" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#storyPageModal"
      >
        Launch demo modal
      </button>
      <div id="viewport">
        <div id="content">
          <nav className="navbar fixed-top navbar-expand-lg" id="navbar">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="" className="img-fluid" />
              </Link>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/100-years-of-innovation">
                      100 Years of Innovation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ats-family">
                      Technion Stories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      target="_blank"
                      href="https://ats.org/centennial/"
                    >
                      Centennial Campaign
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/reimagining-the-next-100-years"
                    >
                      Reimagining the Next 100 Years
                    </Link>
                  </li>
                </ul>
                <a
                  href="https://secure.ats.org/page/61000/donate/1"
                  className="btn btn-donate"
                  target="_blank"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </nav>

          <section className="stories-container">
            <div className="conatiner-fluid" style={{ width: "100%" }}>
              <h1>Submit My Story</h1>
            </div>

            <div className="contentForm" style={{ width: "100%" }}>
              <input
                className="form-control"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="form-control"
                value={designation}
                placeholder="Lorem Ipsum"
                onChange={(e) => setDesignation(e.target.value)}
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
                      <div
                        style={{
                          textAlign: "center",
                          height: "100%",
                          padding: "20px 0",
                        }}
                      >
                        <svg
                          style={{ width: "150px" }}
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
                        <br />
                        Loading...
                      </div>
                    ) : (
                      <div style={{ paddingTop: "35px", textAlign: "center" }}>
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

              <button
                className={
                  btnDisabled ? "btn btn-primary disabled" : "btn btn-primary"
                }
                onClick={() => submitStory()}
              >
                Submit Story
              </button>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Stories;
