import './styles.css';

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLocalState } from "../../util/useLocalStorage";
import { parseJwt } from '../../util/parseJwt';
import { Link } from 'react-router-dom';
import axios from 'axios'

const AdminPage=()=>{
    // eslint-disable-next-line no-unused-vars
    const [jwt, setJwt] = useLocalState("", "jwt");
    const adminUsername = parseJwt(jwt).sub;

    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const [users, setUsers] = useState([]);
    const filtredUsers = users.filter((user) => user.username !== adminUsername);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (jwt) {
            if (username === "") {
                axios.get(`/api/admin/user-list?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }).then((response) => {
                    setPageData(response.data);
                    setUsers(response.data.users);
                }).catch(() => {
                    alert("Wystąpił nieoczekiwany błąd");
                });
            }
            else
                fetchPageWithUsername();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt, page]);

    function fetchPageWithUsername () {
        axios.get(`/api/admin/user-list-by-username?page=${page}&username=${encodeURIComponent(username)}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }).then((response) => {
            setPageData(response.data);
            setUsers(response.data.users);
        }).catch(() => {
            alert("Wystąpił nieoczekiwany błąd");
        });
    };

    function searchByUsername () {
        setPage(1);
        fetchPageWithUsername();
    }

    function changeRole (userId, username, role) {
        if (window.confirm(`Jesteś pewien, że chcesz zmienić rolę użytkownika ${username}?`)) {
            const reqBody = {
                "userId": userId,
                "role": role,
            }

            axios.post(`/api/admin/change-user-role`, reqBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(() => alert(`Rola użytkownika ${username} została zmieniona na ${role}`))
            .catch(() => {
                alert("Coś poszło nie tak");
            });
        }
    };

    const handlePageClick = (event) => {
        setPage(event.selected+1);
    };

    const userList = filtredUsers.map((user) => 
        <div className='user-list-item' key={user.userId}>
            <div className='username'>{user.username}</div>
            <select className='role' defaultValue={user.role} onChange={(event) => user.role=event.target.value}>
                <option value="USER">Użytkownik</option>
                <option value="BANNED">Zablokowany</option>
                <option value="ADMIN">Administrator</option>
                <option value="PUBLICIST">Publicysta</option>
            </select>
            <button className='button' type='button' onClick={() => changeRole(user.userId, user.username, user.role)}>Zatwierdź</button>
        </div>
    );
    return(
        <main className='container'>
            <div className='breadcrumbs'>
                <Link to='/'>MotoŚwiat</Link>
                <span> &gt; Lista użytkowników</span>
            </div>
            <div className='content-wrapper'>
                <div className='form'>
                    <h1>Lista użytkowników</h1>
                    <div>
                        <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
                        <button className='user-search-button' type='button' onClick={() => searchByUsername()}>Szukaj</button>
                    </div>
                    <div style={{display: "inline"}}>
                        {userList}
                    </div>
                    <div className='pagination-container'>
                        <ReactPaginate
                            previousLabel="<"
                            breakLabel="..."
                            nextLabel=">"
                            pageCount={pageData.totalPages}
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
        </main>
    )
}

export default AdminPage;