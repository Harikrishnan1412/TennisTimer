import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface BookingReviewProps {
    onSubmit: (rating:number | null, courtid: number | null , bookingid : number | null) => void;
    courtid : number | null;
    bookingid : number | null
}

//Court Booking Info


const BookingReview: React.FC<BookingReviewProps> = ({ onSubmit ,courtid,bookingid }) => {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState<number | null>(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Jwttoken = sessionStorage.getItem('Jwttoken');

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = parseInt(event.target.value, 10);
        setRating(newRating);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (rating !== null) {
            onSubmit(rating, courtid, bookingid);
        }
    };

    return (
        <>
            {/* Button to provoke pop up */}
            <Button variant="secondary" onClick={handleShow}>
                <i className="bi bi-bookmark-star-fill"></i> Add Rating
            </Button>
            {/* Pop up window */}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Rate us: &nbsp;
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating || ''}
                                onChange={handleRatingChange}
                            />
                        </label>
                        <br></br>
                        <hr></hr>
                        &nbsp;<button className='btn btn-primary' type="submit">Submit Rating</button>&nbsp;&nbsp;
                        <button className='btn btn-secondary' onClick={handleClose}> Cancel</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button> */}
                    {/* <Button variant="primary" type="submit">
                        Book
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookingReview;
