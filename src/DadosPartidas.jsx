import { auth, database } from "./configs/FireBase"
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import logoFS from './assets/LOGO_MIN_FS.svg'
import './DadosPartidas.css'
import p1Win from './assets/p1_win.svg'
import p2Win from './assets/p2_win.svg'
import emp from './assets/em_win.svg'

function DadosPartidas(){

    const [partidasUsuario, setPartidasUsuario] = useState(null)
    const idUserAtual = auth.currentUser.uid

    function deletePartida(partidaId){
        const database = getDatabase();
        const partidaRef = ref(database, `partida/${partidaId}`)

        remove(partidaRef)
        .then(()=>{
            console.log("Partida removida com sucesso!");
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        const database = getDatabase();
        const partidaRef = ref(database, "partida")

        onValue(partidaRef, (snapshot)=>{
            const data = snapshot.val()

            const partidasComID = Object.entries(data).map(([partidaId, partidaData]) => {
                return { id: partidaId, ...partidaData };
            });

            const partidasFiltradas = partidasComID.filter(
                (partida) => partida.idUser === idUserAtual
            );

            if (partidasFiltradas.length > 0){
                setPartidasUsuario(partidasFiltradas)
            }else{
                setPartidasUsuario(null)
            }
        })

        return () => {
            off(partidaRef);
        };

    },[idUserAtual])

    return(
        <>
            {partidasUsuario? (
                <div className="p-3 p-md-5 table-responsive">
                    <h1 className="mb-4">Dados das partidas</h1>
                    <table className="table">
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
                                        <td><button onClick={()=> deletePartida(partida.id)} className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
              </div>
            ):(
                <div className="p-5 d-flex flex-column align-items-center">
                    <h1 className="text-center">Não há partidas cadastradas...</h1>
                    <img src={logoFS} alt="logo FS" id="imgLogoFs" className="mt-4" style={{width: 250}} />
                </div>
            )}
        </>
    )
}

export default DadosPartidas