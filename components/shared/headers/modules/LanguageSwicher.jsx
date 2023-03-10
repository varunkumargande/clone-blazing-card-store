import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imageUrl } from '../../../../api/url';
import { withTranslation } from '../../../../i18n'
import { LanguageListLoading } from '../../../../store/wishlist/action';
//import {ConnectPlugin} from '../../../connectPlugins';

function LanguageSwicher({ t, i18n }) {
  const dispatch =useDispatch()
    const [currentLang, setCurrentLang] = useState('')
    const [countryFlag, setCountryFlag] = useState('')
    let coutryf=useSelector(s=>s.wishlist.langagechange)
    let countflagcout=useSelector(s=>s.wishlist.mainloadedone)
    

useEffect(() => {
      
                if (sessionStorage.getItem("language-spurt") !== null) {
                    if (sessionStorage.getItem("language-spurt") === 'eng') {
                        dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20'))
                        setCurrentLang('English')
                        // setCountryFlag(imageUrl+"?path="+cout.imagePath+"&name="+cout.image+"&width=20&height=20")
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                        i18n.changeLanguage('en')
                    }else if(sessionStorage.getItem("language-spurt") === 'fr'){
                        dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1557569207176.png&width=20&height=20'))
                        setCurrentLang('French')
                        // setCountryFlag(imageUrl+"?path="+cout.imagePath+"&name="+cout.image+"&width=20&height=20")
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1557569207176.png&width=20&height=20')
                        i18n.changeLanguage('fr')

                    }else{
                        setCurrentLang('English')
                        dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20'))
                        setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                        i18n.changeLanguage('en')
                    }
                    
                }
                else {
                    setCurrentLang('English')
                    dispatch(LanguageListLoading(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20'))
                    
                    setCountryFlag(imageUrl+'?path=language/&name=Img_1622893818038.png&width=20&height=20')
                    i18n.changeLanguage('en')
                }
      

    }, [])

    

   
    // const onChangeLanguage = (language, e, current) => {
        const onChangeLanguage = (e,datas) => { 

    countflagcout&&countflagcout.map((equaldata,inex)=>{
               
       if(equaldata.languageId===datas.languageId){
           //  e.preventDefault();

       
        
      
    
        if (datas.code === 'eng') {
            // setCurrentLang('english')
            setCurrentLang(datas.name)
            i18n.changeLanguage('en');
            dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
          
            sessionStorage.setItem("language-spurt", datas.code)

        }else if(datas.code === 'fr'){
            setCurrentLang(datas.name)
            i18n.changeLanguage('fr');
            dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
            sessionStorage.setItem("language-spurt", datas.code)
        }
       else{
            setCurrentLang(datas.name)
            // i18n.changeLanguage('fr');
            dispatch(LanguageListLoading(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20"))
            setCountryFlag(imageUrl+"?path="+datas.imagePath+"&name="+datas.image+"&width=20&height=20")
        }

       }  
        
    })
        
    };

  

    

    return (
        <div className="ps-dropdown language">
    
           
               <a href="#" onClick={(e) => e.preventDefault()}>
                <img src={coutryf} alt="martfury" />

            </a>

            <ul className="ps-dropdown-menu">
            {countflagcout&&countflagcout.map((flagcout,index)=>(
                 <>
           

                <li>
                    
                    <img
                        src={
                          imageUrl +
                          "?path=" +
                          flagcout.imagePath+
                          "&name=" +
                          flagcout.image +
                          "&width=20&height=20"
                          
                        }
                        style={{ width: "25px!important", height: "13px!important" }} 
                        alt="martfury"
                      />
                  
                      
                
                    <label htmlFor={flagcout.languageId} >{flagcout.name}</label>
                   
                    <input type="radio" value={flagcout.name} id={flagcout.languageId} onChange={(e) => onChangeLanguage(e,flagcout)} checked={currentLang === flagcout.name} />
                    

                </li>

              

           
            </>
        ))}
 </ul>
         
        </div>
    );

}

export default withTranslation("common")(LanguageSwicher);

