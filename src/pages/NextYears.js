import React,{useState} from 'react'
import logo from '../assets/logo.svg'
import naftali from '../assets/naftali.png'
import frame from '../assets/frame.png'
import background from '../assets/next_hero_img.png'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import parse from 'html-react-parser';
 

const NextYears = ({ blog }) => {

    const [blogModalData, setBlogModalData] = useState({})
    const blogData = blog.slice(0, 4)
    return (
        <>

        <div className="modal fade .modal-fullscreen" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Naftali Bennett</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                        <h6>
                                            Naftali Bennett: Technion Pride
                                        </h6>

                                        <h3 className="cursive">Naftali Bennett, Israel’s 13th prime minister and a Haifa native, may have obtained a law
                                            degree, but the high-tech entrepreneur has the spirit, drive, and pride of the Technion at his
                                            core.</h3>
                                        <p>

                                            “I grew up in the Technion;
                                            it was really central to my identity,” the former prime minister
                                            said in a recent interview with ATS staff.
                                            His father, Jim Bennett, worked in the Technion’s fundraising department. “Every Friday,
                                            my family would go to the Technion pool, and I’d watch my f
                                            ather play basketball. It was just a
                                            fundamental part of who I was.”
                                            Growing up in the Technion’s shadow also created high expectations and pride. “The
                                            Technion projected an aura of excellence and science into the city.”
                                            The Technion’s leading role in hig
                                            h tech and entrepreneurship also clearly impacted the
                                            former prime minister. In 1996, Mr. Bennett began pursuing a degree in law at The Hebrew
                                            University of Jerusalem, while at the same time starting work for a software company. By
                                            1999, he had co
                                            -
                                            founded
                                            an anti
                                            -
                                            fraud company in New York called Cyota.
                                            He served as its chief executive officer until Cyota was sold in 2005 to U.S.
                                            -
                                            based RSA
                                            Security for $145 million. Always a staunch Zionist, he included a stipulation that the Israeli
                                            arm remain intact. Toda
                                            y, 400 Israelis are employed in the company’s offices in Be’er
                                            -
                                            Sheva
                                            and Herzliya.
                                            Following a brief stint from 2006 to 2008 as chief of staff to then
                                            -
                                            opposition leader
                                            Benjamin Netanyahu, in 2009 Mr. Bennett became CEO of Soluto, a startup specializing i
                                            n
                                            cloud computing services. That company was sold to Asurion, another American company, for
                                            $130 million in 2013.
                                            Prior to, during, and following Mr. Bennett’s high
                                            -
                                            tech career, he assumed strategic roles in
                                            the Israel Defense Forces. He became a commander
                                            in the
                                            Maglan
                                            , a unit that specializes in
                                            operating behind enemy lines. While he was living in the United States, he repeatedly traveled
                                            to Israel to perform reserve duty. He served during both intifadas and in the second Lebanon
                                            War in 2006.
                                            Mr. Bennett’
                                            s political career began in earnest in 2012 when he became the leader of the
                                            Jewish Home party. Between 2013 and 2021 he held significant cabinet positions, including
                                            minister of economy, minister of Jerusalem and diaspora affairs, minister of religious se
                                            rvices,
                                            minister of education, minister of defense, and finally prime minister in 2021, when he formed
                                            a broad coalition and led the most diverse government in Israel’s history.
                                            And throughout his political service, he looked to the Technion for leadership
                                            and
                                            partnership in many initiatives.
                                            “The Technion is one of Israel’s national treasures
                                            —
                                            a national treasure that is central to
                                            Israel’s success and national security,” Mr. Bennett said.
                                            The former prime minister lauded the Technion’s commitment to exc
                                            ellence in education.
                                            When he was minister of education and saw the steady decline in advanced high school
                                            mathematics as a national crisis, he sought help from the Technion

                                        </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

        <div className="modal fade .modal-fullscreen" id="blogModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <svg data-bs-dismiss="modal" aria-label="Close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 5.91L6 18.09" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 5.91L18 18.09" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    </button>
                </div>
                <div className="modal-body">
               <div>
               <h1>
                
               {blogModalData.name}
                
               </h1>
               <br />
               <img width={'100%'} src={blogModalData.featured_image}/>
               <br /><br />
                   <p>{parse(`${blogModalData.description}`)}</p>
               </div>
                </div>
                
            </div>
        </div>
    </div> 
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
                            <a className="nav-link" target='_blank' href='https://ats.org/centennial/'>Centennial Campaign</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/reimagining-the-next-100-years">Reimagining the Next 100 Years</Link>
                        </li>
                    </ul>
                    <a href="https://secure.ats.org/page/61000/donate/1" className="btn btn-donate" target="_blank">Donate Now</a>
                </div>
            </div>
                </nav>
                <section className="hero" style={{ backgroundImage: `url(${background})`,marginTop:"72px"}}>
                    <div className="container-fluid">

                        <div className="hero_inner">
                            <div>
                                <h1 style={{textTransform:'none'}}>
                                 
                                    Reimagining the Next 100 Years
                                     
                                </h1>

                            </div>
                        </div>
                    </div>

                </section>

                <section className="blog_posts">
                    <div className="container-fluid">
                        <div className="blog_inner">
                            <div className="heading">
                                <h2>
                                 
                                    Reimagining the Next 100 Years
                                     
                                </h2>
                                <p>Over the past 100 years, fantastic leaps in the advancement of science and technology have
                                revolutionized the world. The automobile replaced the horse and buggy; penicillin saved
                                hundreds of millions of lives;
                                and the invention of the computer, the World Wide Web, and
                                digital communications and devices impacted our lives in ways our grandparents couldn’t
                                have imagined. What will the next 100 years bring?</p>
                            <p>
                                Imagine advancements in biotech that enable personalized treatments and cures for
                                diseases. Could nanorobots deliver drugs directly to the site of disease or heal injuries? What
                                about being able to detect and even prevent disease before it manifests? Will food be sourced
                                from animals but not come from them? Will
                                the Technion’s world-leading research in
                                quantum technologies and artificial intelligence provide unmatched cybersecurity and
                                unimaginably powerful computers that will also impact everything around us? We asked
                                four leading Technion scientists to share the
                                ir visions for scientific developments in the next
                                100 years.
                            </p>
                            </div>
                            <div className="wrapper next_wrapper">

                                {
                                    blogData.map((res, index) => {
                                        const route = res.name.toLowerCase().replace(/\s+/g, '-')

                                        return (
                                            <div key={index} className="post_wrapper">
                                                <div className="thumbnail">
                                                    <img src={res.featured_image} alt="" />
                                                </div>
                                                <div className="content_wrapper">
                                                    <div className="inner_wrapper">
                                                        <h4 onClick={() => {
                                                            setBlogModalData(res)
                                                          }} type="button" data-bs-toggle="modal" data-bs-target="#blogModal">
                                                            {res.name}
                                                        </h4>

                                                        {parse(`${res.description}`)}

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
            </section>

                <section className="content_block">
                    <div className="container-fluid">
                        <div className="content_block_inner">
                            <div className="heading">
                                <h6>REIMAGINING THE NEXT 100 YEARS</h6>
                                <h2>
                                 
                                Global Centennial
                                    Campaign for the Technion
                                     
                                    </h2>
                                <a href="https://ats.org/centennial/" target='_blank' className="btn btn-secondary">Learn More</a>
                            </div>
                            <div className="content_wrapper">
                                <div className="qoute">
                                    <h4>
                                        The Technion-Israel Institute of Technology has played a crucial role in the
                                        establishment and vitality of Israel and in improving the lives of people worldwide
                                        since opening its doors in 1924. And no other institution holds more promise for
                                        Israel’s future.
                                    </h4>
                                </div>
                                <p>
                                    The Technion is preparing the leaders, scientists, and entrepreneurs who are reimagining
                                    the future of Israel and working to find solutions to challenging global problems. At
                                    this historic centennial moment, you have an extraordinary opportunity to partner with
                                    us in shaping the University’s second century.
                                </p>
                                <a href="#" className="btn btn-ghost">EXPLORE KEYSTONE OPPORTUNITIES </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>



        </div>
        </>
    )
}

export default NextYears
