import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { css } from 'aphrodite'
import ftr from '../styles/footer'

const Footer = (props) => {
  let width = window.innerWidth
  if (width > 1023){
    return (
      <footer className={css(ftr.container)}>
        <div className={css(ftr.innerContainer)}>
          <div className={css(ftr.contactUs)}>
            <p><a href="mailto:info@homefilming.com" target="_blank" className={css(ftr.mailLink)}>info@homefilming.com</a></p>
            <div>
              <a
                href=""
                className={css(ftr.socialIcon)}
                style={{ background: `url(${require('../../../assets/svg/facebook.svg')}) no-repeat`, width: '12px' }}
                target="_blank">
              </a>
              <a
                href=""
                className={css(ftr.socialIcon)}
                style={{ background: `url(${require('../../../assets/svg/instagram.svg')}) no-repeat`, width: '24px' }}
                target="_blank">
              </a>
              <a
                href=""
                className={css(ftr.socialIcon)}
                style={{ background: `url(${require('../../../assets/svg/youtubeIconBlue.svg')}) no-repeat`, width: '24px' }}
                target="_blank">
              </a>
            </div>
            <div className={css(ftr.logo)}>
              <Link to="/">
                <img src={require('../../../assets/svg/logoGrey.svg')} alt="HOMEFILMING" />
              </Link>
            </div>
            <p className="copyright">Copyright © 2017 HomeFilming. All rights reserved.</p>
            <div className={css(ftr.termsPolicyLinks)}>
              <a href="" target="_target" className={css(ftr.termsPolicy)}>Terms of Use</a>
              <a href="" target="_target" className={css(ftr.termsPolicy)}>Privacy Policy</a>
            </div>
          </div>
          <div className={css(ftr.location)}>
            <div className={css(ftr.phone)}><a href="tel:800-208-8947" className={css(ftr.phoneLink)}>800-208-8947</a>
            <img src={require('../../../assets/svg/usa.svg')} alt="US flag" className={css(ftr.flag)} /></div>
            <p className={css(ftr.address)}>1440 S. State College Blvd.<br />Building 2B<br />Anaheim, CA, 92806<br />United States</p>
            <a
              href="https://www.google.com/maps/place/1440+S+State+College+Blvd,+Anaheim,+CA+92806/@33.812585,-117.8912877,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcd7a3592a1277:0xc23063dbd3431a50!8m2!3d33.812585!4d-117.8890937"
              target="_blank"
            >Show On Map</a>
          </div>
          <div className={css(ftr.quickLinks)}>
            <ul className={css(ftr.quickLinkList)}>
              <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Become a Pilot</NavLink></li>
              <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>How it Works</NavLink></li>
              <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Learn More</NavLink></li>
              <li className={css(ftr.faqLink)}><NavLink to="/faq" className={css(ftr.qLink)}>FAQ</NavLink></li>
              <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Login</NavLink></li>
            </ul>
          </div>
        </div>
      </footer>
    )
  // }
  } else {
    return(
      <div className={css(ftr.container)}>
        <div className={css(ftr.mContactUs)}>
          <h3 className={css(ftr.sectionTitle)}>Contact Us</h3>
          <p className={css(ftr.mMailLink)}><a href="mailto:info@homefilming.com" target="_blank" className={css(ftr.mailLink)}>info@homefilming.com</a></p>
          <div className={css(ftr.socialIconList)}>
            <a
              href=""
              className={css(ftr.socialIcon)}
              style={{ background: `url(${require('../../../assets/svg/facebookIconBlue.svg')}) no-repeat`, width: '12px' }}
              target="_blank">
            </a>
            <a
              href=""
              className={css(ftr.socialIcon)}
              style={{ background: `url(${require('../../../assets/svg/instagramIconBlue.svg')}) no-repeat`, width: '24px' }}
              target="_blank">
            </a>
            <a
              href=""
              className={css(ftr.socialIcon)}
              style={{ background: `url(${require('../../../assets/svg/youtubeIconBlue.svg')}) no-repeat`, width: '24px' }}
              target="_blank">
            </a>
          </div>
        </div>
        <div className={css(ftr.location)}>
          <h3 className={css(ftr.sectionTitle)}>Anaheim, CA</h3>
          <div className={css(ftr.phone)}><a href="tel:800-208-8947" className={css(ftr.phoneLink)}>800-208-8947</a>
          <img src={require('../../../assets/svg/usa.svg')} alt="US flag" className={css(ftr.flag)} /></div>
          <p className={css(ftr.address)}>1440 S. State College Blvd.<br />Building 2B<br />Anaheim, CA, 92806<br />United States</p>
          <a
            href="https://www.google.com/maps/place/1440+S+State+College+Blvd,+Anaheim,+CA+92806/@33.812585,-117.8912877,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcd7a3592a1277:0xc23063dbd3431a50!8m2!3d33.812585!4d-117.8890937"
            target="_blank"
          >Show On Map</a>
        </div>
        <div className={css(ftr.quickLinks)}>
          <h3 className={css(ftr.sectionTitle)}>Quick Links</h3>
          <ul className={css(ftr.quickLinkList)}>
            <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Jobs For Drone Pilots</NavLink></li>
            <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>How it Works</NavLink></li>
            <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Learn More</NavLink></li>
            <li className={css(ftr.faqLink)}><NavLink to="/faq" className={css(ftr.qLink)}>FAQ</NavLink></li>
            <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Pilot Log In</NavLink></li>
            <li className={css(ftr.quickLink)}><NavLink to="" className={css(ftr.qLink)}>Customer Log In</NavLink></li>
          </ul>
        </div>
        <div className={css(ftr.logo)}>
          <Link to="/">
            <img src={require('../../../assets/svg/logoGrey.svg')} alt="HOMEFILMING" />
          </Link>
        </div>
        <div className={css(ftr.termsPolicyLinks)}>
          <a href="" target="_target" className={css(ftr.termsPolicy)}>Terms of Use</a>
          <a href="" target="_target" className={css(ftr.termsPolicy)}>Privacy Policy</a>
        </div>
        <p className={css(ftr.copyright)}>Copyright © 2017 HomeFilming. All rights reserved.</p>
      </div>
    )
  }
}

export default Footer
