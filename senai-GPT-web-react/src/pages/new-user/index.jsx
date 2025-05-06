import "./newUser.css";
import logo from "../../assets/imgs/Chat.png";
import { useState } from "react";

function Login() {

    const [usuario, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");


    const onLoginClick = async () => {

        window.location.href = "/Login";

    }

    const onCadastraClick = async () => {

        if (usuario == ``) {
            alert(`sua conta e falsa`)
            return
        }

        let response = await fetch("https://senai-gpt-api.up.railway.app/users", {

            headers: {
                "Content-Type":
                    "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name: usuario,
                email: email,
                password: password
            })

        });

        console.log(response);

        if (response.ok == true) {

            alert("Cadastro Realizado com Sucesso!")

            window.location.href = "/Login";

        }

    
    }

    return (
        <>

            <main className="page-container">

                <div className="robo-image">
                </div>

                <div className="Login-container">

                    <img className="logo" src={logo} alt="Logo do SenaiGPT" />

                    <h1 id="meutitulo" className="titulo">Cadastro</h1>

                    <input className="inpt" value={usuario} onChange={event => setUser(event.target.value)} type="password" placeholder="Insira Nome Usuario" />
                    <input className="inpt" value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Insira o E-mail" />
                    <input className="inpt" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Insira uma Senha" />
                    <input className="inpt" value={newPassword} onChange={event => setnewPassword(event.target.value)} type="newPassword" placeholder="Insira a Mesma Senha" />
                    
                    <button className="btn" onClick={() => onCadastraClick()}>Cadastra</button>
                    <button className="sbtn" onClick={() => onLoginClick()}>Ja tenho conta</button>


                </div>



            </main>

        </>
    )
}

export default Login;


// GET : Listar, Trazer, Buscar
// POST : Envia qualquer coisa (cadastra)
// PUT : Serve para atualizar algum valor ja mandado (Atualizar o Ussuario)
// DELETE : Remove

// Listas de Error:
// 200-299 : deu Certo
// 400-499 : Error no Front-End
// 500-599 : Error no Servido