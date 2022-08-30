import React from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import menuData from '../../../../public/static/data/menu';
import Menu from '../../../elements/menu/Menu';
const MenuCategories = ({category}) => (
    
    
    <Menu data={category} className="menu--dropdown"/>
); 

export default MenuCategories;
