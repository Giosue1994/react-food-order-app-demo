import logo from "../assets/logo.jpg";
import Button from "./Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="burger" />
        <h1>reactfood</h1>
      </div>

      <nav>
        <Button buttonType={"text"}>Cart(0)</Button>
      </nav>
    </header>
  );
}
