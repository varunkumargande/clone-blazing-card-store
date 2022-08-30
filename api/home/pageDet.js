import APIServices from '../../services'
export async function pageDetApi(id,setDet,setPostLoading) {

        // await fetch(apiUrl+'/pages/get_pagedetails/'+id, {
        //     method: 'GET',
        // })
          
        // .then(json => {
        //     setDet(json.data)
        //     setPostLoading(false)               
        // })

        const result = await APIServices.get('pages/get_pagedetails', id)

        if(result && result.data && result.data.data){
            setDet(result.data.data)
             setPostLoading(false)  
        }

    }