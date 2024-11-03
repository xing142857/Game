import React from 'react';
import "../css/LifeGame.css";
import { Container, Row, Col } from 'react-bootstrap';

const LifeGame = () => {

  // Initialize cell with a 100x100 grid filled with 0s
  let cell = Array.from({ length: 100 }, () => Array(100).fill(0));


  return (
    <Container fluid>
      {cell.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((value, colIndex) => (
            <Col key={colIndex} className="cell">
              {value}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default LifeGame;