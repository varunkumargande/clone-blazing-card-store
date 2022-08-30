import React from "react";

function ReviewRating({product}) {
  return (
    
    <>

    {product.rating > 0 ?<>
      <div className="star-rating flex">
        <div className="custom-product-rate-rev-subcontainer">
          <p>{Math.round(product.rating)}</p>
          <i className="fa fa-star"></i>
        </div>
        <div className="rat">
          {console.log(product,"4343reviewCount")}
          {product.ratingCount&&<>
            {product.ratingCount !=0?<>{product.ratingCount} Ratings & </>:"" } 
                  {product.reviewCount !== "null" ? <>{product.reviewCount}Reviews</> : ""}
          </>

          }
         
        </div>
      </div>
      </> :<>
      <div className="star-rating flex">
        <div className="custom-product-rate-rev-subcontainer-none-col">
          <p></p>
          <i className=""></i>
        </div>
        <div className="rat">
         
         
         
        </div>
      </div>
      
      
      </>
                          
    }
    </>
  );
};

export default ReviewRating;
