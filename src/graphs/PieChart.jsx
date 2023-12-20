import React from 'react';
import Chart from 'react-apexcharts';

function PieChart({partidasUser}) {
  let p1Win = 0
  let p2Win = 0
  let empate = 0

  if (!partidasUser) {
    return <h3>Sem Partidas Cadastradas</h3>;
  }

  partidasUser.forEach(partida => {

    if (partida.player1.qteGols > partida.player2.qteGols){
      p1Win ++
    }
    else if (partida.player1.qteGols < partida.player2.qteGols){
      p2Win ++
    }else{
      empate ++
    }
    
  })

  const series = [p1Win, p2Win, empate]
  const options = {

    labels:['Vitória Player 1', 'Vitória Player 2', 'Empate'],
    chart:{
      type:'pie',
    },
  }

  return (
    <>
      <div className='chart p-1 d-flex flex-column gap-3'>
        <Chart options={options} series={series} type='pie' width="350"></Chart>
        <h4 className='text-md'>VP1: {p1Win} | VP2: {p2Win} | Empate:{empate}</h4>
      </div>
    </>
  )
}

export default PieChart