import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const CarSpecs=()=> {
    const [specs, setSpecs] = useState({});
    const path = useLocation().pathname;
    const pathSplitted = path.split("/");
    const id = pathSplitted[5];

    useEffect(() => {
        axios.get(`/api/car/specs?id=${id}`)
        .then((response) => setSpecs(response.data.car));
    }, [id]);

    console.log(specs);
    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}`}>Dane techniczne</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}`}>{specs.make}</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}/${pathSplitted[3]}`}>{specs.model}</Link>
                <span> &gt; </span>
                <Link to={`/${pathSplitted[1]}/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}`}>{specs.generation}</Link>
                <span> &gt; {specs.trim} {specs.series}</span>
            </div>
            <h1 className='page-title'>Dane techniczne {specs.make} {specs.model} {specs.generation} {specs.trim} {specs.series}</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            <span>Dane techiczne</span>
                        </div>
                        <div>
                            <Link to={`/raporty/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Raporty spalania</Link>
                        </div>
                        <div>
                            <Link to={`/opinie/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Opinie</Link>
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    <div id='dimensions' className='specs-table-container'>
                        <table className='specs-table shadow' id='dimensions'>
                            <tr>
                                <th colSpan={2}>Wymiary</th>
                            </tr>
                            <tr>
                                <td>Długość</td>
                                <td>{specs.length ? specs.length + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Szerokość</td>
                                <td>{specs.width ? specs.width + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Wysokość</td>
                                <td>{specs.height ? specs.height + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Rozstaw osi</td>
                                <td>{specs.wheelbase ? specs.wheelbase + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Rozstaw kół - przód</td>
                                <td>{specs.frontTrack ? specs.frontTrack + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Rozstaw kół - tył</td>
                                <td>{specs.rearTrack ? specs.rearTrack + "mm" : "-"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='engine' className='specs-table-container'>
                        <table className='specs-table shadow'>
                            <tr>
                                <th colSpan={2}>Silnik</th>
                            </tr>
                            <tr>
                                <td>Typ silnika</td>
                                <td>{specs.engineType ? specs.engineType : "-"}</td>
                            </tr>
                            <tr>
                                <td>Pojemność</td>
                                <td>{specs.capacity ? specs.capacity + " cm³" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Moc</td>
                                <td>{specs.engineHp && specs.engineHpRpm ? specs.engineHp + " KM przy " + specs.engineHpRpm + " obr/min": "-"}</td>
                            </tr>
                            <tr>
                                <td>Maksymalny moment obrotowy</td>
                                <td>{specs.maximumTorque && specs.turnoverOfMaximumTorqueRpm ? specs.maximumTorque + " Nm przy " + specs.turnoverOfMaximumTorqueRpm + " obr/min": "-"}</td>
                            </tr>
                            <tr>
                                <td>Umieszczenie silnika</td>
                                <td>{specs.enginePlacement ? specs.enginePlacement : "-"}</td>
                            </tr>
                            <tr>
                                <td>Liczba cylindrów</td>
                                <td>{specs.numberOfCylinders ? specs.numberOfCylinders : "-"}</td>
                            </tr>
                            <tr>
                                <td>Układ cylindrów</td>
                                <td>{specs.cylinderLayout ? specs.cylinderLayout : "-"}</td>
                            </tr>
                            <tr>
                                <td>Liczba zaworów</td>
                                <td>{specs.valvesPerCylinder ? specs.valvesPerCylinder * specs.numberOfCylinders : "-"}</td>
                            </tr>
                            <tr>
                                <td>Stopień sprężenia</td>
                                <td>{specs.compressionRatio ? specs.compressionRatio : "-"}</td>
                            </tr>
                            <tr>
                                <td>Średnica cylindra x skok tłoka</td>
                                <td>{specs.cylinderBore && specs.strokeCycle ? specs.cylinderBore + " x " + specs.strokeCycle + "mm" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Typ wtrysku</td>
                                <td>{specs.injectionType ? specs.injectionType : "-"}</td>
                            </tr>
                            <tr>
                                <td>Doładowanie</td>
                                <td>{specs.boostType ? specs.boostType : "-"}</td>
                            </tr>
                            <tr>
                                <td>Obecność intercoolera</td>
                                <td>{specs.presenceOfIntercooler ? "tak" : "nie"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='drive' className='specs-table-container'>
                        <table className='specs-table shadow'>
                            <tr>
                                <th colSpan={2}>Napęd</th>
                            </tr>
                            <tr>
                                <td>Rodzaj napędu</td>
                                <td>{specs.driveWheels ? specs.driveWheels : "-"}</td>
                            </tr>
                            <tr>
                                <td>Rodzaj skrzyni biegów</td>
                                <td>{specs.transmission ? specs.transmission : "-"}</td>
                            </tr>
                            <tr>
                                <td>Liczba biegów</td>
                                <td>{specs.numberOfGears ? specs.numberOfGears : "-"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='suspension' className='specs-table-container'>
                        <table className='specs-table shadow'>
                            <tr>
                                <th colSpan={2}>Zawieszenie</th>
                            </tr>
                            <tr>
                                <td>Przednie</td>
                                <td>{specs.frontSuspension ? specs.frontSuspension : "-"}</td>
                            </tr>
                            <tr>
                                <td>Tylnie</td>
                                <td>{specs.backSuspension ? specs.backSuspension : "-"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='brakes' className='specs-table-container'>
                        <table className='specs-table shadow'>
                            <tr>
                                <th colSpan={2}>Hamulce</th>
                            </tr>
                            <tr>
                                <td>Hamulce przednie</td>
                                <td>{specs.frontBrakes ? specs.frontBrakes : "-"}</td>
                            </tr>
                            <tr>
                                <td>Hamulce tylnie</td>
                                <td>{specs.rearBrakes ? specs.rearBrakes : "-"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='mileage' className='specs-table-container'>
                        <table className='specs-table shadow'>
                            <tr>
                                <th colSpan={2}>Spalanie</th>
                            </tr>
                            <tr>
                                <td>Rodzaj paliwa</td>
                                <td>{specs.fuelGrade ? specs.fuelGrade : "-"}</td>
                            </tr>
                            <tr>
                                <td>Pojemność zbiornika paliwa</td>
                                <td>{specs.fuelTankCapacity ? specs.fuelTankCapacity + " l" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Zasięg &#40;miasto|autostrada&#41;</td>
                                <td>{specs.range ? specs.range + " km" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Emisja CO2</td>
                                <td>{specs.co2Emissions ? specs.co2Emissions + " g/km" : "-"}</td>
                            </tr>
                        </table>
                    </div>
                    <div id='performance' className='specs-table-container'>
                        <table className='specs-table'>
                            <tr>
                                <th colSpan={2}>Osiągi</th>
                            </tr>
                            <tr>
                                <td>Prędkość maksymalna</td>
                                <td>{specs.maxSpeed ? specs.maxSpeed + " km/h" : "-"}</td>
                            </tr>
                            <tr>
                                <td>Przyśpieszenie od 0 do 100km/h</td>
                                <td>{specs.acceleration ? specs.acceleration + " s" : "-"}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CarSpecs;