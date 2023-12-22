import { auth} from "../configs/FireBase"
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import logoFS from '../assets/LOGO_MIN_FS.svg'
import '../DadosPartidas.css'
import p1Win from '../assets/p1_win.svg'
import p2Win from '../assets/p2_win.svg'
import emp from '../assets/em_win.svg'
import PieChart from "../graphs/PieChart";
import BarChart from "../graphs/BarChart";
import Medias from "./Medias";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";

function DadosPartidas(){

    const [partidasUsuario, setPartidasUsuario] = useState(null)
    const idUserAtual = auth.currentUser.uid

    const [pesqP1, setPesqP1] = useState("")
    const [pesqP2, setPesqP2] = useState("")

    const [dataIni, setDataIni] = useState([])
    const [dataFin, setDataFin] = useState([])

    function addPesqP1(event){
        setPesqP1(event.target.value)
    }

    function addPesqP2(event){
        setPesqP2(event.target.value)
    }

    function addDataIni(event) {
        const dataCrua = event.target.value
        const [dia, mes, ano] = dataCrua.split('-').reverse()
        setDataIni([Number(dia), Number(mes), Number(ano)])
    }

    function addDataFin(event) {
        const dataCrua = event.target.value
        const [dia, mes, ano] = dataCrua.split('-').reverse()
        setDataFin([Number(dia), Number(mes), Number(ano)])
    }

    function clearDates(){
        document.getElementById('datePesqI').value = ''
        document.getElementById('datePesqF').value = ''
        setDataFin([])
        setDataIni([])
    }


    useEffect(()=>{
        const database = getDatabase();
        const partidaRef = ref(database, "partida")

        onValue(partidaRef, (snapshot)=>{
            const data = snapshot.val()

            const partidasComID = Object.entries(data).map(([partidaId, partidaData]) => {
                return { id: partidaId, ...partidaData };
            });

            let partidasFiltradas = partidasComID.filter((partida) => partida.idUser === idUserAtual)

            let partidasComDateFormat = partidasFiltradas.map((partida) => {
                const [data, hora] = partida.datePartida.split(' ');
                const [dia, mes, ano] = data.split('/');
                const dateFormat = [Number(dia), Number(mes), Number(ano)];
            
                return {
                    ...partida,
                    dateFormat: dateFormat,
                };
            });

            if (pesqP1.trim() !== "") {
                partidasFiltradas = partidasFiltradas.filter((partida) => partida.player1.nome.toLowerCase().includes(pesqP1.toLowerCase()));
            }

            if (pesqP2.trim() !== "") {
                partidasFiltradas = partidasFiltradas.filter((partida) => partida.player2.nome.toLowerCase().includes(pesqP2.toLowerCase()));
            }

            if (dataIni.length === 3) {
                partidasFiltradas = partidasComDateFormat.filter(
                    (partida) =>
                        partida.dateFormat[0] >= dataIni[0] &&
                        partida.dateFormat[1] >= dataIni[1] &&
                        partida.dateFormat[2] >= dataIni[2]
                );
            }

            if (dataFin.length === 3) {

                partidasFiltradas = partidasComDateFormat.filter(
                    (partida) =>
                        partida.dateFormat[2] <= dataFin[2] &&
                        partida.dateFormat[1] <= dataFin[1] &&
                        partida.dateFormat[0] <= dataFin[0]
                )
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

    },[idUserAtual, pesqP1, pesqP2, dataIni, dataFin])

    
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
                                    <th scope="col">Vencedor</th>
                                    <th scope="col">Editar</th>
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
                                        {parseInt(partida.player1.qteGols, 10) > parseInt(partida.player2.qteGols, 10) ? (<img style={{ width: 30 }} src={p1Win} alt="Player 1 Wins" />) : parseInt(partida.player1.qteGols, 10) < parseInt(partida.player2.qteGols, 10) ? (<img style={{ width: 30 }} src={p2Win} alt="Player 2 Wins" />) : (<img style={{ width: 30 }} src={emp} alt="Draw" />)}
                                        </td>
                                        <td>
                                            <EditModal partida={partida}/>
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

            <div className="d-lg-flex justify-content-center gap-5 m-2">
                <div className="d-flex flex-column card mt-3 p-3 p-md-5 bg-dark text-light">
                    <h5 className="text-center m-0">Filtrar por player</h5>

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

                    <hr />

                    <h5 className="text-center m-0">Filtrar por Data</h5>

                    <div className="d-md-flex gap-4 py-2 justify-content-center align-items-end">
                        <div>
                            <label htmlFor="datePesqI">Data inicial: </label>
                            <input type="date" id="datePesqI" onChange={addDataIni} className="form-control" />
                        </div>
                        <div>
                            <label htmlFor="datePesqF">Data Final: </label>
                            <input type="date" id="datePesqF" onChange={addDataFin} className="form-control" />
                        </div>
                        <button className="w-50 btn btn-danger mt-2 mt-md-0"><i onClick={clearDates} className="fa-solid fa-delete-left"></i></button>
                    </div>
                    
                </div>

                <Medias partidasUser={partidasUsuario}/>

            </div>

            <div className="d-md-flex gap-4 m-3 align-item justify-content-center">
                  
                <PieChart partidasUser={partidasUsuario}/>   
                <BarChart partidasUser={partidasUsuario}/>               
                
            </div>
        </>
    )
}

export default DadosPartidas