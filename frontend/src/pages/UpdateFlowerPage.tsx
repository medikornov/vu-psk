import React, { ChangeEvent, useMemo, useState } from 'react';
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { useCreateItem, useItem, useUpdateItem } from "../clients/hook";
import { Button } from "react-bootstrap";
import "./UpdateFlowerPage.scss";
import { ToastMessage } from "../components/toasts/Toast";
import { useParams } from "react-router-dom";
import { Item } from "../clients/FlowersApiClient";
import { IoIosRose } from "react-icons/io";


const UpdateFlower = ({ item: loadedItem }: { item: Item }) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const updateItem = useUpdateItem(loadedItem.itemId);
    const handleUploadClick = (override: boolean) => {
        if (updateItem.isLoading) {
            return;
        }

        updateItem.mutate({
            name,
            description,
            price,
            photo: file,
            quantity,
            weight,
            quantityType: "Gram",
            version: loadedItem.version,
            isOverride: override,
        });
    };
    const [name, setName] = useState<string>(loadedItem.name);
    const [description, setDescription] = useState<string>(loadedItem.description);
    const [price, setPrice] = useState<number>(loadedItem.price);
    const [quantity, setQuantity] = useState<number>(loadedItem.quantity);
    const [weight, setWeight] = useState<number>(loadedItem.weight);

    const canUpdate = useMemo(() => {
        return (
            name !== loadedItem.name ||
            description !== loadedItem.description ||
            price !== loadedItem.price ||
            quantity !== loadedItem.quantity ||
            weight !== loadedItem.weight ||
            !!file)
    }, [name, description, price, quantity, weight, file])

    return (
        <div className="update-page">
            <div className="update-page-body">
                <div className="update-page-body-title">
                    Update flower
                </div>
                <label className="update-page-body-label">Name:</label>
                <input type="text" placeholder={"Name"} className="update-page-body-input" value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
                <label className="update-page-body-label">Description:</label>
                <input type="text" placeholder={"Description"} className="update-page-body-input" value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <label className="update-page-body-label">Price:</label>
                <input type="number" placeholder={"Price"} className="update-page-body-input" value={price} onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                }} />
                <label className="update-page-body-label">Quantity:</label>
                <input type="number" placeholder={"Quantity"} className="update-page-body-input" value={quantity} onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                }} />
                <label className="update-page-body-label">Weight:</label>
                <input type="number" placeholder={"Weight"} className="update-page-body-input" value={weight} onChange={(e) => {
                    setWeight(parseInt(e.target.value));
                }} />
                <label className="update-page-body-label">Image:</label>
                <input type="file" className="update-page-body-file-input" onChange={handleFileChange} />
                <div>
                    {file && `${file.name} - ${file.type}`}
                </div>
                <div className="update-page-body-button">
                    <Button disabled={!canUpdate || updateItem.isLoading || !loadedItem} onClick={() => handleUploadClick(false)}>Update</Button>
                </div>
            </div>
            <ToastMessage showToast={updateItem.isError} message="Refresh page or override." buttonCb={() => handleUploadClick(true)}/>
        </div>
    );
};

const CurrentFlower = ({ item }: { item: Item }) => {
    return (
        <>
            <div className="update-page-body-flower-title">
                Your prepared flower!
            </div>
            <div className="update-page-container">
                <div className="update-page-body-text">
                    <div className="update-page-body-text-info">
                        <span className="update-page-body-text-title">
                            <IoIosRose />
                            {item.name}
                        </span>
                        <span className="update-page-body-text-quantity"> Sale: {item.quantity}</span>
                    </div>
                    <div className="update-page-body-text-description">
                        {item.description}
                    </div>
                    <div className="update-page-body-text-price">
                        {item.price + "$"}
                    </div>
                </div>
                <div className="update-page-body-img">
                    <img
                        src={`data:${item.photoContentType};base64,${item.photoContent}`}
                        alt={item.photoName}
                    />
                </div>
            </div>
        </>
    );
};

export const UpdateFlowerPage = () => {
    const { id: itemId } = useParams();
    const item = useItem(itemId);
    return (
        <div className='global'>
            <div className="update-page">
                <Header />
                <div className="update-page-body">
                    <div className="update-page-body-text">
                        {item && <UpdateFlower item={item} />}
                    </div>
                    {item && <CurrentFlower item={item} />}
                </div>
            </div>
        </div>
    );
}