import React, { useState , useEffect}  from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Button from "react-bootstrap/Button";

function Home(props){
	const [details, setDetails] = useState([]);
	 useEffect(() =>  {
       Axios.get("http://localhost:5000/api/getAll").then(res => setDetails(res.data))
   }, [])

//Navigate through Button
	const history = useHistory();
	const homePage = () => {
			  	history.push("/form")
	}

	function Update(id){
    	props.history.push("/update/"+id)
  }

  function View(id){
      props.history.push("/view/"+id)
  }

// Delete request
	const deleteCustomer = (id)  => {
        Axios.post("http://localhost:5000/api/delete", { id })
        .then(res => setDetails(res.data))
    }

	return(
		<div>
		  <h1>Home Page <Button variant="outline-success" onClick={homePage} size="lg" className="buttonAdd">Add Customer</Button></h1>
			<table striped bordered hover className="table table-hover">
         <thead className="header">
            <tr>
	        	<th>First Name</th>
	         	<th>Last Name</th>
	        	<th>Email</th>
	         	<th colSpan="3">Actions</th>
            </tr>
        </thead>
				<tbody>
								 {details.map((detail) => (
									 <tr key={detail._id}>
										 <td>{detail.name}</td>
										 <td>{detail.lname}</td>
										 <td>{detail.email}</td>
										 <td><Button variant="outline-primary" onClick={() => View (detail._id)} size="sm" >View</Button></td>
										 <td><Button variant="outline-success" onClick={() => Update (detail._id)} size="sm" >Update</Button></td>
										 <td><Button variant="outline-danger" size="sm"
										   onClick={() => {
                          const confirmBox = window.confirm("Do you really want to delete this Entry")
                          if (confirmBox === true) {deleteCustomer (detail._id)}}}>Delete</Button></td>
									 </tr>
								 ))}
				</tbody>
     </table>
		</div>
	)
}

export default Home
