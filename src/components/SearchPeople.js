import React, { useState } from "react";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import Avatar from '@mui/material/Avatar';
export default function SearchPeople() {
  const vertices = window.sessionStorage.getItem("vertices");
  let name = JSON.parse(vertices);
  name = name.data;
  const [source, setSource] = useState(name[0]);
  const [target, setTarget] = useState(name[1]);
  const [result, setResult] = useState([]);
  const [resultShow, setResultShow] = useState(false);
  const hideResult =  (e) =>
  {
    setResultShow(false)
  }
  function handleFirstSearcName(e) {
    setSource(e.target.value);
  }
  function handleSecondSearchName(e) {
    setTarget(e.target.value);
  }
  function handleSearchPeople(e) {
    const result = [];
    setResult(result)
    const vertices = name;
    let connections = window.sessionStorage.getItem("people");
    connections = JSON.parse(connections);
    console.log(connections);
    let adjList = new Array(vertices.length);
    for (let i = 0; i < vertices.length; i++) {
      adjList[vertices[i]] = [];
    }
    function addEdge(u, v) {
      adjList[u].push(v);
    }
    function printAllPaths(source, destination) {
      let isVisited = new Array(vertices);
      for (let i = 0; i < vertices; i++) isVisited[i] = false;
      let pathList = [];

      // add source to path[]
      pathList.push(source);

      // Call recursive utility
      printAllPathsUtil(source, destination, isVisited, pathList);
    }
    function printAllPathsUtil(u, d, isVisited, localPathList) {
      if (u === d) {
        console.log(typeof localPathList);
        const data = Object.values(localPathList);
        const dd = {
          d: data,
        };
        result.push(dd);
        setResult(result);

        return;
      }
      isVisited[u] = true;
      for (let i = 0; i < adjList[u].length; i++) {
        if (!isVisited[adjList[u][i]]) {
          localPathList.push(adjList[u][i]);
          printAllPathsUtil(adjList[u][i], d, isVisited, localPathList);

          // remove current node
          // in path[]
          localPathList.splice(localPathList.indexOf(adjList[u][i]), 1);
        }
      }

      // Mark the current node
      isVisited[u] = false;
    }
    connections.forEach((doc) => {
      addEdge(doc.source, doc.target);
    });
    printAllPaths(source, target);
    console.log(result);
    if (result.length > 0) {
      setResultShow(true);
    }
  }
  console.log(resultShow);

  return (
    <>
      {!resultShow ? (
        <div style={{paddingLeft:"15px",width:"360px",display:"block",margin:"20px auto"}}>
          <FormControl style={{ width: "360px" }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Select First Person
            </InputLabel>
            <NativeSelect
              defaultValue={name[0]}
              onChange={handleFirstSearcName}
            >
              {name.map((doc) => {
                return (
                  <>
                    <option value={doc}>{doc}</option>
                  </>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl style={{ width: "360px", marginTop: "25px" }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Select Second Person
            </InputLabel>
            <NativeSelect
              defaultValue={name[1]}
              onChange={handleSecondSearchName}
            >
              {name.map((doc) => {
                return (
                  <>
                    <option value={doc}>{doc}</option>
                  </>
                );
              })}
            </NativeSelect>
          </FormControl>
          <Button
            variant="contained"
            className="addPeopleButton"
            onClick={handleSearchPeople}
          >
            SEARCH
          </Button>
        </div>
      ) : (
        <div style={{paddingLeft:"15px",width:"360px",display:"block",margin:"20px auto"}}>
          <p style={{color:"#828282"}}>
            Search result of <span style={{color:"#4f4f4f"}}>{source}</span> and <span style={{color:"#4f4f4f"}}>{target}</span> has{" "}
            {result.length} results
          </p>
          {result.map((doc, index) => {
            return (
              <>
              <div className = "pathDiv">
                <p style = {{paddingTop:"15px",paddingLeft:"10px"}}>Relationship path {index + 1}</p>
              </div>
               
                <div className="scroll" style = {{gap:"10px",display:"inline-flex"}}>
                {doc.d.map((name) => {
                  return (
                    <>
                      <Chip
                       avatar={<Avatar alt="Natacha" src="https://photos.growthfile.com/file/static-page-images/avtar.png?timestamp=1625304664559" />}
                        label={name}
                        className = {name===source?"sourceName":name===target?"targetName":""}
                      />
                    </>
                  );
                })}
                </div>

                
              </>
            );
          })}
          <p style={{color:"#2F80ED"}} onClick = {hideResult}>Search another relationship</p>
        </div>
      )}
    </>
  );
}
