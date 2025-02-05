import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	Input,
	Label,
	UncontrolledDropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";

export const Header = (props) => {
	const [isNavOpen, setisNavOpen] = useState(false);
	const [isModalOpen, setisModalOpen] = useState(false);
	const [isLogin, setisLogin] = useState(true);

	const handleLoginTemp = (event) => {
		event.preventDefault();
		console.log(event);
		if (isLogin) {
			props.handleLogin(event);
		} else {
			props.handleRegister(event);
		}
		setisModalOpen(!isModalOpen);
	};

	return (
		<React.Fragment>
			<Navbar color="light" light expand="md" className="fixed-top">
				{/*fixed-top is responsible for sticky*/}
				<NavbarBrand className="mr-auto ml-1" href="/">
					<img
						src="/logo.png"
						height="35"
						width="35"
						alt="Logo"
						style={{ float: "left" }}
						className="mr-2"
					/>
					<h3 style={{ color: "rgb(236,23,81)", fontFamily: "sans-serif" }}>
						HotelPedia
					</h3>
				</NavbarBrand>
				<NavbarToggler onClick={() => setisNavOpen(!isNavOpen)} />
				<Collapse isOpen={isNavOpen} navbar>
					<Nav navbar className="ml-auto mr-2">
						<NavItem>
							<NavLink className="nav-link">
								<Link to="/" style={{ color: "rgb(236,23,81)" }}>
									<span className="fa fa-home fa-lg"></span> Home
								</Link>
							</NavLink>
						</NavItem>
					</Nav>
					{props.userType === "customer" && (
						<UncontrolledDropdown style={{ listStyleType: "none" }} nav inNavbar>
							<DropdownToggle className="userIcon">
								<Nav navbar>
									<NavItem className="userIcon1">
										<span className="fa fa-user-circle fa-lg"></span>
									</NavItem>
								</Nav>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<NavLink className="nav-link">
										<Link to="/profile">Profile</Link>
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink className="nav-link">
										<Link to="/customer/upcomingBookings">
											Upcoming Bookings
										</Link>
									</NavLink>
								</DropdownItem>
								<DropdownItem>
									<NavLink className="nav-link">
										<Link to="/customer/previousBookings">
											Previous Bookings
										</Link>
									</NavLink>
								</DropdownItem>
								<DropdownItem onClick={props.handleLogout}>
									<NavLink className="nav-link" href="/">
										Logout
									</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					)}
					{props.isLoggedin && props.userType !== "customer" && (
						<UncontrolledDropdown style={{ listStyleType: "none" }} nav inNavbar>
							<DropdownToggle className="userIcon">
								<Nav navbar>
									<NavItem className="userIcon1">
										<span className="fa fa-user-circle fa-lg"></span>
									</NavItem>
								</Nav>
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<NavLink className="nav-link">
										<Link to="/profile">Profile</Link>
									</NavLink>
								</DropdownItem>
								<DropdownItem onClick={props.handleLogout}>
									<NavLink className="nav-link" href="/">
										Logout
									</NavLink>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					)}
					{!props.isLoggedin && (
						<Nav className="" navbar>
							<NavItem>
								<Button
									outline
									onClick={() => setisModalOpen(!isModalOpen)}
									className="spBtn"
								>
									<span className="fa fa-sign-in fa-lg"></span> Login
								</Button>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
			<Modal isOpen={isModalOpen} toggle={() => setisModalOpen(!isModalOpen)}>
				<ModalHeader toggle={() => setisModalOpen(!isModalOpen)}>
					{isLogin ? "Login" : "Register"}
				</ModalHeader>
				{isLogin ? (
					<ModalBody>
						<Form onSubmit={handleLoginTemp}>
							<FormGroup>
								<Label htmlFor="email">Email</Label>
								<Input type="email" id="email" name="email" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">Password</Label>
								<Input type="password" id="password" name="password" />
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								style={{
									color: "#fff",
									backgroundColor: "var(--my-red)",
									borderColor: "var(--my-red)",
								}}
							>
								Login
							</Button>
							<Button
								color="link"
								className="btn btn-link"
								onClick={() => setisLogin(!isLogin)}
								style={{ color: "var(--my-red)" }}
							>
								Register
							</Button>
						</Form>
					</ModalBody>
				) : (
					<ModalBody>
						<Form onSubmit={handleLoginTemp}>
							<FormGroup>
								<Label htmlFor="firstname">First Name</Label>
								<Input type="text" id="firstname" name="firstname" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="lastname">Last Name</Label>
								<Input type="text" id="lastname" name="lastname" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="email">email</Label>
								<Input type="email" id="email" name="email" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">password</Label>
								<Input type="password" id="password" name="password" />
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								style={{
									color: "#fff",
									backgroundColor: "var(--my-red)",
									borderColor: "var(--my-red)",
								}}
							>
								Register
							</Button>
							<Button
								color="link"
								className="btn btn-link"
								onClick={() => setisLogin(!isLogin)}
								style={{ color: "var(--my-red)" }}
							>
								Already have a account
							</Button>
						</Form>
					</ModalBody>
				)}
			</Modal>
		</React.Fragment>
	);
};

export default Header;
