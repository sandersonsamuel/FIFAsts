import React from 'react';
import Chart from 'react-apexcharts';
import '../App.css'

function PieChart({partidasUser}) {
  let p1Win = 0
  let p2Win = 0
  let empate = 0

  if (!partidasUser) {
    return null
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
    <div className="d-flex flex-column p-md-5 text-center card mt-3 align-items-center justify-content-center">
      <div className='chart p-1 d-flex flex-column gap-5'>
        <Chart className="graficoPie" options={options} series={series} type='pie' width="300"></Chart>
        <h4 className='h4'>VP1: {p1Win} | VP2: {p2Win} | Empate:{empate}</h4>
      </div>
    </div>
  )
}

export default PieChart