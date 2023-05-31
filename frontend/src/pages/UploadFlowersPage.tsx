import React, { ChangeEvent, useState } from "react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { useCreateItem } from "../clients/hook";
import { Button } from "react-bootstrap";
import "./UploadFlowersPage.scss";
import { ToastMessage } from "../components/toasts/Toast";

const SingleFileUpload = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const uploadItem = useCreateItem();
    const handleUploadClick = () => {
        if (!file && !uploadItem.isLoading) {
            return;
        }

        uploadItem.mutate({
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
                <input type="text" placeholder="Description" className="upload-page-body-input" onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <input type="number" placeholder="Price" className="upload-page-body-input" onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                }} />
                <input type="number" placeholder="Quantity" className="upload-page-body-input" onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                }} />
                <input type="number" placeholder="Weight" className="upload-page-body-input" onChange={(e) => {
                    setWeight(parseInt(e.target.value));
                }} />
                <input type="file" className="upload-page-body-file-input" onChange={handleFileChange} />
                <div>
                    {file && `${file.name} - ${file.type}`}
                </div>
                <div className="upload-page-body-button">
                    <Button disabled={uploadItem.isLoading} onClick={handleUploadClick}>Upload</Button>
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
                        <SingleFileUpload />
                    </div>
                </div>
                <ToastMessage />
                <Footer />
            </div>
        </div>
    );
};