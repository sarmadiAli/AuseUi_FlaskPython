// import FromPro from "./components/formControlsTest/FormPro";
import React, { useEffect, useState } from 'react'
// import TablePro from './component/TablePro'
import Ali from '../testclass';

import {renderRoutes} from 'react-router-config'
import {BrowserRouter} from 'react-router-dom'
import AppContext from './AppContext' ;
import routes from './main/ause-config/RouterConfig'
import history from './../historty'
import Layout1 from './main/ause-layouts/layout1/Layout1'



import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';


import {create} from 'jss'
import rtl from 'jss-rtl'
import jssExtend from 'jss-extend';
  

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById('jss-insertion-point'),
})
const generateClassName = createGenerateClassName();


function App() {





  return (




    <AppContext.Provider value={{
      routes
    }}>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <BrowserRouter >
          <Layout1/>
        </BrowserRouter>
      </StylesProvider>

    </AppContext.Provider>

  //   <>
  // <BrowserRouter>
  //   {/* kick it all off with the root route */}
  //   {renderRoutes(routes)}
  // </BrowserRouter>,

  //   </>
  );
}

export default App;



// const formStrcuter = [
//   { name: 'test', label: 'for test', type: 'text', required: true, col: 6 },
//   { name: 'test 2', label: 'for test 2', type: 'text', required: true, col: 6 },
//   { name: 'test 2', label: 'for test 2', type: 'select', required: true, col: 6 }

// ]

/*
 <Ali
        title="شناسنامه آموزشی"
        columns={tableCols}
        rows={tableContent}
        setRows={setTableContent}
        setTableContent2 = {setTableContent2}
      />
 */

      /*
      
  const tableCols = [
    { name: "partyId", label: 'کد موسسه', type: 'text', boll: 'ali' },
    { name: "organizationName", label: 'نام موسسه', type: 'text' },
    { name: "propertyType", label: 'نوع مالکیت', type: 'text' },
    { name: "licence", label: 'محل اخذ مجوز', type: 'text' },
    { name: "courseId", label: 'دوره های قابل ارائه', type: 'text' },
    { name: "QualificationStatusId", label: 'بررسی وضعيت صلاحيت', type: 'text' },

  ]


  useEffect(() => {
    let data = [
      { 'partyId': 1, "organizationName": "sazman 1", "propertyType": 1, "licence": 1, "courseId": 1, "QualificationStatusId": 1 },
      { 'partyId': 2, "organizationName": "sazman 2", "propertyType": 2, "licence": 2, "courseId": 2, "QualificationStatusId": 2 },
      { 'partyId': 3, "organizationName": "sazman 3", "propertyType": 3, "licence": 3, "courseId": 3, "QualificationStatusId": 3 },
    ]
    setTableContent(data)
  }, [])  */
      