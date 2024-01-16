import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
import CourtView from './CourtView';
import { toast } from 'react-toastify';
import AddRole from './AddRole';

type AdminProps = {
    jwttoken: string;
    username: string;
    updatecourtid: (courtid: number) => void;
}

type UserInfo = {
    userName: string;
    passwordHash: string;
    passwordSalt: string;
    userRole: string;
}

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
    courtId: number | null,
    userName: string | null,
    bookingId: number | null,
    rating: number | null
}

type AddRoleInfo = {
    username: string | undefined,
    roleid: number | undefined
}

const Admin: React.FC<AdminProps> = ({ jwttoken, username, updatecourtid }) => {
    let Jwttoken = sessionStorage.getItem('Jwttoken');
    const [userfetch, setuserfetch] = useState<UserInfo[]>();
    const [usercount, setusercount] = useState<number>(0);
    const [courtfetch, setcourtfetch] = useState<CourtInfo[]>();
    const [courtcount, setcourtcount] = useState<number>(0);
    const [bookingfetch, setbookingfetch] = useState<BookingInfo[]>();
    const [bookingcount, setbookingcount] = useState<number>(0);
    const [reviewfetch, setreviewfetch] = useState<BookingReviewInfo[]>();
    const [reviewcount, setreviewcount] = useState<number>();

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


    // console.log("Jwttoken in session");
    // console.log(Jwttoken);
    const navigate = useNavigate();
    // useEffect(()=>{
    //      if(username!='Admin'){
    //          navigate('/');
    //      }
    // },[]) ;
    const [users, setusers] = useState<UserInfo[]>([]);
    // console.log("Inside Admin.tsx");
    // console.log({ username });
    // console.log(jwttoken);

    //Delete Court
    const handleCourtDelete = async (id: number | string, name: string) => {
        console.log('Going to delete item');
        console.log(id);
        console.log(name);
        try {
            const response = await fetch(`http://localhost:5194/api/Courts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers, such as authorization headers if needed
                    Authorization: 'bearer ' + Jwttoken
                },
            });

            if (response.ok) {
                console.log(`Item with ID ${id} deleted successfully.`);
                toast.success('Deleted sucessfully !!!');
                window.location.reload();

                // Perform any additional actions upon successful deletion
            } else {
                console.error(`Failed to delete item with ID ${id}.`);
                // Handle the error appropriately
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };


    //Delete User
    const handleUserDelete = async (id: number | string, name: string) => {
        console.log('Going to delete item');
        console.log(id);
        console.log(name);
        try {
            const response = await fetch(`http://localhost:5194/api/Users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers, such as authorization headers if needed
                    Authorization: 'bearer ' + Jwttoken
                },
            });

            if (response.ok) {
                console.log(`Item with ID ${id} deleted successfully.`);
                toast.success('Deleted sucessfully !!!');
                window.location.reload();

                // Perform any additional actions upon successful deletion
            } else {
                console.error(`Failed to delete item with ID ${id}.`);
                // Handle the error appropriately
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    const handleUserRole = (name: string | undefined, role: number | undefined) => {
        const data: AddRoleInfo = {
            username: name,
            roleid: role
        }
        fetch(`http://localhost:5194/api/Users/MapRoles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + Jwttoken
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            if (resp.ok) {
                console.log('User Role Added Successfully');
                // navigate('/Admin');
                toast.success("User Role Added Sucessfully !!!");

            } else {
                console.error('Failed');
            }
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {
        fetch("http://localhost:5194/api/Users/GetUser", {
            headers: {
                Authorization: 'bearer ' + Jwttoken
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            data => {
                setuserfetch(data);
                setusercount(data.length);
            }
        )

        //Get the courts Detail
        fetch("http://localhost:5194/api/Courts", {
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
                setcourtcount(data1.length);
            }
        )

        //Get Court Booking
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
                setbookingcount(data2.length);
                console.log(bookingfetch);
            }
        )

        //booking review Fetch
        fetch("http://localhost:5194/api/CourtReviews", {
            headers: {
                Authorization: 'bearer ' + Jwttoken
            }
        }).then(
            response => {
                return response.json();
            }
        ).then(
            data2 => {
                setreviewfetch(data2);
                setreviewcount(data2.Length);
                console.log("inside review fetch");
                console.log(reviewfetch);
            }
        )

    }

        , [])


    const courtview = (courtid: number) => {
        updatecourtid(courtid);
        navigate('/CourtView')
    }


    return (
        <div>
            <section>
                <div className="container mt-5">
                    <h2 className="mb-4 text-center">Admin Site</h2>

                    <div className="row">

                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Number of Users</h5>
                                    <p className="card-text text-center" style={{ fontSize: 150 }}>{usercount}</p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Card 2: Simple Booking Process --> */}
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Number of booking</h5>
                                    <p className="card-text text-center" style={{ fontSize: 150 }}>{bookingcount}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </section>


            {/* User table */}
            <section>
                <h4 className='text-center'> User Info</h4>
                <br></br>
                <table className="table table-striped table-bordered justify-content-center" style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                    <thead className="thead-light">
                        <tr className='text-center'>
                            <th scope="col" className='font-weight-bold'>S.No</th>
                            <th scope="col" className='font-weight-bold'>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userfetch?.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <th scope="row" >{index + 1}</th>
                                    <td>{item.userName}</td>
                                    <td><DeleteConfirmation onDelete={handleUserDelete} id={item.userName} name={item.userName} /> || <AddRole onRoleAdd = {handleUserRole} name={item.userName}/></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>


            {/* Court table */}
            <section>
                <br></br>
                <h4 className='text-center'> Court Info</h4>
                <br></br>
                <table className="table table-striped table-bordered justify-content-center" style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                    <thead className="thead-light">
                        <tr className='text-center'>
                            <th scope="col">S.No</th>
                            <th scope="col" className='font-weight-bold'> Court Name</th>
                            <th scope="col" className='font-weight-bold'> Court Location</th>
                            <th><a className='btn btn-primary float-right' href='/AddCourt'>+ Add Court</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courtfetch ?
                            courtfetch.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <th scope="row" >{index + 1}</th>
                                    <td>{item.courtName}</td>
                                    <td>{item.courtLocation}</td>
                                    <td><DeleteConfirmation onDelete={handleCourtDelete} id={item.courtId} name={item.courtName} /> || <a className='btn btn-primary' onClick={() => courtview(item.courtId)}><i className="bi bi-binoculars"></i> View</a></td>
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


            {/* Court Booking table */}
            <section>
                <br></br>
                <h4 className='text-center'> Booking Data</h4>
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
                        {
                            bookingfetch?.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <th scope="row" >{index + 1}</th>
                                    <td>{item.bookingId}</td>
                                    <td>{item.courtId}</td>
                                    <td>{item.bookingDate}</td>
                                    {/* Slot 1 */}
                                    {
                                        item.slot1 === 1 && (
                                            <td style={tableCellStyleyes}>Booked</td>
                                        )
                                    }
                                    {
                                        item.slot1 === 0 && (
                                            <td style={tableCellStyleNo}>Free</td>
                                        )
                                    }
                                    {/* Slot 2 */}
                                    {
                                        item.slot2 === 1 && (
                                            <td style={tableCellStyleyes}>Booked</td>
                                        )
                                    }
                                    {
                                        item.slot2 === 0 && (
                                            <td style={tableCellStyleNo}>Free</td>
                                        )
                                    }
                                    {/* Slot 3 */}
                                    {
                                        item.slot3 === 1 && (
                                            <td style={tableCellStyleyes}>Booked</td>
                                        )
                                    }
                                    {
                                        item.slot3 === 0 && (
                                            <td style={tableCellStyleNo}>Free</td>
                                        )
                                    }
                                    {/* <td>{item.slot2}</td>
                                    <td>{item.slot3}</td> */}
                                    <td>{item.userName}</td>
                                    {/* <td><i className="bi bi-trash"></i><a className='btn btn-danger'> Delete</a> || <a className='btn btn-primary'>View</a></td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {bookingcount === 0 && (
                    <p className='text-center'>No data found</p>
                )}
            </section>
            <br></br>
            <br></br>

            {/* Booking review table */}
            <section>
                <br></br>
                <h4 className='text-center'> Review Data</h4>
                <br></br>
                <table className="table table-striped table-bordered justify-content-center" style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                    <thead className="thead-light">
                        <tr className='text-center'>
                            <th scope="col">S.No</th>
                            <th scope="col"> Review ID</th>
                            <th scope="col"> Court ID</th>
                            <th scope="col"> Username</th>
                            <th scope="col"> Booking ID</th>
                            <th scope="col"> Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviewfetch?.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    <th scope="row" >{index + 1}</th>
                                    <td>{item.reviewId}</td>
                                    <td>{item.courtId}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.bookingId}</td>
                                    <td>{item.rating}</td>
                                    {/* <td><i className="bi bi-trash"></i><a className='btn btn-danger'> Delete</a> || <a className='btn btn-primary'>View</a></td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {reviewcount === 0 && (
                    <p className='text-center'>No data found</p>
                )}
            </section>
            <br></br>
            <br></br>
        </div>
    )
}

export default Admin;