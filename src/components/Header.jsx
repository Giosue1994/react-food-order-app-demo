import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="burger" />
        <h1>reactfood</h1>
      </div>

      <p>Cart</p>
    </header>
  );
}
