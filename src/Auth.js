import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Card, Container, Form, Button, Row, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from ".";

const Auth = observer(() => {
    const navigate = useNavigate()
    const { user } = useContext(Context);
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    let data = {
        email: mail,
        password: password
    }

    function registrationChange() {
        fetch('https://internsapi.public.osora.ru/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((result) => {
            console.log(result);
            if (result.status == false) {
                if (result.errors.email) { alert(result.errors.email) }
            }
            if (result.status == false) {
                if (result.errors.password) { alert(result.errors.password) }
            }
            if (result.status == false) {
                if (result.status_code == 500) { alert("Пользователя с таким именем не существует") }
            }
            else {
                localStorage.setItem("token", result.data.access_token);
                user.setIsAuth(false);
                navigate("/");
            }

        });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-2" placeholder="Mail"
                        value={mail || ""}
                        onChange={e => setMail(e.target.value)}
                    />
                    <Form.Control className="mt-2" placeholder="Password" type="password"
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex"> <div>Перейти на страницу регистрации  <Nav.Link href={"/signup"} className="d-flex">Зарегистрироваться</Nav.Link></div>
                        <Button className="mt-3 align-self-end"
                            variant={"outline-success"} onClick={() => registrationChange()}
                        > Войти</Button>
                    </Row>
                </Form>
            </Card>
        </Container >
    );
}
)
export default Auth;