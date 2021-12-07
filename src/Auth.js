import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Card, Container, Form, Button, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from ".";

const Auth = observer(() => {
    const navigate = useNavigate()
    const { user } = useContext(Context);
    console.log(user.isAuth);
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
            localStorage.setItem("token", result.data.access_token);
            user.setIsAuth(true);
            navigate("/");
            // в строке выше переделать условие чтобы в хранилище UserStore true становилось только после входа, 
            //в данном случае после перехода на ссылку в хедере сразу обновляется на тру. 
            // При нажатии кнопки нужно класть токен в локал сторейдж и отдельно проверять,
            //  если он там есть то автоматически проводить авторизацию
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
                    <Form.Control className="mt-2" placeholder="Password"
                        value={password || ""}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row> <div>Перейти на страницу регистрации <NavLink to={"/signup"}>Registration</NavLink> </div>
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