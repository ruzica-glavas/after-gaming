import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-2">
            <Container style={{ paddingTop: '0', paddingBottom: '0', maxHeight: '350px' }}>
                <Row>
                    {/* Left Column: Trustpilot Image */}
                    <Col xs={12} md={3} className="d-flex justify-content-center align-items-start mb-3 mb-md-0">
                        <img
                            src="https://ledmansion.art/cdn/shop/files/kindpng_3686309.png?v=1727187641&width=969"
                            alt="Trustpilot"
                            style={{
                                width: '50%',
                                height: 'auto',
                                objectFit: 'contain',
                                marginTop: '8px',
                            }}
                        />
                    </Col>

                    {/* Center Column: Links */}
                    <Col xs={12} md={3} className="d-flex justify-content-start mb-3 mb-md-0">
                        <ListGroup variant="flush" className="text-left">
                            <ListGroup.Item action href="/privacy" className="bg-dark text-white fs-5">Privacy Policy</ListGroup.Item>
                            <ListGroup.Item action href="/terms" className="bg-dark text-white fs-5">Termini d'Uso</ListGroup.Item>
                            <ListGroup.Item action href="/cookies" className="bg-dark text-white fs-5">Politica sui Cookies</ListGroup.Item>
                            <ListGroup.Item action href="/Aff" className="bg-dark text-white fs-5">Programma Affiliazione</ListGroup.Item>
                            <ListGroup.Item action href="/GiftCard" className="bg-dark text-white fs-5">Gift Card</ListGroup.Item>
                            <ListGroup.Item action href="/faq" className="bg-dark text-white fs-5">FAQ</ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Right Column: Social Icons */}
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-start">
                        <div className="d-flex flex-wrap justify-content-center" style={{ gap: '20px' }}>
                            <a href="https://www.facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} size="2x" />
                            </a>
                            <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="2x" /> 
                            </a>
                            <a href="https://www.youtube.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} size="2x" /> 
                            </a>
                            <a href="https://www.twitch.tv" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitch} size="2x" /> 
                            </a>
                            <a href="https://discord.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faDiscord} size="2x" /> 
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* New Section: Copyright and Location */}
            <div className="bg-dark text-white py-2">
                <Container>
                    <Row className="d-flex justify-content-between">
                        {/* Left Column: Copyright */}
                        <Col className="d-flex align-items-center" style={{ paddingLeft: '8px' }}>
                            <span className="fs-5">Copyright © 2025 After-Gaming</span>
                        </Col>

                        {/* Right Column: Location */}
                        <Col className="d-flex justify-content-center justify-content-md-end align-items-center" style={{ paddingRight: '8px' }}>
                            <div className="location-container">
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" className="mr-2" />
                                <span className="fs-6">Italy</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}
