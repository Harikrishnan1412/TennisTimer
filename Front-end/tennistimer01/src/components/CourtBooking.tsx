import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface CourtBookingProps {
    onBooking: (date: Date, slot: string) => void;
}

//Court Booking Info
type BookingInfo = {
    bookingId: number;
    courtId: number;
    bookingDate: Date;
    slot1: number;
    slot2: number;
    slot3: number;
    userName: string;
}

type bookingform = {
    date: Date;
    slot: string
}

const CourtBooking: React.FC<CourtBookingProps> = ({ onBooking }) => {
    const [show, setShow] = useState(false);
    const [bookingfetch, setbookingfetch] = useState<BookingInfo>();
    const date1 = new Date();
    const [bookformdata, setbookformdata] = useState<bookingform>({
        date: date1,
        slot: ''
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Jwttoken = sessionStorage.getItem('Jwttoken');


    // Court Booking Fetch
    // fetch("http://localhost:5194/api/CourtBookings", {
    //     headers: {
    //         Authorization: 'bearer ' + Jwttoken
    //     }
    // }).then(
    //     response => {
    //         return response.json();
    //     }
    // ).then(
    //     data2 => {
    //         setbookingfetch(data2);
    //         //console.log(bookingfetch);
    //     }
    // )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
        const { name, value } = event.target;
        setbookformdata((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleDelete = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Inside Pop up');
        console.log(bookformdata);
        let date: string = bookformdata.date.toLocaleString();
        onBooking(bookformdata.date,bookformdata.slot);
        handleClose();
    };

    return (
        <>
            {/* Button to provoke pop up */}
            <Button variant="primary" onClick={handleShow}>
                <i className="bi bi-bookmark-plus"></i> Book
            </Button>
            {/* Pop up window */}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Court Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleDelete}>
                        <div className="form-group">
                            <label >Enter date</label>
                            <input type="date" name='date' onChange={handleChange} className="form-control" id="formdate" />
                        </div>
                        <div className="form-group">
                            <label >Select Slot</label>
                            <select className="form-control" id="formslot" name='slot' value={bookformdata.slot}
          onChange={handleChange}>
                                <option> Select Slot</option>
                                <option value={'1'}>Slot 1 - 6:00 Am to 8:00AM</option>
                                <option value={'2'}>Slot 2 - 4:00PM to 6:00PM</option>
                                <option value={'3'}>Slot 3 - 6:00PM to 8:00PM</option>
                            </select>
                        </div>
                        <hr></hr>
                        <br></br>
                        {/* <button className='btn btn-secondary' onClick={handleClose}>
                            Cancel
                        </button> ||   */}
                        &nbsp;<button type="submit" className="btn btn-primary">
                             Book
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button variant="primary" type="submit">
                        Book
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CourtBooking;
