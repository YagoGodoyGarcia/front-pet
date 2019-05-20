import React from "react";
import Cadastra from '../cadastra'
import Listar from '../listar'
import Pesquisa from '../pesquisa'

class Inicio extends React.Component {
    render() {
        return (
            <div>
                <Cadastra />
                <Listar/>
                <Pesquisa/>
            </div>
        );
    }
}

export default Inicio;