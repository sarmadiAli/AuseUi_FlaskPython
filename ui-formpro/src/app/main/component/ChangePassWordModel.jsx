import React, { useState } from 'react';
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import { Button, Grid, TextField } from "@material-ui/core";
import { SERVER_URL } from "../../../configs";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setFormDataHelper } from "../helpers/setFormDataHelper";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ALERT_TYPES, setAlertContent, submitPost } from "../../store/actions/fadak";



const helperTextStyles = makeStyles(theme => ({
    root: {
        margin: 4,
        color: "red",
        borderWidth: "1px",
        "&  .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& label span": {
            color: "red"
        }

    },
    error: {
        "&.MuiFormHelperText-root.Mui-error": {
            color: theme.palette.common.white
        },
    }
}));
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "280px",
        height: "350px",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textFieldStyle: {
        marginBottom: "15px",
    },
    last: {
        marginBottom: "30px",
    },
    root: {

        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        width: "100%",
        "& label span": {
            color: "red"
        }

    },
    NonDispaly: {
        display: "none"
    },
    formControl: {
        width: "100%",
        "& label span": {
            color: "red"
        }
    },
    enter: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "green"
        },
    }

}));
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}



const ModelPassWord = props => {
    const userLogin = useSelector(({ auth }) => auth.user.data)
    const UserId =  useSelector(({ fadak }) => fadak.baseInformationInisial);
    const userData = (UserId.user !==null) ? UserId : userLogin
 
    const dispatch = useDispatch();

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const helperTestClasses = helperTextStyles();


    const [formData, setFormData] = useState({});
    const addFormData = setFormDataHelper(setFormData);


    const [style, setStyle] = useState({
        oldPassword: false,
        newPassword: false,
        newPasswordVerify: false
    })

    //check
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        oldPassword: false,
        newPassword:false,
        newPasswordVerify:false
    });
    
      const handleClickOldPassword = () => {
        setValues({ ...values, oldPassword: !values.oldPassword });
      };
      const handleClickNewPassword= () => {
        setValues({ ...values, newPassword: !values.newPassword });
      };
    
      const handleClickNewPasswordVerify = () => {
        setValues({ ...values, newPasswordVerify: !values.newPasswordVerify });
      };
    
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");



    //axios confg
    const axiosKey = {
        headers: {
            'api_key': localStorage.getItem('api_key')
        }
    }




    //request 
    const changePassHandler = () => {
        //check field and  
      
        let password_field = ["oldPassword", "newPassword", "newPasswordVerify"]
        let password_check = []
        password_field.map(field => {
            if ((!formData.checkPass
                || (formData.checkPass && (!formData.checkPass[field]
                    || formData.checkPass[field] === "")))) {
                password_check.push(field)
            }
        })
     
        if (password_check.length > 0) {
            setStyle({
                oldPassword: (formData.checkPass && formData.checkPass.oldPassword) ? false : true,
                newPassword: (formData.checkPass && formData.checkPass.newPassword) ? false : true,
                newPasswordVerify: (formData.checkPass && formData.checkPass.newPasswordVerify) ? false : true
            })
            return null
        }

        const userPassData = {
            ...formData.checkPass,
            userId: userData.userId,
            username: userData.username
        }

        axios.put(SERVER_URL+"/rest/s1/fadak/user/password" ,userPassData, axiosKey).then(res =>{
            dispatch(setAlertContent(ALERT_TYPES.SUCCESS, 'رمز با موفقیت ثبت شد'));
            props.handleClose()
        }).catch(err =>  dispatch(setAlertContent(ALERT_TYPES.ERROR, 'فیلد ها به درستی پر نشده')))

    
    }


    ///cancel change passwor
    const handerClose = () => {
        setStyle({
            oldPassword: false,
            newPassword: false,
            newPasswordVerify: false
        })
        formData.checkPass = undefined;
        const newFormdata = Object.assign({}, formData);
        setFormData(newFormdata)
        props.handleClose()
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >

            <div style={modalStyle} className={classes.paper}>


                <p style={{ fontSize: "20px" }}>تغییر رمز عبور</p>

                <div>

                    <Grid item xs={12} md={12} >

                        <TextField fullWidth
                            className={(style.oldPassword) ? classes.root : classes.textFieldStyle} required
                            helperText={(style && style.oldPassword) ? "پر کردن این فیلد الزامی است" : ""}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            variant="outlined" id="oldPassword" name="oldPassword"
                            label="رمز عبور قبلی"
                            type={values.oldPassword ? 'text' : 'password'}
                            onChange={(e) => {
                                if (e.target.value === null) {
                                    formData.checkPass = { ...formData.checkPass, ["oldPassword"]: "" };
                                    const newFormdata = Object.assign({}, formData);
                                    setFormData(newFormdata)
                                    return null
                                }
                                setStyle(prevState => ({ ...prevState, oldPassword: false }))
                                formData.checkPass = { ...formData.checkPass, ["oldPassword"]: e.target.value };
                                const newFormdata = Object.assign({}, formData);
                                setFormData(newFormdata)
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                      onClick={handleClickOldPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                     
                                        {values.oldPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>


                            }}

                        />
                    </Grid>
                    <Grid item xs={12} md={12}>

                        <TextField fullWidth
                          type={values.newPassword ? 'text' : 'password'}
                            className={(style.newPassword) ? classes.root : classes.textFieldStyle} required
                            helperText={(style && style.newPassword) ? "رمز عبور باید حداقل 8 کاراکتر و شامل حروف کوچک و بزرگ لاتین، اعداد و علائم ویژه باشد " : ""}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            variant="outlined" id="newPassword" name="newPassword"
                            label="رمز عبور جدید"
                            onChange={(e) => {
                                if (e.target.value === null) {
                                    setStyle(prevState => ({ ...prevState, newPassword: false }))
                                    formData.checkPass = { ...formData.checkPass, ["newPassword"]: "" };
                                    const newFormdata = Object.assign({}, formData);
                                    setFormData(newFormdata)
                                    return null
                                }
                                if(strongRegex.test(e.target.value)) {
                                setStyle(prevState => ({ ...prevState, newPassword: false }))
                                formData.checkPass = { ...formData.checkPass, ["newPassword"]: e.target.value };
                                const newFormdata = Object.assign({}, formData);
                                setFormData(newFormdata)}
                                else{
                                    setStyle(prev =>({...prev , newPassword : true}))
                                }

                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton 
                                        aria-label="toggle password visibility"
                                      onClick={handleClickNewPassword}
                                     
                                    >
                                     
                                        {values.newPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>


                            }}

                        />
                    </Grid>
                    <Grid item xs={12} md={12}>

                        <TextField fullWidth
                          type={values.newPasswordVerify ? 'text' : 'password'}
                            className={(style.newPasswordVerify) ? classes.root : classes.last} required
                            helperText={(style && style.newPasswordVerify) ? "پر کردن این فیلد الزامی است" : ""}
                            FormHelperTextProps={{ classes: helperTestClasses }}
                            variant="outlined" id="newPasswordVerify" name="newPasswordVerify"
                            label="تکرار رمز عبور"
                            onChange={(e) => {
                                if (e.target.value === null) {

                                    formData.checkPass = { ...formData.checkPass, ["newPasswordVerify"]: "" };
                                    const newFormdata = Object.assign({}, formData);
                                    setFormData(newFormdata)
                                    return null
                                }

                                
                                    setStyle(prevState => ({ ...prevState, newPasswordVerify: false }))
                                    formData.checkPass = { ...formData.checkPass, ["newPasswordVerify"]: e.target.value };
                                    const newFormdata = Object.assign({}, formData);
                                    setFormData(newFormdata)
                            
                               

                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                      onClick={handleClickNewPasswordVerify}
                                     
                                    >
                                     
                                        {values.newPasswordVerify ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>


                            }}
                        />
                    </Grid>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" style={{ fontWeight: "bold", }} color="primary" size="large" onClick={handerClose}  >
                        لغو
                </Button>
                    <Button variant="outlined" style={{ backgroundColor: "green", color: "white", fontWeight: "bold" }} size="large"
                        onClick={changePassHandler} >
                        ثبت
                </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModelPassWord;