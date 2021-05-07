import React from 'react'


const HomeConfig = {
    setting : {

    },
    routes :[
        {
            path : '/home',
            component : React.lazy(() => import('./Home'))
        }
    ]
}


export default  HomeConfig