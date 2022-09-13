import React from "react";
import Link from "next/link";
import Logo from '../../Icons/Logo';
import IconFacebook from '../../Icons/IconFacebook';
import IconInstagram from '../../Icons/IconInstagram';
import IconLinkedin from '../../Icons/IconLinkedin';
import IconYoutube from '../../Icons/IconYoutube';
import IconTwiiter from '../../Icons/IconTwiiter';

export default function LeftPannel(){
    return(
        <div className="left-pannel">
            <div className="logo mb12">
                <Link href="/"><a><Logo /></a></Link>
            </div>
            <div className="sub-title mb26">
                You can sell, buy <br/>Go Live & Schedule stream
            </div>
            <div className="charizard mb70">
                <img src="/static/images/Charizard.png" alt="Charizard" />
            </div>
            <div className="flex justify-center indicator mb70">
                <span></span>
                <span className="active"></span>
                <span></span>
            </div>
            <div className="social-icon-wrapper">
                <h3 className="follow mb20">Follow Us On</h3>
                <div className="flex justify-center flex-center">
                    <Link href="https://facebook.com" target="_blank"><a><IconFacebook /></a></Link>
                    <Link href="https://instagram.com" target="_blank"><a><IconInstagram /></a></Link>
                    <Link href="https://linkedin.com" target="_blank"><a><IconLinkedin /></a></Link>
                    <Link href="https://youtube.com" target="_blank"><a><IconYoutube /></a></Link>
                    <Link href="https://twitter.com" target="_blank"><a><IconTwiiter /></a></Link>
                </div>
            </div>
        </div>
    );
}