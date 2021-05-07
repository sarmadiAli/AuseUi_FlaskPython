import React from 'react'
import Ali from '../../../../testclass';
import { Typography, LinearProgress } from '@material-ui/core';

const Home = ({ route }) => {
    
    return (
    <div className="flex flex-1 flex-col items-center justify-center">
        <Typography className="text-20 mb-16" color="textSecondary">در حال بارگذاری ...</Typography>
        <LinearProgress className=" w-2/5 h- w-xs" color="secondary" />
    </div>
    )
}
    ;


export default Home