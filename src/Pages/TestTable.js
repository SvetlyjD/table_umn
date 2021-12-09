import { useEffect, useState } from "react";
import { Card, Container, Button, Table } from "react-bootstrap";


const TestTable = (props) => {

    let level = props.level;
    let [time, setTime] = useState(props.req.data.time);
    let [req, setReq] = useState(props.req);
    let [answer, setAnswer] = useState();
    let timerId;

    useEffect(() => {
        if (time > 0) {
            timerId = setTimeout(() => setTime(time - 1), 1000); console.log(time);
        } else if (time < 1) {
            clearTimeout(timerId);
            clickButtonHandler(-5);
        };
    }, [time])


    function clickButtonHandler(e) {
        clearTimeout(timerId);
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
                        <Button data-key={item} key={index} onClick={(e) => clickButtonHandler(e.target.dataset.key)} className="mx-2 mt-2">{item}</Button>)}</div>
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
    else if (req.data.status == 1)
        return (
            <Container>
                <Card style={{ width: 600 }} className="p-5 mt-5">
                    <div className="headerTable">Ваш балл: {req.data.points}</div>
                    <div>
                        <Table striped bordered hover size="sm">


                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Current</th>
                                </tr>
                            </thead>
                            <tbody>
                                {req.data.questions.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.question}</td>
                                        <td>{item.answer}</td>
                                        <td>{item.current_answer}</td>

                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </Container>
        )
}

export default TestTable;