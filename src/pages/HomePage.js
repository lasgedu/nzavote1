import React from 'react';
import './HomePage.css';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="homepage-header text-center">
        <div className="header-content">
        
          <h1>We Make Online Elections Easy and Affordable</h1>
          <hr></hr>
          <p>
            NzaVote is a secure online voting platform that makes it easy to run elections at a fraction of<br></br>
            the usual cost. We're the leading provider of ranked choice elections, which help achieve more<br></br>
            democratic outcomes by better representing the will of your voters.
          </p>
          <div className="header-buttons">
            <Button href= "register" variant="success">Try it Free</Button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about py-5">
        <Container>
          <h2 className="text-center mb-4">About Us</h2>
          <Row>
            <Col md={6}>
              <p>
                NzaVote is committed to revolutionizing online voting by providing a secure, efficient, and
                affordable platform. Our mission is to empower organizations with tools that make it easy to
                conduct reliable elections. Whether it’s a small community group or a large organization, we
                tailor our services to ensure that every vote counts.
              </p>
            </Col>
            <Col md={6}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/Us.png`}
                alt="About NzaVote"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Voting Services Section */}
      <section id="services" className="voting-services py-5">
        <Container>
          <h2 className="text-center mb-4">Our Voting Services</h2>
          <Row>
            {[
              {
                title: 'Online Elections',
                text: 'Send your voters an email with secure, single-use voting links that ensure only authorized voters can vote, once.',
                img: '1.png',
              },
              {
                title: 'Online Polls',
                text: 'Create a personalized poll that anyone can vote on, and publicize it using your website, email, or social media.',
                img: '2.png',
              },
              {
                title: 'Automated Ballot Counts',
                text: 'Count ranked ballots that you\'ve already collected (using e.g., paper ballots or your own vote collection software).',
                img: '3.png',
              },
            ].map((service, idx) => (
              <Col md={4} className="text-center" key={idx}>
                <Card className="service-card">
                  <Card.Body>
                    <div className="image-wrapper">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/${service.img}`}
                        alt={service.title}
                        className="circle-image"
                      />
                    </div>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Our Customers Say it Best</h2>
          <Row>
            {[
              {
                text: 'NzaVote’s security features made it easy for us to audit the election while maintaining the secrecy of each voter\'s ballot. We had confidence the results accurately reflected the wishes of our voters.',
                author: 'H. Ginsberg',
                organization: 'Green Democrats',
              },
              {
                text: 'A particularly good feature is the "reminder" email that you can send out periodically over the voting period. It certainly helped boost our response - more than 50% voted, which was excellent.',
                author: 'C. de Goguel',
                organization: 'Worthing Green Party',
              },
              {
                text: 'In one of our elections there were 6 candidates and the one with the 3rd most votes in the initial round ended up winning. OpaVote could not have better illustrated how ranked choice voting worked.',
                author: 'E. Cox',
                organization: 'NY State Brewers Association',
              },
              {
                text: 'I love the fact that I can download the ballots, and recount them using different systems to see how the results would have differed. It gives OpaVote tremendous educational value.',
                author: 'M. Jackson',
                organization: 'St Michaels University School',
              },
            ].map((testimonial, idx) => (
              <Col md={6} key={idx}>
                <blockquote className="blockquote">
                  <p>{testimonial.text}</p>
                  <footer className="blockquote-footer">
                    {testimonial.author}, <strong>{testimonial.organization}</strong>
                  </footer>
                </blockquote>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* On-Site Section */}
      <section className="on-site py-5">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-left">
              <img
                src={`${process.env.PUBLIC_URL}/assets/Onsite.png`}
                alt="On-Site Voting Illustration"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h3>Also Works On-Site</h3>
                <hr />
                <p>
                  NzaVote makes it super easy to combine having on-site and offsite voters in your election.
                  By using single-use code voters, you can have voters who can make it to your venue(s) cast
                  their vote in booths using PCs or tablets, and voters who can't make it cast their vote by
                  email on their own devices. Once the voting ends, OpaVote will provide you with the final
                  count directly, without any manual steps on your part.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Security Section */}
      <section className="security py-5 text-white">
        <Container>
          <h2 className="text-center mb-4">Secure and Trustworthy</h2>
          <Row>
            {[
              {
                title: 'Secure',
                text: 'Our voting pages are encrypted so your voters can enjoy complete security and privacy while voting.',
                img: '4.png',
              },
              {
                title: 'Anonymous',
                text: 'We offer the strongest possible guarantee of voter anonymity: we simply do not track who votes for what; only who votes, and what the vote is.',
                img: '5.png',
              },
              {
                title: 'Private',
                text: 'We do not use or share your voters\' email addresses for any purposes outside of your election.',
                img: '6.png',
              },
            ].map((security, idx) => (
              <Col md={4} className="text-center" key={idx}>
                <Card className="service-card">
                  <Card.Body>
                    <div className="image-wrapper">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/${security.img}`}
                        alt={security.title}
                        className="circle-image"
                      />
                    </div>
                    <Card.Title>{security.title}</Card.Title>
                    <Card.Text>{security.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact-us py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Contact Us</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form>
                <Form.Group controlId="contactName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="contactEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Write your message here" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
