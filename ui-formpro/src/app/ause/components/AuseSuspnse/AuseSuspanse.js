import React from 'react'
import PropTypes from 'prop-types';

import AuseLoading from '../AuseLoading/AuseLoading'
function AuseSuspanse(props) {
    console.log("child" , props);
    return (
        <React.Suspense fallback={<AuseLoading {...props.loadingProps} />}>
            {props.children}
        </React.Suspense>
    )
}



AuseSuspanse.propTypes = {
    loadingProps: PropTypes.object,
};

AuseSuspanse.defaultProps = {
    loadingProps: {
        delay: 0
    }
};

export default AuseSuspanse;
