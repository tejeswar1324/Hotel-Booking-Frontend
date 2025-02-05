import Rating from "@material-ui/lab/Rating";
import React from "react";
import {
	CardBody,
	CardTitle,
	Button,
	Card,
	CardText,
	CardImg,
	Container,
	Row,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { BiRupee } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";

export const RenderPreviousBookings = (props) => {
	return props.bookings.map((booking, index) => {
		return (
			<Card key={index} style={{ maxWidth: "400px" }}>
				<CardImg
					top
					width="100%"
					src={booking.imgURLs[0]}
					alt="Card image cap"
					style={{ height: "280px", width: "370px" }}
				/>
				<CardBody>
					<CardTitle tag="h4">
						{booking.hotelName + " - " + booking.hotelRoomType}
					</CardTitle>
					{booking.rating && (
						<p>
							Your Review:{" "}
							<Rating
								name="read-only"
								value={booking.ratingValue || 2}
								readOnly
								style={{
									position: "relative",
									top: "5px",
								}}
							/>
						</p>
					)}
					<CardText style={{ marginBottom: "0px" }}>RoomNo: {booking.roomNo}</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						{booking.hotelAddress.street +
							", " +
							booking.hotelAddress.city +
							" - " +
							booking.hotelAddress.pinCode}
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						<BiRupee />
						{booking.price}
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						Booked on {String(booking.bookedOn).slice(0, 10)}
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						Duration:{" "}
						{String(booking.duration.startDate).slice(0, 10) +
							" to " +
							String(booking.duration.endDate).slice(0, 10)}
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						{booking.facilities.ac_or_not ? (
							<i className="fa fa-check pr-2" aria-hidden="true"></i>
						) : (
							<i className="fa fa-times pr-2" aria-hidden="true"></i>
						)}
						AC
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						{booking.facilities.wifi_or_not ? (
							<i className="fa fa-check pr-2" aria-hidden="true"></i>
						) : (
							<i className="fa fa-times pr-2" aria-hidden="true"></i>
						)}
						WIFI
					</CardText>
					<CardText style={{ marginBottom: "0px" }}>
						<BsPeopleFill />
						&nbsp;
						{"   " + booking.facilities.max_no_of_people}
					</CardText>
					{!booking.rating && (
						<Form onSubmit={props.addRating}>
							<FormGroup style={{ marginBottom: "0", marginTop: "20px" }}>
								<input type="Number" name="rating" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor={`comment${booking.id}`}>Comments</Label>
								<Input type="textarea" id={`comment${booking.id}`} name="comment" />
							</FormGroup>
							<FormGroup
								style={{ marginBottom: "0", marginTop: "20px", display: "none" }}
							>
								<input
									type="text"
									name="hotelId"
									readOnly
									value={booking.hotelId}
								/>
							</FormGroup>
							<FormGroup
								style={{ marginBottom: "0", marginTop: "20px", display: "none" }}
							>
								<input type="text" name="bookingId" readOnly value={booking.id} />
							</FormGroup>
							<Button type="submit">Submit Feedback</Button>
						</Form>
					)}
				</CardBody>
			</Card>
		);
	});
};

export const PreviousBookings = (props) => {
	return (
		<Container className="mt-5 pt-5 pb-5">
			<h2 style={{ fontFamily: "Ubuntu", color: "var(--my-red)" }}>Previous Bookings</h2>
			<Row className="container-fluid mt-3">
				<RenderPreviousBookings bookings={props.bookings} addRating={props.addRating} />
				{props.bookings.length === 0 && <h5>No previous Bookings</h5>}
			</Row>
		</Container>
	);
};
