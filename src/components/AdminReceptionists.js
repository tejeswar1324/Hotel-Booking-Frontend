import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import { Input, FormGroup, Form, Button, Container, Table } from "reactstrap";

export const AdminReceptionists = ({ receptionists, addReceptionist, deleteReceptionist }) => {
	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div className="container pt-5 pb-5">
			{/* Using tabs for navigation of details and editing receptionists */}
			<Nav tabs className="mt-5">
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}
					>
						Info
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}
					>
						Add new receptionist
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							<br />
							<Table className="col-md-8 offset-md-2">
								<thead>
									<tr>
										<th>receptionists id</th>
										<th>Name</th>
										<th>Email</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{receptionists.map((receptionist) => {
										return (
											<tr key={receptionist._id}>
												<td>{receptionist._id}</td>
												<td>{receptionist.name.firstName}</td>
												<td>{receptionist.email}</td>
												<td>
													<Button
														className="btn btn-danger"
														onClick={() =>
															deleteReceptionist(receptionist._id)
														}
													>
														<span class="fa fa-trash"></span>
													</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<br />
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Container>
						<br />
						<br />
						{/* Form for adding recpetionist */}
						<Form onSubmit={addReceptionist}>
							<FormGroup>
								<Input
									type="text"
									id="firstname"
									name="firstname"
									placeholder="enter first name of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									id="lastname"
									placeholder="enter last name of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="email"
									id="email"
									placeholder="enter email of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="password"
									id="password"
									name="password"
									placeholder="enter password for receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								className="bg-primary"
								color="primary"
							>
								Add Receptionist
							</Button>
						</Form>
					</Container>
				</TabPane>
			</TabContent>

			<br />
		</div>
	);
};
