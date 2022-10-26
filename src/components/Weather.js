import React from "react";

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
   render() {
    let forecastData = this.props.forecastData;
    let forecastDataComponents = forecastData.map((element, index) => {
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return (
        <>
            <ListGroup.Item
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{String(new Date(element.date).toLocaleDateString('en-us', options))}</div>
                    {element.description}
                </div>
                <Badge bg="primary" pill>
                    {element.description.split('with')[1]}
                </Badge>
            </ListGroup.Item>

            {/* <h2 key={index}>{element.date}</h2>
            <p>{element.description}</p> */}
        </>
        )
    });
    return (
        <Card style={ { width: '18rem' } }>
            <Card.Header className="fw-bold">Weather</Card.Header>
            <ListGroup variant="flush">
            {forecastDataComponents};
            </ListGroup>
        </Card>
    );
   }
}

export default Weather;