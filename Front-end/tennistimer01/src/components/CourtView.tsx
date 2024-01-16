import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import CourtBooking from './CourtBooking';
import "react-toastify/dist/ReactToastify.css";

type CourtViewProps = {
    courtId: number;
    username: string;
}

//Court Info type
type CourtInfo = {
    courtId: number;
    courtName: string;
    courtLocation: string;
    courtImg1: string;
    courtImg2: string;
    courtImg3: string;
}
type BookingReviewInfo = {
    reviewId?: number | null,
    courtid: number | null,
    username: string | null,
    bookingid: number | null,
    rating: number | null
}

//Court Booking Info
type BookingInfo = {
    bookingId?: number;
    courtId?: number;
    bookingDate: Date;
    slot1: number;
    slot2: number;
    slot3: number;
    userName: string | null;
}

const CourtView: React.FC<CourtViewProps> = ({ courtId, username }) => {

    const navigate = useNavigate();
    let Jwttoken = sessionStorage.getItem('Jwttoken');
    let Username = sessionStorage.getItem('Username');
    const [courtfetch, setcourtfetch] = useState<CourtInfo>();
    const [bookingfetch, setbookingfetch] = useState<BookingInfo[]>();
    const [reviewfetch, setreviewfetch] = useState<BookingReviewInfo[]>();
    const [reviewaverage, setreviewaverage] = useState<number>(0);
    const [img1, setimg1] = useState<string>();
    const [img2, setimg2] = useState<string>();
    const [img3, setimg3] = useState<string>();
    const [courtid, setcourtid] = useState<number>();
    const [bookdate, setbookdate] = useState<Date>();
    const [slot1, setslot1] = useState<string>('');

    console.log("courtid");
    console.log(courtId);
    console.log('bookdate');
    console.log(bookdate);
    console.log('slot');
    console.log(slot1);

    function bufferToBase64(buffer: number[]): string {
        let binary = '';
        console.log("buffer length");
        console.log(buffer[1]);
        buffer.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return btoa(binary);
    }

    const Imageurl = (img: Uint8Array) => {
        const imageBuffer: Uint8Array = img;
        const byteArray: number[] = Array.from(imageBuffer);
        console.log('Image Buffer');
        console.log(imageBuffer)
        const base64Image: string = bufferToBase64(byteArray);
        const encodedString = btoa(base64Image);
        const dataUri: string = `data:image/jpeg;base64,${base64Image}`;
        return dataUri;
    }
    const onBooking = (date: Date, slot: string) => {
        setbookdate(date);
        setslot1(slot);
        console.log('inside court view');
        CourtBookingFunction(date, slot, courtId);

    }

    const CourtBookingFunction = (date: Date, slot: string, id: number) => {
        let shouldContinue = true;
        const data: BookingInfo = {
            courtId: courtid,
            bookingDate: date,
            slot1: 0,
            slot2: 0,
            slot3: 0,
            userName: Username,
        }
        if (slot === '1') {
            data.slot1 = 1;
        }
        else if (slot === '2') {
            data.slot2 = 1;
        }
        else if (slot === '3') {
            data.slot3 = 1;
        }
        //    const formData = new FormData();
        //    formData.append('courtId',String(id));
        //    formData.append('bookingDate',String(date));
        //    formData.append('slot1',String(data.slot1));
        //    formData.append('slot2',String(data.slot2));
        //    formData.append('slot3',String(data.slot3));
        //    formData.append('userName',username);
        //console.log(formData);

        //Check already booked
        console.log("Inside Court booking fetch function");
        console.log(data);
        bookingfetch?.forEach((myobject, index) => {
            console.log(myobject);
            const date1 = new Date(data.bookingDate);
            const date2 = new Date(myobject.bookingDate);
            const areDatesEqual = (
                date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear()
            );
            console.log(date1);
            console.log(date2);
            if (areDatesEqual) {
                console.log("Inside booking check");
                console.log(true);
            }
            if (myobject.courtId === data.courtId && areDatesEqual) {
                if (myobject.slot1 === 1 && data.slot1 === 1 || myobject.slot2 === 1 && data.slot2 === 1 || myobject.slot3 === 1 && data.slot3 === 1) {
                    shouldContinue = false;

                }
            }
        })
        if (shouldContinue) {
            fetch(`http://localhost:5194/api/CourtBookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'bearer ' + Jwttoken
                },
                body: JSON.stringify(data)
            }).then((resp) => {
                if (resp.ok) {
                    console.log('Images and text inputs uploaded successfully');
                    navigate('/UserProfile');
                    toast.success("Court booked Sucessfully !!!");
                    
                } else {
                    console.error('Failed');
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            toast.error("Slot is Already booked! Kindly select different slot or data");
        }




    }


    useEffect(() => {
        //Court Info fetch
        if (courtId === 0) {
            navigate('/');
        }

        fetch(`http://localhost:5194/api/Courts/${courtId}`, {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + Jwttoken
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            data1 => {
                setcourtfetch(data1);
                setcourtid(data1.courtId);
                console.log('Inside courtfetch')
                console.log(data1);
                setimg1(data1.courtImg1);
                setimg2(data1.courtImg2);
                setimg3(data1.courtImg3);
            }
        )

        // Court Booking Fetch
        fetch("http://localhost:5194/api/CourtBookings", {
            headers: {
                Authorization: 'bearer ' + Jwttoken
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            data2 => {
                setbookingfetch(data2);
                console.log('Inside bookingfetch')
                console.log(bookingfetch);
            }
        )

        // Bookingreview fetch
        fetch("http://localhost:5194/api/CourtReviews", {
            headers: {
                Authorization: 'bearer ' + Jwttoken
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            data3 => {
                setreviewfetch(data3);
                console.log(data3);
                console.log("inside review fetch");
                console.log(reviewfetch);
                let average: number = 0;
                let length: number = 0;
                for (let i = 0; i < data3.length; i++) {
                    if (data3[i].courtId === courtId) {
                        const item = data3[i];
                        average = average + item.rating;
                        length++;
                    }
                }
                console.log(average);
                console.log(length);
                let average1: number = average / length;
                setreviewaverage(average1);
                console.log("Inside review Average");
                console.log(average1);
            }
        )


    }, [courtId]);


    return (
        <div>
            <section>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <h3 className='text-center'><i className="bi bi-arrow-up"></i><b> Preview of the court Above </b><i className="bi bi-arrow-up"></i></h3>

            <section>
                {
                    courtfetch !== null && (
                        <div>
                            <div className='container mt-5'>
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <div>
                                            <div className="card">
                                                <div className="card-header text-center font-weight-bold">
                                                    <b>Court Details</b>
                                                </div>
                                                <div className="card-body text-center">
                                                    <p><b>Name of the court is : </b>  {courtfetch?.courtName}</p>
                                                    <p><b>Court Located in : </b> {courtfetch?.courtLocation}</p>
                                                    <p><b>Overall Rating : </b> {reviewaverage}</p>
                                                    <a className='btn btn-secondary' onClick={() => navigate(-1)}  href='#'><i className="bi bi-box-arrow-left"></i> Back</a> || <CourtBooking onBooking={onBooking} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
            <br>
            </br>
            <br></br>
        </div>
    )
}
export default CourtView;