import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, Button } from "react-bootstrap";
import { Context } from "..";

const Header = observer(() => {
    const { user } = useContext(Context)
    // console.log(user.isAuth);
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                {user.isAuth ? <Nav className="ml-auto">
                    <Nav.Link href="/">Main</Nav.Link>
                    <NavLink to="/account" >Account</NavLink>
                    <Button variant={"outline-light"} onClick={() => { user.setIsAuth(false); navigate("/auth") }}>Exit</Button>
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