import React, {useEffect, useState} from 'react';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';
import CenterDiv from './CenterDiv';
import { useRouter } from 'next/router';
import { getStreamData } from '../../../api/stream/streamDetail';

function Index(){
    const [open, setOpen] = useState(false);
    const [addShippInfo, setAddShippInfo] = useState(false);
    const [addPayInfo, setAddPayInfo] = useState(false);
    const [customerId, setCustomerId] = useState("");

    return(
        <div className='wrapper'>
            <LeftDiv open={open} setOpen={setOpen} addShippInfo={addShippInfo} addPayInfo={addPayInfo} setCustomerId={setCustomerId} />
            <CenterDiv open={open} setOpen={setOpen} setAddShippInfo={setAddShippInfo} setAddPayInfo={setAddPayInfo} customerId={customerId} />
            <RightDiv/>
        </div>
    )
}

export default Index;