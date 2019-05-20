import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
class Cadastra extends React.Component {
    Cadastrar() {
        // let emailAt = document.getElementById('email').value
        // let passwordAt = document.getElementById('password').value
        // let request = require('request');
        // let dados = {
        //     email: emailAt,
        //     password: passwordAt
        // }

        // request.post({
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     url: 'https://geumapi.herokuapp.com/api/auth',
        //     body: dados,
        //     json: true
        // }, function (error, response, body) {
        //     console.log(body);
        // });
    }

    render() {
        return (
            <div className="Cadastro">
                <div className="Conteudo">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Nome do pet</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite o nome do pet..."
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Raça do pet</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite a raça do pet ..."
                                />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Dono</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite o nome do dono..."
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Form.Label as="legend" column sm={2}>
                                            Porte
                                        </Form.Label>
                                        <Col sm={10} style={{ display: "flex", flex: "none", maxWidth: "none" }}>
                                            <Form.Check
                                                type="radio"
                                                label="P"
                                                name="p"
                                                id="p"
                                                style={{ paddingLeft: "2.25rem" }}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="M"
                                                name="m"
                                                id="m"
                                                style={{ paddingLeft: "2.25rem" }}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="G"
                                                name="g"
                                                id="g"
                                                style={{ paddingLeft: "2.25rem" }}
                                            />
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Registrar</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Cadastra;
