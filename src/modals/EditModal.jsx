import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import AddSts from "../components/AddSts";
import '../App.css'

function EditModal({partida}) {

    const [show, setShow] = useState(false)

    const showModal = () => setShow(true) 
    const closeModal = () => setShow(false) 

    return (
        <>
            <button onClick={showModal} className="btn btn-sm btn-primary"><i className="fa-solid fa-pen-to-square"></i></button>

                <Modal show={show} onHide={closeModal} className="d-flex justify-content-center align-items-center bg-blur">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Partida</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-light">
                    <AddSts metodo={'put'} partida={partida} closeModal={closeModal}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditModal