import React from "react";
import { Input, FormGroup, Form, Button } from "reactstrap";

export const Contactus = () => {
	return (
		<div>
			<br />
			<br />
			<br />

			<div style={{ textAlign: "center" }}>
				<p>Contact Us via phone or email</p>
				<i className="fa fa-phone fa-lg"></i>: +852 1234 5678
				<br />
				<i className="fa fa-envelope fa-lg"></i>:{" "}
				<a href="mailto:confusion@food.net">hotels@india.net</a>
				<br />
				<br />
				<p>Go with your query and we'll resopond as soon as we can!!</p>
				<Form className="col-md-8 contactform">
					<br />
					<FormGroup>
						<Input type="text" id="namePerson" placeholder="Enter your name" />
					</FormGroup>
					<FormGroup>
						<Input type="text" id="personEmail" placeholder="Enter your Email" />
					</FormGroup>
					<FormGroup>
						<Input type="text" id="query" placeholder="Enter your query" />
					</FormGroup>
					<Button type="submit" value="submit" className="bg-primary" color="primary">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};
