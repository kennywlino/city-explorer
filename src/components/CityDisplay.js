import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class CityDisplay extends React.Component {
    render() {
        return (
            <Card style={{width: '18rem' }}>
                <Card.Header>{this.props.cityData.display_name}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Longitude: {this.props.cityData.lon}</ListGroup.Item>
                    <ListGroup.Item>Latitude: {this.props.cityData.lat}</ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }
}

export default CityDisplay;