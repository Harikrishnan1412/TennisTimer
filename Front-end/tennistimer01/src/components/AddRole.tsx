import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AddRoleProps {
    onRoleAdd: (name:string | undefined , role:number|undefined) => void;
    name: string;
}

const AddRole: React.FC<AddRoleProps> = ({ onRoleAdd, name }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [givenrole, setgivenrole] = useState<number>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setgivenrole(Number(value));
    }
    const addrole = () => {
        onRoleAdd(name,givenrole);
        handleClose();
    };

    return (
        <>
            <Button variant="info" onClick={handleShow}>
                <i className="bi bi-scissors"></i> Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addrole}>
                        <div className="form-group">
                            <label >Assign the role to the :</label>
                            <select className="form-control" id="formslot" name='role'
                                onChange={handleChange}>
                                <option> Select Slot</option>
                                <option value={'1'}>Admin</option>
                                <option value={'2'}>User</option>
                            </select>
                        </div>
                        <hr></hr>
                        <br></br>
                        {/* <button className='btn btn-secondary' onClick={handleClose}>
                            Cancel
                        </button> ||   */}
                        &nbsp;<button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddRole;
