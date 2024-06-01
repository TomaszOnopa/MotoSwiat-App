import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import NoPage from "./component/ErrorPages/NoPage";
import Forbidden from "./component/ErrorPages/Forbidden";
import Home from "./component/Home";
import News from "./component/News";
import NewsArticle from './component/NewsArticle';
import CarMakesList from './component/CarList/CarMakesList';
import CarModelsList from './component/CarList/CarModelsList';
import CarGenerationsList from './component/CarList/CarGenerationsList';
import CarVersionsList from './component/CarList/CarVersionsList';
import CarSpecs from './component/CarSpecs';
import Opinion from './component/Opinion';
import MileageReports from './component/MileageReports';
import Login from './component/Login';
import Register from './component/Register';
import AdminPage from './component/AdminPage';
import PrivateComponent from './PrivateComponent';

const App=()=> {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/wiadomosci" element={<News/>}/>
          <Route path="/wiadomosci/:page" element={<News/>}/>
          <Route path="/artykul/:id" element={<NewsArticle/>}/>
          <Route path='/dane-techniczne' element={<CarMakesList title="Dane techniczne"/>}/>
          <Route path='/dane-techniczne/:make' element={<CarModelsList title="Dane techniczne"/>}/>
          <Route path='/dane-techniczne/:make/:model' element={<CarGenerationsList title="Dane techniczne"/>}/>
          <Route path='/dane-techniczne/:make/:model/:generation' element={<CarVersionsList title="Dane techniczne"/>}/>
          <Route path='/dane-techniczne/:make/:model/:generation/:id' element={<CarSpecs/>}/>
          <Route path='/opinie' element={<CarMakesList title="Opinie"/>}/>
          <Route path='/opinie/:make' element={<CarModelsList title="Opinie"/>}/>
          <Route path='/opinie/:make/:model' element={<CarGenerationsList title="Opinie"/>}/>
          <Route path='/opinie/:make/:model/:generation' element={<CarVersionsList title="Opinie"/>}/>
          <Route path='/opinie/:make/:model/:generation/:id' element={<Opinion/>}/>
          <Route path='/opinie/:make/:model/:generation/:id/:page' element={<Opinion/>}/>
          <Route path='/raporty' element={<CarMakesList title="Raporty spalania"/>}/>
          <Route path='/raporty/:make' element={<CarModelsList title="Raporty spalania"/>}/>
          <Route path='/raporty/:make/:model' element={<CarGenerationsList title="Raporty spalania"/>}/>
          <Route path='/raporty/:make/:model/:generation' element={<CarVersionsList title="Dane techniczne"/>}/>
          <Route path='/raporty/:make/:model/:generation/:id' element={<MileageReports/>}/>
          <Route path='/raporty/:make/:model/:generation/:id/:page' element={<MileageReports/>}/>
          <Route path='/raporty/:make/:model/:generation/:id/dodaj'/>
          <Route path='/zaloguj' element={<Login/>}/>
          <Route path='/zarejestruj' element={<Register/>}/>
          <Route path='/403' element={<Forbidden/>}/>
          <Route path='/admin' element={
            <PrivateComponent roles={["ROLE_ADMIN"]}>
              <AdminPage/>
            </PrivateComponent>
          }/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
