import React, { Component } from "react";
import { Button, Container, Form, Modal, Navbar } from "react-bootstrap";
import "./App.css";
import { unpairTerminal, validateResponse } from "./unpairTerminal";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terminalid: "",
      key: "",
      password: "",
      showModal: false,
      isSuccess: false,
      result: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm = () =>
    this.state.terminalid.length > 0 &&
    this.state.key.length > 0 &&
    this.state.password.length > 0;

  handleTerminalIdChange = event => {
    this.setState({
      terminalid: event.target.value.trim()
    });
  };

  handleKeyChange = event => {
    this.setState({
      key: event.target.value.trim()
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value.trim()
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await unpairTerminal(
        this.state.terminalid,
        this.state.key,
        this.state.password
      );
      validateResponse(response);

      if (response.Status === "Success") {
        this.setState({ showModal: true, isSuccess: true, result: "Success" });
      }

      if (response.Status === "Error") {
        this.setState({
          showModal: true,
          isSuccess: false,
          result: response.ErrorMessage
        });
      }
    } catch (e) {
      this.setState({
        showModal: true,
        isSuccess: false,
        result: e.message
      });
    }
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
                <a
                  href="https://github.com/Pranit-Harekar/unpair-econduit-terminal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                |
                <a
                  href="https://econduit.cloud/docs/api/unpairterminal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Reference
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
              type="number"
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
          <Modal
            size="sm"
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {this.state.isSuccess
                  ? "Unpaired successfully"
                  : "Failed to unpair"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.result}</Modal.Body>
          </Modal>
        </Form>

        <footer>
          <p>
            Made with{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>{" "}
            and 💙
          </p>
        </footer>
        <p className="Disclaimer">
          <a
            href="https://github.com/Pranit-Harekar/unpair-econduit-terminal#disclaimer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Disclaimer
          </a>
        </p>
      </div>
    );
  }
}
