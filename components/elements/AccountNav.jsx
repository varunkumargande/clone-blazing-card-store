import React from 'react';
import {
    InfoCircleFilled,
    PoweroffOutlined,
    EnvironmentFilled,
    AppstoreFilled,
    ShoppingCartOutlined,
    CreditCardOutlined
  } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import Link from 'next/link';
import  Router  from 'next/router';
import QuotationList from '../../pages/account/quotation-list';
import {useDispatch} from 'react-redux';
import {logOut} from '../../store/auth/action';
import {getWishlistList} from '../../store/wishlist/action';
import { useRouter } from 'next/router'

function AccountNav({keyValue}){
    
    const router = useRouter()

    const dispatch=useDispatch()

    const AccountInfoRoute = () => {
        Router.push("/account/information")
    }

    const DashboardRoute=()=>{
        Router.push("/account/dashboard")
    }

    const AddressRoute=()=> {
        Router.push("/account/addresses")
    }

    const QuotationRoute = ()=> {
        Router.push("/account/quotation-list")
    }

    const OrderRoute= ()=>{
        Router.push("/account/myorders")
    }

    const CardRoute = () => {
        Router.push("/account/card-details")
    }

    const handleLogout = e => {
        sessionStorage.clear()
        dispatch(logOut());
        dispatch(getWishlistList([]));
        Router.push("/account/login");
    };

    return(
        <div className="cus-left-position">
            <div className="cus-left-subcontainer">
                <Menu defaultSelectedKeys={[JSON.stringify(keyValue)]}>
                    <Menu.Item key="1" icon={<AppstoreFilled style={{color:"#2874f0",fontSize:"18px"}}/>}  style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e => DashboardRoute()}>Account Dashboard</Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e =>AccountInfoRoute()}>Account Information</Menu.Item>
                    <Menu.Item key="3" icon={<EnvironmentFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} className={`${router.route==="/account/addaddress"?'hilidtadvalu':''}`} onClick={e=>AddressRoute()}>Address</Menu.Item>

                    <Menu.Item key="4" icon={<CreditCardOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>CardRoute()}>Card Details</Menu.Item>

                    <Menu.Item key="4" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OrderRoute()}>Order History</Menu.Item>
                    <Menu.Item key="5" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>QuotationRoute()}>Quotation Request List</Menu.Item>
                    <Menu.Item key="6" icon={<PoweroffOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>handleLogout()}>Logout</Menu.Item>
                </Menu>
            </div>
            <input type="checkbox" id="menu-toggle"></input>
            <label class="hamburger-wrapper" for="menu-toggle">
                {/* <span class="burger-label">Menu</span> */}
                <span class="hamburger"></span>
            </label>
            <nav>
                <Menu defaultSelectedKeys={[JSON.stringify(keyValue)]}>
                    <Menu.Item key="1" icon={<AppstoreFilled style={{color:"#2874f0",fontSize:"18px"}}/>}  style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e => DashboardRoute()}>Account Dashboard</Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e =>AccountInfoRoute()}>Account Information</Menu.Item>
                    <Menu.Item key="3" icon={<EnvironmentFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>AddressRoute()}>Address</Menu.Item>
                    <Menu.Item key="4" icon={<CreditCardOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OrderRoute()}>Card Details</Menu.Item>
                    <Menu.Item key="4" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>OrderRoute()}>Order History</Menu.Item>
                    <Menu.Item key="5" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>QuotationRoute()}>Quotation Request List</Menu.Item>
                    <Menu.Item key="6" icon={<PoweroffOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}} onClick={e=>handleLogout()}>Logout</Menu.Item>
                </Menu>
            </nav>
        </div>
    )
}
export default AccountNav;

