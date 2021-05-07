import React from 'react'


const PageConfig = {
    setting : {

    },
    routes :[
        {
            path : '/page',
            component : React.lazy(() => import('./Page1en'))
        }
    ]
}


export default  PageConfig