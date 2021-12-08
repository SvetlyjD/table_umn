import { useState } from "react";
import { Card, Container, Form, Button, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function SignUp() {

    const [mail, setMail] = useState();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState();
    const [valpas, setValpas] = useState();

    if (password) { console.log(password.length) }
    let c = Math.ceil(password.length / 3);               //уровень сложности


    let data = {
        name: login,
        email: mail,
        password: password,
        password_confirmation: password2
    }

    function registrationChange() {
        if (data.password != data.password_confirmation) {
            alert("подтверждение пароля не совпадает с паролем, введите заново");
            setPassword2()
        } else {
            try {
                fetch('https://internsapi.public.osora.ru/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(result => {
                    console.log(result); if (result.status == true) { alert("Вы были успешно зарегистрированы, перейдите на страницу авторизации") }
                    if (result.status == false) {
                        if (result.errors.email) { alert(result.errors.email) }
                    }
                    if (result.status == false) {
                        if (result.errors.name) { alert(result.errors.name) }
                    }
                })
            }
            catch (error) { console.log(error) };
        }
    }


    return (
        <Container className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Registration</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-2" placeholder="mail"
                        value={mail || ""}
                        onChange={e => setMail(e.target.value)}
                    />
                    <Form.Control className="mt-2" placeholder="Login"
                        value={login || ""}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control className="mt-2" placeholder="password" type="password"
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {/* <div>{ }</div> */}
                    <Form.Control className="mt-2" placeholder="Confirm Password" type="password"
                        value={password2 || ""}
                        onChange={e => setPassword2(e.target.value)}
                    />

                    <Row> <div>Есть аккаунт? <NavLink to={"/auth"}>Авторизироваться</NavLink> </div>
                        <Button className="mt-3 align-self-end"
                            variant={"outline-success"} onClick={() => registrationChange()}
                        > Зарегистрироваться</Button>
                    </Row>
                </Form>
            </Card>

        </Container >
    );
}

export default SignUp;