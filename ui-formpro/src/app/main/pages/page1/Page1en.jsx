
import React from 'react'

const Root = ({ route }) => (
    <div>
      <h1>Root</h1>
      {/* child routes won't render without this */}
      {/* {renderRoutes(route.routes)} */}
    </div>
  );

  
  export default Root;