/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * it's an input field with type of file which shows the selected image to upload by user instead of it's name.
 * getting value of this component is described in setFormDataHelper.js
 */

import React from 'react';
import makeImagePreview from "../helpers/makeImagePreview";
import {makeStyles} from "@material-ui/core";

const styles = makeStyles({
  inputStyle: {
    position: "absolute",
    display: "block",
    width: 130,
    opacity: 0,
    zIndex: 2
  }, imageStyle: {
    display: "block",
    zIndex: 1
  }, container: {
    display: "flex",
    justifyContent: "center"
  }
})

const ImageUploader = ({image, id, disabled, height, changeHandler, ...props}) => {
  const hgh = height ? height : 130;
  const classes = styles();
  const onChange = input => {
    if(changeHandler)
      changeHandler(input);
    makeImagePreview(input);
  }
  return (
    <div className={classes.container}>
      {!disabled && <input type="file" id={id} className={classes.inputStyle}
                           style={{height: hgh}} onChange={onChange} {...props}/>}
      <div className={classes.imageStyle}><img src={image} id={"imagePreview-" + id} style={{height: hgh}} alt="personnel preview"/></div>
    </div>
  );
}

export default ImageUploader;
