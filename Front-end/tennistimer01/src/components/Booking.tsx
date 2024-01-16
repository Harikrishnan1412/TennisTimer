import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type BookingProps = {
    courtid:number;
    username:string
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

type CourtInfo = {
    courtId: number;
    courtName: string;
    courtLocation: string;
    courtImg1: Uint8Array[];
    courtImg2: Uint8Array[];
    courtImg3: Uint8Array[];
}

const Booking:React.FC<BookingProps> = ({courtid,username}) =>{

    let Jwttoken = sessionStorage.getItem('Jwttoken');
    const[courtfetch,setcourtfetch] = useState<CourtInfo>();
    const[Bookingfetch, setbookingfetch] = useState<BookingInfo[]>();


    return (
        <div>
            
        </div>
    )
}