import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const Formm = ({ setDetails }) => {
//To navigate through buttons
const history = useHistory();
const home = () => {
        history.push("/");
}

//Adding value to database
    const [detail, setDetail] = useState({
        name: "",
        lname:"",
        email:"",
        phone:""
    })

    const handleChange = e => {
        const { value } = e.target
        setDetail({
            ...detail,
            [e.target.name]: value,
            [e.target.lname]: value,
            [e.target.email]: value,
            [e.target.phone]: value
        })
    }

    const add = () => {
        Axios.post(`http://localhost:5000/api/add`, detail).then(res => setDetail(res.data))
            setDetail({
                name: "",
                lname:"",
                email:"",
                phone:""
            })
    }

    function both(){
        add();
        home();
    }

    return (
        <div>
        <div  className="box">
        <h1 className="head"> SignUp Form</h1>
           <Form validated >
              <Form.Group>
              <Form.Control type="text" name="name" id="name" placeholder="First Name"
               onChange={handleChange} value={detail.name} className="input" required/><br/>
              </Form.Group>
              <Form.Group>
              <Form.Control type="text" name="lname" id="lname" placeholder="Last Name"
               onChange={handleChange} value={detail.lname} className="input" /><br/>
              </Form.Group>
              <Form.Group>
              <Form.Control type="email" name="email" id="email" placeholder="Email"
               onChange={handleChange} value={detail.email} className="input" /><br/>
              </Form.Group>
              <Form.Group>
              <Form.Control name="phone" id="phone" placeholder="Phone Number"
               onChange={handleChange} value={detail.phone} className="input" /><br/>
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

export default Formm
