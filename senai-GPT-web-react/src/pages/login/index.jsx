import "./login.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async () => {

    let response = await fetch ("https://senai-gpt-api.azurewebsites.net/login", {

    headers: {
       "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
        email: email,
        password: password
    })

  });
  
  console.log(response);

}

  return (
    <>

      <hearder>

      </hearder>

      <main className="page-container">

        <div className="robo-image">
        </div>

        <div className="Login-container">

          <img className="logo" src={logo} alt="Logo do SenaiGPT" />

          <h1 id="meutitulo" className="titulo">Login</h1>

          <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o E-mail" />
          <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira uma Senha" />

          <button className="btn" onClick={() => onLoginClick()}>Entrar</button>

        </div>



      </main>

    </>
  )
}

export default Login;