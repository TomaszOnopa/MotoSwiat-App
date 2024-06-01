import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const CarGenerationsList=(props)=> {
    const [gens, setGens] = useState([]);
    const path = useLocation().pathname;
    const pathSplitted = path.split("/");
    const make = pathSplitted[2];
    const model = pathSplitted[3];

    useEffect(() => {
        axios.get(`/api/car/generations?make=${make}&model=${model}`)
        .then((response) => setGens(response.data.carGenerations))
        .catch(() => window.location.href = "/404");
    }, [make, model]);

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}`}>{props.title}</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}`}>{decodeURIComponent(make)}</Link>
                <span> &gt; {decodeURIComponent(model)}</span>
            </div>
            <h1 className='page-title'>{props.title} {decodeURIComponent(make)} {decodeURIComponent(model)} - Wybierz generację</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            {props.title === "Dane techniczne" ? <span>Dane techniczne</span> : <Link to={`/dane-techniczne/${make}/${model}`}>Dane techiczne</Link>}
                        </div>
                        <div>
                            {props.title === "Raporty spalania" ? <span>Raporty spalania</span> : <Link to={`/raporty/${make}/${model}`}>Raporty spalania</Link>}
                        </div>
                        <div>
                            {props.title === "Opinie" ? <span>Opinie</span> : <Link to={`/opinie/${make}/${model}`}>Opinie</Link>}
                        </div>
                    </div>
                </div>
                <div className="gen-container">
                    {gens.map((gen, index) => 
                        <div className="gen-wrapper" key={index}>
                            <Link className="gen-item shadow" to={`${path}/${encodeURIComponent(gen.generation)}`}>
                                <img
                                    src={`/img/cars/${make}/${model}/${gen.generation.replace(" ","-")}.jpg`}
                                    alt=''
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src="/no-image.jpg";
                                    }}/>
                                <div>{gen.generation}<br/> &#40;{gen.yearFrom} - {gen.yearTo}&#41;</div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CarGenerationsList;