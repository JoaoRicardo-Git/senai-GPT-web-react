import "./login.css";

function Login() {

  //JavaScript

  return (
    <>

      <hearder></hearder>

<main className="page-container">

    <div className="robo-image">
    </div>

    <div className="Login-container">

        <img className="logo" src="../assets/imgs/Chat.png" alt="Logo do SenaiGPT"/>

        <h1 id="meutitulo" className="titulo">Login</h1>

        <input className="inpt" type="email" placeholder="Insira o E-mail"/>
        <input className="inpt" type="password" placeholder="Insira uma Senha"/>

        <button className="btn">Entrar</button>

    </div>



</main>

    </>
  )
}

export default Login;