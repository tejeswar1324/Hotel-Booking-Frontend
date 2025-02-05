import React from "react";
import { CardText, Container, Row, Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";
import { BiRupee } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";

export const UpcomingBooking = ({ bookings, cancelBooking }) => {
	console.log(bookings);
	return (
		<Container className="mt-5 pt-5 pb-5">
			<h2 style={{ fontFamily: "Ubuntu", color: "var(--my-red)" }}>Upcoming Bookings</h2>
			<Row className="mt-3 container-fluid">
				{bookings.map((booking, index) => {
					return (
						<Card key={index} style={{ margin: "5px" }}>
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
								<CardText style={{ marginBottom: "0px" }}>
									RoomNo: {booking.roomNo}
								</CardText>
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
								<CardText style={{ marginBottom: "0px" }}>
									Don't Forgot to bring your id
								</CardText>
								<Button
									style={{ marginTop: "10px" }}
									onClick={() => {
										cancelBooking(booking.id);
									}}
								>
									Cancel Booking
								</Button>
							</CardBody>
						</Card>
					);
				})}
				{bookings.length === 0 && <h5>No upcoming bookings</h5>}
			</Row>
		</Container>
	);
};
