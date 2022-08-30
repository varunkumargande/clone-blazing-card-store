import React, { useEffect, useState } from 'react';

import { useTranslation } from '../../../i18n';


const SpurtPartialSpecification = ({productAttributes}) => {
  
    const [proattributes,setattributespro]=useState()

    const { t } = useTranslation('common');



   

    const mystyle = {
        borderRightColor:'white',
        fontWeight: '500',
        color: '#000',
        padding: '10px 20px'
      };
   return(
<>
    <h5 style={{paddingTop:"20px"}}>{t('products.Specifications')}</h5>

  
   

    <div className="table-responsive">
       
        {productAttributes && productAttributes.length !== 0 ? 
        <table className="table table-bordered ps-table ps-table--specification">
        <tbody>
            {productAttributes && productAttributes.map((attribute,index)=>(
                <tr key={index}>
                  <td style={{width:"40%"}}>{attribute.attributeName}</td>
                  <td>{attribute.text}</td>
                </tr>
            ))}
        </tbody>
    </table>:
    <div className=" "><p>{t('products.NoSpecificationFound')}</p></div> }
    </div>
    </>
)
            }

export default SpurtPartialSpecification;
