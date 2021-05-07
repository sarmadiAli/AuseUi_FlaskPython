import React from "react";
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector } from "react-redux";
import {addConstData} from "../../../store/actions/fadak";
import axios from "axios";
import {SERVER_URL} from "../../../../configs";
import * as PropTypes from "prop-types";

export default function UserCompany({label, variant, name, setValue}){
    const dispatch = useDispatch();
    const user = useSelector(({ fadak }) => fadak.constData.user);
    const [innerValue, setInnerValue] = React.useState(user?.organization)
    React.useEffect(()=>{
        if(innerValue){
            setValue(prevState=>({
                ...prevState,
                [name]: innerValue.partyId
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
                setInnerValue(userData.organization)
            }).catch(err => {
                console.log("UserCompany getUser error..",err);
            });
        }
    },[innerValue])

    return (
        <React.Fragment>
            <TextField name={name}
                       label={label}
                       variant={variant}
                       fullWidth
                       disabled
                       value={innerValue?innerValue.organizationName:"-"}
                       className="read-only"
            />
        </React.Fragment>
    );
}

UserCompany.propTypes = {
    label   : PropTypes.string,
    variant : PropTypes.oneOf(['outlined','filled','standard']),
    name    : PropTypes.string,
    setValue : PropTypes.func
};

UserCompany.defaultProps = {
    label   : "شرکت",
    variant : "outlined",
    name    : "userCompanyId",
    setValue : ()=>{}
};
