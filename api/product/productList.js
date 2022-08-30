import { getCategoruCrumb, getProducts} from '../../store/product/action';
import APIServices from '../../services'

export async function productListApi(dispatch,setProductData,offset,setLoader,orderBy,price,search,categoryInitial,manuId,limit,priceToInitial,setSelectedCategoryId,setCrumbArray,itemSlug,variants) {
 
         
            // if(itemSlug){
                
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
                    
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }else if(variants){
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&variant='+variants, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
                    
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }
      
            // else{
                
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
            //         console.log(json.categoryLevel,"234rwesdfbbbbbbbbb")
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }


            if(itemSlug){
                
                const result = await APIServices.getAll('list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug)
                    if(result&&result.data){

                        setCrumbArray(result.data.categoryLevel)
                        dispatch(getCategoruCrumb(result.data.categoryLevel)) 
                    
                    if(result&&result.data&&result.data.data){
                   
                
                   if(result.data.categoryLevel.length>0){
                    let lastIndex=result.data.categoryLevel.length-1;
                    // let catId= arr.pop().categoryId;
                   
                    setSelectedCategoryId(lastIndex)
                   }
                   
                   
                  
                    dispatch(getProducts(result.data.data));
                    setProductData(result.data.data)
                         setTimeout(()=>{
                       setLoader(false)
                       },1000)
                }

                    }
                
            }else if(variants){
                const result = await APIServices.getAll('list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&variant='+variants)
               

                if(result&&result.data){

                    setCrumbArray(result.data.categoryLevel)
                    dispatch(getCategoruCrumb(result.data.categoryLevel))
                
                if(result&&result.data&&result.data.data){
               
            
               if(result.data.categoryLevel.length>0){
                let lastIndex=result.data.categoryLevel.length-1;
                // let catId= arr.pop().categoryId;
               
                setSelectedCategoryId(lastIndex)
               }
               
               
              
                dispatch(getProducts(result.data.data));
                setProductData(result.data.data)
                     setTimeout(()=>{
                   setLoader(false)
                   },1000)
            }

                }



            }else{
                const result = await APIServices.getAll('list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId)



                if(result&&result.data){

                    setCrumbArray(result.data.categoryLevel)
                    dispatch(getCategoruCrumb(result.data.categoryLevel))
                
                if(result&&result.data&&result.data.data){
               
            
               if(result.data.categoryLevel.length>0){
                let lastIndex=result.data.categoryLevel.length-1;
                // let catId= arr.pop().categoryId;
               
                setSelectedCategoryId(lastIndex)
               }
               
               
              
                dispatch(getProducts(result.data.data));
                setProductData(result.data.data)
                     setTimeout(()=>{
                   setLoader(false)
                   },1000)
            }

                }

            }
   
        
}

