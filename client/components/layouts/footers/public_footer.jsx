// @flow
import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Footer = (props: Object) => {
  return (
    <footer className="bg-grey-darkest text-grey-lighter public-footer">
      <div className="container mx-auto py-12">
        <div className="flex flex-wrap md:-mx-6">
          <div className="w-full md:w-1/3 p-6">
            <h2 className="text-base font-bold">Contact us</h2>
            <p className="text-lg">
              <a href="mailto:contact@gravit.ist" className="" target="_blank">contact@gravit.ist</a>
            </p>
            <div className="py-2">
              <a href="" className="inline-block pr-4">
                <svg id="Layer_1" className="w-6 h-6" style={{fill:'#3c5a99'}} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.5 258.9"><defs></defs><title>facebook</title><path id="f" d="M276.1,462V343.9h39.7l5.9-46H276.1V268.5c0-13.3,3.7-22.4,22.8-22.4h24.4V204.9a316.78,316.78,0,0,0-35.5-1.8c-35.2,0-59.2,21.5-59.2,60.9v34H188.8v46h39.8V462Z" transform="translate(-188.8 -203.1)"/></svg></a>
              <a href="" className="inline-block pr-4">
                <svg id="Layer_2" className="w-6 h-6" style={{fill:'#439cd6'}} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318.7 259.09"><defs></defs><title>twitter</title><path id="_Path_" data-name="&lt;Path&gt;" d="M196.9,462C317.2,462,383,362.3,383,275.9c0-2.8,0-5.6-.2-8.5a133,133,0,0,0,32.6-33.9,128.82,128.82,0,0,1-37.6,10.3,65.54,65.54,0,0,0,28.8-36.2,131.75,131.75,0,0,1-41.5,15.9,65.45,65.45,0,0,0-111.4,59.7,185.7,185.7,0,0,1-134.8-68.3,65.43,65.43,0,0,0,20.2,87.3,64.57,64.57,0,0,1-29.7-8.2v.8a65.5,65.5,0,0,0,52.5,64.1,65.34,65.34,0,0,1-29.5,1.1,65.49,65.49,0,0,0,61.1,45.4,131.6,131.6,0,0,1-81.2,28.1,136,136,0,0,1-15.6-.9A185,185,0,0,0,196.9,462" transform="translate(-96.7 -202.91)"/></svg>
              </a>
              <a href="" className="inline-block pr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" style={{fill:'#d8030e'}} viewBox="0 0 24 24"><path d="M4.652 0h1.44l.988 3.702.916-3.702h1.454l-1.665 5.505v3.757h-1.431v-3.757l-1.702-5.505zm6.594 2.373c-1.119 0-1.861.74-1.861 1.835v3.349c0 1.204.629 1.831 1.861 1.831 1.022 0 1.826-.683 1.826-1.831v-3.349c0-1.069-.797-1.835-1.826-1.835zm.531 5.127c0 .372-.19.646-.532.646-.351 0-.554-.287-.554-.646v-3.179c0-.374.172-.651.529-.651.39 0 .557.269.557.651v3.179zm4.729-5.07v5.186c-.155.194-.5.512-.747.512-.271 0-.338-.186-.338-.46v-5.238h-1.27v5.71c0 .675.206 1.22.887 1.22.384 0 .918-.2 1.468-.853v.754h1.27v-6.831h-1.27zm2.203 13.858c-.448 0-.541.315-.541.763v.659h1.069v-.66c.001-.44-.092-.762-.528-.762zm-4.703.04c-.084.043-.167.109-.25.198v4.055c.099.106.194.182.287.229.197.1.485.107.619-.067.07-.092.105-.241.105-.449v-3.359c0-.22-.043-.386-.129-.5-.147-.193-.42-.214-.632-.107zm4.827-5.195c-2.604-.177-11.066-.177-13.666 0-2.814.192-3.146 1.892-3.167 6.367.021 4.467.35 6.175 3.167 6.367 2.6.177 11.062.177 13.666 0 2.814-.192 3.146-1.893 3.167-6.367-.021-4.467-.35-6.175-3.167-6.367zm-12.324 10.686h-1.363v-7.54h-1.41v-1.28h4.182v1.28h-1.41v7.54zm4.846 0h-1.21v-.718c-.223.265-.455.467-.696.605-.652.374-1.547.365-1.547-.955v-5.438h1.209v4.988c0 .262.063.438.322.438.236 0 .564-.303.711-.487v-4.939h1.21v6.506zm4.657-1.348c0 .805-.301 1.431-1.106 1.431-.443 0-.812-.162-1.149-.583v.5h-1.221v-8.82h1.221v2.84c.273-.333.644-.608 1.076-.608.886 0 1.18.749 1.18 1.631v3.609zm4.471-1.752h-2.314v1.228c0 .488.042.91.528.91.511 0 .541-.344.541-.91v-.452h1.245v.489c0 1.253-.538 2.013-1.813 2.013-1.155 0-1.746-.842-1.746-2.013v-2.921c0-1.129.746-1.914 1.837-1.914 1.161 0 1.721.738 1.721 1.914v1.656z"/></svg>
              </a>
            </div>
            <Link className="w-32 block" to="/"><img src={`/${require('../../../assets/svg/light_gravitist_logo.svg')}`} /></Link>
            <p className="copyright">Copyright © 2018 Gravit.ist. All rights reserved.</p>
            <div className="">
              <a href="" target="_target" className="inline-block pr-4">Terms of Use</a>
              <a href="" target="_target" className="inline-block">Privacy Policy</a>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-6">
            <h2 className="text-base font-bold">Anaheim, Ca</h2>
            <p className=""><a href="tel:800-208-8947" className="">800 208 8947</a></p>
            <p className="">1440 S. State College Blvd.<br />Building 2B<br />Anaheim, CA, 92806<br />United States</p>
            <p><a href="https://www.google.com/maps/place/1440+S+State+College+Blvd,+Anaheim,+CA+92806/@33.812585,-117.8912877,17z/data=!3m1!4b1!4m5!3m4!1s0x80dcd7a3592a1277:0xc23063dbd3431a50!8m2!3d33.812585!4d-117.8890937" target="_blank">Show On Map</a></p>
          </div>
          <div className="w-full md:w-1/3 p-6">
            <h2 className="text-base font-bold">Navigation</h2>
            {/* <p><NavLink to="/pricing">Pricing</NavLink></p> */}
            <p><NavLink to="/demo">Sample gallery</NavLink></p>
            <p><NavLink to="/pilots">Jobs for pilots</NavLink></p>
            <p><NavLink to="/pilots/register">Sign up to fly</NavLink></p>
            <p><NavLink to="/login">Login</NavLink></p>
            {/* <p><NavLink to="/faq">FAQ</NavLink></p> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
