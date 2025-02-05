import { MaintainerHotels } from "./MaintainerHotels";
import React, { useEffect, useState } from "react";
import {
	Carousel,
	CarouselItem,
	CarouselCaption,
	CarouselIndicators,
	CarouselControl,
	Jumbotron,
	Container,
	Input,
	FormGroup,
	Form,
	Button,
	Table,
	Row,
	Nav,
	NavLink,
	NavItem,
	TabContent,
	TabPane,
} from "reactstrap";
import items from "../shared/HomepageItems";
import { Search } from "./SearchComponent";
import axios from "axios";
import baseUrl from "../shared/baseUrl";
import classnames from "classnames";
import { AdminRoom } from "./AdminRoomComponent";
import { AdminReceptionists } from "./AdminReceptionists";

const RenderAdmin = (props) => {
	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div className="pb-5 pt-5 container-fluid">
			<Nav tabs className="mt-5">
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}
					>
						Hotel Rooms Section
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}
					>
						Receptionists section
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<AdminRoom
						rooms={props.rooms}
						addRoomType={props.addRoomType}
						hotelRoomTypes={props.hotelRoomTypes}
						addRoom={props.addRoom}
						deleteRoom={props.deleteRoom}
						editRoomType={props.editRoomType}
					/>
				</TabPane>
				<TabPane tabId="2">
					<AdminReceptionists
						receptionists={props.receptionists}
						addReceptionist={props.addReceptionist}
						deleteReceptionist={props.deleteReceptionist}
					/>
				</TabPane>
			</TabContent>
		</div>
	);
};

const RenderAvailableRooms = () => {
	const [bookings, setBookings] = useState([]);
	const [filter, setFilter] = useState("");

	const getBookings = () => {
		let userDetails = JSON.parse(localStorage.getItem("userDetails"));

		axios({
			method: "POST",
			url: baseUrl + "/receptionist/getBookings",
			headers: {
				usertype: userDetails.type,
				usersecret: userDetails.secret,
			},
			data: {
				receptionistId: userDetails.id,
				hotelId: userDetails.hotel._id,
			},
		})
			.then((response) => {
				if (!response.data.failure) {
					setBookings(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getBookings();
	});

	const confirmBooking = (id) => {
		let userDetails = JSON.parse(localStorage.getItem("userDetails"));
		axios({
			method: "PUT",
			url: baseUrl + "/receptionist/updateStatus/" + id,
			headers: {
				usertype: userDetails.type,
				usersecret: userDetails.secret,
			},
			data: {
				receptionistId: userDetails.id,
				hotelId: userDetails.hotel._id,
			},
		})
			.then((response) => {
				if (response.data.success) {
					getBookings();
				} else {
					alert(response.data.failure);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Jumbotron>
				<Container>
					<h3>Welcome to Hotel</h3>
					<Form>
						<FormGroup>
							<Input
								type="text"
								id="filterBy"
								name="filterBy"
								placeholder="Enter Customer ID or Booking ID"
								onChange={(event) => {
									setFilter(event.target.value);
								}}
							/>
						</FormGroup>
					</Form>
				</Container>
			</Jumbotron>
			<Table responsive>
				<thead>
					<tr>
						<th>Booking id</th>
						<th>Customer Id</th>
						<th>Duration</th>
						<th>Confirm Booking</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking) => {
						return (
							(String(booking._id).indexOf(filter) !== -1 ||
								String(booking.customerId).indexOf(filter) !== -1) && (
								<tr key={booking._id}>
									<td>{booking._id}</td>
									<td>{booking.customerId}</td>
									<td>
										{String(booking.duration.startDate).slice(0, 10) +
											" to " +
											String(booking.duration.endDate).slice(0, 10)}
									</td>
									<td>
										<Button
											className="btn btn-success"
											onClick={() => confirmBooking(booking._id)}
										>
											<span class="fa fa-ticket"></span>
										</Button>
									</td>
								</tr>
							)
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export const Home = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const next = () => {
		if (animating) return;
		let nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const prev = () => {
		if (animating) return;
		let prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(prevIndex);
	};

	const goToIndex = (index) => {
		if (animating) return;
		setActiveIndex(index);
	};

	const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={process.env.PUBLIC_URL + item.src}
			>
				{/* , */}
				<img
					style={{ width: "100%", height: "60vh" }}
					src={process.env.PUBLIC_URL + item.src}
					alt={item.altText}
				/>
				<CarouselCaption captionHeader={item.caption} />
			</CarouselItem>
		);
	});

	const [nosearch, setNoSearch] = useState(true);
	const [startDate, setstartDate] = useState("");
	const [endDate, setendDate] = useState("");
	const [keyWord, setkeyWord] = useState("");
	const [sortedHotelRoomTypes, setsortedHotelRoomTypes] = useState([]);
	const [sortedHotels, setsortedHotels] = useState([]);

	const handleSearchHotel = (event) => {
		setNoSearch(false);
		event.preventDefault();
		console.log(event);
		setstartDate(event.target.elements["checkIn"].value);
		setendDate(event.target.elements["checkOut"].value);
		setkeyWord(event.target.elements["location"].value);
		var body = {
			startDate: startDate,
			endDate: endDate,
		};
		axios({
			method: "POST",
			url: baseUrl + "/findHotelRoomTypes",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((res) => {
				console.log(res.data.hotelRoomTypes);
				console.log(res.data.hotelDetails);
				setsortedHotels(res.data.hotelDetails);
				setsortedHotelRoomTypes(res.data.hotelRoomTypes);
			})
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
			{(props.userType === "customer" || !props.isLoggedin) && (
				<div>
					<Jumbotron
						style={{
							backgroundColor: "rgb(236,23,81)",
							paddingTop: "100px",
							color: "#fff",
							borderRadius: "0",
						}}
					>
						<Container className="text-center mb-5">
							<h3 className="font-ubuntu-700">Hotel Pedia</h3>
							<h5 className="font-roboto">A place to find your every stay</h5>
						</Container>
						<Container
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexWrap: "wrap",
								width: "100%",
							}}
						>
							<Form
								className="row searchForm"
								onSubmit={handleSearchHotel}
								style={{
									display: "flex",
									flexWrap: "wrap",
									width: "100%",
									justifyContent: "center",
								}}
							>
								<FormGroup>
									<Input
										type="text"
										id="location"
										name="location"
										placeholder="Search by City, Street or Hotel"
										style={{ minWidth: "300px" }}
									/>
								</FormGroup>
								<FormGroup>
									<Input
										required
										type="date"
										id="checkIn"
										placeholder="check in"
										name="checkIn"
									/>
								</FormGroup>
								<FormGroup>
									<Input
										required
										type="date"
										id="checkOut"
										placeholder="check out"
										name="checkOut"
									/>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									className="btn btn-success col-4 col-md-1 mb-3"
									color="success"
								>
									Search
								</Button>
							</Form>
						</Container>
					</Jumbotron>
					{nosearch && (
						<Container className="pics">
							<Carousel
								className="mb-5"
								activeIndex={activeIndex}
								next={next}
								previous={prev}
							>
								<CarouselIndicators
									items={items}
									activeIndex={activeIndex}
									onClickHandler={goToIndex}
								/>
								{slides}
								<CarouselControl
									direction="prev"
									directionText="Previous"
									onClickHandler={prev}
								/>
								<CarouselControl
									direction="next"
									directionText="Next"
									onClickHandler={next}
								/>
							</Carousel>
						</Container>
					)}
				</div>
			)}
			{props.userType === "receptionist" && (
				<div className="mt-5">
					<Container style={{ minHeight: "30vh" }}>
						<Row className="mt-5 mb-5">
							<RenderAvailableRooms />
						</Row>
					</Container>
				</div>
			)}
			{props.userType === "hotelAdministration" && (
				<RenderAdmin
					rooms={props.hotelRooms}
					receptionists={props.receptionists}
					addRoomType={props.addRoomType}
					hotelRoomTypes={props.hotelRoomTypes}
					addRoom={props.addRoom}
					deleteRoom={props.deleteRoom}
					addReceptionist={props.addReceptionist}
					deleteReceptionist={props.deleteReceptionist}
					editRoomType={props.editRoomType}
				/>
			)}
			{props.userType === "maintainer" && (
				<MaintainerHotels
					hoteladmins={props.hotelAdmins}
					hotels={props.hotels}
					addHotel={props.addHotel}
					deleteHotel={props.deleteHotel}
				/>
			)}
			{(props.userType === "customer" || !props.isLoggedin) && !nosearch && (
				<Search
					hotels={sortedHotels}
					hotelRoomTypes={sortedHotelRoomTypes}
					keyWord={keyWord}
					isLoggedin={props.isLoggedin}
					bookRoom={props.bookRoom}
					startDate={startDate}
					endDate={endDate}
				/>
			)}
		</React.Fragment>
	);
};
