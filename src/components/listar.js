import React from "react";
import { ListGroup, Tab, Row, Col } from "react-bootstrap";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            customersListSalas: [],
            customerChamada: [],
        };
    }
    componentDidMount() {
        setInterval(() => {
            var th = this;
            let request = require('request');
            request.get({
                url: 'http://localhost:8080/pet',
            }, function (error, response, body) {
                console.log(error);
            })

        }, 5000)
    }

    render() {
        return (
            <div className="Cadastro">
                <div className="Conteudo">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    <ListGroup.Item action href="#link1">
                                        Link 1
                            </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        Link 2
                            </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">
                                        <div> 2 </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#link2">
                                        <div> ola </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        );
    }
}

export default Listar;
