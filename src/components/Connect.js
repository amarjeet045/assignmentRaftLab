import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FormControl from "@material-ui/core/FormControl";
import SearchPeople from "./SearchPeople";
import{Tabs,Tab,Snackbar,Alert} from "@mui/material"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import {Box,Tab} from "@material-ui/core"

export default function Connect() {
  const [open, setOpen] = useState(false);
  const [snackBarOpen,setSnackBarOpen] = useState(false);
  const [value, setValue] = useState("people");

  const firstPersonName = useRef();
  const secondPersonName = useRef();
  const [error, setError] = useState(false);
  const [connections, setConnections] = useState([]);
  const [verticesArray, setVerticesArray] = useState([]);
  const handleClose = (e) => {
    if(open===true)
    {
    setOpen(false);
    firstPersonName.current.value = "";
        secondPersonName.current.value = "";
    }
        setSnackBarOpen(false)   
  };
  function handleAddPeople(e) {
    e.preventDefault();
    console.log(secondPersonName.current.value);
    const data = {};
    let errorCheck = false;
    if (
      firstPersonName.current.value === "" ||
      firstPersonName.current.value === undefined
    ) {
      errorCheck = true;
      setError(true);
    } else {
      data.source = firstPersonName.current.value;
      errorCheck = false;
      setError(false);
    }
    if (
      secondPersonName.current.value === "" ||
      secondPersonName.current.value === undefined
    ) {
      errorCheck = true;
      setError(true);
    } else {
      errorCheck = false;
      setError(false);
      data.target = secondPersonName.current.value;
    }
    console.log(errorCheck);
    if (errorCheck) {
    } else {
      data.relationship = "Friend";
      verticesArray.push(firstPersonName.current.value);
      verticesArray.push(secondPersonName.current.value);
      connections.push(data);
      setConnections(connections);
      setVerticesArray(verticesArray);
      console.log("person will be added");
      // SearchPeople({
      //     relationshipArray:connections,
      //     verticesArray:verticesArray
      // })
      const uniqueVertices = [...new Set(verticesArray)];
      console.log(uniqueVertices);

      window.sessionStorage.setItem("people", JSON.stringify(connections));
      window.sessionStorage.setItem(
        "vertices",
        JSON.stringify({
          data: uniqueVertices,
        })
      );
      setOpen(true);
      
    }
  }
  function handleClick(e) {}
  const handleChange = (e) => {
   console.log(e.target.value)
   console.log(e.target.getAttribute("id"))
   const vertices = window.sessionStorage.getItem("vertices");
   let name = JSON.parse(vertices);
   console.log(name)
   if(name!==null)
   {
   setValue(e.target.getAttribute("id"))
   setSnackBarOpen(false)
   }
   else{
    setSnackBarOpen(true) 
   }
  };

  return (
    <>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{width:"380px",display:"block",margin:"10px auto",paddingLeft:"15px"}}>
    
    <Tab icon= {<GroupsSharpIcon />}  iconPosition="start" label="Add People" value="people" id="people" />
    <Tab icon ={<PersonSearchIcon />} iconPosition="start" label="Search Path" value="relationship"   id="relationship"/>
    
  </Tabs>
     

      {value === "relationship" ? (
        <SearchPeople />
      ) : (
        <>
        <FormControl style={{paddingLeft:"15px",width:"360px",display:"block",margin:"10px auto"}}>
          <TextField
            className="addPeopleInput"
            label="Name of the first person"
            variant="standard"
            required
            id="firstName"
            inputRef={firstPersonName}
          />

          <br></br>
          <TextField
            className="addPeopleInput"
            label="Name of the second person"
            variant="standard"
            required
            inputRef={secondPersonName}
            
          />
          {console.log(error)}

          <div className="chip">
            <p className="relation">Type of relationship</p>
            <div style={{ display: "inline-flex", gap: "15px" }}>
              <Chip
                label="Friends"
                onClick={handleClick}
                style={{ color: "#2F80ED", border: "1px solid #2F80ED" }}
              />
              <Chip label="Colleague" variant="outlined" />
              <Chip label="Family" variant="outlined" />
            </div>
          </div>
          <Button
            variant="contained"
            className="addPeopleButton"
            onClick={handleAddPeople}
          >
            ADD
          </Button>
        </FormControl>
        {console.log(firstPersonName)}
        <Dialog open={open} onClose={handleClose} style={{width:"400px"}}>
          <DialogTitle>
        <p style={{ display: "flex ",gap:"13px" ,fontSize:"16px"}}>
          <span style={{ color: "#219653" }}>
            {" "}
            <CheckCircleIcon />
          </span>{" "}
          <span style={{color:"#4f4f4f"}}>Added as friends!</span>
        </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{display:"inline-flex",gap:"15px"}}>
            <Chip  avatar={<Avatar alt="Natacha" src="https://photos.growthfile.com/file/static-page-images/avtar.png?timestamp=1625304664559" />} label={firstPersonName.current!==undefined&&firstPersonName.current!==null?firstPersonName.current.value:""}></Chip>

            <Chip  avatar={<Avatar alt="Natacha" src="https://photos.growthfile.com/file/static-page-images/avtar.png?timestamp=1625304664559" />} label={secondPersonName.current!==undefined&&secondPersonName.current!==null?secondPersonName.current.value:""}></Chip>
          </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
        </>


      )}
      
      <Snackbar open={snackBarOpen} autoHideDuration={6000} >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         Please Establish Relationship
        </Alert>
      </Snackbar>
    </>
  );
}
