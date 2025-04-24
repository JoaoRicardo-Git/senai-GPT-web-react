import "./chat.css"

import ChatText from "../../assets/imgs/ChatText.svg";
import Trash from "../../assets/imgs/Trash.svg";
import Sun from "../../assets/imgs/Sun.svg";
import User from "../../assets/imgs/User.svg";
import ArrowImg from "../../assets/imgs/ArrowSquareOut.svg";
import ExitImg from "../../assets/imgs/Vector.svg";
import Logo from "../../assets/imgs/Chat.png";
import Examples from "../../assets/imgs/Vector (3).svg";
import Capabiliti from "../../assets/imgs/Star.svg";
import Limitation from "../../assets/imgs/ShieldWarning.svg";
import IconMicrofone from "../../assets/imgs/IconSet.svg";
import IconImagem from "../../assets/imgs/Vector (1).svg";
import ImgEnter from "../../assets/imgs/Vector (2).svg";
import { useEffect, useState } from "react";

function Chat() {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Executada toda vez que abre a tela.
        getChats();

    }, []);

    const getChats = async () => {
        //Arrow Function
        let response = await fetch("https://senai-gpt-api.azurewebsites.net/Chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); // Pega as informacoes dos chats.

            setChats(json);

        } else {

            alert("Token invalido. Faca login novamente.")
            window.location.href = "/login";

        }

    }

    return (
        <>

            <div className="container">

                <header className="left-panel">

                    <div className="top">

                        <button className="new-chat">+ New chat</button>

                        {chats.map(chat => (
                            <button className="bnt-chat">
                            <img src={ChatText} alt="Balao de texto" />
                            {chat.chatTitle}
                        </button>
                        ))}
                        
                        
                    </div>

                    <div className="bottom">

                        <button className="input-conteiner">
                            <img src={Trash} alt="img Lixo" />
                            Clear conversations
                        </button>
                        <button className="input-conteiner">
                            <img src={Sun} alt="img sol" />
                            Light mode
                        </button>
                        <button className="input-conteiner">
                            <img src={User} alt="img person" />
                            My  account
                        </button>
                        <button className="input-conteiner">
                            <img src={ArrowImg} alt="img arrow" />
                            Updates & FAQ
                        </button>
                        <button className="input-conteiner">
                            <img src={ExitImg} alt="img Sair" />
                            Log out
                        </button>



                    </div>

                </header>

                <main className="central-panel">

                    <img className="img-panel" src={Logo} alt="Logo Senai-GPT" />

                    <div className="texs">

                        <div className="example">

                            <h1>
                                <img className="central-imgs" src={Examples} alt="" />
                                Examples
                            </h1>
                            <p>"Explain quantum computing insimple terms"</p>
                            <p>"Got any creative ideas for a 10year old's birthday?"</p>
                            <p>"How do I make an HTTP requestin Javascript?"</p>

                        </div>

                        <div className="capabili">

                            <h1>
                                <img className="central-imgs" src={Capabiliti} alt="" />
                                Capabilities
                            </h1>
                            <p>Remembers what user saidearlier in the conversation.</p>
                            <p>Allows user to provide follow-up corrections.</p>
                            <p>Trained to decline inappropriate requests.</p>

                        </div>

                        <div className="limit">
                            <h1>
                                <img className="central-imgs" src={Limitation} alt="" />
                                Limitations
                            </h1>
                            <p>May occasionally generate incorrect information.</p>
                            <p>May occasionally produce harmful instructions or biased content.</p>
                            <p>Limited knowledge of world andevents after 2021.</p>
                        </div>


                    </div>

                    <div className="input-conteiner">
                        <img src={IconMicrofone} alt="Icon Microfone" />

                        <img src={IconImagem} alt="Icon Imagem" />

                        <input placeholder="Type mensage." type="text" />

                        <img src={ImgEnter} alt="Img Enter" />

                    </div>

                </main>

            </div>

        </>

    )

};

export default Chat;