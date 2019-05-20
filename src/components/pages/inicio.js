import React from "react";
import Cadastra from '../cadastra'
import Listar from '../listar'

class Inicio extends React.Component {
    render() {
        return (
            <div>
                <Cadastra />
                <Listar/>
            </div>
        );
    }
}

export default Inicio;