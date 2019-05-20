import React from "react";
import { ListGroup, Tab, Row, Col, Card, Button, Form, Alert, Label} from "react-bootstrap";
import {
    Input
} from 'reactstrap'
class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        };
    }
    componentDidMount() {

        const listarData = async () => {
            const response = await fetch('http://localhost:3001/pet').then(function (data) {
                return data.json();
            })

            // console.log(response)
            const pets = await response['pet']
            this.setState({ pets })
        }
        listarData();
        setInterval(listarData, 5000);
    }
    formatData(e) {
        const dateformat = require("dateformat");

        const dataNova = dateformat(e, "dd/mm/yyyy");

        return dataNova
    }

    Salvar = e => () =>{
        let donoEd = document.getElementById('editDono'+e).value
        let nomeEd = document.getElementById('editNome'+e).value
        let racaEd = document.getElementById('editRaca'+e).value
        let porteEd = document.getElementById('editPorte'+e).value
        console.log(porteEd)
        if((donoEd || nomeEd || racaEd) && porteEd !== ""){
            let dados = {
                id: e,
                nome: nomeEd,
                raca: racaEd,
                dono: donoEd,
                porte: porteEd
            }
            let request = require('request')
            request.put({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'http://localhost:3001/pet/atualizar',
                body: dados,
                json: true
            }, function (error, response, body) {
                console.log(error);
            });
            document.getElementById('dados'+e).style.display = 'block'
            document.getElementById('editar'+e).style.display = 'none'
            document.getElementById('btnEditar'+e).style.display = 'block'
            document.getElementById('btnSalvar'+e).style.display = 'none'
            document.getElementById('btnExcluir'+e).style.display = 'block'
            document.getElementById('btnCancelar'+e).style.display = 'none'
        }else{
            document.getElementById('alertEdit').style.display = 'block'
        }
    }

    Editar = e => () =>{
        document.getElementById('dados'+e).style.display = 'none'
        document.getElementById('editar'+e).style.display = 'block'
        document.getElementById('btnEditar'+e).style.display = 'none'
        document.getElementById('btnSalvar'+e).style.display = 'block'
        document.getElementById('btnExcluir'+e).style.display = 'none'
        document.getElementById('btnCancelar'+e).style.display = 'block'
    }

    Cancerlar = e => () =>{
        document.getElementById('dados'+e).style.display = 'block'
        document.getElementById('editar'+e).style.display = 'none'
        document.getElementById('btnEditar'+e).style.display = 'block'
        document.getElementById('btnSalvar'+e).style.display = 'none'
        document.getElementById('btnExcluir'+e).style.display = 'block'
        document.getElementById('btnCancelar'+e).style.display = 'none'
        document.getElementById('alertEdit').style.display = 'none'
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
            url: 'http://localhost:3001/pet/remover',
            body: dados,
            json: true
        }, function (error, response, body) {
            console.log(response);
        });
    }

    render() {
        return (
            <div className="Cadastro">
                <div className="Conteudo">

                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col >
                            <Form.Label>Todos os pets</Form.Label>
                                <ListGroup sm={4}style={{maxHeight: "230px", overflow: "auto"}}>
                                    {this.state.pets.map((dynamicData) => (
                                        <ListGroup.Item action href={"#" + dynamicData._id} onClick={this.Cancerlar(dynamicData._id)}>
                                            {dynamicData.nome}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                            <Col sm={8} >
                                <Tab.Content >
                                    {this.state.pets.map((dynamicData) => (
                                        <Tab.Pane eventKey={"#" + dynamicData._id}>
                                            <Card style={{ width: '18rem' }}>
                                                <ListGroup variant="flush" id= {"dados"+dynamicData._id}>
                                                    <ListGroup.Item>Dono: {dynamicData.dono}</ListGroup.Item>
                                                    <ListGroup.Item>Raça: {dynamicData.raca}</ListGroup.Item>
                                                    <ListGroup.Item>Porte: {dynamicData.porte}</ListGroup.Item>
                                                    <ListGroup.Item >Data de Registro: {this.formatData(dynamicData.createdAt)}</ListGroup.Item>
                                                    <ListGroup.Item >Ultima atualização: {this.formatData(dynamicData.updatedAt)}</ListGroup.Item>
                                                </ListGroup>
                                                <ListGroup variant="flush" id={"editar"+dynamicData._id} style={{ display: 'none' }}>
                                                    <ListGroup.Item>
                                                        <Form.Control id={"editDono"+dynamicData._id} size="text" type="text" placeholder="Dono" defaultValue={dynamicData.dono} />
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Form.Control id={"editNome"+dynamicData._id} size="text" type="text" placeholder="Nome do pet" defaultValue={dynamicData.nome} />
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Form.Control id={'editRaca'+dynamicData._id}size="text" type="text" placeholder="Raça" defaultValue={dynamicData.raca}/>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Input type="select" name="select" id={"editPorte"+dynamicData._id} value={dynamicData.porte}>
                                                            <option value="Pequeno">Pequeno</option>
                                                            <option value="Medio">Medio</option>
                                                            <option value="Grande">Grande</option>
                                                        </Input>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                            <Alert id='alertEdit' variant='danger' style={{display: 'none'}}>
                                                    Preencha todos os campos!
                                                </Alert>
                                            <div style={{display: 'flex'}}>
                                            <Button variant="warning" id={'btnEditar'+dynamicData._id} style={{ marginLeft: '8px', marginTop: '6px' }} onClick={this.Editar(dynamicData._id)}>Editar</Button>

                                            <Button variant="danger" id={'btnExcluir'+dynamicData._id} style={{ marginLeft: '8px', marginTop: '6px' }} onClick={this.Excluir(dynamicData._id)}>Excluir</Button>
                                            </div>

                                            <div style={{display: 'flex'}}>
                                            <Button variant="success" id={'btnSalvar'+dynamicData._id} style={{ marginLeft: '8px', marginTop: '6px', display: 'none'}} onClick={this.Salvar(dynamicData._id)}>Salvar</Button>

                                            <Button variant="danger" id={'btnCancelar'+dynamicData._id} style={{ marginLeft: '8px', marginTop: '6px',  display: 'none' }} onClick={this.Cancerlar(dynamicData._id)}>Cancelar</Button>
                                            </div>
                                        </Tab.Pane>
                                    ))}
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
