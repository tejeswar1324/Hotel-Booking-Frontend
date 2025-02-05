import React from "react";
// import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Row, Container } from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { BiRupee } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";

const RenderHotels = ({
	hotels,
	hotelRoomTypes,
	keyWord,
	isLoggedin,
	bookRoom,
	startDate,
	endDate,
}) => {
	console.log("Hi");
	console.log(hotelRoomTypes);
	console.log(hotels);
	return hotelRoomTypes.map((hotelRoomType) => {
		console.log(hotelRoomType.imgURLs);
		return (
			(hotels[hotelRoomType.hotelId].name.toLowerCase().indexOf(keyWord.toLowerCase()) !==
				-1 ||
				hotels[hotelRoomType.hotelId].address.street
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) !== -1 ||
				hotels[hotelRoomType.hotelId].address.city
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) !== -1) && (
				<div className="col-sm-6 mt-1 mb-1" key={hotelRoomType._id}>
					<Card>
						<CardImg
							width="30%"
							src={hotelRoomType.imgURLs[0] || ""}
							alt="hotelImage"
							style={{ height: "300px" }}
						/>
						<CardBody>
							<CardTitle tag="h5">
								{hotels[hotelRoomType.hotelId].name + " - " + hotelRoomType.type}
							</CardTitle>
							<Rating name="read-only" value={hotelRoomType.rating} readOnly />
							<CardText>
								<BiRupee />
								{hotelRoomType.price}
							</CardText>
							<CardText>
								<span className="fa fa-map-marker pr-2"></span>
								{hotels[hotelRoomType.hotelId].address.street},
								{hotels[hotelRoomType.hotelId].address.city} -
								{" " + hotels[hotelRoomType.hotelId].address.pinCode}
							</CardText>
							<CardText>
								{hotelRoomType.facilities.ac_or_not ? (
									<i className="fa fa-check pr-2" aria-hidden="true"></i>
								) : (
									<i className="fa fa-times pr-2" aria-hidden="true"></i>
								)}
								AC
							</CardText>
							<CardText>
								{hotelRoomType.facilities.wifi_or_not ? (
									<i className="fa fa-check pr-2" aria-hidden="true"></i>
								) : (
									<i className="fa fa-times pr-2" aria-hidden="true"></i>
								)}
								WIFI
							</CardText>
							<CardText>
								<BsPeopleFill />
								&nbsp;
								{"   " + hotelRoomType.facilities.max_no_of_people}
							</CardText>
							{isLoggedin && (
								<Button
									onClick={() => {
										bookRoom(
											startDate,
											endDate,
											hotelRoomType._id,
											hotelRoomType.hotelId
										);
									}}
								>
									Book a room
								</Button>
							)}
						</CardBody>
					</Card>
				</div>
			)
		);
	});
};

export const Search = ({
	hotels,
	hotelRoomTypes,
	keyWord,
	isLoggedin,
	bookRoom,
	startDate,
	endDate,
}) => {
	// console.log(hotels);
	// let hotelDetails = {};
	// var i = 0;
	// while (hotels[i]) {
	// 	hotelDetails[hotels[i]._id] = {
	// 		name: hotels[i].hotelName,
	// 		address: hotels[i].address,
	// 	};
	// 	i++;
	// }
	// console.log("yo", hotelDetails);
	return (
		<Container className="pb-5">
			<Row className="mb-2">
				<RenderHotels
					hotels={hotels}
					hotelRoomTypes={hotelRoomTypes}
					keyWord={keyWord}
					isLoggedin={isLoggedin}
					bookRoom={bookRoom}
					startDate={startDate}
					endDate={endDate}
				/>
			</Row>
			{hotels.length === 0 && (
				<h1 className="align-self-center">No hotel matched with the search</h1>
			)}
		</Container>
	);
};
