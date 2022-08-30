import React from 'react';
import Link from 'next/link';
//import {ConnectPlugin} from '../../connectPlugins';
import {HomeFilled} from '@ant-design/icons';
import {useSelector } from 'react-redux';
import MegaMenu from './MegaMenu';
import { useRouter } from 'next/router'
 
const Menu = ({ data, className,service }) => {
    let viewcurrentColor=useSelector(s=>s.palette.viewcurrentColor)
   
    const router = useRouter()
    return(
    <ul className={className }>
            {router.route!=="/"? <li style={{verticalAlign:"middle"}}><Link href="/"><a ><HomeFilled  className={viewcurrentColor} /></a></Link></li>:""}
       

       
        {data &&
            data.map(item => {
              
                   
                    return <MegaMenu menuData={item} key={item.categoryId} viewcurrentColor={viewcurrentColor} />;

                
            })}
            <li><Link href="/blog"><a>Blogs</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
           
    </ul>
    )
};

export default Menu;
