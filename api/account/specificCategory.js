import APIServices from '../../services'

export async function specificCategoryApi(categorySlug,setSpecificCat,setSelectedCategoryId) {

    // fetch(apiUrl + '/list/specific-category-list?categorySlug='+categorySlug, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setSpecificCat(json.data)
    //     // setSelectedCategoryId([JSON.stringify(json.data.categoryId)])
    // })

    const result= await APIServices.getAll('list/specific-category-list?categorySlug='+categorySlug)
    if(result&&result.data&&result.data.data){
        
        setSpecificCat(result.data.data)   

    }
}