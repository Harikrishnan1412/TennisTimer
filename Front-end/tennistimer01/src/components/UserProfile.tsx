import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourtView from './CourtView';
import BookingReview from './BookingReview';
import { toast } from "react-toastify";

type CourtInfo = {
    courtId: number;
    courtName: string;
    courtLocation: string;
    courtImg1: Uint8Array[];
    courtImg2: Uint8Array[];
    courtImg3: Uint8Array[];
}

type BookingInfo = {
    bookingId: number;
    courtId: number;
    bookingDate: string;
    slot1: number;
    slot2: number;
    slot3: number;
    userName: string;
}

type BookingReviewInfo = {
    reviewId?: number | null,
    courtid: number | null,
    username: string | null,
    bookingid: number | null,
    rating: number | null
}

type UserProfileProps = {


}

const UserProfile: React.FC<UserProfileProps> = ({ }) => {
    const navigate = useNavigate();
    const Jwttoken = sessionStorage.getItem('Jwttoken');
    const [bookingfetch, setbookingfetch] = useState<BookingInfo[]>();
    const [location, setlocation] = useState<string>('');
    const [userbookingcount,setuserbookingcount] = useState<number>();
    let Username = sessionStorage.getItem('Username');
    
    //Slot color change
    const tableCellStyleyes: React.CSSProperties = {
        backgroundColor: '#a3d2ca',
        color: '#ffffff',
        padding: '10px',
        // Add more styles as needed
    };

    const tableCellStyleNo: React.CSSProperties = {
        backgroundColor: '#de6d6d',
        color: '#ffffff',
        padding: '10px',
        // Add more styles as needed
    };
    
    useEffect(() => {

        
        //Get the Booking Detail
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
                console.log("inside Booking fetch")
                console.log(bookingfetch);
                let count: number = 0;
                bookingfetch?.forEach((myobject, index) => {
                    if (myobject.userName === Username) {
                        count++;
                    }
                })
                setuserbookingcount(count);
                console.log(count);
            }
        )


            console.log(userbookingcount);
    }

    , [userbookingcount])

    const onSubmit = (rating: number | null, courtid: number | null, bookingid: number | null) => {
        const data: BookingReviewInfo = {
            courtid: courtid,
            username: Username,
            bookingid: bookingid,
            rating: rating
        }
        console.log(data);
        fetch(`http://localhost:5194/api/CourtReviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + Jwttoken
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            if (resp.ok) {
                console.log('Review Added successfully');
                toast.success("Review Added Sucessfully !!!");
                navigate('/CourtView');
            } else {
                console.error('Failed');
            }
        })
            .catch((error) => {
                console.error('Error:', error);
            });

            console.log("Inside UserProfile count");
            console.log(userbookingcount);
            console.log(location);
    }

    return (
        <div>
            {/* Court table */}
            <br></br>
            <section>
                <div className="container mt-5">
                    {/* <h2 className="mb-4 text-center">User Profile</h2> */}

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h2 style={{ fontSize: 100, marginTop: 50 }}>Hi {Username} !!!</h2>
                        </div>

                        {/* <!-- Card 2: Simple Booking Process --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Number of booking</h5>
                                    <p className="card-text text-center" style={{ fontSize: 150 }}>{userbookingcount}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </section>
            <hr></hr>
            <h4 className='text-center'><b>{Username} bookings below</b> </h4>
            <br></br>
            <section>
                <br></br>
                <table className="table table-striped table-bordered justify-content-center" style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                    <thead className="thead-light">
                        <tr className='text-center'>
                            <th scope="col">S.No</th>
                            <th scope="col"> Booking ID</th>
                            <th scope="col"> Court ID</th>
                            <th scope="col"> Booking Date</th>
                            <th scope="col"> Slot No 1</th>
                            <th scope="col"> SLot No 2</th>
                            <th scope="col"> Slot No 3</th>
                            <th scope="col"> Booked User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingfetch ? bookingfetch?.map((item, index) => (
                            <tr key={index} className='text-center'>
                                {item.userName === Username && <th scope="row" >{index + 1}</th>}
                                {item.userName === Username && <td>{item.bookingId}</td>}
                                {item.userName === Username && <td>{item.courtId}</td>}
                                {item.userName === Username &&  <td>{item.bookingDate}</td>}
                                {/* Slot 1 */}
                                {item.userName === Username && item.slot1 ===1 && <td style={tableCellStyleyes}>Booked</td>}
                                {item.userName === Username && item.slot1 ===0 && <td style={tableCellStyleNo}>Free</td>}
                                {/* Slot 2 */}
                                {item.userName === Username && item.slot2 ===1 && <td style={tableCellStyleyes}>Booked</td>}
                                {item.userName === Username && item.slot2 ===0 && <td style={tableCellStyleNo}>Free</td>}
                                {/* Slot 3 */}
                                {item.userName === Username && item.slot3 ===1 && <td style={tableCellStyleyes}>Booked</td>}
                                {item.userName === Username && item.slot3 ===0 && <td style={tableCellStyleNo}>Free</td>}
                                {/* {item.userName === Username && <td>{item.slot2}</td>}
                                {item.userName === Username && <td>{item.slot3}</td>} */}
                                {item.userName === Username && <td>{item.userName}</td>}
                                {item.userName === Username && <td><BookingReview onSubmit={onSubmit} courtid={item.courtId} bookingid={item.bookingId} /></td>}
                            </tr>
                        )) : (
                            <tr>
                                <td className='text-danger'>No Data Found</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </section>
            <br></br>
            <br></br>

        </div>
    )
}

export default UserProfile;