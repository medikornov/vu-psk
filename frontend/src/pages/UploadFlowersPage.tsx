import React, { ChangeEvent, useState } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0Token } from "../clients/hook";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Form } from "react-bootstrap";
import { QuantityType } from "../clients/FlowersApiClient";

const SingleFileUpload = () => {
    const [file, setFile] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const handleUploadClick = () => {
        if (!file && !flowersApiClient && !auth0Token) {
            return;
        }

        flowersApiClient!.createItem(auth0Token!, {
            name,
            description,
            price,
            photo: file!,
            quantity,
            weight,
            quantityType: "Gram"
        });
    };
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    return (
        <div>
            <input type="text" placeholder="Name" onChange={(e) => {
                setName(e.target.value);
            }} />
            <input type="text" placeholder="Description" onChange={(e) => {
                setDescription(e.target.value);
            }} />
            <input type="number" placeholder="Price" onChange={(e) => {
                setPrice(parseInt(e.target.value));
            }} />
            <input type="number" placeholder="Quantity" onChange={(e) => {
                setQuantity(parseInt(e.target.value));
            }} />
            <input type="number" placeholder="Weight" onChange={(e) => {
                setWeight(parseInt(e.target.value));
            }} />
            <input type="file" onChange={handleFileChange} />
            <div>{file && `${file.name} - ${file.type}`}</div>
            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
};

export const UploadFlowersPage = () => {
    return (
        <div className='global'>
            <div className="upload-flowers-page">
                <Header />
                <div className="upload-flowers-body">
                    <div className="upload-flowers-body-text">

                        <div className="upload-flowers-body-text-title">Upload flowers</div>
                        <SingleFileUpload />
                        <div className="upload-flowers-text-about">{""}</div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};