import React from "react";
import { Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

export const Hotel = (props) => {
	const RenderRooms = (props) => {
		return props.rooms.map((room) => {
			return (
				<ListGroupItem key={room.id} className="col-12 d-flex">
					<h3>Room No:{room.name}</h3>
					<p>{room.AC ? "AC" : "Non-AC"}</p>
					<Link className="ml-auto" to={`/hotel/${props.hotelId}/${room.id}`}>
						<Button>Book Room</Button>
					</Link>
				</ListGroupItem>
			);
		});
	};

	return (
		<Container>
			<ListGroup className="row mt-5 mb-5">
				<RenderRooms rooms={props.hotel.rooms} hotelId={props.hotel.id} />
			</ListGroup>
		</Container>
	);
};
