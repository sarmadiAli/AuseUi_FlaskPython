import React, {useState,useEffect} from 'react';
import moment from "moment-jalaali";


function SearchInArrayList(filterList , filterValues , operator) {

    filterList = filterList.filter((obj)=>{
        let exist = operator == 'and' ? true : false

        for(let item in filterValues){
            try{
                if(eval(filterValues[item]).length >0 && !eval(filterValues[item]).includes(obj[item]))
                    exist = operator == 'and' ? false : true
            }
            catch{

                let sdateVal =  moment(filterValues[item]).locale('fa', { useGregorianParser: true }).format('jYYYY/jMM/jDD'),
                    dateVal =  moment(obj[item]).locale('fa', { useGregorianParser: true }).format('jYYYY/jMM/jDD')
                if(filterValues[item] != '' && sdateVal != dateVal)
                    exist = operator == 'and' ? false : true
            }
        }
        return exist
    })

    return filterList

}

export default SearchInArrayList;