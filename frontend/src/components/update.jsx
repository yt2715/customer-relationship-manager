import React, { useState , useEffect}from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

function Update(props){
    const id = props.match.params.id

//To navigate through buttons
    const history = useHistory();
    const home = () => {
        history.push("/");
    }
//Adding value to database
    const [name, setName] = useState("");
    const [lname, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/get/${id}`)
            .then(res => {
               setName(res.data.name)
               setlName(res.data.lname)
               setEmail(res.data.email)
               setPhone(res.data.phone)
            })
            .catch(err => {
            console.log(err)
            })
    },[id]);

      function updateUser(){
            Axios.put(`http://localhost:5000/api/update/${id}`, {id: id , name:name , lname:lname , email:email , phone:phone})
      }
      function both(id){
            home();
            updateUser();
      }

    return (
      <div>
      <div  className="box">
      <h1 className="head"> Update Form </h1>
         <Form>
            <Form.Group>
            <p>First Name
            <Form.Control type="text" name="lname" placeholder="First Name" id={props.match.params.id}
             onChange={(e) => setName(e.target.value)} value={name} disabled /><br/>
            </p>
            </Form.Group>
            <Form.Group>
            <p>Last Name
            <Form.Control type="text" name="lname" placeholder="Last Name" id={props.match.params.id}
             onChange={(e) => setlName(e.target.value)} value={lname} /><br/>
            </p>
            </Form.Group>
            <Form.Group>
            <p>Email
            <Form.Control type="email" name="email" placeholder="Email" id={props.match.params.id}
             onChange={(e) => setEmail(e.target.value)} value={email} /><br/>
            </p>
            </Form.Group>
            <Form.Group>
            <p>Phone Number
            <Form.Control name="phone" placeholder="Phone Number" id={props.match.params.id}
             onChange={(e) => setPhone(e.target.value)} value={phone} /><br/>
            </p>
            </Form.Group>
            <div className="d-grid gap-2">
            <Button type="button" id="submitDetails" variant="outline-dark" onClick={both} size="sm"
            name="submitDetails">Submit</Button>
            </div>
          </Form>
        </div>
        </div>
    );
}

export default Update
