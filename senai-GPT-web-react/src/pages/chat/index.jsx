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
    const [chatSelecionado, setChatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");

    const [isleftPanelOpen, setIsLeftPanelOpen] = useState(false);

    useEffect(() => {
        // Executada toda vez que abre a tela.
        getChats();

    }, []);

    const getChats = async () => {
        //Arrow Function
        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); // Pega as informacoes dos chats.
            let userId = localStorage.getItem("meuId");
            json = json.filter(chat => chat.userId == userId);

            setChats(json);

        } else {

            alert("Token invalido. Faca login novamente.")
            localStorage.clear();
            window.location.href = "/login";

        }

    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = (chat) => {

        setChatSelecionado(chat);
        console.log(chat)
    }

    const chatGPT = async (message) => {
        
        return "[Inutilizado por tempo determinado]"
        // Configurações do endpoint e chave da API
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "DCYQGY3kPmZXr0lh7xeCSEOQ5oiy1aMlN1GeEQd5G5cXjuLWorWOJQQJ99BCACYeBjFXJ3w3AAAAACOGol8N";
        const deploymentId = "gpt-4"; // Nome do deployment no Azure OpenAI
        const apiVersion = "2024-05-01-preview"; // Verifique a versão na documentação

        // URL para a chamada da API
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        // Configurações do corpo da requisição
        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        // Cabeçalhos da requisição
        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }

    const enviarMensagem = async (message) => {



        console.log("message: ", message)

        let userId = localStorage.getItem("meuId");

        let novaMensagemUsuario = {

            text: message,
            id: crypto.randomUUID(),
            userId: userId
        };

        let respostaGPT = await chatGPT(message);
        console.log("resposta", respostaGPT)

        let novaMensagemChatGpt = {
            userId: "chatbot",
            text: respostaGPT,
            id: crypto.randomUUID()
        };

        let novoChatSelecionado = { ...chatSelecionado };

        novoChatSelecionado.messages.push(novaMensagemUsuario);
        novoChatSelecionado.messages.push(novaMensagemChatGpt);

        setChatSelecionado(novoChatSelecionado);


        // let resposta = await chatGPT(message);

        // console.log("resposta: ", resposta)

        // let novaMensagemUsuairo = {

        //     userId: "userId",
        //     text: message,
        //     id: 10
        // };

        // let novaRespostaChatGPT = {
        //     userId: "chatbot",
        //     text: resposta,
        //     id: 10
        // };

        // let novoChatSelecionado = { ...chatSelecionado };

        // novoChatSelecionado.messages.push(novaMensagemUsuairo);
        // novoChatSelecionado.messages.push(novaRespostaChatGPT);

        // setChatSelecionado(novoChatSelecionado);

        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats/" + chatSelecionado.id, {
            method: "PUT",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("meuToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                novoChatSelecionado
            )
        });

        if (response.ok == false) {

            console.log("Salvamento deu erro");

        }





    };

    const novoChat = async () => {

        let novoTitulo = prompt("Titulo do Novo Chat:");
        if (novoTitulo == null || novoTitulo == "") {
            alert("Insira um titulo:");
            return;
        }

        //pega o ID do usuario logado
        let userId = localStorage.getItem("meuId");

        let nChat = {

            chatTitle: novoTitulo,
            id: crypto.randomUUID(),
            userId: userId,
            message: []
        }

        let response = await fetch("https://senai-gpt-api.up.railway.app/chats", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("meuToken"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                nChat
            )
        });

        if (response.ok) {

            //atualiza os chats na tela
            await getChats();

        }

    }

    return (
        <>

            <div className="container">
                {/* Toggle Button */}
                <button className="btn-toggle-panel"
                onClick={() => setIsLeftPanelOpen(!isleftPanelOpen)}
                >
                    ☰
                </button>

                <header className={`left-panel ${isleftPanelOpen == true ? "open" : ""}`}>

                    <div className="top">



                        { }
                        <button className="new-chat" onClick={() => novoChat()}>+ New chat</button>

                        {chats.map(chat => (
                            <button className="bnt-chat" onClick={() => clickChat(chat)} >
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
                        <button className="input-conteiner" onClick={() => onLogOutClick()}>
                            <img src={ExitImg} alt="img Sair" />
                            Log out
                        </button>



                    </div>

                </header>

                <main className="central-panel">

                    {chatSelecionado == null && (

                        <>

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


                        </>

                    )}

                    {chatSelecionado != null && (

                        <>

                            <div className="chat-container">

                                <div className="chat-header">

                                    <h2>{chatSelecionado.chatTitle}</h2>

                                </div>

                                <div className="chat-messages">

                                    {chatSelecionado.messages?.map((message) => (
                                        <p className={"message-item " + (message.userId == "chatbot" ? "chatbot" : "")} > {message.text}{" "}</p>
                                    ))}

                                </div>

                            </div>

                        </>

                    )}


                    <div className="input-conteiner">
                        <img src={IconMicrofone} alt="Icon Microfone" />

                        <img src={IconImagem} alt="Icon Imagem" />

                        <input
                            value={userMessage}
                            onChange={event => setUserMessage(event.target.value)}
                            placeholder="Type mensage."
                            type="text" />
                        <img onClick={() => enviarMensagem(userMessage)} src={ImgEnter} alt="Img Enter" />
                    </div>

                </main>

            </div>

        </>

    )

}

export default Chat;