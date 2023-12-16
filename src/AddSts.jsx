import { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import logoFFsts from './assets/LOGO_FFsts.svg'
import { getDatabase, ref, push } from 'firebase/database';
import 'firebase/compat/database';
import { auth } from './configs/FireBase';
import DadosPartidas from './DadosPartidas';

function AddSts(){

    const [golC, setGolC] = useState(0)
    const [golF, setGolF] = useState(0)

    const [playerC, setPlayerC] = useState(0)
    const [playerF, setPlayerF] = useState(0)

    const [posseC, setPosseC] = useState(0)
    const [posseF, setPosseF] = useState(0)

    const [chutesC, setChutesC] = useState(0)
    const [chutesF, setChutesF] = useState(0)

    /* const [nomesGolsC, setNomesGolC] = useState([])
    const [nomesGolsF, setNomesGolF] = useState([]) */

    function addPlayerC(event){
        setPlayerC(event.target.value)
    }

    function addPlayerF(event){
        setPlayerF(event.target.value)
    }

    function addGolC(event){
        setGolC(event.target.value)
    }

    function addGolF(event){
        setGolF(event.target.value)
    }

    function addPosseC(event){
        setPosseC(event.target.value)
    }

    function addPosseF(event){
        setPosseF(event.target.value)
    }

    function addChutesC(event) {
        setChutesC(event.target.value)
    }

    function addChutesF(event) {
        setChutesF(event.target.value)
    }

    /* function addNomeGolsC(event){
        let newNomes = [...nomesGolsC, event.target.value]
        setNomesGolC(newNomes)
    }

    function addNomeGolsF(event){
        let newNomes = [...nomesGolsF, event.target.value]
        setNomesGolF(newNomes)
    } */

    function limparInputs(){

        setPlayerC('')
        setPlayerF('')
        setPosseC('')
        setPosseF('')
        setChutesC('')
        setChutesF('')
        setGolC('')
        setGolF('')
        
        document.getElementById("inputPC").value = "" // Limpar Player Casa
        document.getElementById("inputPF").value = "" // Limpar Player Fora
        document.getElementById("inputposseC").value = "" // Limpar Posse Casa
        document.getElementById("inputposseF").value = "" // Limpar Posse Fora
        document.getElementById("inputChutesC").value = "" // Limpar Chutes ao Gol Casa
        document.getElementById("inputChutesF").value = "" // Limpar Chutes ao Gol Fora
        document.getElementById("inputGC").value = "" // Limpar Gols Casa
        document.getElementById("inputGF").value = "" // Limpar Gols Fora
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const database = getDatabase();

        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();

        const hora = dataAtual.getHours();
        const minutos = dataAtual.getMinutes();
        const segundos = dataAtual.getSeconds();

        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;


        const statsPartida = {

            idUser: auth.currentUser.uid,
            datePartida: dataFormatada,

            player1:{
                qteGols: golC,
                posse: posseC,
                chutes: chutesC,
                nome: playerC
            },

            player2:{
                qteGols: golF,
                posse: posseF,
                chutes: chutesF,
                nome: playerF
            }
        }

        push(ref(database, 'partida'), statsPartida)
        .then(() => {
            console.log("enviado com sucesso!")
            limparInputs()
        }).catch((error)=>{
            console.error("Não foi possível fazer o post", error)
        });


    }
    
    return(
        <div>
            <div className='bg-dark text-light d-flex flex-column align-items-center pb-5'>
                <NavBar/>
                <img className='my-4' src={logoFFsts} alt="Logo do Fifa stats escrito" style={{width:300}} />

                <form onSubmit={handleSubmit} className='p-md-5 d-flex flex-column align-items-center'>
                    <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                        <div>   
                            <label htmlFor="inputPC" className="form-label">Player 1</label>
                            <input type="text" required onChange={addPlayerC} className="form-control" id="inputPC" aria-describedby="Player Casa"/>
                        </div>
                        <div>   
                            <label htmlFor="inputPF" className="form-label">Player 2</label>
                            <input type="text" required onChange={addPlayerF} className="form-control" id="inputPF" aria-describedby="Player Casa"/>
                        </div>
                    </div>

                    <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                        <div>   
                            <label htmlFor="inputposseC" className="form-label">Posse Player 1</label>
                            <input type="number" required onChange={addPosseC} className="form-control" id="inputposseC" aria-describedby="Posse de bola"/>
                        </div>
                        <div>   
                            <label htmlFor="inputposseF" className="form-label">Posse Player 2</label>
                            <input type="number" required onChange={addPosseF} className="form-control" id="inputposseF" aria-describedby="Posse de bola"/>
                        </div>
                    </div>

                    <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                        <div>   
                            <label htmlFor="inputChutesC" className="form-label">Chutes ao Gol Player 1</label>
                            <input type="number" required onChange={addChutesC} className="form-control" id="inputChutesC" aria-describedby="Chutes ao Gol Casa"/>
                        </div>
                        <div>   
                            <label htmlFor="inputChutesF" className="form-label">Chutes ao Gol Player 2</label>
                            <input type="number" required onChange={addChutesF} className="form-control" id="inputChutesF" aria-describedby="Chutes ao Gol Fora"/>
                        </div>
                    </div>

                    <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                        <div>   
                            <label htmlFor="inputGC" className="form-label">Gols Player 1</label>
                            <input type="number" required onChange={addGolC} className="form-control" id="inputGC" aria-describedby="Gols Casa"/>
                        </div>
                        <div>   
                            <label htmlFor="inputGF" className="form-label">Gols Player 2</label>
                            <input type="number" required onChange={addGolF} className="form-control" id="inputGF" aria-describedby="Gols Fora"/>
                        </div>
                    </div>

                    <button className='btn btn-primary w-50'>Enviar Partida</button>

                </form>

                {/* <div className='d-flex'>
                    <div className='d-flex flex-column'>
                        {
                            Array.from({ length: golC }, (_, index) => (
                                    <div key={index} className="mb-3 px-5">
                                        <div>
                                            <label htmlFor={`inputGC-${index}`} className='form-label'>Jogador Gol Casa {index+1}</label>
                                            <input
                                                onBlurCapture={addNomeGolsC}
                                                type="text"
                                                className="form-control"
                                                id={`inputGC-${index}`}
                                                aria-describedby="Player Casa"
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>

                    <div className='d-flex flex-column'>
                        {
                            Array.from({ length: golF }, (_, index) => (
                                    <div key={index} className="mb-3 px-5">
                                        <div>
                                            <label htmlFor={`inputGF-${index}`} className='form-label d-flex flex-column'>Jogador Gol Fora {index+1}</label>
                                            <input
                                                onChange={addNomeGolsF}
                                                type="text"
                                                className="form-control"
                                                id={`inputGF-${index}`}
                                                aria-describedby="Player Casa"
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div> */}
            </div>
            <DadosPartidas/>
        </div>
    )
}

export default AddSts