import { auth, database } from "./configs/FireBase"
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import logoFS from './assets/LOGO_MIN_FS.svg'
import './DadosPartidas.css'
import p1Win from './assets/p1_win.svg'
import p2Win from './assets/p2_win.svg'
import emp from './assets/em_win.svg'
import PieChart from "./graphs/PieChart";
import BarChart from "./graphs/BarChart";
import Medias from "./Medias";
import './App.css'
import DeleteModal from "./modals/DeleteModal";

function DadosPartidas(){

    const [partidasUsuario, setPartidasUsuario] = useState(null)
    const idUserAtual = auth.currentUser.uid

    const [pesqP1, setPesqP1] = useState("")
    const [pesqP2, setPesqP2] = useState("")
    
    const [modal, setModal] = useState(false)

    function addPesqP1(event){
        setPesqP1(event.target.value)
        console.log(pesqP1);
    }

    function addPesqP2(event){
        setPesqP2(event.target.value)
        console.log(pesqP2);
    }

    useEffect(()=>{
        const database = getDatabase();
        const partidaRef = ref(database, "partida")

        onValue(partidaRef, (snapshot)=>{
            const data = snapshot.val()

            const partidasComID = Object.entries(data).map(([partidaId, partidaData]) => {
                return { id: partidaId, ...partidaData };
            });

            let partidasFiltradas = partidasComID.filter((partida) => partida.idUser === idUserAtual);

            if (pesqP1.trim() !== "") {
                partidasFiltradas = partidasFiltradas.filter((partida) => partida.player1.nome.toLowerCase().includes(pesqP1.toLowerCase()));
            }

            if (pesqP2.trim() !== "") {
                partidasFiltradas = partidasFiltradas.filter((partida) => partida.player2.nome.toLowerCase().includes(pesqP2.toLowerCase()));
            }

            if (partidasFiltradas.length > 0){
                setPartidasUsuario(partidasFiltradas)
            }else{
                setPartidasUsuario(null)
            }
        })

        return () => {
            off(partidaRef);
        };

    },[idUserAtual, pesqP1, pesqP2])

    
    return(
        <>
            {partidasUsuario? (
                <div className="p-3 px-md-5 pb-md-5 mt-5 table-responsive">
                    <h1 className="mb-4">Dados das partidas</h1>

                    <table className="table text-capitalize">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Data e Hora</th>
                                    <th scope="col">Placar</th>
                                    <th scope="col">Chutes P1</th>
                                    <th scope="col">Chutes P2</th>
                                    <th scope="col">Posse P1</th>
                                    <th scope="col">Posse P2</th>
                                    <th scope="col">Resultado</th>
                                    <th scope="col">Deletar</th>
                                </tr>
                            </thead>
                            {partidasUsuario.map((partida, index)=>(
                                <tbody key={index}>
                                    <tr className="text-center">
                                        <td>{partida.datePartida}</td>
                                        <td>{`${partida.player1.nome} ${partida.player1.qteGols} x ${partida.player2.qteGols} ${partida.player2.nome}`}</td>
                                        <td>{partida.player1.chutes}</td>
                                        <td>{partida.player2.chutes}</td>
                                        <td>{partida.player1.posse}%</td>
                                        
                                        <td>{partida.player2.posse}%</td>
                                        <td>
                                        {parseInt(partida.player1.qteGols, 10) > parseInt(partida.player2.qteGols, 10) ? (<img style={{ width: 35 }} src={p1Win} alt="Player 1 Wins" />) : parseInt(partida.player1.qteGols, 10) < parseInt(partida.player2.qteGols, 10) ? (<img style={{ width: 35 }} src={p2Win} alt="Player 2 Wins" />) : (<img style={{ width: 35 }} src={emp} alt="Draw" />)}
                                        </td>
                                        <td>
                                            <DeleteModal partidaId={partida.id}/>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
              </div>
            ):(
                <div className="p-5 d-flex flex-column align-items-center">
                    <h1 className="text-center">Não há partidas...</h1>
                    <img src={logoFS} alt="logo FS" id="imgLogoFs" className="mt-4" style={{width: 250}} />
                </div>
            )}

            <div className="d-lg-flex justify-content-center gap-5 m-2 m-lg-0">
                <div className="d-flex flex-column card mt-3 p-3 p-md-5 bg-dark text-light">
                    <h3 className="text-center">Pesquisa por player</h3>

                    <div className="d-flex gap-4 py-2 justify-content-center align-items-end">
                        <div>
                            <label htmlFor="p1Pesq">Player 1:</label>
                            <input type="text" onChange={addPesqP1} id="p1Pesq" className="form-control" />
                        </div>
                        <div>
                            <label htmlFor="p2Pesq">Player 2:</label>
                            <input type="text" onChange={addPesqP2} id="p2Pesq" className="form-control" />
                        </div>
                    </div>
                </div>

                <Medias partidasUser={partidasUsuario}/>

            </div>

            <div className="d-md-flex gap-4 m-3 align-item justify-content-center">
                <div className="d-flex flex-column p-md-5 text-center card mt-3 align-items-center justify-content-center">  
                        <PieChart partidasUser={partidasUsuario}/>                  
                </div>
                <div className="d-flex flex-column p-md-5 text-center card mt-3 align-items-center justify-content-center">  
                        <BarChart partidasUser={partidasUsuario}/>                
                </div>
            </div>
        </>
    )
}

export default DadosPartidas