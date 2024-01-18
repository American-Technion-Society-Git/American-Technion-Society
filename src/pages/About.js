import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import parse from 'html-react-parser'
import background from '../assets/invovation_hero_img.png'
import { Link } from 'react-router-dom'
import Roadmap from '../layout/Roadmap'
import Footer from '../layout/Footer'



const About = ({ blog, roadmap }) => {

    const [blogModalData, setBlogModalData] = useState({})

    const blogData = blog.slice(0, 6)

    return (
        <>
            <div className="modal fade .modal-fullscreen" id="blogModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <svg data-bs-dismiss="modal" aria-label="Close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 5.91L6 18.09" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 5.91L18 18.09" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h1>

                                    {blogModalData.name}

                                </h1>
                                <br />
                                <img width={'100%'} src={blogModalData.featured_image} />
                                <br /><br />
                                <p>{parse(`${blogModalData.description}`)}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <nav className="navbar fixed-top navbar-expand-lg" id="navbar">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="" className="img-fluid" />
                        </Link>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/100-years-of-innovation">100 Years of Innovation</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ats-family">Technion Stories</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target='_blank' href='https://ats.org/centennial/'>Centennial Campaign</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reimagining-the-next-100-years">Reimagining the Next 100 Years</Link>
                                </li>
                            </ul>
                            <a href="https://secure.ats.org/page/61000/donate/1" className="btn btn-donate" target="_blank">Donate Now</a>
                        </div>
                    </div>
                </nav>
                <section className="hero" style={{ backgroundImage: `url(${background})`, marginTop: "72px" }}>
                    <div className="container-fluid">

                        <div className="hero_inner">
                            <div>
                                <h1>

                                    Coming of Age

                                </h1>
                                <p>
                                    It’s fortunate that the Technion existed before the State of Israel. If it had been
                                    the other way around, who knows what would have happened. The Technion created the
                                    State of Israel and deserves the credit for this.
                                </p>
                            </div>
                        </div>
                    </div>

                </section>

                <Roadmap roadmap={roadmap} roadmapPage={false} />
                {/* <Roadmap roadmap={roadmapData}/> */}

                <section className="blog_posts">
                    <div className="container-fluid">
                        <div className="blog_inner">
                            <div className="heading">
                                <h2>

                                    Reimagining the Next 100 Years

                                </h2>
                            </div>
                            <div className="wrapper">

                                {
                                    blogData.map((res, index) => {
                                        const route = res.name.toLowerCase().replace(/\s+/g, '-')

                                        return (
                                            <div key={index} className="post_wrapper">
                                                <div className="thumbnail">
                                                    <img src={res.featured_image} alt="" type="button" data-bs-toggle="modal" data-bs-target="#blogModal" />
                                                </div>
                                                <div className="content_wrapper">
                                                    <div className="inner_wrapper">
                                                        <h4
                                                            onClick={() => {
                                                                setBlogModalData(res)
                                                            }}
                                                            type="button" data-bs-toggle="modal" data-bs-target="#blogModal">
                                                            {res.name}
                                                        </h4>
                                                        <p>
                                                            {
                                                                parse(`${res.description}`)
                                                            }
                                                        </p>
                                                        <a onClick={() => {
                                                            setBlogModalData(res)
                                                        }}
                                                            type="button" data-bs-toggle="modal" data-bs-target="#blogModal"
                                                        >Read More </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>



                <Footer />
            </div>


        </>
    )
}

export default About
