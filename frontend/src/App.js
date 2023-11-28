import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Alldocuments from './Pages/Alldocuments';
import Document from "./Pages/Document";
import Signature from "./Pages/Signature";
import Submit from "./Pages/Submit";
import SLAProcessing from "./Pages/SLAProcessing";
import Authenticate from "./Components/Authenticate";
import PrivateRoute from "./UtilsAndContext/Privateroute";
import SignedDocument from "./Pages/SignedDocument";
import { AuthProvider } from './UtilsAndContext/Contextprovider';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <AuthProvider>
       <Header/>
          <Routes>
              <Route path='/' element={<PrivateRoute><Alldocuments/></PrivateRoute>}/>
              <Route path="/authenticate" element={<Authenticate/>}/>
              <Route path='/document' element={<PrivateRoute><Document/></PrivateRoute>}/>
              <Route path='/sign' element={<PrivateRoute><Signature/></PrivateRoute>}/>
              <Route path='/signed-document' element={<PrivateRoute><SignedDocument/></PrivateRoute>}/>
              <Route path='/submit' element={<PrivateRoute><Submit/></PrivateRoute>}/>
              <Route path='/SLAprocessing' element={<PrivateRoute><SLAProcessing/></PrivateRoute>}/>
          </Routes>
          </AuthProvider>
        </BrowserRouter> 
    </div>
  );
}

export default App;
