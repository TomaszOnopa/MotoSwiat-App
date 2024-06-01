import './styles.css';

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";

const News=()=> {
    const path = useLocation().pathname;
    const [page, setPage] = useState(path.split("/").at(2) ? path.split("/").at(2) : 1);
    const [title, setTitle] = useState("");
    const [pageData, setPageData] = useState([]);
    let articleList;
    const navigate = useNavigate();

    useEffect(() => {
        if (title === "") {
            axios.get(`/api/article/list?page=${page}&size=5`)
            .then((response) => {
                setPageData(response.data)
            });
        }
        else
            fetchPageWithTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    function fetchPageWithTitle () {
        axios.get(`/api/article/list-by-title?page=${page}&size=5&title=${encodeURIComponent(title)}`)
        .then((response) => {
            setPageData(response.data)
        });
    };

    function searchByTitle (event) {
        event.preventDefault();
        setPage(1);
        navigate(`/wiadomosci`);
        fetchPageWithTitle();
    }
    
    const handlePageClick = (event) => {
        setPage(event.selected+1);
        navigate(`/wiadomosci/${event.selected+1}`);
    };

    if (pageData.articles) {
        articleList = pageData.articles.map((article, index) => 
            <div className='article-container shadow' key={index}>
                <Link to={`/artykul/${article.articleId}`}>
                    <div className='article-item content-wrapper'>
                        <div className='img'>
                            {article.image ?
                            <img src={`/img/${article.image}`} alt='' /> :
                            <img src={`/no-image.jpg`} alt='' />}
                        </div>
                        <h2 className='title'>
                            {article.title}
                        </h2>
                    </div>
                </Link>
            </div>
        );
    }

    return(
        <main className="container">
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; Wiadomości</span>
            </div>
            <h1 className='page-title'>Najnowsze wiadomości ze świata motoryzacji</h1>
            <form className='search-article-form' onSubmit={searchByTitle}>
                <input type="text" placeholder='Wpisz szukaną frazę' value={title} onChange={(event) => setTitle(event.target.value)}/>
                <button className='button'>Szukaj</button>
            </form>
            {articleList}
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
        </main>
    );
}

export default News;