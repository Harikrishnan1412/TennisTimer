import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AddCourtProps = {

}

const RequiredIndicator = () => <span style={{ color: 'red' }}>*</span>;

const AddCourt = () => {
    const navigate = useNavigate();

    let Jwttoken = sessionStorage.getItem('Jwttoken');
    const [ErrorMessage, setErrorMessage] = useState<string>('')

    type courtFormData = {
        courtName: string;
        courtLocation: string;
        // courtImg1: Uint8Array[];
        // courtImg2: Uint8Array[];
        // courtImg3: Uint8Array[];
    }

    const [courtInfo, setcourtInfo] = useState<courtFormData>({
        courtName: '',
        courtLocation: ''
    });

    const [images, setImages] = useState<{ [key: string]: File | null }>({
        CourtImg1: null,
        CourtImg2: null,
        CourtImg3: null,
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setErrorMessage(''); // Clear error message when the user types
        //Pass previous data in function and update the necessary value "Name" and keep the "Password" and "Conform password" same
        setcourtInfo((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleimage = (event: React.ChangeEvent<HTMLInputElement>,
        key: string) => {
        const selectedImage = event.target.files && event.target.files[0];
        console.log(key);
        setImages((prevImages) => ({ ...prevImages, [key]: selectedImage }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
    
        for (const key in images) {
            const image = images[key];
            if (image) {
                formData.append(key, image);
            }
        }
    
        formData.append('CourtName', courtInfo.courtName);
        formData.append('CourtLocation', courtInfo.courtLocation);
    
        // Upload Data using fetch
        fetch("http://localhost:5194/api/Courts/PostCourt", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + Jwttoken,
            },
            body: formData
        })
        .then((res) => {
            return res;
        })
        .then((resp) => {
            if (resp.ok) {
                console.log('Images and text inputs uploaded successfully');
                toast.success("Court Added Sucessfully !!!");
                navigate('/Admin');
            } else {
                console.error('Failed to upload images and text inputs');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Add Court Form</h2>-
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Court Name:<RequiredIndicator /></label>
                                        <input
                                            type="text"
                                            name="courtName"
                                            // value={courtInfo.courtName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Court Location:<RequiredIndicator /></label>
                                        <input
                                            type="text"
                                            name="courtLocation"
                                            // value={courtInfo.courtLocation}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Court Image 1:<RequiredIndicator /></label>
                                        <input
                                            type="file"
                                            name="courtImg1"
                                            onChange={(e) => handleimage(e, 'courtImg1')}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Court Image 2:<RequiredIndicator /></label>
                                        <input
                                            type="file"
                                            name="courtImg2"
                                            onChange={(e) => handleimage(e, 'courtImg2')}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Court Image 3:<RequiredIndicator /></label>
                                        <input
                                            type="file"
                                            name="courtImg3"
                                            onChange={(e) => handleimage(e, 'courtImg3')}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                    {ErrorMessage && (
                                        <p className="text-danger mt-2">{ErrorMessage}</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {loading && (<img className="mx-auto" src="https://i.stack.imgur.com/hzk6C.gif" />)} */}
            </div>
        </div>
    )
}
export default AddCourt;