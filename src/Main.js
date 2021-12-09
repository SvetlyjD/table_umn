import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Context } from ".";
import TestTable from "./Pages/TestTable";


const Main = observer(() => {

    const { user } = useContext(Context);
    user.setIsAuth(true);
    let [value, setValue] = useState("1");
    let [req, setReq] = useState();
    let [div, setDiv] = useState();

    let res = {
        type_hard: value,
        type: 1
    }

    function startTestHandler() {
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
        });
    }

    return (
        <>
            <Container >
                <div style={{ marginTop: 20 }}>Выберите уровень сложности</div>
                <select style={{ marginTop: 20 }} className="d-flex" name="" id="" onChange={(e) => setValue(e.target.value)}>
                    <option value="1">Easy/Легко</option>
                    <option value="2">Hard/Тяжело</option>
                </select>
                <Button className="mt-2" style={{ width: 120, marginLeft: 150 }} onClick={() => startTestHandler()}>Start</Button>
                <Button className="mt-2 mx-2" onClick={() => window.location.reload()}>Go Back</Button>
            </Container>
            {div ? <TestTable req={req} level={value}></TestTable>
                : <></>}
        </>
    );
}
)
export default Main;