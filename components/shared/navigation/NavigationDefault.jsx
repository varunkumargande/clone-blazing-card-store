import React, {useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Menu from '../../elements/menu/Menu';
import { useSelector, connect } from 'react-redux';
import { useTranslation } from '../../../i18n';

function NavigationDefault(props){
    let category=useSelector(s=>s.product)
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [categoryState,setCategoryState] = useState([])

    useEffect(()=>{
        categoriesMap()
    },[])

    const categoriesMap = () => {
        let menuCategoryData = [];
        category.categories.forEach((categoryData)=>{
            var categoryObj = new Object();
            categoryObj.title = categoryData.name;
            categoryObj.link = "";
            menuCategoryData.push(categoryObj);
        })
        setCategoryState(menuCategoryData);
    } 


const dataMap=[{title:"Home",link:'/'},{title:"Blog",link:"/blog"},{title:"Contact",link:'/page/contact-us'},{title:"Services", serviceArray:props.servicelist}]




        return (
            <nav className={`navigation`}>
              
                <div className="ps-container">  
                    <div className="navigation__left">
                        <div className="menu--product-categories">
                            
                        </div>
                    </div>
                    <div className="navigation__right">
                       

                        <Menu
                            data={category.categories}
                            className="menu"
                            service={dataMap}
                        />
                        
                     
                    </div>
                </div>
            </nav>
        );
    
}

export default connect(s=>s.setting) (NavigationDefault)
