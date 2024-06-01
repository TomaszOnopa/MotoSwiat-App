import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useLocalState } from '../../util/useLocalStorage';
import Popup from '../Popup';
import ReportForm from './ReportForm';
import PrivateComponent from '../../PrivateComponent';
import axios from 'axios';

const MileageReports=()=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const path = useLocation().pathname;
    const pathSplitted = path.split("/");
    const id = pathSplitted[5];
    const [page, setPage] = useState(path.split("/").at(6) ? path.split("/").at(6) : 1);

    const [pageData, setPageData] = useState([]);
    const [specs, setSpecs] = useState({});
    const [reports, setReports] = useState([]);
    const [reportsAvg, setReportsAvg] = useState({});
    const [userReports, setUserReports] = useState();
    const [fuelType, setFuelType] = useState("fuel-other");
    
    const navigate = useNavigate();

    const [newReportBtn, setNewReportBtn] = useState(false);

    function deleteReport(reportId) {
        if (window.confirm("Jesteś pewien, że chcesz usunąć swój raport?")) {
            axios.delete(`/api/fuel/delete?reportId=${reportId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then(() => {
                alert("Raport został usunięty");
                window.location.reload(false);
            }).catch(() => alert("Wystąpił nieoczekiwany błąd"));
        }
    }

    useEffect(() => {
        axios.get(`/api/car/specs?id=${id}`)
        .then((response) => setSpecs(response.data.car));

        axios.get(`/api/fuel/avg?carId=${id}`)
        .then((response) => setReportsAvg(response.data));

        if (jwt) {
            axios.get(`/api/fuel/users-list?carId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((response) => setUserReports(response.data.mileageReports))
        }
    }, [id, jwt]);
    useEffect(() => {
        axios.get(`/api/fuel/list?carId=${id}&page=${page}`)
        .then((response) => setPageData(response.data));
    }, [id, page]);

    useEffect(() => {
        let reports = pageData.mileageReports;
        if (reports) {
            reports.forEach(report => {
                if (report.userRole === "BANNED")
                    report.notes = "[Użytkownik zablokowany]"
            })
        }
        setReports(reports);
    }, [pageData.mileageReports]);

    useEffect(() => {
        switch (specs.engineType) {
            case "benzynowy":
                setFuelType("fuel-petrol");
                break;
            case "diesel":
                setFuelType("fuel-diesel");
                break;
            default:
                setFuelType("fuel-other");
        }
    }, [specs.engineType]);

    const handlePageClick=(event) => {
        setPage(event.selected+1);
        navigate(`/raporty/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${pathSplitted[5]}/${event.selected+1}`);
    };

    const ReportsList=() => {
        if (reports) {
            return(
                reports.map((report, index) => 
                    <div className='report' key={index}>
                        <div className='report-info'>
                            <span className='report-value'> {report.mileage}l </span>
                            <span> {report.creationDate}, Tryb {report.type.toLowerCase()}, {report.username}</span>
                        </div>
                        {report.notes && (
                            <div className='report-notes'>
                                {report.notes}
                            </div>
                        )}
                    </div>
                )
            )
        }
    };
    const UserReports=() => {
        if (userReports && userReports.length > 0) {
            return(
                <>
                    <h2>
                        Twoje raporty
                    </h2>
                    {userReports.map((report) => 
                        <div className='report' key={report.reportId}>
                            <div className='report-info'>
                                <span className='report-value'> {report.mileage}l </span>
                                <span> {report.creationDate}, Tryb {report.type.toLowerCase()}</span>
                                <button onClick={() => deleteReport(report.reportId)}>
                                    <img src='/trashbin.png' alt=''/>
                                </button>
                            </div>
                            {report.notes && (
                            <div className='report-notes'>
                                {report.notes}
                            </div>
                            )}
                        </div>
                    )}
                </>
            )
        }
    };

    return (
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/raporty`}>Raporty spalania</Link>
                <span> &gt; </span>
                <Link to={`/raporty/${pathSplitted[2]}`}>{specs.make}</Link>
                <span> &gt; </span>
                <Link to={`/raporty/${pathSplitted[2]}/${pathSplitted[3]}`}>{specs.model}</Link>
                <span> &gt; </span>
                <Link to={`/raporty/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}`}>{specs.generation}</Link>
                <span> &gt; {specs.trim} {specs.series}</span>
            </div>
            <h1 className='page-title'>Raporty spalania {specs.make} {specs.model} {specs.generation} {specs.trim} {specs.series}</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>
                            Zobacz również
                        </h4>
                        <div>
                            <Link to={`/dane-techniczne/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Dane techiczne</Link>
                        </div>
                        <div>
                            <span>Raporty spalania</span>
                        </div>
                        <div>
                            <Link to={`/opinie/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Opinie</Link>
                        </div>
                    </div>
                    <div className='sidebar-element'>
                        <div>
                            <button onClick={() => setNewReportBtn(true)}>Dodaj własny raport</button>
                        </div>
                    </div>
                </div>
                <div className='main-container'>
                    <div className='fuel-table-container'>
                        <table className="fuel-table">
                            <tr>
                                <th className={fuelType} colSpan="3">
                                    Deklaracja producenta
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Tryb miejski
                                    <br/>
                                    {specs.cityFuel ? (specs.cityFuel.toFixed(1)) : ("Brak danych")}
                                </td>
                                <td>
                                    Tryb mieszany
                                    <br/>
                                    {specs.mixedFuelConsumption ? (specs.mixedFuelConsumption.toFixed(1)) : ("Brak danych")}
                                </td>
                                <td>
                                    Tryb pozamiejski
                                    <br/>
                                    {specs.highwayFuel ? (specs.highwayFuel.toFixed(1)) : ("Brak danych")}
                                </td>
                            </tr>
                            <tr>
                                <th className={fuelType} colSpan="3">
                                    Średnia raportów
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    Tryb miejski
                                    <br/>
                                    {reportsAvg.Miejski ? (reportsAvg.Miejski.toFixed(1)) : ("Brak danych")}
                                </td>
                                <td>
                                    Tryb mieszany
                                    <br/>
                                    {reportsAvg.Mieszany ? (reportsAvg.Mieszany.toFixed(1)) : ("Brak danych")}
                                </td>
                                <td>
                                    Tryb pozamiejski
                                    <br/>
                                    {reportsAvg.Pozamiejski ? (reportsAvg.Pozamiejski.toFixed(1)) : ("Brak danych")}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <UserReports/>
                    <h2>
                        Lista raportów
                    </h2>
                    <div>
                        <ReportsList/>
                    </div>
                    <div className='pagination-container'>
                        <ReactPaginate
                            previousLabel="<"
                            breakLabel="..."
                            nextLabel=">"
                            pageCount={pageData.totalPages}
                            forcePage={page-1}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageClick}
                            renderOnZeroPageCount={null}
                            pageLinkClassName="pagination-link"
                            previousLinkClassName="pagination-link"
                            nextLinkClassName="pagination-link"
                            breakLinkClassName="pagination-link"
                            containerClassName="pagination"
                        />
                    </div>
                </div>
            </div>
            <Popup trigger={newReportBtn} setTrigger={setNewReportBtn}>
                <PrivateComponent roles={["ROLE_USER", "ROLE_ADMIN", "ROLE_PUBLICIST"]}>
                    <h4 className="popup-headline">Dodaj własny raport:</h4>
                    <div className="popup-content">
                        <ReportForm carId={id} setTrigger={setNewReportBtn}/>
                    </div>
                </PrivateComponent>
            </Popup>
        </main>
    )
}

export default MileageReports;