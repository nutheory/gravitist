import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import footer from '../styles/footer'
import clouds from '../../../assets/images/cloudsBg.jpg'
import logo from '../../../assets/svg/logoGrey.svg'
import facebook from '../../../assets/svg/facebookIconBlue.svg'
import instagram from '../../../assets/svg/instagramIconBlue.svg'
import youtube from '../../../assets/svg/youtubeIconBlue.svg'
import usa from '../../../assets/svg/usa.svg'

const Footer = (props) => {
  let width = window.innerWidth
  if (width > 1023){
    return (
      <footer className={css(footer.container)} style={{background: `url(/${clouds}) no-repeat`}}>
        <div className={css(footer.innerContainer)}>
          <div className={css(footer.contactUs)}>
            <h3 className={css(footer.sectionTitle)}>Contact Us</h3>
            <p><a href="mailto:info@homefilming.com" target="_blank" className={css(footer.mailLink)}>info@homefilming.com</a></p>
            <div>
              <a
                href=""
                className={css(footer.socialIcon)}
                style={{ background: `url(/${facebook}) no-repeat`, width: '12px' }}
                target="_blank">
              </a>
              <a
                href=""
                className={css(footer.socialIcon)}
                style={{ background: `url(/${instagram}) no-repeat`, width: '24px' }}
                target="_blank">
              </a>
              <a
                href=""
                className={css(footer.socialIcon)}
                style={{ background: `url(/${youtube}) no-repeat`, width: '24px' }}
                target="_blank">
              </a>
            </div>
            <div className={css(footer.logo)}>
              <Link to="/">
                <img src={`/${logo}`} alt="HOMEFILMING" />
              </Link>
            </div>
            <p className="copyright">Copyright © 2017 HomeFilming. All rights reserved.</p>
            <div className={css(footer.termsPolicyLinks)}>
              <a href="" target="_target" className={css(footer.termsPolicy)}>Terms of Use</a>
              <a href="" target="_target" className={css(footer.termsPolicy)}>Privacy Policy</a>
            </div>
          </div>
          <div className={css(footer.location)}>
            <h3 className={css(footer.sectionTitle)}>Anaheim, CA</h3>
            <div className={css(footer.phone)}><a href="tel:800-208-8947" className={css(footer.phoneLink)}>800-208-8947</a><img src={`/${usa}`} alt="US flag" className={css(footer.flag)} /></div>
            <p className={css(footer.address)}>1440 S. State College Blvd.<br />Building 2B<br />Anaheim, CA, 92806<br />United States</p>
            <a
              href="https://www.google.com/maps/place/1440+S+State+College+Blvd,+Anaheim,+CA+92806/@33.812585,-117.8912877,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcd7a3592a1277:0xc23063dbd3431a50!8m2!3d33.812585!4d-117.8890937"
              target="_blank"
            >Show On Map</a>
          </div>
          <div className={css(footer.quickLinks)}>
            <h3 className={css(footer.sectionTitle)}>Quick Links</h3>
            <ul className={css(footer.quickLinkList)}>
              <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Jobs For Drone Pilots</NavLink></li>
              <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>How it Works</NavLink></li>
              <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Learn More</NavLink></li>
              <li className={css(footer.faqLink)}><NavLink to="/faq" className={css(footer.qLink)}>FAQ</NavLink></li>
              <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Pilot Log In</NavLink></li>
              <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Customer Log In</NavLink></li>
            </ul>
          </div>
        </div>
      </footer>
    )
  } else {
    return(
      <div className={css(footer.container)}>
        <div className={css(footer.mContactUs)}>
          <h3 className={css(footer.sectionTitle)}>Contact Us</h3>
          <p className={css(footer.mMailLink)}><a href="mailto:info@homefilming.com" target="_blank" className={css(footer.mailLink)}>info@homefilming.com</a></p>
          <div className={css(footer.socialIconList)}>
            <a
              href=""
              className={css(footer.socialIcon)}
              style={{ background: `url(/${facebook}) no-repeat`, width: '12px' }}
              target="_blank">
            </a>
            <a
              href=""
              className={css(footer.socialIcon)}
              style={{ background: `url(/${instagram}) no-repeat`, width: '24px' }}
              target="_blank">
            </a>
            <a
              href=""
              className={css(footer.socialIcon)}
              style={{ background: `url(/${youtube}) no-repeat`, width: '24px' }}
              target="_blank">
            </a>
          </div>
        </div>
        <div className={css(footer.location)}>
          <h3 className={css(footer.sectionTitle)}>Anaheim, CA</h3>
          <div className={css(footer.phone)}><a href="tel:800-208-8947" className={css(footer.phoneLink)}>800-208-8947</a><img src={`/${usa}`} alt="US flag" className={css(footer.flag)} /></div>
          <p className={css(footer.address)}>1440 S. State College Blvd.<br />Building 2B<br />Anaheim, CA, 92806<br />United States</p>
          <a
            href="https://www.google.com/maps/place/1440+S+State+College+Blvd,+Anaheim,+CA+92806/@33.812585,-117.8912877,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcd7a3592a1277:0xc23063dbd3431a50!8m2!3d33.812585!4d-117.8890937"
            target="_blank"
          >Show On Map</a>
        </div>
        <div className={css(footer.quickLinks)}>
          <h3 className={css(footer.sectionTitle)}>Quick Links</h3>
          <ul className={css(footer.quickLinkList)}>
            <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Jobs For Drone Pilots</NavLink></li>
            <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>How it Works</NavLink></li>
            <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Learn More</NavLink></li>
            <li className={css(footer.faqLink)}><NavLink to="/faq" className={css(footer.qLink)}>FAQ</NavLink></li>
            <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Pilot Log In</NavLink></li>
            <li className={css(footer.quickLink)}><NavLink to="" className={css(footer.qLink)}>Customer Log In</NavLink></li>
          </ul>
        </div>
        <div className={css(footer.logo)}>
          <Link to="/">
            <img src={`/${logo}`} alt="HOMEFILMING" />
          </Link>
        </div>
        <div className={css(footer.termsPolicyLinks)}>
          <a href="" target="_target" className={css(footer.termsPolicy)}>Terms of Use</a>
          <a href="" target="_target" className={css(footer.termsPolicy)}>Privacy Policy</a>
        </div>
        <p className={css(footer.copyright)}>Copyright © 2017 HomeFilming. All rights reserved.</p>
      </div>
    )
  }
}

export default Footer
