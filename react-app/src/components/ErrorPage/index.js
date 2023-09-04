import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import "./ErrorPage.css"

export default function ErrorPage() {
    const {error} = useParams();
    const [header, setHeader] = useState("")

    useEffect(() => {
        if (error === "not-logged-in") {
            setHeader("You must be logged in to do this!")
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="error-container">
            <h1> Welp... There seems to be an error:</h1>
            <div className="error-message">
            <h1>{header}</h1>
            </div>
        </div>
    );
}
