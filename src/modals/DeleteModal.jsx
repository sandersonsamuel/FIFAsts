import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState} from 'react';
import { getDatabase, ref, remove } from 'firebase/database';

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

function DeleteModal(partidaId){

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handleConfirm(){
        setShow(false)
        deletePartida(partidaId.partidaId)
    }
    


    return(
        <>
            <button onClick={handleShow} className='btn btn-sm btn-danger'>
            <i className="fa-solid fa-trash"></i>
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar Partida</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta ação apagará a partida para sempre, tem certeza que deseja excluir?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Excluir
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default DeleteModal