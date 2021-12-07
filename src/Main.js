import React from "react";
import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import TestTable from "./Pages/TestTable";


function Main() {
    const navigate = useNavigate()
    let [value, setValue] = useState();
    let [req, setReq] = useState();
    let [div, setDiv] = useState();
    let [time, setTime] = useState();
    let res = {
        type_hard: value,
        type: 1
    }


    // if (time > 0) {
    //     setTimeout(() => setTime(time - 1), 1000); console.log(time);
    // } else if (time < 1) {
    //     console.log("1");
    // clickButtonHandler(-5);
    // };

    function startTestHandler() {
        console.log(value + "!!!!!!!!!!!!!!!");
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"))
        fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(res)
        }).then(res => res.json()).then((result) => {
            setReq(result);
            setDiv(value);
        });

    }

    return (
        <>
            <Container >
                <div style={{ marginTop: 20 }}>Выьберите уровень сложности</div>
                <select style={{ marginTop: 20 }} className="d-flex" name="" id="" onChange={(e) => setValue(e.target.value)}>
                    <option disabled="disabled" value="Выберите сложность"></option>
                    <option value="1">Easy/Легко</option>
                    <option value="2">Hard/Тяжело</option>
                </select>
                <Button className="mt-2" style={{ width: 120, marginLeft: 150 }} onClick={() => startTestHandler()}>Start</Button>
                <Button className="mt-2 mx-2" onClick={() => console.log(1)}>Go Back</Button>
            </Container>
            {div ? <TestTable req={req} level={value}></TestTable>
                : <></>}
        </>
    );
}

export default Main;