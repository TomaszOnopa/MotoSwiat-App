import { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import axios from 'axios';

const ReportForm=(props)=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [mileage, setMileage] = useState(null);
    const [mileageType, setMileageType] = useState(null);
    const [notes, setNotes] = useState(null);

    const isBtnDisabled = !(mileage && mileageType);

    function createReport() {
        const reqBody = {
            "carId": props.carId,
            "mileage": mileage,
            "type": mileageType,
            "notes": notes
        }

        axios.post(`/api/fuel/add`, reqBody, {
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
        createReport();
    };

    return(
        <form className="popup-form" onSubmit={onSubmit}>
            <div>
                <label htmlFor="mileage">Spalanie na 100km:</label>
                <input type="number" id="mileage" min={0.1} max={100} step={0.1} value={mileage} onChange={(event) => setMileage(event.target.value)}/>
            </div>
            <div>
                <label htmlFor="type">Tryb:</label>
                <select id="type" onChange={(event) => setMileageType(event.target.value)}>
                    <option style={{display:"none"}}/>
                    <option value="Miejski">Miejski</option>
                    <option value="Mieszany">Mieszany</option>
                    <option value="Pozamiejski">Pozamiejski</option>
                </select>
            </div>
            <div>
                <label htmlFor="notes">Komentarz:</label>
            </div>
            <div>
                <textarea id="notes" value={notes} onChange={(event) => setNotes(event.target.value)}/>
            </div>
            <div>
                <button className="button" disabled={isBtnDisabled}>Dodaj</button>
            </div>
        </form>
    );
}

export default ReportForm;