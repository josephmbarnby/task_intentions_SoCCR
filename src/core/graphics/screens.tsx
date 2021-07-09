// UI components
import React from 'react';
import { render } from 'react-dom';
import { Container, Row, Col, Button, Card, CardGroup, Form, Spinner } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';

// Import styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/styles.css';

// Additional components
import Avatar from 'boring-avatars';

// Configuration
import { config } from '../../config';
import { spreadsheet } from '../../data';

function ChoicesGrid(props) {
  return (
    <Container>
      <Container>
        <Row>
          <Col>
            Points for you
          </Col>
          <Col>
            Points for your partner
          </Col>
          <Col>
            {/* Empty */}
          </Col>
        </Row>

        {/* First Option */}
        <Row>
          <Col>
            {props.rowData.Option1_PPT}
          </Col>
          <Col>
            {props.rowData.Option1_Partner}
          </Col>
          <Col>
            <Button
              size="lg"
              onClick={() => {
                props.buttonHandler('optionOne');
              }}
            >
              Option 1
            </Button>
          </Col>
        </Row>

        {/* Second Option */}
        <Row>
          <Col>
            {props.rowData.Option2_PPT}
          </Col>
          <Col>
            {props.rowData.Option2_Partner}
          </Col>
          <Col>
            <Button
              size="lg"
              onClick={() => {
                props.buttonHandler('optionTwo');
              }}
            >
              Option 1
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

function ScreenLayout(props: { screen: any; }) {
  return (
    <Container>
      {props.screen}
    </Container>
  );
}

function ChoicesScreen(props: { rowData: any, buttonHandler: any }) {
  return (
    <ChoicesGrid rowData={props.rowData} buttonHandler={props.buttonHandler} />
  );
}

function AvatarSelectionScreen(props) {
  const _avatarComponents = [];
  const _selectComponents = [];
  for (let a = 0; a < config.avatars.length; a++) {
    _avatarComponents.push(
      <Col>
        <Card
          className="m-2"
          style={{
            color: 'black',
          }}
        >
          <Card.Header>{a + 1}</Card.Header>
          <Card.Body>
            <Avatar
              size={64}
              name={config.avatars[a]}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </Card.Body>
        </Card>
      </Col>
    );
    _selectComponents.push(
        <option key={a} value={`avatar${a + 1}`}>Avatar {a + 1}</option>
    );
  }

  return (
    <Container>
      <h1>
        Select your avatar!
      </h1>
        <Row className="m-1">
          {_avatarComponents}
        </Row>
        <Form className="p-4">
          <Row>
            <Col>
              <Form.Control as="select" >
                {_selectComponents}
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Button
                variant="teal"
                onClick={() => {
                  props.avatarSelectionHandler()
                }}
              >
                Select <AiOutlineArrowRight />
              </Button>
            </Col>
          </Row>
          
        </Form>
        
    </Container>
  );
}

function MatchScreen(props) {
  return (
    <Container>
      <h1>
        Matching you with another user...
      </h1>
      <Spinner animation="border" role="status"></Spinner>
    </Container>
  )
}

export function displayScreen(_type: string, _target: HTMLElement, _screenProps: any) {
  if (_type === 'choice') {
    render(
      ScreenLayout({
        screen: ChoicesScreen(_screenProps)
      }),
      _target
    );
  } else if (_type === 'avatarSelection') {
    render(
      ScreenLayout({
        screen: AvatarSelectionScreen(_screenProps)
      }),
      _target
    );
  } else if (_type === 'match') {
    render(
      ScreenLayout({
        screen: MatchScreen(_screenProps)
      }),
      _target
    );
  }
}