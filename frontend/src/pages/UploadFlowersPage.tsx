import React, { ChangeEvent, useState } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { useAuth0Token } from "../clients/hook";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Button, Form } from "react-bootstrap";
import "./UploadFlowersPage.scss";

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
        <div className="upload-page">
            <div className="upload-page-body">
                <div className="upload-page-body-title">
                    Upload flower
                </div>
                <input type="text" placeholder="Name" className="upload-page-body-input" onChange={(e) => {
                    setName(e.target.value);
                }} />
                <input type="text" placeholder="Description" className="upload-page-body-input"  onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <input type="number" placeholder="Price" className="upload-page-body-input"  onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                }} />
                <input type="number" placeholder="Quantity" className="upload-page-body-input"  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                }} />
                <input type="number" placeholder="Weight" className="upload-page-body-input"  onChange={(e) => {
                    setWeight(parseInt(e.target.value));
                }} />
                <input type="file" className="upload-page-body-file-input"  onChange={handleFileChange} />
                    <div>
                        {file && `${file.name} - ${file.type}`}
                    </div>
                <div className="upload-page-body-button">
                    <Button onClick={handleUploadClick}>Upload</Button>
                </div>
            </div>
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