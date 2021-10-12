import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import ReactFileReader from "react-file-reader";
import { Button, Typography } from "@material-ui/core";
import { useStyles, getImportModalStyle } from "./styles"
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';

function ImportFile() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [modalStyle] = useState(getImportModalStyle);
  const [files, setFiles] = useState({})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFiles = (files) => {
    setFiles(files);
    setFileName(files.fileList[0].name);
  };

  const handleSubmit = () => {
    const file = files?.fileList[0]
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = () => {
      console.log(reader.result); 
    }
  }

  const body = (
    <div style={modalStyle} className={classes.importPaper}>
      <h1>Import Profile Items</h1>
      <ReactFileReader
        fileTypes={[".csv", ".zip", ".xlsx"]}
        base64={true}
        multipleFiles={true}
        handleFiles={handleFiles}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "20em" }}>
          <button className="btn">Upload</button>
          <span>{fileName ? fileName : null}</span>
        </div>
      </ReactFileReader>
      <Typography component={'span'} variant={'body2'}>
        Supported files- .csv and .xlsx To download a sample import file <Button>click
        here.</Button> <br />
        Order of profile item will be set based upon the order in which it
        appears in import file. Profile item images should be uploaded
        individually for each item in edit screen.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSubmit} >Submit</Button>
    </div>
  );

  return (
    <>
      <Button 
      variant="outlined"
      size="large"
      color="primary"
      type="button" startIcon={<CloudDownloadOutlined />} onClick={handleOpen}>
        Import CSV/XLSX
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default ImportFile;
