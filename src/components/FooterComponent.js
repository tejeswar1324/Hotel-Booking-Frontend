import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<div className="footer">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-4 offset-1 col-sm-2">
						<h5>Links</h5>

						<ul className="list-unstyled">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/contactus">Contact Us</Link>
							</li>
						</ul>
					</div>
					<div className="col-7 col-sm-5">
						<h5>Our Address</h5>
						<address>
							IIT INDORE
							<br />
							INDORE, MP
							<br />
							<i className="fa fa-phone fa-lg"></i>: +852 1234 5678
							<br />
							<i className="fa fa-envelope fa-lg"></i>:{" "}
							<a href="mailto:confusion@food.net">hotels@india.net</a>
						</address>
					</div>
					<div className="col-12 col-sm-4 align-self-center">
						<div className="text-center" class="icons" style={{ color: "white"}}>
							<a
								className="btn btn-social-icon btn-facebook"
								href="http://www.facebook.com/"
							>
								<i className="fa fa-facebook"></i>
							</a>
							<a
								className="btn btn-social-icon btn-linkedin"
								href="http://www.linkedin.com/in/"
							>
								<i className="fa fa-linkedin"></i>
							</a>
							<a
								className="btn btn-social-icon btn-twitter"
								href="http://twitter.com/"
							>
								<i className="fa fa-twitter"></i>
							</a>
							<a
								className="btn btn-social-icon btn-google"
								href="http://youtube.com/"
							>
								<i className="fa fa-youtube"></i>
							</a>
							<a className="btn btn-social-icon" href="mailto:">
								<i className="fa fa-envelope-o"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
