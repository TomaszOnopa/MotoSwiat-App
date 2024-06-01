import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const CarModelsList=(props)=> {
    const [models, setModels] = useState([]);
    const path = useLocation().pathname;
    const make = path.split("/")[2];
    
    useEffect(() => {
        axios.get(`/api/car/models?make=${make}`)
        .then((response) => setModels(response.data.carModels))
        .catch(() => window.location.href = "/404");
    }, [make]);
    
    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/${path.split("/")[1]}`}>{props.title}</Link>
                <span> &gt; {decodeURIComponent(make)}</span>
            </div>
            <h1 className='page-title'>{props.title} {decodeURIComponent(make)} - Wybierz model</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            {props.title === "Dane techniczne" ? <span>Dane techniczne</span> : <Link to={`/dane-techniczne/${make}`}>Dane techiczne</Link>}
                        </div>
                        <div>
                            {props.title === "Raporty spalania" ? <span>Raporty spalania</span> : <Link to={`/raporty/${make}`}>Raporty spalania</Link>}
                        </div>
                        <div>
                            {props.title === "Opinie" ? <span>Opinie</span> : <Link to={`/opinie/${make}`}>Opinie</Link>}
                        </div>
                    </div>
                </div>
                <div className="model-container">
                    {models.map((model, index) => 
                        <div className="model-wrapper" key={index}>
                            <Link className="model-item shadow" to={`${path}/${encodeURIComponent(model)}`}>{model}</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CarModelsList;