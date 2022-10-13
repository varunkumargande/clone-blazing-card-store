import React from "react";
import Link from "next/link";
import WhiteLogo from "../../Icons/WhiteLogo";
import IconFacebook from '../../Icons/IconFacebook';
import IconInstagram from '../../Icons/IconInstagram';
import IconLinkedin from '../../Icons/IconLinkedin';
import IconYoutube from '../../Icons/IconYoutube';
import IconTwiiter from '../../Icons/IconTwiiter';

export default function Footer(){
    return(
        <footer>
            <div className="inner-container">
                <div className="flex flex-wrap space-between">
                    <div className="box logo">
                        <Link href="/"><a><WhiteLogo/></a></Link>
                    </div>
                    <div className="box">
                        <h3 className="follow mb20">Company</h3>
                        <div className="links flex column">
                            <Link href="/about-us"><a>About Us</a></Link>
                            <Link href="/FAQs"><a>FAQ's</a></Link>        
                            <Link href="/contact-us"><a>Contact Us</a></Link>        
                        </div>
                    </div>
                    <div className="box">
                        <h3 className="follow mb20">Quick Links</h3>
                        <div className="links flex column">
                            <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                            <Link href="/terms-conditions"><a>Term & Conditions</a></Link>    
                        </div>
                    </div>
                    <div className="box">
                        <h3 className="follow mb20">Follow Us</h3>
                        <div className="social flex flex-center space-between">
                            <Link href="https://facebook.com" target="_blank"><a><IconFacebook /></a></Link>
                            <Link href="https://instagram.com" target="_blank"><a><IconInstagram /></a></Link>
                            <Link href="https://linkedin.com" target="_blank"><a><IconLinkedin /></a></Link>
                            <Link href="https://youtube.com" target="_blank"><a><IconYoutube /></a></Link>
                            <Link href="https://twitter.com" target="_blank"><a><IconTwiiter /></a></Link>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright flex flex-center">
                    © Blazing Cards. 2022, All Rights Reserved
                </div>
            </div>
        </footer>
    );
}