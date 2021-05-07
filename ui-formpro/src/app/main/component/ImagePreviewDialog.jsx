/**
 * @author Farbod Shams <farbodshams.2000@gmail.com>
 * It'll get a base64 string of an image and renders it in a dialog with a button as dialog show handler.
 * @param file: the base64 string of an image
 */

import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Slide,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {Image} from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ImagePreviewDialog = props => {
    const {breakpoints} = useTheme();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState("");
    const fullScreen = useMediaQuery(breakpoints.down('sm'));

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.readAsDataURL(element.target.files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });

    toBase64(props.file).then(res => {
        setImagePreview(res);
    });

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
                <Image/>
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} TransitionComponent={Transition}
                    fullScreen={fullScreen} maxWidth='md'>
                <DialogTitle>پیش‌نمایش تصویر آپلود شده</DialogTitle>
                <DialogContent>
                    <img id="preview"
                         src={ imagePreview}
                         style={{width: "100%"}}/>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ImagePreviewDialog;