import React, { useContext } from 'react'

import AppContext from './../../../AppContext';

import { renderRoutes } from 'react-router-config'
import { AuseSuspanse } from './../../../ause'



function Layout1(props) {
    const appContext = useContext(AppContext)
    const { routes } = appContext

    
    console.log("adlakvava" , routes)
    return (
        <>
            <AuseSuspanse>
                {renderRoutes(routes)}
            </AuseSuspanse>
        </>
    )

}


export default Layout1;