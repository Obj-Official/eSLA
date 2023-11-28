import{ useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../UtilsAndContext/Contextprovider";
import {IoCaretDown, IoHelpCircleSharp} from "react-icons/io5";

const Header =()=>{
    const {user, official, setOfficial, logoutUser, openedDocument} = useContext(AuthContext);
    const [drop, setDrop] = useState(false);
    const showDropdown =()=> setDrop((prev)=>!prev);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/official/?query=${user?.username}`)
        .then(response => {
            setOfficial(response.data);
          })
          .catch(error => {
            console.error(error);
          })
    },[user]);

    const navigateToAuthenticate=()=> navigate('/authenticate');
    
    return(
        <div>
            {/* {official.email}{user.username} */}
            <div id='Nav'>
                <span id="Navleft">eSLA</span>
                <div id="Navright">
                    <div onClick={showDropdown}>
                    <span className="sb admin">{user?official.isProcessingOfficer?'Processing Officer':'admin':'Athenticate'}<IoCaretDown/></span>
                    {drop && (
                        <div id="admin-options">
                            {user?<span className="sb" onClick={logoutUser}>Logout</span>:<span className="sb" onClick={navigateToAuthenticate}>Login</span>}<hr/>
                            <span className="sb">{official.isProcessingOfficer?'Signatories':'Contact PO'}</span>
                        </div>)}
                    </div>
                    <span className="sb help" onClick={()=>window.alert('This is an electronic SLA V.1.0.5; A webapp designed to sign SLA document online')}><IoHelpCircleSharp/></span>
                </div>
            </div>
        </div>
    )
}

export default Header;