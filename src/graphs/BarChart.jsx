import React from 'react';
import Chart from 'react-apexcharts';

function BarChart({partidasUser}) {

  if (!partidasUser) {
    return <h3>Sem Partidas Cadastradas</h3>;
  }

  let chutesGolP1 = 0
  let golsP1 = 0

  let chutesGolP2 = 0
  let golsP2 = 0
  
  partidasUser.forEach(partidas => {
    chutesGolP1 += parseInt(partidas.player1.chutes, 10);
    golsP1 += parseInt(partidas.player1.qteGols, 10);

    chutesGolP2 += parseInt(partidas.player2.chutes, 10);
    golsP2 += parseInt(partidas.player2.qteGols, 10);
  });

  const options = {
    chart:{
      type:'bar',
    },
    xaxis: {
      categories: ['Player 1', 'Player 2'],
      labels: {
        style: {
          fontSize: '16px',
        },
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          
          chart: {
            width: '100%'
          }
        }
      }
    ],
      
    series: [{name: 'Chutes ao Gol', data: [chutesGolP1, chutesGolP2]}, {name: 'Gols', data: [golsP1, golsP2]}],
    
  }

  return (
    <>
      <div className='chart p-3 d-flex flex-column gap-3'>
        <Chart className="graficoBar" options={options} series={options.series} type='bar' width="350"></Chart>
        <h4 className='text-md'>Apv: P1: {((golsP1 / chutesGolP1)*100).toFixed(2)}% | P2: {((golsP2 / chutesGolP2)*100).toFixed(2)}% </h4>
      </div>
    </>
  )
}

export default BarChart