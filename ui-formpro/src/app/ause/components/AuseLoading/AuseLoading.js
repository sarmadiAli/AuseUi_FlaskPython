import React, { useEffect, useState } from 'react'
import { Typography, LinearProgress } from '@material-ui/core';
import { useTimeout } from '../../hook'



import PropTypes from 'prop-types';



function AuseLoading(props)
{
    const [showLoading, setShowLoading] = useState(!props.delay);
    useTimeout(() => {
        setShowLoading(true);
    }, props.delay);

    useEffect(()=>{
        console.log("alisarmadi" ,showLoading)

    } ,[showLoading])

    if (!showLoading )
    {
        return null;
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Typography className="text-20 mb-16" color="textSecondary">در حال بارگذاری ...</Typography>
            <LinearProgress className="w-xs" color="secondary"/>
        </div>
    );
}

AuseLoading.propTypes = {
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

AuseLoading.defaultProps = {
    delay: false
};

export default AuseLoading;
