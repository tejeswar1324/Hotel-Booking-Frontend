import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./HeaderComponent";
import { Home } from "./HomeComponent";
import Footer from "./FooterComponent";
import { Hotel } from "./HotelComponent";
import baseUrl from "../shared/baseUrl";
import axios from "axios";
import { Profile } from "./ProfileComponent";
import { AdminReceptionists } from "./AdminReceptionists";
import { MaintainerHotels } from "./MaintainerHotels";
import { PreviousBookings } from "./PreviousBookingComponent";
import { UpcomingBooking } from "./UpcomingBookingsComponent";
import { Contactus } from "./Contactus";

export const Main = () => {
	const [isLoggedin, setisLoggedin] = useState(false);
	const [userType, setuserType] = useState("");
	const [secret, setsecret] = useState("");
	const [userId, setuserId] = useState("");
	const [userInfo, setuserInfo] = useState("");
	const [previousBookings, setpreviousBookings] = useState([]);
	const [upcomingBookings, setupcomingBookings] = useState([]);
	const [hotelAdmins, sethotelAdmins] = useState([]);
	const [hotels, sethotels] = useState([]);
	const [hotelRoomTypes, sethotelRoomTypes] = useState([]);
	const [hotelRooms, sethotelRooms] = useState([]);
	const [receptionists, setreceptionists] = useState([]);
	// const [bookedHotelDetails, setbookedHotelDetails] = useState([]);

	useEffect(() => {
		let userDetails = JSON.parse(localStorage.getItem("userDetails"));
		let type = "";

		if (userDetails) {
			type = userDetails.type;
			setuserType(userDetails.type);
			setuserId(userDetails.id);
			setsecret(userDetails.secret);
			setisLoggedin(true);
		}
		if (type === "customer") {
			setuserInfo(userDetails.customerDetails);
			sethotels(userDetails.hotels);
			sethotelRoomTypes(userDetails.hotelRoomTypes);
			sethotelRooms(userDetails.hotelRooms);
			var hotelObj = {};
			var hotelRoomObj = {};
			var hotelRoomTypeObj = {};

			var i = 0;
			while (userDetails.hotels[i]) {
				hotelObj[userDetails.hotels[i]._id] = {
					name: userDetails.hotels[i].hotelName,
					address: userDetails.hotels[i].address,
				};
				i++;
			}
			i = 0;
			while (userDetails.hotelRoomTypes[i]) {
				hotelRoomTypeObj[userDetails.hotelRoomTypes[i]._id] = {
					type: userDetails.hotelRoomTypes[i].type,
					price: userDetails.hotelRoomTypes[i].price,
					facilities: userDetails.hotelRoomTypes[i].facilities,
					imgURLs: userDetails.hotelRoomTypes[i].imgURLs,
				};
				i++;
			}
			i = 0;
			while (userDetails.hotelRooms[i]) {
				hotelRoomObj[userDetails.hotelRooms[i]._id] = {
					hotelRoomTypeId: userDetails.hotelRooms[i].hotelRoomTypeId,
					roomNo: userDetails.hotelRooms[i].roomNo,
				};
				i++;
			}

			var upbks = [];
			var pbks = [];
			var k = 0;
			i = 0;
			while (userDetails.upcomingBookings[i]) {
				if (userDetails.upcomingBookings[i].status) {
					pbks[k] = {
						id: userDetails.upcomingBookings[i]._id,
						hotelId: userDetails.upcomingBookings[i].hotelId,
						hotelName: hotelObj[userDetails.upcomingBookings[i].hotelId].name,
						hotelAddress: hotelObj[userDetails.upcomingBookings[i].hotelId].address,
						roomNo: hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId].roomNo,
						duration: userDetails.upcomingBookings[i].duration,
						bookedOn: userDetails.upcomingBookings[i].createdAt,
						hotelRoomType:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].type,
						price: hotelRoomTypeObj[
							hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
								.hotelRoomTypeId
						].price,
						facilities:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].facilities,
						imgURLs:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].imgURLs,
					};
					k++;
				}
				i++;
			}
			k = 0;
			i = 0;
			while (userDetails.upcomingBookings[i]) {
				if (!userDetails.upcomingBookings[i].status) {
					upbks[k] = {
						id: userDetails.upcomingBookings[i]._id,
						hotelId: userDetails.upcomingBookings[i].hotelId,
						hotelName: hotelObj[userDetails.upcomingBookings[i].hotelId].name,
						hotelAddress: hotelObj[userDetails.upcomingBookings[i].hotelId].address,
						roomNo: hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId].roomNo,
						duration: userDetails.upcomingBookings[i].duration,
						bookedOn: userDetails.upcomingBookings[i].createdAt,
						hotelRoomType:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].type,
						price: hotelRoomTypeObj[
							hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
								.hotelRoomTypeId
						].price,
						facilities:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].facilities,
						imgURLs:
							hotelRoomTypeObj[
								hotelRoomObj[userDetails.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].imgURLs,
					};
					k++;
				}
				i++;
			}
			setpreviousBookings(pbks);
			setupcomingBookings(upbks);
		} else if (type === "maintainer") {
			let hotelAdmins = JSON.parse(localStorage.getItem("hotelAdmins"));
			let hotels = JSON.parse(localStorage.getItem("hotels"));
			sethotelAdmins(hotelAdmins);
			sethotels(hotels);
		} else if (type === "hotelAdministration") {
			sethotels(userDetails.hotel);
			setuserInfo(userDetails.hotelAdminDetails);
			sethotelRoomTypes(userDetails.hotelRoomTypes);
			sethotelRooms(userDetails.hotelRooms);
			setreceptionists(userDetails.receptionists);
		} else if (type === "receptionist") {
			setuserInfo(userDetails.receptionistDetails);
		} else {
			setuserType("");
			setuserId("");
			setsecret("");
			setisLoggedin(false);
		}
	}, []);

	const handleLogout = () => {
		setisLoggedin(false);
		setuserType("");
		setuserInfo("");
		setuserId("");
		setsecret("");
		localStorage.clear();
	};

	const handleLogin = (event) => {
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let body = {
			email: email,
			password: password,
		};
		axios({
			method: "POST",
			url: baseUrl + "/login",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((response) => {
				if (response.data.failure) {
					alert(response.data.failure);
				} else if (response.data.error) {
					alert(response.data.error);
				} else {
					playWithData(response);
				}
			})
			.catch((err) => console.log(err));
	};

	const playWithData = (response) => {
		if (response.data.type) {
			localStorage.setItem("userDetails", JSON.stringify(response.data));
			let userInfo1, userType1, userId1, secret1;
			userType1 = response.data.type;
			secret1 = response.data.secret;
			userId1 = response.data.id;
			if (userType1 === "maintainer") {
				userInfo1 = response.data.maintainerDetails;

				let req1 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotelAdmin",
					headers: {
						userType: response.data.type,
						usersecret: response.data.secret,
					},
				});

				let req2 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotel",
					headers: {
						userType: response.data.type,
						usersecret: response.data.secret,
					},
				});
				axios
					.all([req1, req2])
					.then(
						axios.spread((...response) => {
							localStorage.setItem("hotelAdmins", JSON.stringify(response[0].data));
							localStorage.setItem("hotels", JSON.stringify(response[1].data));
							console.log(response);

							setisLoggedin(true);
							setuserType(userType1);
							setuserId(userId1);
							setsecret(secret1);
							setuserInfo(userInfo1);
							sethotels(response[1].data);
							sethotelAdmins(response[0].data);
						})
					)
					.catch((err) => console.log(err));
			} else if (userType1 === "customer") {
				setisLoggedin(true);
				setuserType(userType1);
				setuserId(userId1);
				setsecret(secret1);
				setuserInfo(response.data.customerDetails);
				sethotels(response.data.hotels);
				sethotelRoomTypes(response.data.hotelRoomTypes);
				sethotelRooms(response.data.hotelRooms);
				var hotelObj = {};
				var hotelRoomObj = {};
				var hotelRoomTypeObj = {};

				var i = 0;
				while (response.data.hotels[i]) {
					hotelObj[response.data.hotels[i]._id] = {
						name: response.data.hotels[i].hotelName,
						address: response.data.hotels[i].address,
					};
					i++;
				}
				i = 0;
				while (response.data.hotelRoomTypes[i]) {
					hotelRoomTypeObj[response.data.hotelRoomTypes[i]._id] = {
						type: response.data.hotelRoomTypes[i].type,
						price: response.data.hotelRoomTypes[i].price,
						facilities: response.data.hotelRoomTypes[i].facilities,
						imgURLs: response.data.hotelRoomTypes[i].imgURLs,
					};
					i++;
				}
				i = 0;
				while (response.data.hotelRooms[i]) {
					hotelRoomObj[response.data.hotelRooms[i]._id] = {
						hotelRoomTypeId: response.data.hotelRooms[i].hotelRoomTypeId,
						roomNo: response.data.hotelRooms[i].roomNo,
					};
					i++;
				}

				var upbks = [];
				var pbks = [];
				var j = 0;
				i = 0;
				while (response.data.upcomingBookings[i]) {
					if (response.data.upcomingBookings[i].status) {
						pbks[j] = {
							hotelId: response.data.upcomingBookings[i].hotelId,
							rating: response.data.upcomingBookings[i].rating,
							id: response.data.upcomingBookings[i]._id,
							hotelName: hotelObj[response.data.upcomingBookings[i].hotelId].name,
							hotelAddress:
								hotelObj[response.data.upcomingBookings[i].hotelId].address,
							roomNo: hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
								.roomNo,
							duration: response.data.upcomingBookings[i].duration,
							bookedOn: response.data.upcomingBookings[i].createdAt,
							hotelRoomType:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].type,
							price: hotelRoomTypeObj[
								hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].price,
							facilities:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].facilities,
							imgURLs:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].imgURLs,
						};
						j++;
					}
					i++;
				}

				i = 0;
				while (response.data.upcomingBookings[i]) {
					if (!response.data.upcomingBookings[i].status) {
						upbks[j] = {
							hotelId: response.data.upcomingBookings[i].hotelId,
							rating: response.data.upcomingBookings[i].rating,
							id: response.data.upcomingBookings[i]._id,
							hotelName: hotelObj[response.data.upcomingBookings[i].hotelId].name,
							hotelAddress:
								hotelObj[response.data.upcomingBookings[i].hotelId].address,
							roomNo: hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
								.roomNo,
							duration: response.data.upcomingBookings[i].duration,
							bookedOn: response.data.upcomingBookings[i].createdAt,
							hotelRoomType:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].type,
							price: hotelRoomTypeObj[
								hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
									.hotelRoomTypeId
							].price,
							facilities:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].facilities,
							imgURLs:
								hotelRoomTypeObj[
									hotelRoomObj[response.data.upcomingBookings[i].hotelRoomId]
										.hotelRoomTypeId
								].imgURLs,
						};
						j++;
					}
					i++;
				}
				setpreviousBookings(pbks);
				setupcomingBookings(upbks);
			} else if (userType1 === "hotelAdministration") {
				setisLoggedin(true);
				setuserType(userType1);
				setuserId(userId1);
				setsecret(secret1);
				setuserInfo(response.data.hotelAdminDetails);
				sethotels(response.data.hotel);
				sethotelRoomTypes(response.data.hotelRoomTypes);
				sethotelRooms(response.data.hotelRooms);
				setreceptionists(response.data.receptionists);
			} else if (userType1 === "receptionist") {
				setisLoggedin(true);
				setuserType(userType1);
				setuserId(userId1);
				setsecret(secret1);
				setuserInfo(response.data.receptionistDetails);
			}
		} else if (response.data.failure) {
			console.log(response.data);
			alert(response.data.failure);
		}
	};

	const addRating = (event) => {
		event.preventDefault();
		var body = {
			customerId: userId,
			ratingValue: event.target.elements["rating"].value,
			hotelId: event.target.elements["hotelId"].value,
			comment: event.target.elements["comment"].value,
			bookingId: event.target.elements["bookingId"].value,
		};
		console.log(body);
		axios({
			method: "POST",
			url: baseUrl + "/customer/addRating",
			headers: {
				"Content-Type": "application/json",
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				console.log(response.data);
				if (response.data.success) alert("Added rating successfully");
				findMyDetails();
			})
			.catch((err) => console.log(err));
	};

	const findMyDetails = () => {
		var body = {
			id: userId,
		};
		axios({
			method: "POST",
			url: baseUrl + "/" + userType + "/myDetails",
			headers: {
				"Content-Type": "application/json",
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				console.log("hi", response.data);
				console.log("I am here");
				if (response.data.success) playWithData(response);
			})
			.catch((err) => console.log(err));
	};

	const handleRegister = (event) => {
		let firstName = event.target.elements["firstname"].value;
		let lastName = event.target.elements["lastname"].value;
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};

		axios({
			method: "POST",
			url: baseUrl + "/registerCustomer",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((response) => {
				if (response.status === 200) {
					alert("Account Successfully Created");
				}
			})
			.catch((err) => console.log(err));
	};

	const addHotel = (event) => {
		event.preventDefault();
		console.log(event.target.elements);
		let firstName = event.target.elements["firstName"].value;
		let lastName = event.target.elements["lastName"].value;
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let street = event.target.elements["street"].value;
		let city = event.target.elements["city"].value;
		let pincode = event.target.elements["pincode"].value;
		let hotelName = event.target.elements["hotelName"].value;

		let body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			street: street,
			city: city,
			pinCode: pincode,
			hotelName: hotelName,
		};

		console.log(body);

		axios({
			method: "POST",
			url: baseUrl + "/maintainer/addNewHotel",
			data: body,
			headers: {
				userType: userType,
				usersecret: secret,
			},
		})
			.then((response) => {
				console.log(response);
				let req1 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotelAdmin",
					headers: {
						userType: userType,
						usersecret: secret,
					},
				});

				let req2 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotel",
					headers: {
						userType: userType,
						usersecret: secret,
					},
				});
				axios
					.all([req1, req2])
					.then(
						axios.spread((...response) => {
							localStorage.setItem("hotelAdmins", JSON.stringify(response[0].data));
							localStorage.setItem("hotels", JSON.stringify(response[1].data));
							let hotelAdmins = response[0].data,
								hotels = response[1].data;
							console.log(response);
							setisLoggedin(true);
							sethotels(hotels);
							sethotelAdmins(hotelAdmins);
						})
					)
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	const deleteHotel = (hotelId) => {
		axios({
			method: "delete",
			url: baseUrl + "/maintainer/removeHotel/" + hotelId + "/?" + hotelId,
			headers: {
				usertype: userType,
				usersecret: secret,
			},
		})
			.then((response) => {
				console.log(response);
				let req1 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotelAdmin",
					headers: {
						userType: userType,
						usersecret: secret,
					},
				});

				let req2 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotel",
					headers: {
						userType: userType,
						usersecret: secret,
					},
				});
				axios
					.all([req1, req2])
					.then(
						axios.spread((...response) => {
							localStorage.setItem("hotelAdmins", JSON.stringify(response[0].data));
							localStorage.setItem("hotels", JSON.stringify(response[1].data));
							let hotelAdmins = response[0].data,
								hotels = response[1].data;
							console.log(response);
							setisLoggedin(true);
							sethotelAdmins(hotelAdmins);
							sethotels(hotels);
						})
					)
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const addRoom = (event) => {
		event.preventDefault();
		let hotelRoomTypeId = event.target.elements["roomType"].value;
		let roomNo = event.target.elements["roomNo"].value;
		if (hotelRoomTypeId !== "none") {
			let body = {
				hotelRoomTypeId: hotelRoomTypeId,
				hotelId: hotels._id,
				hotelAdminId: userId,
				roomNo: roomNo,
			};
			console.log(body);
			axios({
				method: "POST",
				url: baseUrl + "/hotelAdministration/addRoom",
				headers: {
					usertype: userType,
					usersecret: secret,
				},
				data: body,
			})
				.then((response) => {
					if (response.data.success) {
						findMyDetails();
						alert(response.data.success);
					} else {
						alert(response.data.failure);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const addRoomType = (event) => {
		event.preventDefault();
		let type = event.target.elements["newRoomType"].value;
		let price = event.target.elements["price"].value;
		let ac_or_not = event.target.elements["AC"].checked ? 1 : 0;
		let wifi_or_not = event.target.elements["Wifi"].checked ? 1 : 0;
		let max_no_of_people = event.target.elements["noOfPeople"].value;
		let imgURL = event.target.elements["imgLink"].value;

		let body = {
			type: type,
			price: price,
			ac_or_not: ac_or_not,
			wifi_or_not: wifi_or_not,
			max_no_of_people: max_no_of_people,
			hotelId: hotels._id,
			hotelAdminId: userId,
			imgURLs: imgURL,
		};

		axios({
			method: "POST",
			url: baseUrl + "/hotelAdministration/addHotelType",
			headers: {
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				if (response.data.success) {
					findMyDetails();
					alert(response.data.success);
				} else {
					alert(response.data.failure);
				}
			})
			.catch((err) => console.log(err));
	};

	const deleteRoom = (roomId) => {
		axios({
			method: "DELETE",
			url: baseUrl + "/hotelAdministration/deleteRoom/" + roomId + "/?" + roomId,
			headers: {
				hotelId: hotels._id,
				usertype: userType,
				usersecret: secret,
				hotelAdminId: userId,
			},
		})
			.then((response) => {
				if (!response.data.failure) {
					findMyDetails();
					alert(response.data);
				} else {
					alert(response.data.failure);
				}
			})
			.catch((error) => console.log(error));
	};

	const addReceptionist = (event) => {
		event.preventDefault();
		let firstname = event.target.elements["firstname"].value;
		let lastname = event.target.elements["lastname"].value;
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;

		let body = {
			firstName: firstname,
			lastName: lastname,
			email: email,
			password: password,
			hotelId: hotels._id,
			hotelAdminId: userId,
		};

		axios({
			method: "POST",
			url: baseUrl + "/hotelAdministration/addReceptionist",
			headers: {
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				if (response.data.success) {
					alert(response.data.success);
					findMyDetails();
				} else {
					alert(response.data.failure);
				}
			})
			.catch((err) => console.log(err));
	};

	const deleteReceptionist = (id) => {
		console.log(userId, hotels._id);
		axios({
			method: "DELETE",
			url: baseUrl + "/hotelAdministration/removeReceptionist/" + id + "/?id=" + id,
			headers: {
				usertype: userType,
				usersecret: secret,
				hoteladminid: userId,
				hotelId: hotels._id,
			},
		})
			.then((response) => {
				if (!response.data.failure) {
					findMyDetails();
					alert(response.data);
				} else {
					alert(response.data.failure);
				}
			})
			.catch((err) => console.log(err));
	};

	const editRoomType = (event) => {
		console.log(event);
		event.preventDefault();
		let price = event.target.elements["price"].value;
		let ac_or_not = event.target.elements["AC"].checked ? "1" : "0";
		let wifi_or_not = event.target.elements["Wifi"].checked ? "1" : "0";
		let max_no_of_people = event.target.elements["noOfPeople"].value;
		let roomTypeId = event.target.elements["hotelRoomTypeId"].value;
		let imgURLs = event.target.elements["imgLink"].value;

		console.log(roomTypeId);

		axios({
			method: "PUT",
			url: baseUrl + "/hotelAdministration/updateHotelRoomType/" + roomTypeId,
			headers: {
				usertype: userType,
				usersecret: secret,
			},
			data: {
				price: price,
				ac_or_not: ac_or_not,
				wifi_or_not: wifi_or_not,
				max_no_of_people: max_no_of_people,
				hotelId: hotels._id,
				hotelAdminId: userId,
				imgURLs: imgURLs,
			},
		})
			.then((response) => {
				if (response.data.success) {
					findMyDetails();
					alert(response.data.success);
				} else {
					alert(response.data.failure);
				}
			})
			.catch((error) => console.log(error));
	};

	const hotelWithId = ({ match }) => {
		return (
			<Hotel
				hotel={hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId, 10))[0]}
			/>
		);
	};

	const cancelBooking = (bookingId) => {
		console.log(bookingId);
		axios({
			method: "DELETE",
			url: baseUrl + "/customer/cancelBooking/" + bookingId,
			headers: {
				"Content-Type": "application/json",
				usertype: userType,
				usersecret: secret,
				customerId: userId,
			},
		})
			.then((response) => {
				if (response.data.success) {
					alert("Booking Cancelled Successfully!");
					findMyDetails();
				} else alert("Unable to cancel booking, please try again later.");
				console.log(response.data);
			})
			.catch((err) => console.log(err));
	};

	const bookRoom = (startDate, endDate, hotelRoomTypeId, hotelId) => {
		var body = {
			startDate,
			endDate,
			hotelRoomTypeId,
			hotelId,
			customerId: userId,
		};
		var d = new Date(startDate);
		console.log(d);
		console.log(body);
		axios({
			method: "POST",
			url: baseUrl + "/customer/bookRoom",
			headers: {
				"Content-Type": "application/json",
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				if (response.data.success) {
					alert("Room Booked Successfully!");
					findMyDetails();
				} else alert("Sorry, Room Not Availabale");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div style={{ minHeight: "100vh", position: "relative" }}>
			<div style={{ paddingBottom: "10rem" }}>
				<Header
					isLoggedin={isLoggedin}
					userType={userType}
					handleLogin={handleLogin}
					handleRegister={handleRegister}
					handleLogout={handleLogout}
				/>
				<Switch>
					<Route
						exact
						path="/"
						component={() => {
							return (
								<Home
									isLoggedin={isLoggedin}
									userInfo={userInfo}
									userType={userType}
									deleteHotel={deleteHotel}
									hotelAdmins={hotelAdmins}
									hotels={hotels}
									addHotel={addHotel}
									hotelRoomTypes={hotelRoomTypes}
									hotelRooms={hotelRooms}
									receptionists={receptionists}
									addRoomType={addRoomType}
									addRoom={addRoom}
									bookRoom={bookRoom}
									deleteRoom={deleteRoom}
									addReceptionist={addReceptionist}
									deleteReceptionist={deleteReceptionist}
									editRoomType={editRoomType}
								/>
							);
						}}
					/>
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/hotel/:hotelId" component={hotelWithId} />
					<Route exact path="/receptionists" component={AdminReceptionists} />
					<Route
						exact
						path="/admins"
						component={() => {
							return <MaintainerHotels hotels={hotels} />;
						}}
					/>
					<Route
						exact
						path="/customer/previousBookings"
						component={() => {
							return (
								<PreviousBookings
									bookings={previousBookings}
									addRating={addRating}
								/>
							);
						}}
					/>
					<Route
						exact
						path="/customer/upcomingBookings"
						component={() => {
							return (
								<UpcomingBooking
									bookings={upcomingBookings}
									cancelBooking={cancelBooking}
								/>
							);
						}}
					/>
					<Route exact path="/contactus" component={Contactus} />
					<Redirect to="/" />
				</Switch>
			</div>
			<Footer />
		</div>
	);
};
