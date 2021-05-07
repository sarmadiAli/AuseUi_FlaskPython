import React,{useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
} from "@material-ui/core";
import axios from "axios";
import {ALERT_TYPES, setAlertContent, submitPost} from "../../store/actions/fadak";
import {useDispatch, useSelector} from "react-redux";
import {AXIOS_TIMEOUT,SERVER_URL} from "../../../configs";
import {INPUT_TYPES} from "../helpers/setFormDataHelper";
import sample_signature from "../../../images/sample_signature.jpg";



const Signature = ({addFormData, formData}) => {

    const partyIdLogin = useSelector(({ auth }) => auth.user.data.partyId);
    const partyIdUser = useSelector(({ fadak }) => fadak.baseInformationInisial.user);
    const partyId = (partyIdUser !==null) ? partyIdUser : partyIdLogin

    const [partyPerson, setpartyPerson] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(()=>{

        axios.get(SERVER_URL + "/rest/s1/fadak/getpartyuserInfoSignature?partyId=" + partyId , {
            headers: {
                'api_key': localStorage.getItem('api_key')
            },
        }).then(response => {
            if(   response.data.partyuserInfolist1.length !== 0){
                setpartyPerson(response.data.partyuserInfolist1[0])
                
            } else{

            }
            // else if(  response.data.partyuserInfolistSignature.length === 0) {
            //     axios.get(SERVER_URL + "/rest/s1/fadak/getpartyuserInfo?partyId=" + partyId , {
            //         headers: {
            //             'api_key': localStorage.getItem('api_key')
            //         },
            //     }).then(response2 => {
            //
            //         response2.data.partyuserInfolist.map((identification12 , index) => {
            //             if((identification12.partyContentTypeEnumId !== "profioleImage" && identification12.partyContentTypeEnumId !== "signatureImage") || typeof identification12.partyContentTypeEnumId == "undefined"){
            //                 identification12.partyContentTypeEnumId = null;
            //                 setpartyPerson(identification12);
            //
            //             }
            //         })
            //     })
            // }

        }).catch(error => {

        });

    },[]);
    React.useEffect(()=>{

    },[partyPerson])
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} style={{margin : "auto"}}>
                        <div style={{display:"flex", width:"100%", flexDirection :"column", margin: " auto"}}>
                            <div style={{display: "flex", justifyContent: "center" , margin: "auto",width:"100%"}}>
                                <Button
                                    className="mt-5" >
                                    <input type="file" id={"contentLocation"} accept=".png, .jpeg, .jpg"
                                           style={{height: "100%" , position: "absolute",display: "block",width: "100%",opacity: 0,zIndex: 2}}
                                           onChange={(event) => {

                                               if(event){
                                                   let {id, value, name} = event.target;
                                                   value = event.target.files[0];

                                                   // if(typeof currentData.partyClassificationId != "undefined"){
                                                   formData.partyContents = {...formData.partyContents,["contentLocation"]: value};
                                                   const newFormdata = Object.assign({},formData);
                                                   addFormData(newFormdata)
                                                   // }
                                               }
                                           }}
                                           // onChange={addFormData(INPUT_TYPES.FILE,"partyContents")}
                                    />

                                    <div style={{display: "block",zIndex: 1}}>
                               

                                        { partyPerson.length !== 0 && partyPerson.partyContentTypeEnumId !== undefined ?
                                            <img src={(SERVER_URL + "/rest/s1/fadak/getpersonnelfile1?name=" +
                                                partyPerson.contentLocation)}

                                                 id={"imagePreview-" + "contentLocation"} style={{height: "150px"}}
                                            />
                                            :  <img src={sample_signature} style={{width: "100%"}}/>}
                                    </div>
                                </Button>


                            </div>
                            <Button  variant="contained" style={{width: "148px", margin: "auto",marginTop: "45px"}}
                                     id="add"
                                     className="mt-5"
                                     onClick={()=>{
                                         if(typeof formData.partyContents == 'undefined'){
                                             //alert
                                             dispatch(setAlertContent(ALERT_TYPES.ERROR, 'باید حتما فایلی انتخاب شود'));

                                         } else{
                                             dispatch(setAlertContent(ALERT_TYPES.WARNING, 'در حال ارسال اطلاعات'));

                                             const formData1 = new FormData();
                                             formData1.append("file",formData.partyContents.contentLocation)

                                             const config = {timeout: AXIOS_TIMEOUT,
                                                 headers: {
                                                     'Content-Type': 'application/x-www-form-urlencoded',
                                                     api_key: localStorage.getItem('api_key')
                                                 }
                                             }
                                             if( typeof partyPerson.partyContentTypeEnumId != 'undefined'){
                                                 axios.delete(SERVER_URL + "/rest/e1/PartyContent/" + partyPerson.partyContentId, {
                                                     headers: {
                                                         'api_key': localStorage.getItem('api_key')
                                                     },
                                                 })
                                                     .then(res => {
                                                         axios.post(SERVER_URL + "/rest/s1/fadak/getpersonnelfile", formData1, config)
                                                             .then(res => {
                                                                 dispatch(submitPost("/rest/e1/PartyContent" ,
                                                                     {partyContentTypeEnumId:"signatureImage", partyId : partyId,
                                                                         contentLocation:   res.data.name }
                                                                     , "add"))
                                                                     .then(res => {

                                                                         formData.partyContents.contentLocation = res.data.name;
                                                                     })

                                                             })
                                                             .catch(error => {
                                                             });
                                                     })
                                             } else if( typeof partyPerson.partyContentTypeEnumId == 'undefined'){
                                                 axios.post(SERVER_URL + "/rest/s1/fadak/getpersonnelfile", formData1, config)
                                                     .then(res => {
                                                         dispatch(submitPost("/rest/e1/PartyContent" ,
                                                             {partyContentTypeEnumId:"signatureImage", partyId : partyId,
                                                                 contentLocation:   res.data.name }
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

                                آپلود عکس امضا
                            </Button>


                        </div>


                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Signature;






