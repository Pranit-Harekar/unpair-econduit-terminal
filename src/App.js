import React, { Component } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terminalid: "",
      key: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm = () =>
    this.state.terminalid.length > 0 &&
    this.state.key.length > 0 &&
    this.state.password.length > 0;

  handleTerminalIdChange = event => {
    this.setState({
      terminalid: event.target.value
    });
  };

  handleKeyChange = event => {
    this.setState({
      key: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header>
          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Brand href="/">
                <h5>Unpair eConduit Terminal</h5>
              </Navbar.Brand>
              <Navbar.Text>
                <a href="https://github.com/Pranit-Harekar/unpair-econduit-terminal">
                  Github
                </a>
              </Navbar.Text>
            </Container>
          </Navbar>
        </header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg">
            <Form.Label>Terminal ID</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.terminalid}
              onChange={this.handleTerminalIdChange}
            />
          </Form.Group>
          <Form.Group size="lg">
            <Form.Label>API Key</Form.Label>
            <Form.Control
              value={this.state.key}
              onChange={this.handleKeyChange}
              type="text"
            />
          </Form.Group>
          <Form.Group size="lg">
            <Form.Label>API Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="text"
            />
          </Form.Group>
          <Button block size="lg" disabled={!this.validateForm()} type="submit">
            Unpair
          </Button>
        </Form>
      </div>
    );
  }
}
