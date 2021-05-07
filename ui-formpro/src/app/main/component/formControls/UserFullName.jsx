import React from "react";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector } from "react-redux";
import {addConstData} from "../../../store/actions/fadak";
import axios from "axios";
import {SERVER_URL} from "../../../../configs";
import * as PropTypes from "prop-types";

export default function UserFullName({label, variant, name, name2, setValue}){
    const dispatch = useDispatch();
    const user = useSelector(({ fadak }) => fadak.constData.user);
    // const fullName = user?`${user.data.firstName??""} ${user.data.lastName??""} ${user.data.suffix??""}`:""
    const [innerValue, setInnerValue] = React.useState(user?.data)
    React.useEffect(()=>{
        if(innerValue){
            setValue(prevState=>({
                ...prevState,
                [name] : innerValue.partyId,
                [name2]: getFullName(innerValue)
            }))
        }else{
            axios.get(SERVER_URL + "/rest/s1/fadak/getUser",{
                headers: {'api_key': localStorage.getItem('api_key')},
                params: {
                    emplPosition: true,
                    organization: true
                }
            }).then( res => {
                const userData = {
                    ...res.data.allUserData,
                    organization: res.data.organization,
                    emplPosition: res.data.emplPosition
                };
                dispatch(addConstData("user",userData))
                setInnerValue(userData.data)
            }).catch(err => {
                console.log("UserFullName getUser error..",err);
            });
        }
    },[innerValue])

    // if(!value){
    //     axios.get(SERVER_URL + "/rest/s1/fadak/getUser",{
    //         headers: {'api_key': localStorage.getItem('api_key')},
    //     }).then( res => {
    //         const userData = res.data.allUserData;
    //         dispatch(addConstData("user",userData))
    //         const fullName = `${userData.data.firstName??""} ${userData.data.lastName??""} ${userData.data.suffix??""}`
    //         setValue(fullName)
    //     }).catch(err => {
    //         console.log("UserFullName getUser error..",err);
    //     });
    // }
    function getFullName(userData) {
        return `${userData.firstName??""} ${userData.lastName??""} ${userData.suffix??""}`
    }
    return (
        <TextField name="userFullName"
                   label={label}
                   variant={variant}
                   fullWidth
                   disabled
                   value={innerValue?getFullName(innerValue):"-"}
                   className="read-only"
        />
    );
}

UserFullName.propTypes = {
    label   : PropTypes.string,
    variant : PropTypes.oneOf(['outlined','filled','standard']),
    name    : PropTypes.string,
    setValue : PropTypes.func
};

UserFullName.defaultProps = {
    label   : "نام و نام خانوادگی کاربر",
    variant : "outlined",
    name    : "userPartyId",
    name2   : "userFullName",
    setValue : ()=>{}
};
