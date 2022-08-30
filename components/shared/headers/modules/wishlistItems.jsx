import Link from 'next/link'
//import {ConnectPlugin} from '../../../connectPlugins';
import React from 'react'
import { useSelector } from 'react-redux';

 function WishlistItems({wishlistData}) {
  let reloadCart=useSelector(s=>s.wishlist.wishlistItems)
  return (
    <>
    <Link href="/account/wishlist">
                    <a className="header__extra">
                  
                        <img src="/static/img/heart.svg" alt=""/>
                        <span>
                         
                            <i>{reloadCart&&reloadCart.length!==0? wishlistData&&wishlistData.length==0?<>{reloadCart.length}</>:<>{wishlistData.length}</>:0}</i>
                        </span>
                    </a>
                </Link>
    </>
  )
}
export default WishlistItems