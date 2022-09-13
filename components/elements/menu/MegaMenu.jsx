import { useState } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import {
    CaretRightFilled
  } from '@ant-design/icons';
import Link from 'next/link';


const Menu=({menuData,viewcurrentColor})=>  { 

   
const [defaluremove,setdefaluremove]=useState(true)
   const  mouseOverFunc=()=>{
 document.body.classList.add("scroll-block-home")   
 setdefaluremove(true)   
    }
 
 
    const  myFunction=()=> {
        setdefaluremove(false)
        
      }

   const  mouseOutFunc=() =>{
   
        document.body.classList.remove("scroll-block-home")
         }

    
       
       
        return (
            <>
          
            <li
                className={
                        `menu-item-has-children ${defaluremove ==true&&'has-mega-menu'} ${viewcurrentColor}` 
                }   onMouseOver={e=>mouseOverFunc()} onMouseOut={e=>mouseOutFunc()}>
                {/* {menuData.type === 'dynamic' ? ( */}
                    <Link 
                        href={{pathname: `/shop/[sid]`,query:{
                            attribute:"",
                            priceTo:30000,
                            priceFrom:0,
                            brand:"",
                            variantValue:"",
                            defaultCallValue:"",
                            offset:0,
                            index:0,
                            keyword: "",
                            categorySlug: menuData.categorySlug}}}

                        as={{pathname: `/shop/${menuData.categorySlug}`,query:{
                            attribute:"",
                            priceTo:30000,
                            priceFrom:0,
                            brand:"",
                            variantValue:"",
                            defaultCallValue:"",
                            offset:0,
                            index:0,
                            keyword: "",
                            categorySlug: menuData.categorySlug}}}
                     
                        >
                        <a >
                            <span>{menuData.name}</span>
                            
                        </a>
                    </Link>
                
                <div onMouseOver={e=>mouseOverFunc()}  onMouseOut={e=>mouseOutFunc()}>
                   
                   
                <div className="mega-menu"  >
                    {menuData&&menuData&&menuData.children&&menuData.children.map(megaItemChild => (
                            <div
                                className="mega-menu__column"
                                key={megaItemChild.name}>
                                <h4>
                                   
                                <Link 
                        href={{pathname: `/shop/[sid]`,query:{
                            attribute:"",
                            priceTo:30000,
                            priceFrom:0,
                            brand:"",
                            variantValue:"",
                            defaultCallValue:"",
                            offset:0,
                            index:0,
                            keyword:"",
                            categorySlug: megaItemChild.categorySlug}}}

                        as={{pathname: `/shop/${megaItemChild.categorySlug}`,query:{
                            attribute:"",
                            priceTo:30000,
                            priceFrom:0,
                            brand:"",
                            variantValue:"",
                            defaultCallValue:"",
                            offset:0,
                            index:0,
                            keyword:"",
                            categorySlug: megaItemChild.categorySlug}}}
                     
                        >
                        <a style={{color:"black"}} onClick={e=>myFunction()}>
                        {megaItemChild.name}
                        </a>
                    </Link>
                                    
                                   
                                   
                                <span>
                                    <CaretRightFilled style={{fontSize:"12px",marginLeft:"10px",marginBottom:"10px",position:"relative",top:"-3px"}}/>
                                    </span></h4>
                                <ul className="mega-menu__list">
                                    {megaItemChild&&megaItemChild.children&&megaItemChild.children.map(megaSubItem => (
                                        <li key={megaSubItem.name}>
                                            {megaSubItem.type === 'dynamic' ? (
                                                <Link
                                                href={{pathname: `/shop/[sid]`,query:{
                                                    attribute:"",
                                                    priceTo:30000,
                                                    priceFrom:0,
                                                    brand:"",
                                                    variantValue:"",
                                                    defaultCallValue:"",
                                                    offset:0,
                                                    index:0,
                                                    keyword: "",
                                                    categorySlug: megaSubItem.categorySlug,
                                                    categoryId:megaItemChild.categoryId}}}
                        
                                                as={{pathname: `/shop/${megaSubItem.categorySlug}`,query:{
                                                    attribute:"",
                                                    priceTo:30000,
                                                    priceFrom:0,
                                                    brand:"",
                                                    variantValue:"",
                                                    defaultCallValue:"",
                                                    offset:0,
                                                    index:0,
                                                    keyword:"",
                                                    categorySlug: megaSubItem.categorySlug,
                                                    categoryId:megaItemChild.categoryId}}}
                                                    // as={`${megaSubItem.url}/${megaSubItem.endPoint}`}
                                                    >
                                                    <a onClick={e=>myFunction()}>
                                                        {megaSubItem.name}
                                                        </a>
                                                </Link>
                                            ) : (
                                                <Link
                                                href={{pathname: `/shop/[sid]`,query:{
                                                    attribute:"",
                                                    priceTo:30000,
                                                    priceFrom:0,
                                                    brand:"",
                                                    variantValue:"",
                                                    defaultCallValue:"",
                                                    offset:0,
                                                    index:0,
                                                    keyword: "",
                                                    categorySlug: megaSubItem.categorySlug,
                                                    categoryId:megaItemChild.categoryId}}}
                        
                                                as={{pathname: `/shop/${megaSubItem.categorySlug}`,query:{
                                                    attribute:"",
                                                    priceTo:30000,
                                                    priceFrom:0,
                                                    brand:"",
                                                    variantValue:"",
                                                    defaultCallValue:"",
                                                    offset:0,
                                                    index:0,
                                                    keyword:"",
                                                    categorySlug: megaSubItem.categorySlug,
                                                    categoryId:megaItemChild.categoryId}}}                                                    >
                                                    <a onClick={e=>myFunction()}>
                                                        {megaSubItem.name}
                                                        </a>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
                </div>
                
            </li>
            </>
        );
    }


export default Menu;
