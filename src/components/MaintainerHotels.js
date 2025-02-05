import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import { Input, FormGroup, Form, Button, Container, Table } from "reactstrap";

export const MaintainerHotels = (props) => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	console.log(props);
	return (
		<div className="container-fluid">
			<Nav tabs className="mt-5 pt-5">
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}
						style={{ cursor: "pointer" }}
					>
						Info
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}
						style={{ cursor: "pointer" }}
					>
						Add new hotel
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							<Table className="col-md-8 offset-md-2" responsive>
								<thead>
									<tr>
										<th>Admin id</th>
										<th>Admin Name</th>
										<th>Hotel Name</th>
										<th>Hotel location</th>
										<th>Email</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{props.hoteladmins.map((hoteladmin) => {
										//console.log(props)
										let hotel = props.hotels.filter(
											(hotel) => hotel._id === hoteladmin.hotelId
										)[0];
										return (
											<tr key={hoteladmin._id}>
												<td>{hoteladmin._id}</td>
												<td>{hoteladmin.name.firstName}</td>
												<td>{hotel.hotelName}</td>
												<td>{hotel.address.city}</td>
												<td>{hoteladmin.email}</td>
												<td>
													<Button
														className="btn btn-danger"
														onClick={() => {
															props.deleteHotel(hotel._id);
														}}
													>
														<span className="fa fa-trash"></span>
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
					<Container className="pb-5">
						<Form onSubmit={props.addHotel} className="pb-5">
							<br />
							<FormGroup>
								<Input
									type="text"
									name="firsName"
									id="firstName"
									placeholder="enter first name of admin"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									name="lastName"
									id="lastName"
									placeholder="enter last name of admin"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									name="hotelName"
									id="hotelName"
									placeholder="enter name of hotel"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="email"
									id="email"
									name="email"
									placeholder="enter email of admin"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									id="city"
									name="city"
									placeholder="enter Hotel city"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									id="street"
									name="street"
									placeholder="enter Hotel street"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									id="pincode"
									name="pincode"
									placeholder="enter Hotel pincode"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="password"
									id="password"
									name="password"
									placeholder="password for Hotel admin"
									className="col-md-6"
								/>
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								className="bg-primary"
								color="primary"
							>
								Add hotel
							</Button>
						</Form>
					</Container>
				</TabPane>
			</TabContent>
		</div>
	);
};
