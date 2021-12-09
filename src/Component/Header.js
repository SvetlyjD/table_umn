import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { Context } from "..";

const Header = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();
    let c = localStorage.getItem("token");
    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                {c ? <Nav className="ml-auto">
                    <Nav.Link href="/">Тест</Nav.Link>
                    <Button variant={"outline-light"} onClick={() => {
                        localStorage.removeItem("token");
                        user.setIsAuth(false);
                        navigate("/auth")
                    }}>Выход</Button>
                </Nav>
                    : <Nav className="ml-auto">
                        <Nav.Link href="/auth">Auth</Nav.Link>
                        <Nav.Link href="/signup">Registration</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar >
    );
}
)
export default Header;