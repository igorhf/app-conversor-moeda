import React, { useState } from 'react'
import { Row, Col, InputGroup, Modal } from 'react-bootstrap';
import Moeda from '../Moeda/Moeda'
import imgMoeda from '../../img/moeda.png'

export default props => {
    const [tipoMoeda, setTipoMoeda] = useState("")
    const [bid, setBid] = useState(0)
    const [ask, setAsk] = useState(0)
    const [varBid, setVarBid] = useState(0)
    const [pctChange, setPctChange] = useState(0)
    const [high, setHigh] = useState(0)
    const [low, setLow] = useState(0)
    const [valor, setValor] = useState(0)

    const [input1, setInput1] = useState("")
    const [Moeda2, setMoeda2] = useState("")

    async function apiMoeda(moeda) {
        if (moeda != "") {
            try {
                let response = await fetch('https://economia.awesomeapi.com.br/json/all/' + moeda);
                let responseJson = await response.json();

                const listItems = Object.keys(responseJson).map((number) => {
                    const user = responseJson[number];
                    user.name = number;
                    console.log(user)
                    return user;
                }

                );
                return listItems;
            } catch (error) {
                console.error(error);
            }
        }

    }

    // inicia a moeda por padrao
    function MoedaInicial(tipoMoeda) {
        const resultado = tipoMoeda != "" ? apiMoeda(tipoMoeda) : apiMoeda('USD')
        resultado.then(resultado => {
            setMoeda2(resultado[0].bid)
            setBid(resultado[0].bid)
            setAsk(resultado[0].ask)
            setVarBid(resultado[0].varBid)
            setPctChange(resultado[0].pctChange)
            setHigh(resultado[0].high)
            setLow(resultado[0].low)
            setTipoMoeda(resultado[0].code)
        }, erro => {
            console.log(erro);
        });

        
    }

    function onChangerMoeda2(e) {
        const resultado = apiMoeda(e.target.value)
        resultado.then(resultado => {
            setMoeda2(resultado[0].bid)
            setBid(resultado[0].bid)
            setAsk(resultado[0].ask)
            setVarBid(resultado[0].varBid)
            setPctChange(resultado[0].pctChange)
            setHigh(resultado[0].high)
            setLow(resultado[0].low)
        }, erro => {
            console.log(erro);
        });

        setTipoMoeda(e.target.value)
    }

    function changerInput1(e) {
        /*var v = e.target.value.replace(/\D/g, '');
        v = (v / 100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        e.target.value = v;*/
        var calcularMoeda = e.target.value
        console.log('aqui' + Moeda2)
        // console.log(calcularMoeda)
        calcularMoeda = parseFloat(calcularMoeda) * parseFloat(Moeda2)
        console.log(calcularMoeda)
        setValor(calcularMoeda)
        setInput1(e.target.value)
        console.log(Moeda2)
    }

    MoedaInicial(tipoMoeda)

    return (
        <div>
            <Row>
                <Col>
                    <InputGroup>
                        <Moeda value={tipoMoeda} onChangerMoeda={e => onChangerMoeda2(e)} moedaRemovida={7} />
                        <input value={input1} onChange={e => changerInput1(e)} className="form-control" type="number" />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Modal.Dialog style={{ color: 'black' }}>
                        <Modal.Header>
                            <Modal.Title>Informações da moeda</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ marginLeft: 10, marginRight: 10 }}><h3><img src={imgMoeda} alt="" width="45" height="38" /> {valor}</h3></div>
                            <hr></hr>
                            <p>Compra : {bid}</p>
                            <p>Venda : {ask}</p>
                            <p>Variação : {varBid}</p>
                            <p>Porcentagem de Variação : {pctChange}</p>
                            <p>Máximo : {high}</p>
                            <p>Mínimo : {low}</p>
                        </Modal.Body>
                    </Modal.Dialog>
                </Col>
            </Row>

        </div>
    )
}