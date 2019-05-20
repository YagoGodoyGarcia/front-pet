import React from "react";
import { ListGroup, Tab, Row, Col, Card, Button, Form, Alert, Label } from "react-bootstrap";
import {
    Input
} from 'reactstrap'
class Pesquisa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: []
        };
        this.Pesquisar = this.Pesquisar.bind(this)
    }
    Pesquisar() {
        let nomeP = document.getElementById('nomePesquisar').value
        let donoP = document.getElementById('donoPesquisar').value
        const listarData = async () => {
            const response = await fetch(`https://backend-pet.herokuapp.com/pet/pesquisar/${nomeP}/${donoP}`).then(function (data) {
                return data.json();
            })

            const pet = await response['pet']
            this.setState({ pet })
            console.log(this.state.pet.dono)
        }
        listarData();
        if (this.state.pet.dono != "") {
            document.getElementById('dadosCarragado').style.display = 'block'
            document.getElementById('pesquisaCont').style.height = "566px"
        }
    }

    Editar() {
        document.getElementById('editDonoPesquisa').disabled = false
        document.getElementById('editNomePesquisa').disabled = false
        document.getElementById('editRacaPesquisa').disabled = false
        document.getElementById('editPortePesquisa').disabled = false

        document.getElementById('btnEditarPesquisa').style.display = 'none'
        document.getElementById('btnExcluirPesquisa').style.display = 'none'

        document.getElementById('btnSalvarPesquisa').style.display = 'block'
        document.getElementById('btnCancelarPesquisa').style.display = 'block'
    }

    Cancerlar(){
        document.getElementById('btnEditarPesquisa').style.display = 'block'
            document.getElementById('btnExcluirPesquisa').style.display = 'block'

            document.getElementById('btnSalvarPesquisa').style.display = 'none'
            document.getElementById('btnCancelarPesquisa').style.display = 'none'


            document.getElementById('editDonoPesquisa').disabled = true
            document.getElementById('editNomePesquisa').disabled = true
            document.getElementById('editRacaPesquisa').disabled = true
            document.getElementById('editPortePesquisa').disabled = true

    }

    Excluir = e => () => {
        let request = require('request')
        let dados = {
            id: e,
        }
        request.delete({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'https://backend-pet.herokuapp.com/pet/remover',
            body: dados,
            json: true
        }, function (error, response, body) {
            console.log(response);
        });
        document.getElementById('alertEx').style.display = "block"
        document.getElementById('dadosCarragado').style.display = "none"
    }
    Salvar() {
        let donoP = document.getElementById('editDonoPesquisa').value
        let nomeP = document.getElementById('editNomePesquisa').value
        let racaP = document.getElementById('editRacaPesquisa').value
        let porteP = document.getElementById('editPortePesquisa').value
        let idP = document.getElementById('idPetPesquisa').value

        if (donoP != "" && nomeP != "" && racaP != "" && porteP != "") {
            let dados = {
                id: idP,
                nome: nomeP,
                raca: racaP,
                dono: donoP,
                porte: porteP
            }
            let request = require('request')
            request.put({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'https://backend-pet.herokuapp.com/pet/atualizar',
                body: dados,
                json: true
            }, function (error, response, body) {
                console.log(error);
            });
            document.getElementById('btnEditarPesquisa').style.display = 'block'
            document.getElementById('btnExcluirPesquisa').style.display = 'block'

            document.getElementById('btnSalvarPesquisa').style.display = 'none'
            document.getElementById('btnCancelarPesquisa').style.display = 'none'


            document.getElementById('editDonoPesquisa').disabled = true
            document.getElementById('editNomePesquisa').disabled = true
            document.getElementById('editRacaPesquisa').disabled = true
            document.getElementById('editPortePesquisa').disabled = true

            document.getElementById('alertPs').style.display = "block"
        } else {
            document.getElementById('alertPf').style.display = 'block'
        }
    }
    render() {
        return (
            <div className="Cadastro" id="pesquisaCont">
                <div className="Conteudo">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Nome do pet</Form.Label>
                                <Form.Control
                                    id="nomePesquisar"
                                    required
                                    type="text"
                                    placeholder="Digite o nome do pet..."
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Dono</Form.Label>
                                <Form.Control
                                    id="donoPesquisar"
                                    required
                                    type="text"
                                    placeholder="Digite o nome do dono ..."
                                />
                            </Form.Group>

                        </Form.Row>
                        <Button type="submit" onClick={this.Pesquisar}>Pesquisar</Button>
                    </Form>
                    <br />
                    <Tab.Content id="dadosCarragado" style={{ display: 'none' }}>
                        <Card style={{ width: '100%' }}>
                            <ListGroup variant="flush" id="editarPesquisa" style={{ display: 'block' }}>
                                <ListGroup.Item>
                                    <Form.Control id="editDonoPesquisa" disabled size="text" type="text" placeholder="Dono" defaultValue={this.state.pet.dono} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Control id="editNomePesquisa" disabled size="text" type="text" placeholder="Nome do pet" defaultValue={this.state.pet.nome} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Control id='editRacaPesquisa' disabled size="text" type="text" placeholder="Raça" defaultValue={this.state.pet.raca} />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ display: 'none' }}>
                                    <Form.Control id='idPetPesquisa' disabled size="text" type="text" placeholder="Raça" defaultValue={this.state.pet._id} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Input type="select" disabled value="Pequeno" name="select" id="editPortePesquisa" >
                                        <option value="Pequeno">Pequeno</option>
                                        <option value="Medio">Medio</option>
                                        <option value="Grande">Grande</option>
                                    </Input>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Alert id='alertPs' variant='success' style={{ display: 'none' }}>
                            Atualizado com sucesso!
                            </Alert>
                           
                        <Alert id='alertPf' variant='danger' style={{ display: 'none' }}>
                            Preencha todos os campos!
                                                </Alert>
                        <div style={{ display: 'flex' }}>
                            <Button variant="warning" id='btnEditarPesquisa' style={{ marginLeft: '8px', marginTop: '6px' }} onClick={this.Editar}>Editar</Button>

                            <Button variant="danger" id='btnExcluirPesquisa' style={{ marginLeft: '8px', marginTop: '6px' }} onClick={this.Excluir(this.state.pet._id)}>Excluir</Button>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <Button variant="success" id='btnSalvarPesquisa' style={{ marginLeft: '8px', marginTop: '6px', display: 'none' }} onClick={this.Salvar}>Salvar</Button>

                            <Button variant="danger" id='btnCancelarPesquisa' style={{ marginLeft: '8px', marginTop: '6px', display: 'none' }} onClick={this.Cancerlar}>Cancelar</Button>
                        </div>
                    </Tab.Content>
                    <Alert id='alertEx' variant='success' style={{ display: 'none' }}>
                            Excluido com sucesso!
                            </Alert>
                </div>
            </div>
        );
    }
}

export default Pesquisa;
