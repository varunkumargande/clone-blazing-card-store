import Link from 'next/link'
import React from 'react'
import { imageUrl } from '../../../../api/url';
import { useSelector } from 'react-redux';

export default function Logo() {
  const logopaths=useSelector(s=>s.setting.footerDet)
  return (
  <>
  <Link href="/">
              <a className="ps-logo">
                <div className="logo-div">
                  {/* {logopaths&&logopaths&&  <img
                        src={
                          imageUrl +
                          "?path=" +
                          logopaths.storeLogoPath +
                          "&name=" +
                          logopaths.storeLogo +
                          "&width=220&height=50"
                        }
                         alt="picco"
                      />} */}
              
                 
                </div>
              </a>
            </Link>
  </>
  )
}
