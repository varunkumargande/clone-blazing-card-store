import React from 'react';
import Link from 'next/link';
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';
import CenterDiv from './CenterDiv';

function Index(){
    return(
        <div className='wrapper'>
            <LeftDiv/>
            <CenterDiv/>
            <RightDiv/>
        </div>
    )
}

export default Index;