import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import OpinionForm from './OpinionForm';
import Popup from '../Popup';
import PrivateComponent from '../../PrivateComponent';
import { useLocalState } from '../../util/useLocalStorage';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';

const Opinion=()=> {
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");

    const path = useLocation().pathname;
    const pathSplitted = path.split("/");
    const id = pathSplitted[5];
    const [page, setPage] = useState(path.split("/").at(6) ? path.split("/").at(6) : 1);

    const [pageData, setPageData] = useState([]);
    const [specs, setSpecs] = useState({});
    const [opinions, setOpinions] = useState([]);
    const [opinionsAvg, setOpinionsAvg] = useState();
    const [userOpinion, setUserOpinion] = useState();

    const navigate = useNavigate();

    const [newOpinionBtn, setNewOpinionBtn] = useState(false);

    function deleteOpinion(opinionId) {
        if (window.confirm("Jesteś pewien, że chcesz usunąć swoją opinię?")) {
            axios.delete(`/api/opinion/delete?opinionId=${opinionId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then(() => {
                alert("Opinia została usunięta");
                window.location.reload(false);
            }).catch(() => alert("Wystąpił nieoczekiwany błąd"));
        }
    }

    useEffect(() => {
        axios.get(`/api/car/specs?id=${id}`)
        .then((response) => setSpecs(response.data.car));

        axios.get(`/api/opinion/avg?carId=${id}`)
        .then((response) => setOpinionsAvg(response.data.rating));

        if (jwt) {
            axios.get(`/api/opinion/get?carId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((response) => setUserOpinion(response.data.opinion));
        }
    }, [id, jwt]);

    useEffect(() => {
        axios.get(`/api/opinion/list?carId=${id}&page=${page}`)
        .then((response) => setPageData(response.data));
    }, [id, page]);

    useEffect(() => {
        let opinions = pageData.opinions;
        if (opinions) {
            opinions.forEach(opinion => {
                if (opinion.userRole === "BANNED")
                    opinion.comment = "[Użytkownik zablokowany]"
            })
        }
        setOpinions(opinions);
    }, [pageData.opinions]);

    const handlePageClick = (event) => {
        setPage(event.selected+1);
        navigate(`/opinie/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${pathSplitted[5]}/${event.selected+1}`);
    };

    return (
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; </span>
                <Link to={`/opinie`}>Opinie</Link>
                <span> &gt; </span>
                <Link to={`/opinie/${pathSplitted[2]}`}>{specs.make}</Link>
                <span> &gt; </span>
                <Link to={`/opinie/${pathSplitted[2]}/${pathSplitted[3]}`}>{specs.model}</Link>
                <span> &gt; </span>
                <Link to={`/opinie/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}`}>{specs.generation}</Link>
                <span> &gt; {specs.trim} {specs.series}</span>
            </div>
            <h1 className='page-title'>Opinie {specs.make} {specs.model} {specs.generation} {specs.trim} {specs.series}</h1>
            <div className='content-wrapper'>
                <div className='sidebar'>
                    <div className='sidebar-element'>
                        <h4>Zobacz również</h4>
                        <div>
                            <Link to={`/dane-techniczne/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Dane techiczne</Link>
                        </div>
                        <div>
                            <Link to={`/raporty/${pathSplitted[2]}/${pathSplitted[3]}/${pathSplitted[4]}/${id}`}>Raporty spalania</Link>
                        </div>
                        <div>
                            <span>Opinie</span>
                        </div>
                    </div>
                    {!userOpinion && (
                        <div className='sidebar-element'>
                            <div>
                                <button onClick={() => setNewOpinionBtn(true)}>Dodaj własną opinię</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='main-container'>
                    <h2>Średnia ocena</h2>
                    <div className='rating-avg'>
                        {opinionsAvg ? opinionsAvg.toFixed(2) + "/5": "-"}
                    </div>
                    {userOpinion && (
                        <>
                        <h2>Twoja opinia</h2>
                        <div className='opinion'>
                            <div className='opinion-info-container'>
                                <div className='user-opinion-info'>
                                    <ReactStars
                                        isHalf={true}
                                        value={userOpinion.rating}
                                        edit={false}
                                        size={24}
                                    />
                                    <div className='details'> {userOpinion.creationDate} {userOpinion.username} </div>
                                </div>
                                <button onClick={() => deleteOpinion(userOpinion.opinionId)}>
                                    <img src='/trashbin.png' alt=''/>
                                </button>
                            </div>
                            <div className='opinion-notes'>
                                {userOpinion.comment}
                            </div>
                        </div>
                        </>
                    )}
                    <h2>Lista opinii</h2>
                    <div>
                        {opinions && opinions.map((opinion, index) => 
                            <div className='opinion' key={index}>
                                <div className='opinion-info'>
                                    <ReactStars
                                        isHalf={true}
                                        value={opinion.rating}
                                        edit={false}
                                        size={24}
                                    />
                                    <div className='details'> {opinion.creationDate} {opinion.username} </div>
                                </div>
                                <div className='opinion-notes'>
                                    {opinion.comment}
                                </div>
                            </div>
                        )}
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
            <Popup trigger={newOpinionBtn} setTrigger={setNewOpinionBtn}>
                <PrivateComponent roles={["ROLE_USER", "ROLE_ADMIN", "ROLE_PUBLICIST"]}>
                    <h4 className="popup-headline">Dodaj własną opinię:</h4>
                    <div className="popup-content">
                        <OpinionForm carId={id} setTrigger={setNewOpinionBtn}/>
                    </div>
                </PrivateComponent>
            </Popup>
        </main>
    )
}

export default Opinion;