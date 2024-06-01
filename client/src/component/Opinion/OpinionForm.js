import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocalState } from "../../util/useLocalStorage";
import axios from 'axios';

const OpinionForm=(props)=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const isBtnDisabled = !(rating && comment);

    function createOpinion() {
        const reqBody = {
            "carId": props.carId,
            "rating": rating,
            "comment": comment
        }

        axios.post(`/api/opinion/add`, reqBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then(() => window.location.reload(false))
        .catch(() => alert("Wystąpił nieoczekiwany błąd"));
    };

    function onSubmit (event) {
        event.preventDefault();
        createOpinion();
    };

    return(
        <form className="popup-form" onSubmit={onSubmit}>
            <div className="rating">
                <label>Ocena:</label>
                <ReactStars
                    isHalf={true}
                    onChange={(event) => setRating(event)}
                    size={24}
                />
            </div>
            <div>
                <label htmlFor="comment">Komentarz:</label>
            </div>
            <div>
                <textarea id="comment" value={comment} onChange={(event) => setComment(event.target.value)}/>
            </div>
            <div>
                <button className="button" disabled={isBtnDisabled}>Dodaj</button>
            </div>
        </form>
    );
}

export default OpinionForm;