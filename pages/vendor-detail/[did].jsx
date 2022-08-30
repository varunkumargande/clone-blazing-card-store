
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import VendorDetailShow from '../../components/partials/vendor-detail/vendorDet';
import { vendorSlugApi } from '../../api';
import { vendorProductApi } from '../../api';
import { useState,useEffect } from 'react';
import { vendorprodus } from '../../api/vendor-detail/vencounreviewapi';
import { useRouter } from 'next/router';

const VendorMainDetail = ({query}) => {
    const [vendorInfo,setVendorInfo]=useState("")
    const [vendorProduct,setVendorProduct]=useState("")
    // const [vendoreviews,setvendoreviews]=useState("")
    const [vendorLoading,setVendorLoading]=useState(true)
    const [count,setcount]=useState("")
    const [offset, setOffset] = useState(0);
    const router=useRouter()
    
    const  vendorId  =router. query.productId
    const  vendorprefixId  =router. query.vendorpre
    
    
   
   
    useEffect(()=>{
        if (vendorId===undefined) {
            Router.push('/page/page-404');
        }   

            vendorSlugApi(vendorprefixId,setVendorInfo)
            vendorProductApi(vendorId,setVendorProduct,setVendorLoading)
           

                // vendorproducreviewApi(did,setvendoreviews,offset)
                // vendorprodus(did,setcount)
           
        
    },[vendorId,offset])
    


   
    return ( 
        <div className="site-content">
            
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--simple">
           
                <VendorDetailShow vendorInfo={vendorInfo} vendorProduct={vendorProduct} vendorLoading={vendorLoading}  count={count} setOffset={setOffset} vendorId={vendorId} />
            </div>
            
            <FooterDefault />
        </div>
    );
};

export default VendorMainDetail;

VendorMainDetail.getInitialProps=async(ctx)=>({
    
    query:ctx.query
})
