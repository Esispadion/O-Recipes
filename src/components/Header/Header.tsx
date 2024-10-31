import { Button, Form, Image, Input } from "semantic-ui-react";
import "./Header.css";
import logo from "../../assets/logo.png";

interface HeaderProps {
  isConnected: boolean;
  pseudo: string | null;
  error: string | null;
  logIn: (emailFromInput: string, passFromInput: string) => Promise<void>;
  logOut: () => void;
}

function Header({ isConnected, pseudo, error, logIn, logOut }: HeaderProps) {
  return (
    <div id="header">
      <Image src={logo} />

      {isConnected ? (
        <div>
          Bonjour {pseudo}
          <Button
            onClick={() => {
              logOut();
            }}
          >
            Deconnexion
          </Button>
        </div>
      ) : (
        <div>
          <Form
            onSubmit={(event) => {
              const formdata = new FormData(event.currentTarget);
              const emailFromInput = formdata.get("email") as string;
              const passFromInput = formdata.get("password") as string;

              logIn(emailFromInput, passFromInput);
            }}
          >
            <Input type="text" placeholder="login" name="email" />
            <Input type="password" placeholder="password" name="password" />
            <Button>OK</Button>
          </Form>
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default Header;
