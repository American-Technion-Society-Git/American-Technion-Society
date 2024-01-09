import React, { useState, useEffect } from 'react'
import { v4 as uuid } from "uuid";
import { setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogForm = () => {

  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState([])
  const [imgUrl, setImgUrl] = useState("");
  const [imgUpload, setImgUpload] = useState(false)
  const [fileLoader, setFileLoader] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [imgUploaded, setImgUploaded] = useState(false)

  // Uploading Communnities Data
  const blogUploader = async () => {
      setBtnDisabled(true)
      const unique_id = uuid()

      const modalButton = document.getElementById('community-modal-btn')
      try {
          const docRef = await setDoc(doc(db, "blogData", unique_id), {
              name: name,
              description: description,
              featured_image: imgUrl,
              id: unique_id
          });
          setName('')
          setDescription('')
          setImgUrl('')
          modalButton.click()
          setBtnDisabled(false)

      } catch (error) {
          console.log(error);
      }
  }

    //  Uploading Img
    useEffect(() => {
        const uploadImg = () => {
            setImgUploaded(false)
            const uniqueName = Math.floor(Math.random() * 100 * 100000) + '-' + file.name;
            const storageRef = ref(storage, uniqueName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
  
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setFileLoader(true)
                    setBtnDisabled(true)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            setFileLoader(true)
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setFileLoader(false)
                        setImgUrl(downloadURL)
                        setImgUpload(false)
                        setBtnDisabled(false)
                        setImgUploaded(true)
                    });
                }
            );
        }
        imgUpload && uploadImg()
    }, [file])


  return (

          <React.Fragment >              
              <div className='table_header'>
                    <h3>Blog</h3>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#communityModal" onClick={()=> setImgUploaded(false)}>
                        Add Blog Post
                    </button>
              </div>
              <div className="modal fade" id="communityModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Add Blog Post</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <div >
                                  <br />
                                  <input className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                                  
                                  <br />
                                  <CKEditor
                                      editor={ClassicEditor}
                                      data={description}
                                      onReady={(editor) => {
                                          console.log('Editor is ready to use!', editor);
                                      }}
                                      onChange={(event, editor) => {
                                          const data = editor.getData();
                                          setDescription(data);
                                      }}
                                      config={{
                                          toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList'],
                                      }}
                                  />
                                  <br />


                                  {/* <input placeholder='Columns' value={columns} onChange={(e) => setColumns(e.target.value)} /><br /> */}
                                  <label for="community_img_uploader" class="custom-file-upload">
                                    {
                                        imgUploaded ?
                                            "Image Uploaded"
                                            :
                                            fileLoader ?
                                                <>
                                                    <img src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' width={"35px"} />
                                                    Loading ...
                                                </>
                                                :
                                                <>
                                                    <img src='https://i.imgur.com/x2ct9C1.png' width={"35px"} />
                                                    Upload Image
                                                </>
                                    }


                                </label>
                                <input style={{visibility:"hidden",position:"absolute"}} id='community_img_uploader' type="file" onChange={(e) => {
                                    setFile(e.target.files[0])
                                    setImgUpload(true)
                                }} /><br />
  
  
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button className={btnDisabled ? 'btn btn-secondary disabled' : 'btn btn-secondary'} id='community-modal-btn' type="button"  data-bs-dismiss="modal">Close</button>
                              <button className={btnDisabled ? 'btn btn-primary disabled' : 'btn btn-primary'} onClick={() => blogUploader()} type="button" data-bs-dismiss="modal">Add Blog Post</button>
                          </div>
                      </div>
                  </div>
              </div>
          </React.Fragment>
  )
}

export default BlogForm
