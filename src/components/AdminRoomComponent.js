import React, { useState } from "react";
import {
	Nav,
	NavItem,
	NavLink,
	Container,
	TabContent,
	TabPane,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import classnames from "classnames";

export const RenderRoomTypes = ({ hotelRoomTypes, handleEdit, isEditing, editRoomType }) => {
	return hotelRoomTypes.map((hotelRoomType) => {
		return (
			<div
				key={hotelRoomType._id}
				style={{
					margin: "10px",
					fontFamily: "Ubuntu",
					border: "1px solid gray",
					padding: "10px",
				}}
			>
				<div>
					<img
						src={hotelRoomType.imgURLs[0]}
						alt="hotelRoomType"
						style={{ height: "280px", width: "370px" }}
					/>
				</div>
				{isEditing !== hotelRoomType._id ? (
					<div className="mt-2">
						<h3>
							<strong> {hotelRoomType.type}</strong>
						</h3>
						<h5>Rs. {hotelRoomType.price}</h5>
						<h4>Facilities</h4>
						<ul>
							<li>{hotelRoomType.facilities.ac_or_not ? "AC" : "Non-AC"}</li>
							{hotelRoomType.facilities.wifi_or_not && <li>Wifi</li>}
							<li>Max no. of People: {hotelRoomType.facilities.max_no_of_people}</li>
						</ul>
						<Button
							className="bg bg-warning ml-4 mt-1"
							color="warning"
							onClick={() => handleEdit(hotelRoomType._id)}
						>
							<span className="fa fa-pencil"></span>
						</Button>
					</div>
				) : (
					<Form onSubmit={editRoomType} className="mt-2">
						<h3>
							<strong> {hotelRoomType.type}</strong>
						</h3>
						<FormGroup>
							<Label htmlFor="price">price</Label>
							<Input type="text" id="price" name="price" />
						</FormGroup>
						<FormGroup>
							<Input
								type="text"
								hidden
								id="hotelRoomTypeId"
								name="hotelRoomTypeId"
								value={hotelRoomType._id}
							/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="imgLink">Image URL</Label>
							<Input type="text" id="imgLink" name="imgLink" />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="NoOfPeople">No of People</Label>
							<Input type="text" id="noOfPeople" name="noOfPeople" />
						</FormGroup>
						<FormGroup check>
							<Label htmlFor="AC">
								<Input type="checkbox" id="AC" name="AC" />
								AC
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label htmlFor="Wifi">
								<Input type="checkbox" id="Wifi" name="Wifi" />
								Wifi
							</Label>
						</FormGroup>
						<Button type="submit" className="btn btn-danger mr-2" color="danger">
							Edit
						</Button>
						<Button className="btn" onClick={() => handleEdit(hotelRoomType._id)}>
							Cancel
						</Button>
					</Form>
				)}
			</div>
		);
	});
};

export const RenderRooms = ({ deleteRoom, rooms, hotelRoomTypes }) => {
	return rooms.map((room) => {
		let hotelRoomType = hotelRoomTypes.filter(
			(hotelRoomType) => hotelRoomType._id === room.hotelRoomTypeId
		)[0];
		return (
			<div
				key={room._id}
				style={{
					margin: "10px",
					fontFamily: "Ubuntu",
					border: "1px solid gray",
					padding: "10px",
				}}
			>
				<div>
					<div>
						<img
							src={hotelRoomType.imgURLs[0]}
							alt="hotelRoomImage"
							style={{ height: "280px", width: "370px" }}
						/>
					</div>
					<div className="mt-2">
						<h4>{room.roomNo + ": " + hotelRoomType.type}</h4>
						<h5>Rs. {hotelRoomType.price}</h5>
						<h5>Facilities</h5>
						<ul>
							<li>{hotelRoomType.facilities.ac_or_not ? "AC" : "Non-AC"}</li>
							{hotelRoomType.facilities.wifi_or_not && <li>Wifi</li>}
							<li>Max no. of People: {hotelRoomType.facilities.max_no_of_people}</li>
						</ul>
						<Button
							className="bg bg-danger ml-4"
							color="danger"
							onClick={() => deleteRoom(room._id)}
						>
							<span className="fa fa-trash"></span>
						</Button>
					</div>
				</div>
			</div>
		);
	});
};

export const AdminRoom = ({
	rooms,
	addRoomType,
	hotelRoomTypes,
	addRoom,
	editRoomType,
	deleteRoom,
}) => {
	const [isEditing, setisEditing] = useState(false);
	const [activeTab, setactiveTab] = useState("1");

	const handleEdit = (id) => {
		console.log(isEditing, id);
		if (isEditing === id) setisEditing(null);
		else setisEditing(id);
	};

	const setActiveTab = (tab) => {
		if (tab !== activeTab) {
			setactiveTab(tab);
		}
	};

	return (
		<Container fluid className="mt-5 mb-5">
			<Nav tabs>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						onClick={() => {
							setActiveTab("1");
						}}
						className={classnames({ active: activeTab === "1" })}
					>
						Room Details
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						onClick={() => {
							setActiveTab("2");
						}}
						className={classnames({ active: activeTab === "2" })}
					>
						Add Room
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "3" })}
						onClick={() => {
							setActiveTab("3");
						}}
					>
						Add Room Type
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "4" })}
						onClick={() => {
							setActiveTab("4");
						}}
					>
						Room Type Details
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<RenderRooms
							rooms={rooms}
							hotelRoomTypes={hotelRoomTypes}
							deleteRoom={deleteRoom}
						/>
					</div>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Form onSubmit={addRoom} className="m-4">
							<FormGroup>
								<Label htmlFor="roomNo">Room Number</Label>
								<Input type="text" id="roomNo" name="roomNo" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="roomType">Room Types</Label>
								<Input type="select" id="roomType" name="roomType">
									{hotelRoomTypes.map((hotelRoomType) => {
										return (
											<option value={hotelRoomType._id}>
												{hotelRoomType.type}
											</option>
										);
									})}
									<option selected value="none">
										make a new room type
									</option>
								</Input>
							</FormGroup>
							<Button type="submit" class="bg bg-primary" color="primary">
								Add Room
							</Button>
						</Form>
					</Row>
				</TabPane>
				<TabPane tabId="3">
					<Row>
						<Form onSubmit={addRoomType} className="m-4">
							<FormGroup>
								<Label htmlFor="newRoomType">Room Type Name</Label>
								<Input type="text" id="newRoomType" name="newRoomType" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="price">Price for type</Label>
								<Input type="text" id="price" name="price" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="imgLink">Image Link</Label>
								<Input type="text" id="imgLink" name="imgLink" />
							</FormGroup>
							<FormGroup check>
								<Input type="checkbox" name="AC" value="AC" />
								AC
							</FormGroup>
							<FormGroup check>
								<Input type="checkbox" name="Wifi" value="Wifi" />
								Wifi
							</FormGroup>
							<FormGroup className="mt-2">
								<Label htmlFor="noOfPeople">Number of People</Label>
								<Input type="text" name="noOfPeople" id="noOfPeople" />
							</FormGroup>
							<Button type="submit" color="primary">
								Add Room Type
							</Button>
						</Form>
					</Row>
				</TabPane>
				<TabPane tabId="4">
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<RenderRoomTypes
							rooms={rooms}
							hotelRoomTypes={hotelRoomTypes}
							isEditing={isEditing}
							handleEdit={handleEdit}
							editRoomType={editRoomType}
							deleteRoom={deleteRoom}
						/>
					</div>
				</TabPane>
			</TabContent>
		</Container>
	);
};
