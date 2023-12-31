import { useState } from 'react'
import '../App.css'
import { getDatabase, update, ref, push } from 'firebase/database';
import 'firebase/compat/database';
import { auth } from '../configs/FireBase';
import Alerta from '../modals/Alerta';

function AddSts({metodo, partida, closeModal}){

    const [golC, setGolC] = useState(null)
    const [golF, setGolF] = useState(null)

    const [playerC, setPlayerC] = useState(null)
    const [playerF, setPlayerF] = useState(null)

    const [posseC, setPosseC] = useState(null)
    const [posseF, setPosseF] = useState(null)

    const [chutesC, setChutesC] = useState(null)
    const [chutesF, setChutesF] = useState(null)

    const [alertaTxt, setAlertaTxt] = useState(null)

    function addPlayerC(event){
        const lowercaseP1 = event.target.value.toLowerCase();
        setPlayerC(lowercaseP1)
    }

    function addPlayerF(event){
        const lowercaseP2 = event.target.value.toLowerCase();
        setPlayerF(lowercaseP2)
    }

    function addGolC(event){
        const golNumber = Number(event.target.value)
        setGolC(golNumber)
    }

    function addGolF(event){
        const golNumber = Number(event.target.value)
        setGolF(golNumber)
    }

    function addPosseC(event){
        const posseNumber = Number(event.target.value)
        setPosseC(posseNumber)
    }

    function addPosseF(event){
        const posseNumber = Number(event.target.value)
        setPosseF(posseNumber)
    }

    function addChutesC(event) {
        const chutesNumber = Number(event.target.value)
        setChutesC(chutesNumber)
    }

    function addChutesF(event) {
        const chutesNumber = Number(event.target.value)
        setChutesF(chutesNumber)
    }

    function setAlerta(text){
        if (!alertaTxt) {
            setAlertaTxt(text);
    
            setTimeout(() => {
                setAlertaTxt(null)
            }, 3000)
        }
    }

    function limparInputs(){

        setPlayerC('')
        setPlayerF('')
        setPosseC('')
        setPosseF('')
        setChutesC('')
        setChutesF('')
        setGolC('')
        setGolF('')
        
        document.getElementById("inputPC").value = ""
        document.getElementById("inputPF").value = ""
        document.getElementById("inputposseC").value = "" 
        document.getElementById("inputposseF").value = "" 
        document.getElementById("inputChutesC").value = "" 
        document.getElementById("inputChutesF").value = ""
        document.getElementById("inputGC").value = "" 
        document.getElementById("inputGF").value = "" 
    }

    const handleSubmit = (event) => {

        event.preventDefault()

        const database = getDatabase()

        const dataAtual = new Date()
        const dia = dataAtual.getDate()
        const mes = dataAtual.getMonth() + 1
        const ano = dataAtual.getFullYear()

        const hora = dataAtual.getHours()
        const minutos = dataAtual.getMinutes()
        
        const segundos = dataAtual.getSeconds()

        const dataFormatada = `${dia}/${mes}/${ano} ${hora < 10? '0'+ hora: hora}:${minutos < 10? '0'+ minutos: minutos}:${segundos < 10? '0'+ segundos: segundos}`;


        if (metodo == 'put'){

            const statsPartida = {

                player1:{
                    qteGols: golC? golC: partida.player1.qteGols,
                    posse: posseC? posseC: partida.player1.posse,
                    chutes: chutesC? chutesC: partida.player1.chutes,
                    nome: playerC? playerC: partida.player1.nome
                },
    
                player2:{
                    qteGols: golF? golF: partida.player2.qteGols,
                    posse: posseF? posseF: partida.player2.posse,
                    chutes: chutesF? chutesF: partida.player2.chutes,
                    nome: playerF? playerF: partida.player2.nome
                }
            }

            console.log(statsPartida)
            console.log(partida.id)

            if (statsPartida.player1.posse + statsPartida.player2.posse != 100){
                setAlerta("A soma da posse de bola deve ser 100%")
            }else if (statsPartida.player1.chutes < statsPartida.player1.qteGols || statsPartida.player2.chutes < statsPartida.player2.qteGols){
                setAlerta("Existem mais gols que chutes")
            }else{
                
                update(ref(database, `partida/${partida.id}`), statsPartida)
                .then(() => {
                    console.log("enviado com sucesso!")
                    limparInputs()
                    closeModal()
                }).catch((error)=>{
                    console.error("Não foi possível fazer o put", error)
                })
            }

        }else{
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


            if (posseC + posseF != 100){
                setAlerta("A soma da posse de bola deve ser 100%")
            }else if (chutesC < golC || chutesF < golF){
                setAlerta("Existem mais gols que chutes")
            }else{
                push(ref(database, 'partida'), statsPartida)
                .then(() => {
                    console.log("enviado com sucesso!")
                    limparInputs()
                }).catch((error)=>{
                    console.error("Não foi possível fazer o post", error)
                })
            }
        }


    }
    
    return(
        <div className='d-flex justify-content-center'>
            <Alerta text={alertaTxt}/>
            {!metodo? (
            <form onSubmit={handleSubmit} className='p-md-3 d-flex flex-column align-items-center'>
                    <h3>Registrar Partida</h3>
                <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                    <div>   
                        <label htmlFor="inputPC" className="form-label">Nome P1</label>
                        <input type="text" required onChange={addPlayerC} className="form-control" id="inputPC" aria-describedby="Player Casa"/>
                    </div>
                    <div>   
                        <label htmlFor="inputPF" className="form-label">Nome P2</label>
                        <input type="text" required onChange={addPlayerF} className="form-control" id="inputPF" aria-describedby="Player Casa"/>
                    </div>
                </div>

                <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                    <div>   
                        <label htmlFor="inputposseC" className="form-label">Posse de Bola P1</label>
                        <input type="number" required onChange={addPosseC} placeholder='%' className="form-control" id="inputposseC" aria-describedby="Posse de bola"/>
                    </div>
                    <div>   
                        <label htmlFor="inputposseF" className="form-label">Posse de Bola P2</label>
                        <input type="number" required onChange={addPosseF} placeholder='%' className="form-control" id="inputposseF" aria-describedby="Posse de bola"/>
                    </div>
                </div>

                <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                    <div>   
                        <label htmlFor="inputChutesC" className="form-label">Chutes ao Gol P1</label>
                        <input type="number" required onChange={addChutesC} placeholder='ex: 10' className="form-control" id="inputChutesC" aria-describedby="Chutes ao Gol Casa"/>
                    </div>
                    <div>   
                        <label htmlFor="inputChutesF" className="form-label">Chutes ao Gol P2</label>
                        <input type="number" required onChange={addChutesF} placeholder='ex: 8' className="form-control" id="inputChutesF" aria-describedby="Chutes ao Gol Fora"/>
                    </div>
                </div>

                <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                    <div>   
                        <label htmlFor="inputGC" className="form-label">Gols P1</label>
                        <input type="number" required onChange={addGolC} placeholder='ex: 3' className="form-control" id="inputGC" aria-describedby="Gols Casa"/>
                    </div>
                    <div>   
                        <label htmlFor="inputGF" className="form-label">Gols P2</label>
                        <input type="number" required onChange={addGolF} placeholder='ex: 2' className="form-control" id="inputGF" aria-describedby="Gols Fora"/>
                    </div>
                </div>

                <button className='btn btn-primary w-50'>Enviar Partida</button>

            </form>
            ):(
                <form onSubmit={handleSubmit} className='p-md-5 d-flex flex-column align-items-center'>
            <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                <div>   
                    <label htmlFor="inputPC" className="form-label">Player 1</label>
                    <input type="text" placeholder={partida.player1.nome} onChange={addPlayerC} className="form-control" id="inputPC" aria-describedby="Player Casa"/>
                </div>
                <div>   
                    <label htmlFor="inputPF" className="form-label">Player 2</label>
                    <input type="text" placeholder={partida.player2.nome} onChange={addPlayerF} className="form-control" id="inputPF" aria-describedby="Player Casa"/>
                </div>
            </div>

            <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                <div>   
                    <label htmlFor="inputposseC" className="form-label">Posse Player 1</label>
                    <input type="number" placeholder={partida.player1.posse} onChange={addPosseC} className="form-control" id="inputposseC" aria-describedby="Posse de bola"/>
                </div>
                <div>   
                    <label htmlFor="inputposseF" className="form-label">Posse Player 2</label>
                    <input type="number" placeholder={partida.player2.posse} onChange={addPosseF} className="form-control" id="inputposseF" aria-describedby="Posse de bola"/>
                </div>
            </div>

            <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                <div>   
                    <label htmlFor="inputChutesC" className="form-label">Chutes ao Gol Player 1</label>
                    <input type="number" placeholder={partida.player1.chutes} onChange={addChutesC} className="form-control" id="inputChutesC" aria-describedby="Chutes ao Gol Casa"/>
                </div>
                <div>   
                    <label htmlFor="inputChutesF" className="form-label">Chutes ao Gol Player 2</label>
                    <input type="number" placeholder={partida.player2.chutes} onChange={addChutesF} className="form-control" id="inputChutesF" aria-describedby="Chutes ao Gol Fora"/>
                </div>
            </div>

            <div className="mb-3 px-3 px-md-5 d-flex gap-3">
                <div>   
                    <label htmlFor="inputGC" className="form-label">Gols Player 1</label>
                    <input type="number" placeholder={partida.player1.qteGols} onChange={partida.player1.qteGols} className="form-control" id="inputGC" aria-describedby="Gols Casa"/>
                </div>
                <div>   
                    <label htmlFor="inputGF" className="form-label">Gols Player 2</label>
                    <input type="number" placeholder={partida.player2.qteGols} onChange={addGolF} className="form-control" id="inputGF" aria-describedby="Gols Fora"/>
                </div>
            </div>

            <p className='small'>Preencha apenas o que quiser mudar</p>
            <button className='btn btn-primary w-50'>Salvar Alterações</button>

        </form>
            )}
        </div>
    )
}

export default AddSts