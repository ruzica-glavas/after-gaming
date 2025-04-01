import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row>
                    {/* Colonna Sinistra: Trustpilot */}
                    <Col xs={12} md={3} className="d-flex flex-column align-items-start mb-4 mb-md-0">
                        <div className="d-flex align-items-center trustpilot-container">
                            <FontAwesomeIcon icon={faStar} className="text-warning mr-2 fa-2x" />
                            <span className="h3">Trustpilot</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <span className="text-warning fa-3x">★★★★★</span> 
                        </div>
                        <div className="ml-2 fs-4 text-warning">
                            5/5
                        </div>
                    </Col>

                    {/* Colonna Centrale: Link alla Privacy, Termini d'Uso */}
                    <Col xs={12} md={3} className="d-flex justify-content-start mb-4 mb-md-0">
                        <ListGroup variant="flush" className="text-left">
                            <ListGroup.Item action href="/privacy" className="bg-dark text-white fs-4">Privacy Policy</ListGroup.Item>
                            <ListGroup.Item action href="/terms" className="bg-dark text-white fs-4">Termini d'Uso</ListGroup.Item>
                            <ListGroup.Item action href="/cookies" className="bg-dark text-white fs-4">Politica sui Cookies</ListGroup.Item>
                            <ListGroup.Item action href="/Aff" className="bg-dark text-white fs-4">Programma Affiliazione</ListGroup.Item>
                            <ListGroup.Item action href="/GiftCard" className="bg-dark text-white fs-4">Gift Card</ListGroup.Item>
                            <ListGroup.Item action href="/faq" className="bg-dark text-white fs-4">FAQ</ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Colonna Destra: Social Icons */}
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-start">
                        <div className="d-flex flex-wrap justify-content-center" style={{ gap: '25px' }}>
                            <a href="https://www.facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} size="3x" />
                            </a>
                            <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} size="3x" />
                            </a>
                            <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="3x" /> 
                            </a>
                            <a href="https://www.youtube.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} size="3x" /> 
                            </a>
                            <a href="https://www.twitch.tv" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitch} size="3x" /> 
                            </a>
                            <a href="https://discord.com" className="text-white" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faDiscord} size="3x" /> 
                            </a>
                        </div>
                    </Col>
                </Row>

                {/* Colonna Inferiore Destra: Icone Apple Store e Play Store */}
                <Row>
                    <Col className="d-flex justify-content-center justify-content-md-end align-items-center mt-3" style={{ gap: '15px' }}>
                        {/* Apple Store */}
                        <a
                            href="https://apps.apple.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Vai su Apple Store"
                        >
                            <img
                                src="https://logodix.com/logo/51009.png"
                                alt="Apple Store"
                                style={{
                                    height: '160px',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    cursor: 'pointer',
                                }}
                            />
                        </a>
                        {/* Play Store */}
                        <a
                            href="https://play.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Vai su Google Play Store"
                        >
                            <img
                                src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
                                alt="Google Play Store"
                                style={{
                                    height: '180px',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    cursor: 'pointer',
                                }}
                            />
                        </a>
                    </Col>
                </Row>
            </Container>

            {/* Nuova Sezione: Copyright e Posizione (Fuori dal Container) */}
            <div className="bg-dark text-white py-3">
                <Container>
                    <Row className="d-flex justify-content-between">
                        {/* Colonna Sinistra: Copyright */}
                        <Col className="d-flex align-items-center" style={{ paddingLeft: '10px' }}>
                            <span className="fs-4">Copyright © 2025 After-Gaming - All rights reserved</span>
                        </Col>

                        {/* Colonna Destra: Posizione */}
                        <Col className="d-flex justify-content-center justify-content-md-end align-items-center" style={{ paddingRight: '10px' }}>
                            <div className="location-container">
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" className="mr-3" />
                                <span className="fs-5">Italy</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

