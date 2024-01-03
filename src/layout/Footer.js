import React from 'react'
import footer_logo from '../assets/footer_logo.png'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'

const Footer = () => {

  return (
<section className="footer">
                        <div className="container-fluid">
                            <div className="footer_inner">
                                <div className="details">
                                    <img src={footer_logo} className="img-fluid" />
                                    <p>
                                        American Technion Society<br />
                                        55 East 59th Street<br />
                                        New York, NY 10022</p>
                                    <ul className="footer_links">
                                        <li>
                                            <a href="tel:212 407 6300">212 407 6300</a>
                                        </li>
                                        <li>
                                            <a href="mailto:info@ats.org">info@ats.org</a>
                                        </li>
                                    </ul>
                                    <br />
                                    <div className='social-div' style={{display:"flex",gap:"7px"}}>
                                        <a href='https://twitter.com/TechnionUSA' target='_blank'><FaTwitter size={20}/></a>
                                        <a href='https://www.facebook.com/americantechnionsociety/' target='_blank'><FaFacebookF size={20}/></a>
                                        <a href='https://www.instagram.com/americantechnionsociety/' target='_blank'><FaInstagram size={20}/></a>
                                        <a href='https://www.linkedin.com/company/american-technion-society' target='_blank'><RiLinkedinFill size={20}/></a>
                                        <a href='https://www.youtube.com/user/TechnionSociety' target='_blank'><FaYoutube size={20}/></a>
                                    </div>

                                </div>
                              <div className='links'>
                              <div>
                                    <h5>Impact</h5>
                                    <ul className="footer_links">
                                        <li><a href="https://ats.org/impact/high-tech-future/">High-Tech Future</a></li>
                                        <li><a href="https://ats.org/impact/human-health/">Human Health</a></li>
                                        <li><a href="https://ats.org/impact/israels-security/">Israel's Security</a></li>
                                        <li><a href="https://ats.org/impact/jacobs-technion-cornell-institute/">Jacobs Technion-Cornell Institute</a></li>
                                        <li><a href="https://ats.org/impact/sustainability/">Sustainability</a></li>
                                        <li><a href="https://ats.org/impact/visionary-education/">Visionary Education</a></li>
                                    </ul>
                               
                                    <div>
                                        <br />
                                        <br />
                                    <h5>About Ats</h5>
                                    <ul className="footer_links">
                                        <li><a href="https://ats.org/about/ats-leadership/">ATS Leadership</a></li>
                                        <li><a href="https://ats.org/about/faces-of-the-technion/">Faces of the Techinon</a></li>
                                        <li><a href="https://ats.org/in-the-news/">In the News</a></li>
                                        <li><a href="https://ats.org/about/about-the-technion/">About the Techinon</a></li>
                                        <li><a href="https://ats.org/about/ats-board/">Board of Directors</a></li>
                                        <li><a href="https://ats.org/about/ats-careers/">Careers</a></li>
                                    </ul>
                                </div>
                                </div>
                                <div>
                                    <h5>Location</h5>
                                    <ul className="footer_links">
                                    <li><a href="https://ats.org/location/baltimore/">Baltimore</a></li>
                                    <li><a href="https://ats.org/location/sv-sf/">San Francisco Bay Area</a></li>
                                    <li><a href="https://ats.org/location/boston/">Boston</a></li>
                                    <li><a href="https://ats.org/location/chicago/">Chicago</a></li>
                                    <li><a href="https://ats.org/location/detroit/">Detroit</a></li>
                                    <li><a href="https://ats.org/location/gulf-coast-florida/">Gulf Coast Florida</a></li>
                                    <li><a href="https://ats.org/location/houston/">Houston</a></li>
                                    <li><a href="https://ats.org/location/miami/">Miami</a></li>
                                    <li><a href="https://ats.org/location/new-york/">New York</a></li>
                                    <li><a href="https://ats.org/location/ohio-western-pensylvania/">Ohio/Western PA</a></li>
                                    <li><a href="https://ats.org/location/pacific-northwest/">Pacific Northwest</a></li>
                                    <li><a href="https://ats.org/location/palm-beach/">Palm Beach</a></li>
                                    <li><a href="https://ats.org/location/philadelphia/">Philadelphia</a></li>
                                    <li><a href="https://ats.org/location/san-diego/">San Diego</a></li>
                                    <li><a href="https://ats.org/location/south-palm-beach/">South Palm Beach</a></li>
                                    <li><a href="https://ats.org/location/southern-california/">Southern California</a></li>
                                    <li><a href="https://ats.org/location/washington-dc/">Washington, D.C.</a></li>
                                    </ul>
                                </div>
                               
                                <div>
                                    <h5>Alumni</h5>
                                    <ul className="footer_links">
                                        <li><a href="https://ats.org/giving/technion-fund/">Techinon Fund</a></li>
                                        <li><a href="https://ats.plannedgiving.org">Planned Giving</a></li>
                                        <li><a href="https://ats.org/giving/global-campaign/">Global Campaign</a></li>
                                        <li><a href="https://ats.org/giving/other-giving-options/">Other Giving Options</a></li>
                                    </ul>
                                </div>
                              </div>
                            </div>
                        </div>
                    </section>
  )
}

export default Footer
