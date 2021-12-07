import { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";

function SignUp() {

    const [mail, setMail] = useState();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    let data = {
        name: login,
        email: mail,
        password: password,
        password_confirmation: password2
    }

    function registrationChange() {
        fetch('https://internsapi.public.osora.ru/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => console.log(result))
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
                    <Form.Control className="mt-2" placeholder="password"
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control className="mt-2" placeholder="Confirm Password"
                        value={password2 || ""}
                        onChange={e => setPassword2(e.target.value)}
                    />
                    <Button className="mt-3 align-self-end"
                        variant={"outline-success"} onClick={() => registrationChange()}
                    > Зарегистрироваться</Button>
                </Form>
            </Card>

        </Container >
    );
}

export default SignUp;