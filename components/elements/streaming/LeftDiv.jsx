import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react'
import axios from 'axios';
import APIServices from '../../../services';
import addressListApi from '../../../api/account/getAddress'


function LeftDiv({open, setOpen, addPayInfo, addShippInfo, setCustomerId}){

    // const tabs = ["Auction", "Buy now", "Giveaway", "Sold"]
    const [isLoading, setIsLoading] = useState(true);
    const [auctionData, setAuctionData] = useState([]);
    const [buyNowData, setBuyNowData] = useState([]);

    // Card Data State
    const [cardData, setCardData] = useState({});
    const [card, setCard] = useState({});
    const [address, setAddress] = useState({});

    // Shipping Data State
    const [addressData, setAddressData] = useState([]);
    const [addressLoader, setAddressLoader] = useState(false);

    const [token, setToken] = useState('');
    const [toggleState, setToggleState] = useState(1);

    const POST_ORDER = '';

    // Handle Tabs Change Functionality
    const toggleTab = (index) => {
        setToggleState(index);
        // console.log(index)
    };

    // Get Auction Product
    const fetchAuctionProduct =  async () =>  {
        try {
            // const response = await axios.get('http://52.72.64.43:9000/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=auction');
            const response = await axios.get('https://blazing-card-backend-dev.kellton.net/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=auction');
            const data = response.data.data;
            setAuctionData(data);
            setIsLoading(false)
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(err.response.status);
                console.log(error.response.header);
                setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                setIsLoading(false)
            }
        }
    }

    // Get BuyNow Products
    const fetchBuyNowProduct =  async () =>  {
        try {
            // const response = await axios.get('http://52.72.64.43:9000/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=buy_now');
            const response = await axios.get('https://blazing-card-backend-dev.kellton.net/api/stream/streamProductList?streamuuid=563c7ecb-176a-4258-b0d4-119b8b804d60&sellType=buy_now');
            const data = response.data.data;
            setBuyNowData(data);
            setIsLoading(false)
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(err.response.status);
                console.log(error.response.header);
                setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                setIsLoading(false)
            }
        }
    }

    // Get user card details
    const fetchCardDetails =  async () =>  {
        try {
            // const response = await axios.get('http://52.72.64.43:9000/api/customer-card-details/listCard/13');
            const response = await axios.get('https://blazing-card-backend-dev.kellton.net/api/customer-card-details/listCard/13');
            const data = response.data.data;
            // console.log(data[0].billing_details);
            // console.log(data[0].card);
            setAddress(data[0].billing_details);
            setCard(data[0].card);
            setCustomerId(data[0].customer);
            setToken(data[0].customer);
            setCardData(data[0]);
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(err.response.status);
                console.log(error.response.header);
                // setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                // setIsLoading(false)
            }
        }
    }

    // Get user address details
    const fetchAddress =  async () =>  {
        // addressListApi(setAddressData,setAddressLoader);
        //console.log(`addressListApi res is ${res}`)
        try {
            const response = await axios.get(
                'https://blazing-card-backend-dev.kellton.net/api/address/get-address', 
                { 
                    headers: 
                        {
                            "Authorization" : `Bearer ${token}`
                        } 
                }
            
            );
            const data = response.data.data;
            setAddressData(data);
            // console.log(data);
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.header);
                // setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                // setIsLoading(false)
            }
        }
    }

    // Posting user details to payment api
    const postOrderDetails = async (product) => {
        let orderBody = {
            "shippingLastName": "",
            "shippingCity": "noida",
            "shippingPostCode": "201301",
            "shippingCompany": "Arjun",
            "shippingFirstName": "Arjun",
            "shippingZone": "UP",
            "gstNo": "",
            "phoneNumber": "7291936496",
            "shippingAddressFormat": "",
            "shippingAddress_1": "noida sect 1",
            "shippingAddress_2": "noida sect 1",
            "emailId": "arjun.singh@kellton.com",
            "shippingCountryId": 99,
            "productDetails": [
              {
                "productId": product.product_id,
                "quantity": product.quantity.toString(),
                "price": product.price,
                "basePrice": product.price,
                "model": product.name,
                "name": product.name,
                "productVarientOptionId": "",
                "taxType": null,
                "taxValue": null,
                "varientName": "",
                "skuName":  product.sku,
                "vendorId": 0
              }
            ],
            "paymentMethod": 6,
            "paymentAddress_1": "noida sect 1",
            "paymentAddress_2": "noida sect 1",
            "paymentCity": "noida",
            "paymentCompany": "Arjun",
            "paymentCountryId": 99,
            "paymentFirstName": "Arjun",
            "paymentLastName": "",
            "paymentPostCode": "201301",
            "paymentZone": "UP",
            "couponCode": "",
            "couponData": "",
            "couponDiscountAmount": "",
            "password": "",
            "customerStripeRefId": cardData.id,
            "paymentMethodId": cardData.id,
        }

        try {
            const res = await axios.post(POST_ORDER, orderBody);
            console.log(res);
   
           
        } catch (error) {
            if(error.response) {
                console.log(error.response.data);
                console.log(err.response.status);
                console.log(error.response.header);
                // setIsLoading(false);
            } else {
                console.log(`Error: ${error.message}`);
                // setIsLoading(false)
            }
        }
    }

    // Handle Buy_now Item
    const handleClick = (product) => {
        // alert(`item with id- ${id} and name-${name} is clicked`)
        fetchCardDetails();
        fetchAddress();
        // if(address.postal_code === null || card?.checks?.cvv_checks !== 'pass') {
        //     setOpen(true);
        // }
        if(card?.exp_month === null) {
            setOpen(true);
        }else{
            // Moving towards payment...
            // postOrderDetails();
        }
         
    }


    // First fetching auction and buynow product details
    useEffect(() => {
        console.log("Callig api...");
        fetchAuctionProduct();
        fetchBuyNowProduct();
    }, [toggleState])


    // If user successfully added payment info and shipping info then will close the pop-up and move towards payment
    useEffect(() => {
        if(addPayInfo && addShippInfo) {
            setOpen(false);
            alert("Moving towards payment");
            // handleClick();
        }
    }, [addPayInfo, addShippInfo])
    

    // console.log(`Product data outside ${productData}`);
    // console.log(`Auction data outside ${auctionData.length}`);
    //  console.log(`AddressData data outside ${addressData}`);
    //  console.log(`token is ${token}`)
    console.log(`CardData data outside ${cardData.id}`)
    return(
        <div className='streaming-div-left'>
            <h1>STREAM NAME</h1>
            <div className='stream-nav' >
                {/* {
                    tabs.map((value) => {
                        return <h5><Link href="streaming/#">{value}</Link></h5>
                    })
                } */}
                
                 <h5>
                    <Link href="streaming/#">
                        <span className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}
                        > Auction</span>
                    </Link>
                </h5>

                 <h5>
                    <Link href="streaming/#">
                        <span className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}
                        > Buy Now</span>
                    </Link>
                </h5>

                 <h5>
                    <Link href="streaming/#">
                        <span className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}
                        > Giveaway</span>
                    </Link>
                </h5>

                 <h5>
                    <Link href="streaming/#">
                        <span className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}
                        > Sold</span>
                    </Link>
                </h5>
            </div>

            <div className='product-quick-search'>
                <input type="text" className='form-control curved-box' placeholder='Search products...'/>
            </div>
            <div className='product-list content-tabs'>

                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <p> 
                        {
                            isLoading?  <p>Loading products...</p> : <></>
                        }
                        {
                            isLoading===false && auctionData.length === 0 ? <p>0 products</p> : <></>
                        }
                        {
                          auctionData?.map((product) => (
                                <>
                                    <div key={product.productId}>
                                        <p>
                                            {product.productId}-
                                            {product.name}-
                                            {product.quantity}
                                        </p>
                                        <hr />
                                    </div>
                                </> 
                             ))
                        }
                    </p>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    {
                        isLoading ?  <p>Loading products...</p> : <></>
                    }
                    {
                        isLoading===false && buyNowData.length === 0 ? <p>0 products</p> : <></>
                    }
                    {
                            buyNowData?.map((product, idx) => (
                                <>
                                    <div key={product.productId}>
                                        <span>
                                            <p>{product.productId}-
                                            {product.name}-
                                            {product.quantity} &nbsp;  &nbsp; 
                                            <button onClick={() => handleClick(product)}>Buy now</button></p>  
                                        </span>
                                        <hr />
                                    </div>
                                </> 
                             ))
                        }
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <p>
                        0 products
                    </p>
                </div>

                <div className={toggleState === 4 ? "content  active-content" : "content"}>
                    <p>
                        0 products
                    </p>
                </div>

            </div>
        </div>
    )
}

export default LeftDiv;