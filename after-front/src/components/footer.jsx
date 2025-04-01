import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-3">
            <Container style={{ paddingTop: '0', paddingBottom: '0', maxHeight: '400px' }}>
                <Row>
                    {/* Colonna Sinistra: Solo Immagine Trustpilot */}
                    <Col xs={12} md={3} className="d-flex justify-content-center align-items-start mb-4 mb-md-0">
                        <img
                            src="https://ledmansion.art/cdn/shop/files/kindpng_3686309.png?v=1727187641&width=969"
                            alt="Trustpilot"
                            style={{
                                width: '60%',  // Immagine più piccola (60% della larghezza del contenitore)
                                height: 'auto',
                                objectFit: 'contain',
                                marginTop: '10px',  // Spostamento dell'immagine di 10px verso il basso
                            }}
                        />
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
