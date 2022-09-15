import React from 'react';
import Link from 'next/link';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';
import CenterDiv from './CenterDiv';

function Index(){
    const [open, setOpen] = React.useState(false);
    const [addShippInfo, setAddShippInfo] = React.useState(false);
    const [addPayInfo, setAddPayInfo] = React.useState(false);
    const [customerId, setCustomerId] = React.useState("");

    return(
        <div className='wrapper'>
            <LeftDiv open={open} setOpen={setOpen} addShippInfo={addShippInfo} addPayInfo={addPayInfo} setCustomerId={setCustomerId}/>
            <CenterDiv open={open} setOpen={setOpen} setAddShippInfo={setAddShippInfo} setAddPayInfo={setAddPayInfo} customerId={customerId}/>
            <RightDiv/>
        </div>
    )
}

export default Index;