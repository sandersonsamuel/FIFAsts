import { useEffect, useState } from "react";
import './App.css'

function Medias({partidasUser}){

    if (!partidasUser){
        return(
            <>
                <div className="d-flex flex-column card mt-3 p-5">
                    <h3>Sem Partidas Cadastradas</h3>
                </div>
            </>
        )
    }

    const [mediasP1, setMediasP1] = useState({})

    const [mediasP2, setMediasP2] = useState({})
    

    useEffect(()=>{
        let sg2 = 0
        let fPP2 = 0
        let gPP2 = 0
        let pPP2 = 0
        
        let sg1 = 0
        let fPP1 = 0
        let gPP1 = 0
        let pPP1 = 0

        if (partidasUser){
            const lengthPartidas = Object.keys(partidasUser).length

            partidasUser.forEach(partidas => {
                sg1 += partidas.player1.qteGols - partidas.player2.qteGols
                fPP1 += Number(partidas.player1.chutes)/lengthPartidas
                gPP1 += Number(partidas.player1.qteGols)/lengthPartidas
                pPP1 += Number(partidas.player1.posse)/lengthPartidas

                sg2 += partidas.player2.qteGols - partidas.player1.qteGols
                fPP2 += Number(partidas.player2.chutes)/lengthPartidas
                gPP2 += Number(partidas.player2.qteGols)/lengthPartidas
                pPP2 += Number(partidas.player2.posse)/lengthPartidas
            })

            setMediasP1({
                sg: sg1,
                fPP: fPP1,
                gPP: gPP1,
                pPP: pPP1
                
              })

            setMediasP2({
                sg: sg2,
                fPP: fPP2,
                gPP: gPP2,
                pPP: pPP2
                
              })
        }
    },[partidasUser])

    return (
        <>
            <div className="d-flex gap-4 align-items-center justify-content-center">
                    <div className="d-flex flex-column card mt-3 p-3 p-md-5 mediaP1 text-light">
                        <h3 className="text-center">Médias P1</h3>
                        <div className="d-flex gap-1 py-2 justify-content-center flex-column text-start">
                            <h6>Saldo de Gols: {typeof mediasP1.sg === 'number' ? mediasP1.sg.toFixed(2) : '-'}</h6>
                            <h6>Finalizações p/Partida: {typeof mediasP1.fPP === 'number' ? mediasP1.fPP.toFixed(2) : '-'}</h6>
                            <h6>Gols p/partida: {typeof mediasP1.gPP === 'number' ? mediasP1.gPP.toFixed(2) : '-'}</h6>
                            <h6>Média de posse: {typeof mediasP1.pPP === 'number' ? mediasP1.pPP.toFixed(2) : '-'}%</h6>
                        </div>
                    </div>

                    <div className="d-flex flex-column card mt-3 p-3 p-md-5 mediaP2 text-light">
                        <h3 className="text-center">Médias P2</h3>
                        <div className="d-flex gap-1 py-2 justify-content-center flex-column text-start">
                            <h6>Saldo de Gols: {typeof mediasP2.sg === 'number' ? mediasP2.sg.toFixed(2) : '-'}</h6>
                            <h6>Finalizações p/Partida: {typeof mediasP2.fPP === 'number' ? mediasP2.fPP.toFixed(2) : '-'}</h6>
                            <h6>Gols p/partida: {typeof mediasP2.gPP === 'number' ? mediasP2.gPP.toFixed(2) : '-'}</h6>
                            <h6>Média de posse: {typeof mediasP2.pPP === 'number' ? mediasP2.pPP.toFixed(2) : '-'}%</h6>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Medias