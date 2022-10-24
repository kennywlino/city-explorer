import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class CityDisplay extends React.Component {
    render() {
        return (
            <Card style={{width: '18rem' }}>
                <Card.Header>place</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Longitude</ListGroup.Item>
                    <ListGroup.Item>Latitude</ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }
}

export default CityDisplay;