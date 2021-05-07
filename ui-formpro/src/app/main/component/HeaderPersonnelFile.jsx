import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField, InputLabel
} from "@material-ui/core";
import axios from "axios";
import { ALERT_TYPES, setAlertContent, submitPost } from "../../store/actions/fadak";
import { useDispatch, useSelector } from "react-redux";
import { AXIOS_TIMEOUT, SERVER_URL } from "../../../configs";

import progile from "./sample_avatar.png"

const HeaderPersonnelFile = ({ addFormData, formData }) => {

    const partyIdLogin = useSelector(({ auth }) => auth.user.data.partyId);
    const partyIdUser = useSelector(({ fadak }) => fadak.baseInformationInisial.user);
    const UserId = useSelector(({ fadak }) => fadak.baseInformationInisial);
    const partyRelationshipData = useSelector(({ auth }) => auth.user.data.partyRelationshipId);
    const partyRelationshipId = (partyIdUser !== null) ? UserId.partyRelationshipId : partyRelationshipData
    const partyId = (partyIdUser !== null) ? partyIdUser : partyIdLogin


    const [partyPerson1, setpartyPerson1] = useState([]);
    const dispatch = useDispatch();

    const [partyPerson11, setpartyPerson11] = useState(false);
    const [partyPerson13, setpartyPerson13] = useState(false);
    const [sudoId, setSudoId] = useState()
    const [emplpsitionPartyId, setEmplpsitionPartyId] = useState()

    //axios  ---> tokenKey &&  config <---//
    const axiosKey = {
        headers: {
            'api_key': localStorage.getItem('api_key')
        }
    }
    React.useEffect(() => {


        axios.get(SERVER_URL + "/rest/e1/PartyRelationship/?partyRelationshipId=" + partyRelationshipId, axiosKey).then(res => {
            setSudoId(res.data.pseudoId)
        })

        axios.get(SERVER_URL + "/rest/s1/fadak/getpartyuserInfoHeader?partyId=" + partyId, axiosKey).then(response => {
            if (typeof response.data.IdentificationList != 'undefined') {
                response.data.IdentificationList.map((identification1, index) => {
                    if (identification1.partyIdTypeEnumId === "Nationalcode") {
                        setpartyPerson11(identification1.idValue)
                    }
                })
            }

            if (typeof response.data.partyuserInfolist != "undefined") {
                response.data.partyuserInfolist.map((identification1, index) => {
                    if (identification1.partyContentTypeEnumId === "PcntFaceImage") {

                        setpartyPerson13(identification1)
                    } else {

                    }
                })

                setpartyPerson1(response.data.partyuserInfolist[0])

            } else if (typeof response.data.partyuserInfolist == "undefined") {
                axios.get(SERVER_URL + "/rest/s1/fadak/getpartyuserInfo?partyId=" + partyId, axiosKey).then(response2 => {

                    response2.data.partyuserInfolist.map((identification12, index) => {
                        if ((identification12.partyContentTypeEnumId === "PcntFaceImage"
                            || identification12.partyContentTypeEnumId === "signatureImage")
                            || typeof identification12.partyContentTypeEnumId == "undefined") {
                            identification12.partyContentTypeEnumId = null;
                            setpartyPerson1(identification12);

                        }
                    })

                })
            }

        }).catch(error => {
        });

    }, []);


    React.useEffect(() => {
        if (partyIdLogin) {
            axios.get(SERVER_URL + `/rest/s1/fadak/EmplpsitionPartyId?partyId=${partyId}`, axiosKey).then(response => {
                setEmplpsitionPartyId(response.data.description)
            })
        }
    }, [])


    React.useEffect(() => {

    }, [partyPerson1, partyPerson13])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel shrink>شماره پرسنلی</InputLabel>
                                <TextField variant="outlined" id="pseudoId" name="pseudoId"
                                    value={sudoId ? sudoId : ""}
                                    disabled={true} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel shrink>نام و نام خانوادگی </InputLabel>
                                <TextField variant="outlined" id="username" name="username"
                                    value={(partyPerson1 && partyPerson1.firstName && partyPerson1.lastName) ? partyPerson1.firstName + " " + partyPerson1.lastName + " " + ((partyPerson1.suffix) ? partyPerson1.suffix : "") : ""}
                                    disabled={true} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <InputLabel shrink>کد ملی </InputLabel>
                                <TextField variant="outlined" id="idValueNationlcode" name="idValueNationlcode"
                                    value={partyPerson11 === false ? "" : partyPerson11}
                                    disabled={true} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel shrink>پست سازمانی </InputLabel>
                                <TextField variant="outlined" id="headerFormPersonnelPost"
                                    value={emplpsitionPartyId || ""} disabled fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    className="mt-5" >
                                    <input type="file" id={"contentLocation"}
                                        // accept="image/*"
                                        accept=".png, .jpeg, .jpg"
                                        style={{ height: 130, position: "absolute", display: "block", width: 130, opacity: 0, zIndex: 2 }}
                                        onChange={(event) => {

                                            if (event) {
                                                let { id, value, name } = event.target;
                                                value = event.target.files[0];

                                                // if(typeof currentData.partyClassificationId != "undefined"){
                                                formData.partyContents = { ...formData.partyContents, ["contentLocation"]: value };
                                                const newFormdata = Object.assign({}, formData);
                                                addFormData(newFormdata)
                                                // }
                                            }
                                        }}
                                    // onChange={
                                    //     addFormData(INPUT_TYPES.FILE,"partyContents")
                                    //
                                    // }
                                    />
                                    <div style={{ display: "block", zIndex: 1 }}>
                                        {/*<img src={"assets/images/avatars/sample_avatar.png"} style={{width:"50%"}}/>*/}
                                        {partyPerson13 !== false && typeof partyPerson13.partyContentTypeEnumId != 'undefined' ?
                                            <img src={(SERVER_URL + "/rest/s1/fadak/getpersonnelfile1?name=" +
                                                partyPerson13.contentLocation)}
                                                id={"imagePreview-" + "contentLocation"} style={{ height: 130 }}
                                            />
                                            : <img src={progile} style={{ width: "50%" }} />}
                                    </div>



                                </Button>
                            </div>
                            <Button variant="contained" style={{ width: "148px", margin: "auto", marginTop: "45px" }}
                                id="add"
                                className="mt-5"
                                onClick={() => {
                                    if (typeof formData.partyContents == 'undefined') {
                                        //alert
                                        dispatch(setAlertContent(ALERT_TYPES.ERROR, 'باید حتما فایلی انتخاب شود'));

                                    } else {
                                        dispatch(setAlertContent(ALERT_TYPES.WARNING, 'در حال ارسال اطلاعات'));

                                        const formData1 = new FormData();
                                        formData1.append("file", formData.partyContents.contentLocation)
                                        const config = {
                                            timeout: AXIOS_TIMEOUT,
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                api_key: localStorage.getItem('api_key')
                                            }
                                        }

                                        if (typeof partyPerson13.partyContentTypeEnumId != 'undefined') {
                                            axios.delete(SERVER_URL + "/rest/e1/PartyContent/" + partyPerson13.partyContentId, {
                                                headers: {
                                                    'api_key': localStorage.getItem('api_key')
                                                },
                                            })
                                                .then(res => {
                                                    axios.post(SERVER_URL + "/rest/s1/fadak/getpersonnelfile", formData1, config)
                                                        .then(res => {
                                                            dispatch(submitPost("/rest/e1/PartyContent",
                                                                {
                                                                    partyContentTypeEnumId: "PcntFaceImage", partyId: partyId,
                                                                    contentLocation: res.data.name
                                                                }
                                                                , "add"))
                                                                .then(res => {

                                                                    formData.partyContents.contentLocation = res.data.name;
                                                                })

                                                        })
                                                        .catch(error => {
                                                        });
                                                })
                                        } else if (typeof partyPerson13.partyContentTypeEnumId == 'undefined') {
                                            axios.post(SERVER_URL + "/rest/s1/fadak/getpersonnelfile", formData1, config)
                                                .then(res => {
                                                    dispatch(submitPost("/rest/e1/PartyContent",
                                                        {
                                                            partyContentTypeEnumId: "PcntFaceImage", partyId: partyId,
                                                            contentLocation: res.data.name
                                                        }
                                                        , "add"))
                                                        .then(res => {

                                                            formData.partyContents.contentLocation = res.data.name;
                                                        })

                                                })
                                                .catch(error => {
                                                });
                                        }
                                    }
                                }} >

                                آپلود عکس پروفایل
                            </Button>
                        </div>


                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default HeaderPersonnelFile;






