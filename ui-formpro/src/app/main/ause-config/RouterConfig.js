import React from 'react'
import { Redirect } from 'react-router-dom';

import PageConfig from '../pages/page1/page1enConfig'
import HomeConfig from '../pages/home/Homeconfig'
import  AuseUtils  from '../../ause/AuseUtils';
 
const routeConfigs =[
    PageConfig,
    HomeConfig
]



const routes =[
    ...AuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => < Redirect to = "/page" />
    }
]

export default routes
