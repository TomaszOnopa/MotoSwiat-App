import './styles.css';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const CarVersionsList=(props)=> {
    const [versions, setVersions] = useState([]);
    const path = useLocation().pathname;
    const pathSplitted = path.split("/");
    const make = pathSplitted[2];
    const model = pathSplitted[3];
    const generation = pathSplitted[4];

    useEffect(() => {
        axios.get(`/api/car/versions?make=${make}&model=${model}&generation=${generation}`)
        .then((response) => setVersions(response.data.carVersions))
        .catch(() => window.location.href = "/404");
    }, [make, model, generation]);

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}`}>{props.title}</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}`}>{decodeURIComponent(make)}</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}/${pathSplitted[3]}`}>{decodeURIComponent(model)}</Link>
                <span> &gt; {decodeURIComponent(generation)}</span>
            </div>
            <h1 className='page-title'>{props.title} {decodeURIComponent(make)} {decodeURIComponent(model)} {decodeURIComponent(generation)} - Wybierz wersję</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            {props.title === "Dane techniczne" ? <span>Dane techniczne</span> : <Link to={`/dane-techniczne/${make}/${model}/${generation}`}>Dane techiczne</Link>}
                        </div>
                        <div>
                            {props.title === "Raporty spalania" ? <span>Raporty spalania</span> : <Link to={`/raporty/${make}/${model}/${generation}`}>Raporty spalania</Link>}
                        </div>
                        <div>
                            {props.title === "Opinie" ? <span>Opinie</span> : <Link to={`/opinie/${make}/${model}/${generation}`}>Opinie</Link>}
                        </div>
                    </div>
                </div>
                <div className="version-container">
                    {versions.map((version, index) => 
                        <div className="version-wrapper" key={index}>
                            <Link className="version-item shadow" to={`${path}/${version.id}`}>{version.trim} {version.series}</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CarVersionsList;