import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '../../../i18n';
import { getProductsById, getQuantymin, getsliderimageclicks, getvarientdatamethlist, getvarientproducthidefun } from '../../../store/product/action';





function SpurtVarientComponent() {
  const product = useSelector((s) => s.product.singleProduct);
 const dispatch =useDispatch()
    const { t } = useTranslation("common");
    // const [product,setProduct]=useState({})

// useEffect(()=>{
//     if(productId){
//         varientApi(productId,setProduct,dispatch)
//     }
    
// },[productId])


useEffect(() => {
    if (
      product &&
      product.productVarientOption &&
      product.productVarientOption.length !== 0
    ) {
      initialNewVarient(product);
    }
    dispatch(getsliderimageclicks(product &&
      product.productImage))
  
  }, [product]);

  const availableOptionsInitial = (varientId, product) => {
  
  
    const initialValueOptions = product.productVarientOption;
    const optionLength =
      initialValueOptions &&
      initialValueOptions.filter(
        (value) => value.varientsValueId === varientId
      );

    if (optionLength && optionLength.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const initialNewVarient = (product) => {
   
    product.processImage=product.productImage
   
    let productVarientSelectedOption =
      product.productVarientOption[0].productVarientOptionId;
    let productMainVarient = product.productvarientList.filter(
      (value) => value.id === productVarientSelectedOption
    )[0];

    if (productMainVarient) {
     
      let productMain = [];
      productMain.push({
        variantId: product.productVarientOption[0].varientsValueId,
        valueName: product.productVarientOption[0].valueName,
      });
      
      // setVariantNameArray(productMain);
      // setProductVarientDetail(productMainVarient);
      product.maxQuantityAllowedCart=productMainVarient.maxQuantityAllowedCart
      product.minQuantityAllowedCart=productMainVarient.minQuantityAllowedCart
      product.price = productMainVarient.price;
      product.variantId = productMainVarient.id;
      product.variantName = productMainVarient.varientName;
      product.skuName=productMainVarient.skuName
     
      // setSkuNumber(productMainVarient.skuName)
     
      // setVarName(productMainVarient.varientName);
      // setVarId(productMainVarient.id);
    }
  };


  const varientChange = (varient, sortOrder, product) => {
    // dispatch(getsliderimageclicks([]))
 
   
    let selectedOption = product.selectedVariant;
    selectedOption[varient.varientsId] = varient.id;
    let varientKey = Object.keys(selectedOption);

    let varId = [];
    if (varientKey && varientKey.length > 0) {
      varientKey &&
        varientKey.forEach((element) => {
          if (selectedOption[element]) {
            varId.push(selectedOption[element]);
          }
        });
    }

    let varientList = product.productvarientList;

    let productOptionValue;
    if (
      varId &&
      varId.length !== 0 &&
      varientList &&
      varientList.length !== 0
    ) {
      
      varientList.forEach((vl) => {
        // varId.forEach((vi) => {
        

        let sortmenthod = vl.productVarientOption.sort((a, b) => a - b);
        
        if (JSON.stringify(varId) === JSON.stringify(sortmenthod)) {
        
          productOptionValue = vl;
        }
        // })
        
      });
    }
    const res = {};
   
    if (productOptionValue !== undefined) {
      dispatch(getvarientproducthidefun(false))
      
      // setSkuNumber(productOptionValue.skuName);
      
     
      productOptionValue.optionImage.forEach((obj) => {
      res["name"] = obj.image;
      res["containerName"] = obj.containerName;
    })
       
      // setVarName(productOptionValue.varientName);
      // setVarId(productOptionValue.id);
      // setvarientdefultid(productOptionValue.optionImage);
      // const [imagedataload,setalldataload]=useState([])
              let imagevarientdata=productOptionValue.optionImage.concat(product.productOriginalImage)
       
      dispatch(getsliderimageclicks(imagevarientdata))
 
      if (productOptionValue.minQuantityAllowedCart == null) {
        dispatch(getQuantymin(1))
        // setQuantity(1);
      } else {
        dispatch(getQuantymin(productOptionValue.minQuantityAllowedCart))
        // setQuantity(productOptionValue.minQuantityAllowedCart);
      }
 
      product.skuName = productOptionValue.skuName;
      product.variantId = productOptionValue.id;
      product.variantName = productOptionValue.varientName;
      product.processImage=imagevarientdata
      product.price = productOptionValue.price;
      //   quantity = productOptionValue.minQuantityAllowedCart
      product.productTirePrices = productOptionValue.productTirePrices;
      product.stockStatus = productOptionValue.stockStatus;
      // dispatch(getProductsById(product))
      dispatch(getvarientdatamethlist(product))
      if (product.hasStock !== 0) {
        product.minQuantityAllowedCart =
          productOptionValue.minQuantityAllowedCart;
        product.maxQuantityAllowedCart =
          productOptionValue.maxQuantityAllowedCart;
      } else {
        // setQuantity(1);
        dispatch(getQuantymin(1))
        
      }
    } else {
 
      dispatch(getvarientproducthidefun(true))
      
      // setSkuNumber(" ");
    }

  };


  return (
   <>
{/* <h1>hellow</h1> */}

{product.productVarient && product.productvarientList.length !== 0 && (
        <div className="custom-product-options">
          <p>{t("products.AvailableOptions")}</p>
          {product &&
            product.productVarient.map((variant, pindex) => (
              <div
                className="custom-product-options-container"
                key={variant.id}
              >
                <p>{variant.name} </p>
                {variant &&
                  variant.varientsValue.map((varientName, index) => (
                    <div
                      className="custom-product-options-subcontainer-radio"
                      
                      key={varientName.id}
                    >
                            
                             <label >
                      <input
                        type="radio"
                        defaultChecked={availableOptionsInitial(varientName.id,product)}
                        name={"varientName.valueName" + pindex}
                        id={"varientValue" + variant.id}
                        // id={ variant.varientsId}
                       
                        onClick={(e) =>
                          varientChange(varientName, variant.sortOrder,product)
                        }
                      />
                    
                      {/* <label htmlFor={variant.varientsId}> */}
                        {varientName.valueName}
                      </label>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}

   </>
  )
}


export default SpurtVarientComponent