import React from 'react'
import Moeda from './Moedas'

export default props => {


    const lista = Moeda.map((moeda) => {
        if (moeda.id == props.moedaRemovida) {
            //console.log(moeda.nome)
        } else {
            return (
                <option key={moeda.id} value={moeda.nome}>{moeda.nome}</option>
            )
        }
    })



    return (
        
        <div >
            <select value={props.value} onChange={props.onChangerMoeda} className="form-control" name="listaMoeda">
                {lista}
            </select>
        </div>
    )
}