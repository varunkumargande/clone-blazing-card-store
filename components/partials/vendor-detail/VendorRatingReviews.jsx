import { Pagination } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../../../api/url'
// import { vendorproducreviewApi } from '../../../api'
import { vendorproducreviewApi, vendorprodus } from '../../../api/vendor-detail/vendorApi'
import { useTranslation } from '../../../i18n'
// import { vendorprodus,vendorproducreviewApi } from './vendorApi'
// import { useTranslation } from '../../i18n'
// import { imageUrl } from './common'


function VendorRatingReviews({vendorId}) {

    const [vendoreviews,setvendoreviews]=useState("")
    const [count,setcount]=useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const { t } = useTranslation("common");
    let pageSizeCustom = Math.ceil(count / 10);
   useEffect(()=>{
     
    vendorproducreviewApi (vendorId,setvendoreviews,offset)
    vendorprodus(vendorId,setcount)

   },[vendorId,offset])

   function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <></>;
    }
    if (type === "next") {
      return <a className="pagination-next-change">Next</a>;
    }
    return originalElement;
  }


   const handlePagination = (value) => {
    let offset = Math.ceil((value - 1) * 10);
    setOffset(offset);

    setCurrentPage(value);
  };

  const DateRev = ({dateCarry}) => {
    let date = moment(dateCarry).format('DD MMM, YYYY  HH:mmA');
    return(
        <h5>{date!=="Invalid date"?date:""}</h5>
    )
  }

  return (
    <>
   
            {vendoreviews && vendoreviews.length !== 0 ? (
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "></div>

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <form className="ps-form--review" action="/" method="get">
                    {vendoreviews &&
                      vendoreviews.map((customer, index) => {
                        return (
                          <div
                            key={index}
                            className="review-list-item-content flex"
                          >
                           
                            <div className='rlic-img'>
                                        {customer.avatar !==null?<>
                                            <img src={imageUrl + "?path=" + customer.avatarPath + "&name=" + customer.avatar + "&width=1900&height=1000"} />
                                        </>:<>
                                        {
                                            <h1 className='profileImage'>
                                                {customer.firstName.charAt(0)}
                                            </h1>

                                        
                                        }
                                        
                                        </>

                                        }
                                        
                                    </div>
                            <div className="rlic-content">
                              <h4>{customer.firstName}</h4>
                              <div className="custom-product-rate-rev-subcontainer">
                                <p>{customer.rating}</p>
                                <i className="fa fa-star"></i>
                              </div>
                              {customer.review !== null && (
                                <div>
                                  <p className="rlic-msg">{customer.review}</p>

                                  <h5>
                                    <DateRev
                                      dateCarry={
                                        customer && customer.createdDate
                                      }
                                    />
                                    
                                  </h5>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </form>
                </div>
              </div>
            ) : (
              // <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                    <div style={{display: "flex",
 alignItems: "center",textAlign:"center",justifyContent:'center'}}>
               <h3 style={{padding:"50px"}}>NO DATA FOUND</h3>
 </div>
              // </div>
            )}
            {pageSizeCustom > 1 && (
              <div className="shop-product-pagination">
                <p>
                  Page {currentPage} of {pageSizeCustom}
                </p>

                <Pagination
                  total={count}
                  pageSize={10}
                  current={currentPage}
                 
                  defaultCurrent={1}
                  itemRender={itemRender}
                  onChange={handlePagination}
                 
                />
              </div>
            )}
          
    
    </>
  )
}
export default VendorRatingReviews