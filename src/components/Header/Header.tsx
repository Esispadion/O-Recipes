import { Button, Form, Image, Input} from "semantic-ui-react";
import logo from "../../assets/logo.png";
import './Header.css'

function Header(){
  return (
    <div className="header">
        <Form>
            <Image src={logo} alt="logo" />
            <Input type="text" />
            <Input type="password" />
            <Button>OK</Button>
        </Form>
        </div>
  );
}

export default Header;
