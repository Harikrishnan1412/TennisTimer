import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourtView from './CourtView';

type CourtInfo = {
    courtId: number;
    courtName: string;
    courtLocation: string;
    courtImg1: Uint8Array[];
    courtImg2: Uint8Array[];
    courtImg3: Uint8Array[];
}

type CourtSearchProps = {
    updatecourtid : (courtid:number) => void;

}

const CourtSearch: React.FC<CourtSearchProps> = ({updatecourtid}) => {
    const navigate = useNavigate();
    const Jwttoken = sessionStorage.getItem('Jwttoken');
    const [courtfetch, setcourtfetch] = useState<CourtInfo[]>();
    const [location, setlocation] = useState<string>('');
    console.log(location);

    useEffect(() => {


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
            {/* Court table */}
            <h4 className='text-center'><b>Court List</b> </h4>
                <br></br>
            <section>
                <div className='text-center justify-content-center'>
                    <label>Search</label> &nbsp;
                    <select
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    >
                        <option> Select Location</option>
                        {
                            courtfetch? 
                            courtfetch.map((item, index) => (
                                <option key={index}>{item.courtLocation}</option>
                            )) : (
                                <option> Not Found</option>

                            )
                        }

                    </select>
                </div>
                <br></br>
                <table className="table table-striped table-bordered justify-content-center" style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
                    <thead className="thead-light">
                        <tr className='text-center'>
                            <th scope="col">S.No</th>
                            <th scope="col" className='font-weight-bold'> Court Name</th>
                            <th scope="col" className='font-weight-bold'> Court Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courtfetch ?
                            courtfetch.map((item, index) => (
                                <tr key={index} className='text-center'>
                                    {location === item.courtLocation && <th scope="row" >{index + 1}</th>}
                                    {location === item.courtLocation && <td>{item.courtName}</td>}
                                    {location === item.courtLocation && <td>{item.courtLocation}</td>}
                                    {location === item.courtLocation && <td><a className='btn btn-primary' onClick={() => courtview(item.courtId)}><i className="bi bi-binoculars"></i> View</a></td>}
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

export default CourtSearch;