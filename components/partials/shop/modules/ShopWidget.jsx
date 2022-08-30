import React, { Component } from 'react';
import Router from 'next/router';
//import {ConnectPlugin}   from "../../../connectPlugins";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { useTranslation } from '../../../../i18n';
import { Collapse, Checkbox } from 'antd';
import {getProductsByPrice} from '../../../../store/product/action';
import { useEffect } from 'react';
import { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
// import { GetattributeApi } from '../../../../api/home/getattributeApi';
import { productListApi } from '../../../../api';

const { Panel } = Collapse;

function ShopWidget({ type, categoryMain, setInitialLoad, brands, manuId, setManuId, maxPrice, setMaxPrice, setCategoryInitial, manuIdArray, setManuIdArray, brandFinal, setBrandFinal, categoryInitial, defaultCallValueInitial, orderBy, priceToInitial, priceMin, setPriceMin, openKeys, setOpenKeys, selectedCategoryId, categoryIdFinal, setCategoryIdFinal, setSelectedCategoryId, categoryIdState, setCategoryIdState, currency,setProductData,setLoader,priceFromInitial,setCrumbArray,offset,limit,reloadKey }) {
  const [priceMax, setPriceMax] = useState()
  const [getAttribute, setgetAttribute] = useState([])
  const [attmanuIdArr,setattmanuIdArr]=useState([])
  const [triger ,setTrigger]=useState(0)

  const dispatch = useDispatch()
  const { SubMenu } = Menu;
  const anything = useSelector(s => s.product)
  const { t } = useTranslation('common');
  

  // useEffect(() => {
  //   if (categoryInitial) {
  //     GetattributeApi
  //       (categoryInitial, setgetAttribute)
  //   }

  // }, [categoryInitial])

  const handleChangeRange = (value) => {
    setInitialLoad(true)
    setPriceMax(value[1])
    setPriceMin(value[0])
  
    const params = {
      priceMin: value[0],
      priceMax: value[1],
    };
    dispatch(getProductsByPrice(params));
  }

  

  const handleFilterProductsByCategory = (e, slug) => {
    e.preventDefault();
    if (slug !== null) {
      Router.push({ pathname: '/shop', query: { category: slug } });
      
    } else {
      const params = {
        _start: 1,
        _limit: 12,
      };
    
    }
  }

  useEffect(() => {
   
    maxPrice !== 0 && setPriceMax(maxPrice)
  }, [])

  

  const handleCheck = (e, defaultCallValueInitial) => {

    let manuSubArray = manuIdArray;

    if (manuSubArray.indexOf(e.target.value) !== -1) {

      manuSubArray = manuSubArray.filter((manufactureId) => manufactureId != e.target.value)
    }
    else {

      manuSubArray.push(e.target.value)
    }
    let manuIdString = manuSubArray.toString()
    setManuIdArray(manuSubArray)
  

    Router.push({
      pathname: `/shop/[sid]`, query: {
        attribute: "",
        priceTo: 30000,
        brand: manuIdString,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        categorySlug: categoryInitial, categoryId: categoryIdState
      }
    }
      , {
        pathname: `/shop/${categoryInitial}`,
        query: {
          attribute: "",
          priceTo: 30000,
          brand: manuIdString,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
          categorySlug: categoryInitial, categoryId: categoryIdState
        },
      })
    
    setManuId(manuIdString.toString())
 
  }

  const handleClick = e => {
    
  };

  const handleCategoryPush = (e, categorySlug, categoryId) => {
   
    setCategoryInitial(categorySlug)
   
    setInitialLoad(true)
    Router.push({
      pathname: `/shop/[sid]`, query: {
        attribute: "",
        priceFrom: priceMin,
        priceTo: maxPrice,
        brand: manuId,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        categorySlug: categorySlug, categoryId: categoryId
      }
    }
      , {
        pathname: `/shop/${categorySlug}`,
        query: {
          attribute: "",
          priceFrom: priceMin,
          priceTo: maxPrice,
          brand: manuId,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
          categorySlug: categorySlug, categoryId: categoryId
        },
      })


  }

  const priceChange = (value) => {
  
    setMaxPrice(value)
   
    Router.push({
      pathname: `/shop/[sid]`, query: {
        attribute: "",
        priceFrom: priceMin,
        priceTo: value,
        brand: manuId,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        keyword:reloadKey,
        categorySlug: categoryInitial, 
        categoryId: categoryIdState
      }
    }
      , {
        pathname: `/shop/${{categoryInitial:reloadKey !==undefined&& reloadKey !=""?reloadKey:categoryInitial}}`,
        query: {
          attribute: "",
          priceFrom: priceMin,
          priceTo: value,
          brand: manuId,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
          keyword:reloadKey,
          categorySlug:categoryInitial, 
          categoryId: categoryIdState
        },
      })
  }

  const priceChangeMin = (value) => {
    setPriceMin(value)

    Router.push({
      pathname: `/shop/[sid]`, query: {
        attribute: "",
        priceFrom: value,
        priceTo: maxPrice,
        brand: manuId,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        
        categorySlug: categoryInitial, categoryId: categoryIdState
      }
    }
      , {
        pathname: `/shop/${categoryInitial}`,
        query: {
          attribute: "",
          priceFrom: priceMin,
          priceFrom: value,
          priceTo: maxPrice,
          brand: manuId,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
         
          categorySlug: categoryInitial, categoryId: categoryIdState
        },
      })
  }

  const priceClear = () => {
    setPriceMin(0)
    setMaxPrice(10000)
    Router.push({
      pathname: `/shop/[sid]`, query: {
        attribute: "",
        priceFrom: 0,
        priceTo: 10000,
        brand: manuId,
        variantValue: "",
        defaultCallValue: orderBy,
        offset: 0,
        index: 0,
        categorySlug: categoryInitial, 
        categoryId: categoryIdState
      }
    }
      , {
        pathname: `/shop/${categoryInitial}`,
        query: {
          attribute: "",
          priceFrom: 0,
          priceTo: 10000,
          brand: manuId,
          variantValue: "",
          defaultCallValue: orderBy,
          offset: 0,
          index: 0,
          categorySlug: categoryInitial,
           categoryId: categoryIdState
        },
      })
  }

  const onOpenChange = keys => {
    setOpenKeys(keys)
  };

  useEffect(() => {
    if (selectedCategoryId.length > 0) {
      let lastIndex = selectedCategoryId.length - 1;
      const selectCat = selectedCategoryId[lastIndex].categoryId;
     
      setCategoryIdFinal([JSON.stringify(selectCat)])
    }

  }, [selectedCategoryId])

  const onSelectVal = (value) => {
   
    setSelectedCategoryId(JSON.parse(value.key))



  }

  const changesetchecked = (e, itemSlug) => {
    // setchecked(true)
  
  
    setLoader(true)
    let manuSubArr = attmanuIdArr;
    if (manuSubArr.indexOf(itemSlug) !== -1) {

        manuSubArr = manuSubArr.filter((manufactId) => manufactId != itemSlug)
    }
    else {

        manuSubArr.push(itemSlug)
    }
    setattmanuIdArr(manuSubArr)
    




    productListApi(dispatch, setProductData, offset, setLoader, orderBy, priceFromInitial, "", categoryInitial, manuId, limit, priceToInitial, setSelectedCategoryId, setCrumbArray,"", manuSubArr)

    if(manuSubArr.length==0){
        setTrigger(triger+1)
    }
}



  return (
    <div className="ps-layout__left">
     
      <div className="ps-left-shop-subcontainer">
        <h2>Filter</h2>
        <Collapse defaultActiveKey={['1', '2', '3']} expandIconPosition="right" className="" bordered={false}>
          
          <Panel header="CATEGORIES" key="1" className="site-collapse-left-category">
            {type === "normal" ? <Menu
               onClick={e => handleClick(e)}
               style={{ width: 256 }}
               openKeys={openKeys}
               onOpenChange={onOpenChange}
               selectedKeys={[JSON.stringify(selectedCategoryId)]}
               onSelect={onSelectVal}
             
              mode="inline"
            >
              {categoryMain && categoryMain.map(category => (<SubMenu
                key={JSON.stringify(category.categoryId)}
                title={
                  <span>
                   
                    <span>{category.name}</span>
                  </span>
                }
              >
                {category.children && category.children.map(cat => (<Menu.ItemGroup key={cat.categoryId} title={cat.name}>
                  {cat.children && cat.children.map(subCat => (<Menu.Item key={"1" + subCat.categoryId} onClick={e => handleCategoryPush(e, subCat.categorySlug)}>{subCat.name}</Menu.Item>))}
                 
                </Menu.ItemGroup>))}
         
              </SubMenu>))}
         

            </Menu> :
              <Menu
                onClick={e => handleClick(e)}
                style={{ width: 256 }}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                selectedKeys={[JSON.stringify(selectedCategoryId)]}
                onSelect={onSelectVal}
      
                mode="inline"
              >
                {categoryMain && categoryMain.children.map(category => (<SubMenu
                  key={JSON.stringify(category.categoryId)}
                  title={
                    <span>
                   
                      <span>{category.name}</span>
                    </span>
                  }
                >
       
                  {category.children && category.children.map(subCat => (<Menu.Item key={JSON.stringify(subCat.categoryId)} onClick={e => handleCategoryPush(e, subCat.categorySlug, category.categoryId)}>{subCat.name}</Menu.Item>))}
      
                </SubMenu>))}


              </Menu>}

          </Panel>

         
          

          {/* {getAttribute && getAttribute.map((setction) => (<div>
            {setction && setction.sectionType == 1 ? <div>
              <Menu
              className="menu--mobile-27"
              mode="inline">
             
            
             <SubMenu
           
                title={setction.sectionName
                }
                style={{color:"#161616",fontSize:"17px",fontWeight:400,}}
              >
                
                   {setction && setction.sectionItem.map((attitems, index) => (
                      <div className="brand-main-container">
                      
                        <Checkbox onClick={e => changesetchecked(e, setction.sectionName + '~' + attitems.itemName)} value={attitems.itemSlug} style={{marginBottom:"10px",marginLeft:"5px"}}>
                          {attitems.itemName} </Checkbox>
                       
                      </div>
                    ))}

              </SubMenu>
              <hr></hr>

              
           
              </Menu>

            </div> : ""
            }



          </div>

          ))} */}
          

          
   {/* price min max change */}
          <Panel header="PRICE" key="2" className="site-collapse-left-category" extra={<a onClick={e => priceClear(e)}>CLEAR</a>}>
            
            <Row style={{ justifyContent: "space-between" }}>
              <Col span={10}>
                <Slider
                  min={0}
                  max={10000}
                  onAfterChange={priceChangeMin}
                  defaultValue={priceMin}
                />
              </Col>
              <Col span={10}>
                <Slider
                  min={30000}
                  max={95000}
                  defaultValue={maxPrice}
                  onAfterChange={priceChange}
              
                />
              </Col>

            </Row>


            <div className="price-slide-input">
              <input value={" $ " + priceMin} />
              <span>to</span>
              <input value={" $ " + maxPrice} />
            </div>

          </Panel>


          <Panel header="BRANDS" key="3" className="site-collapse-left-category">
            {brands && brands.map((brandInner, index) => (
              <div className="brand-main-container" key={index}>
                <Checkbox onClick={e => handleCheck(e, defaultCallValueInitial)} value={brandInner.manufacturerId}>{brandInner.name}</Checkbox>
              </div>
            ))}
         
          </Panel>
        </Collapse>
      </div>
    </div>
  );

}

const mapStateToProps = state => {
  return state.product, state.setting;
};
export default connect(mapStateToProps)(ShopWidget);
