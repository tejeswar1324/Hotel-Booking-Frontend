import React, { useState } from "react";
import { Media, Container, ListGroup, ListGroupItem, Button } from "reactstrap";

export const Room = () => {
	[room, setroom] = useState({
		type: {
			type: "Prsidential",
			image: "assets/images/hotel3.jpeg",
			facilities: {
				AC: true,
				noOfPeople: 4,
				Wifi: true,
			},
			price: 10000,
		},
		status: "Available",
	});

	const handleBooking = () => {
		console.log("lokesh");
	};

	return (
		<>
			<Container className="d-flex mt-5 flex-wrap">
				<Media
					className="mr-auto col-12 col-md-6"
					style={{ width: "50vw" }}
					object
					src={room.type.image}
				/>
				<Container className="ml-auto col-md-4">
					<h3>{room.type.type}</h3>
					<br />
					<h5>Facilities</h5>
					<ListGroup>
						<ListGroupItem>{room.type.facilities.AC ? "AC" : "Non-AC"}</ListGroupItem>
						<ListGroupItem>{`No of People ${room.type.facilities.noOfPeople}`}</ListGroupItem>
						<ListGroupItem>
							{room.type.facilities.Wifi ? "Wifi" : "Non-Wifi"}
						</ListGroupItem>
					</ListGroup>
				</Container>
			</Container>
			<Container className="mb-5 ml-auto mr-auto p-4">
				<p style={{ color: "green" }}>{room.status}</p>
				<p>Price Rs.{room.type.price}/- per day</p>
				<Button onClick={handleBooking}>Book Room</Button>
			</Container>
		</>
	);
};
