import React, { useState , useEffect}  from 'react';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Axios from "axios";

function View(props){
    const id = props.match.params.id
    //To navigate through buttons
    const history = useHistory();
    const home = () => {
            history.push("/");
    }

    const [detail, setDetail] = useState({})
    useEffect(() => {
        Axios.get(`http://localhost:5000/api/get/${id}`).then(res => setDetail(res.data))
      }, [id])

  return (
    <div  className="box">
        <h1 className="head"> View Details </h1>
        <div className="detailss">
        <p>First Name :- &nbsp; {detail.name}</p><br/>
        <p>Last Name :- &nbsp; {detail.lname}</p><br/>
        <p>Email :- &nbsp; {detail.email}</p><br/>
        <p>Phone Number :- &nbsp; {detail.phone}</p><br/>
        <div className="d-grid gap-2">
        <Button type="button" id="submitDetails" variant="outline-dark" onClick={home} size="sm"
        name="submitDetails">Back To Home</Button>
        </div>
        </div>
    </div>
  );
}

export default View;
