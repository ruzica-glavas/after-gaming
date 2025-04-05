import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
    return (
        <footer className="bg-black text-white py-3">
            <Container style={{ paddingTop: '0', paddingBottom: '0', maxHeight: '400px' }}>
                <Row className="text-center text-md-start">

                    {/* Colonna Sinistra: Immagine Trustpilot */}
                    <Col xs={12} md={3} className="d-flex justify-content-center justify-content-md-start align-items-start mb-4 mb-md-0">
                        <img
                            src="https://ledmansion.art/cdn/shop/files/kindpng_3686309.png?v=1727187641&width=969"
                            alt="Trustpilot"
                            style={{
                                width: '60%',
                                height: 'auto',
                                objectFit: 'contain',
                                marginTop: '10px',
                            }}
                        />
                    </Col>

                    {/* Colonna Centrale: Link importanti */}
                    <Col xs={12} md={3} className="d-flex justify-content-center justify-content-md-start mb-4 mb-md-0">
                        <ListGroup variant="flush" className="text-left">
                            {["Privacy Policy", "Termini d'Uso", "Politica sui Cookies", "Programma Affiliazione", "Gift Card", "FAQ"].map((text, index) => (
                                <ListGroup.Item 
                                    key={index} 
                                    action 
                                    href={`/${text.replace(/\s+/g, '').toLowerCase()}`} 
                                    className="bg-black text-white fs-7"
                                >
                                    {text}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Colonna Destra: Social Media */}
                    <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end align-items-start">
                        <div className="d-flex flex-wrap justify-content-center gap-3 py-2 social-icon">
                            {[faFacebookF, faXTwitter, faInstagram, faYoutube, faTwitch, faDiscord].map((icon, index) => (
                                <a 
                                    key={index} 
                                    href="#" 
                                    className="text-white social-icon"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={icon} size="2x" />
                                </a>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Sezione inferiore del Footer */}
            <div className="bg-black text-white py-3">
                <Container>
                    <Row className="d-flex flex-column flex-md-row align-items-center justify-content-between">

                        {/* Testo Copyright */}
                        <Col className="text-center text-md-start mb-3 mb-md-0">
                            <span className="fs-7">Copyright © 2025 After-Gaming - All rights reserved</span>
                        </Col>

                        {/* Posizione Geografica */}
                        <Col className="text-center text-md-end">
                            <div className="location-container d-flex justify-content-center justify-content-md-end align-items-center gap-2 py-4">
                                <p className="fs-7 mb-0"><FontAwesomeIcon icon={faMapMarkerAlt} /> Italy</p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </footer>
    );
}
