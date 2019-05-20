import React from "react";
import { Form, Button, Alert, Col } from "react-bootstrap";
import {
    FormGroup,
    Label,
    Input
} from 'reactstrap';
class Cadastra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selection: null
        };
      }
    Cadastrar() {
        let nomeData = document.getElementById('nome').value
        let racaData = document.getElementById('raca').value
        let donoData = document.getElementById('dono').value
        let porteData = document.getElementById("porte").value

        if((nomeData || racaData || donoData) && porteData != ""){
            let dados = {
                nome: nomeData,
                raca: racaData,
                dono: donoData,
                porte: porteData
            }
            let request = require('request')
            request.post({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:3001/pet/registrar',
                body: dados,
                json: true
            }, function (error, response, body) {
                console.log(body);
            });
            document.getElementById('alerts').style.display = 'block'
        }else{
            document.getElementById('alertn').style.display = 'block'
        }
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
                                    id="nome"
                                    required
                                    type="text"
                                    placeholder="Digite o nome do pet..."
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Raça do pet</Form.Label>
                                <Form.Control
                                    id="raca"
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
                                    id="dono"
                                    required
                                    type="text"
                                    placeholder="Digite o nome do dono..."
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <FormGroup>
                            <Label for="exampleText">Tipo</Label>
                                <Input type="select" name="select" id="porte" >
                                    <option value="">Escolha</option>
                                    <option value="Pequeno">Pequeno</option>
                                    <option value="Medio">Medio</option>
                                    <option value="Grande">Grande</option>
                                </Input>
                            </FormGroup>
                            </Form.Group>
                        </Form.Row>
                        <Alert id='alertn' variant='danger' style={{display: 'none'}}>
                            Preencha todos os campos!
                        </Alert>
                        <Alert id='alerts' variant='success' style={{display: 'none'}}>
                            Cadastrado com sucesso!
                        </Alert>
                        <Button type="submit" onClick={this.Cadastrar}>Registrar</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Cadastra;
