import React from "react";
import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";


function Main() {
    let [value, setValue] = useState();
    let [req, setReq] = useState();
    let [div, setDiv] = useState();
    let [time, setTime] = useState();
    let [answer, setAnswer] = useState();
    let res = {
        type_hard: value,
        type: 1
    }


    if (time > 0) {
        setTimeout(() => setTime(time - 1), 1000); console.log(time);
    } else if (time < 1) {
        console.log("1");
        // clickButtonHandler(-5);
    };

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
            console.log(result);
            setReq(result);
            setDiv(value);
            setTime(result.data.time);
        });

    }


    function clickButtonHandler(e) {
        let resSecond = {
            answer: e,
            type_hard: value,
            type: 2
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"))
        fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(resSecond)
        }).then(res => res.json()).then((result) => {
            console.log(result); setReq(result);
            setTime(result.data.time);
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
            </Container>
            <Container className="d-flex justify-content-center align-items-center">
                {div == 1 ? <Card style={{ width: 600 }} className="p-5 mt-5">
                    <div>SCORE: {req.data.points}</div>
                    <div>TIMER: {time}</div>
                    <div>{req.data.question}</div>
                    <div>{req.data.options.map((item, index) =>
                        <Button data-key={item} key={index} onClick={(e) => clickButtonHandler(e.target.dataset.key)} className="mx-2">{item}</Button>)}</div>
                </Card> :
                    <Card style={{ width: 600 }} className="p-5 mt-5">
                        <div>SCORE: {req.data.points}</div>
                        <div>TIMER: {time}</div>
                        <div>{req.data.question}</div>
                        {/* <input type="text" value={answer || ""} onChange={(e) => setAnswer(e.target.value)} />
                    {/* <Button onClick={() => console.log(answer)}></Button>*/}
                    </Card>
                }
            </Container>
        </>
    );
}

export default Main;