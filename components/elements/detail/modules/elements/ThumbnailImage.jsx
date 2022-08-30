import React from 'react';
//import {ConnectPlugin} from '../../../../connectPlugins';

const ThumbnailImage = ({ url }) => (
    <>
    <img
        
        src={ `${url}`}

        alt="martfury-image"
        width="100%"
        height="100%"
    />
    
    </>
);

export default ThumbnailImage;
