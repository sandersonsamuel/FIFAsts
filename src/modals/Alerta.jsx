import Alert from 'react-bootstrap/Alert';

function Alerta({text}) {

  if (text){
    return (
      <div style={{zIndex:999, top: 10}} className='position-fixed w-100 text-center d-flex justify-content-center'>
        <div className="alert alert-danger m-0">
          {text}
        </div>
      </div>
    )
  }
}

export default Alerta;