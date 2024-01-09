import React from 'react'
import logo from '../assets/logo.svg'
import Footer from '../layout/Footer'
import { Link } from 'react-router-dom'

const Stories = () => {


    return (
        <>
            <div id='viewport'>
                <div id='content'>
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
                                        <Link className="nav-link" to="/100-years-of-innovation">100 Years of Innovation</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/ats-family">Technion Stories</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" target='_blank' href='https://ats.org/centennial-funding/'>Centennial Campaign</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/reimagining-the-next-100-years">Reimagining the Next 100 Years</Link>
                                    </li>
                                </ul>
                                <a href="https://secure.ats.org/page/61000/donate/1" className="btn btn-donate" target="_blank">Donate Now</a>
                            </div>
                        </div>
                    </nav>




                    <section className='stories-container'>
                        <div className='conatiner-fluid'>
                            <h1>Submit My Story</h1>
                        </div>

                     

                    </section>


                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Stories
