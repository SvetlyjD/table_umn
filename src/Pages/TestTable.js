import { useState } from "react";
import { Card, Container, Button } from "react-bootstrap";

const TestTable = (props) => {

    let level = props.level;
    let [time, setTime] = useState();
    let [req, setReq] = useState(props.req);
    let [answer, setAnswer] = useState();
    // setTime(req.data.time);


    function clickButtonHandler(e) {
        let resSecond = {
            answer: e,
            type_hard: level,
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

    if (level == 1 && req.data.status != 1)
        return (
            <Container>
                <Card style={{ width: 600 }} className="p-5 mt-5">
                    <div>SCORE: {req.data.points}</div>
                    <div>TIMER: {time}</div>
                    <div>{req.data.question}</div>
                    <div>{req.data.options.map((item, index) =>
                        <Button data-key={item} key={index} onClick={(e) => clickButtonHandler(e.target.dataset.key)} className="mx-2">{item}</Button>)}</div>
                </Card>
            </Container>
        )
    else if (level == 2 && req.data.status != 1)
        return (
            <Container>
                <Card style={{ width: 600 }} className="p-5 mt-5">
                    <div>SCORE1: {req.data.points}</div>
                    <div>TIMER1: {time}</div>
                    <div>{req.data.question}</div>
                    <div>
                        <input type="text" value={answer || ""}
                            onChange={e => setAnswer(e.target.value)} />
                        <Button onClick={() => clickButtonHandler(answer)} > Click</Button>
                    </div>
                </Card>
            </Container >
        );
    else
        return (
            <Container>
                <Card style={{ width: 600 }} className="p-5 mt-5">
                    <div>Ваш балл: {req.data.points}</div>
                </Card>
            </Container>
        )
}

export default TestTable;