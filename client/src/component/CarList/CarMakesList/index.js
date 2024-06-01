import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const CarMakesList=(props)=> {
    const [brands, setBrands] = useState([])
    const path = useLocation().pathname;

    useEffect(() => {
        axios.get(`/api/car/brands`)
        .then((response) => setBrands(response.data.carMakes))
    }, []);

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; {props.title}</span>
            </div>
            <h1 className='page-title'>{props.title} - Wybierz markę</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            {props.title === "Dane techniczne" ? <span>Dane techniczne</span> : <Link to={`/dane-techniczne`}>Dane techiczne</Link>}
                        </div>
                        <div>
                            {props.title === "Raporty spalania" ? <span>Raporty spalania</span> : <Link to={`/raporty`}>Raporty spalania</Link>}
                        </div>
                        <div>
                            {props.title === "Opinie" ? <span>Opinie</span> : <Link to={`/opinie`}>Opinie</Link>}
                        </div>
                    </div>
                </div>
                <div className="make-container">
                    {brands.map((brand, index) => 
                        <div className="make-wrapper" key={index}>
                            <Link className="make-item shadow" to={`${path}/${encodeURIComponent(brand)}`}>
                                {brand}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default CarMakesList;