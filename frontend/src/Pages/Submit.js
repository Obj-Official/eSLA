import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../UtilsAndContext/Contextprovider";
import axios from "axios";

const Submit =()=>{
    const{openedDocument, setOpenedDocument} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/getDocument/?query=${openedDocument?.document_id}`)
        .then(response => {
            setOpenedDocument(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },[openedDocument])

    function submitDocument() {
        axios.put(`http://127.0.0.1:8000/updateDocument/?query=${openedDocument?.document_id}`, {
           submitted: true
        } )
        .then((response) => {
        setOpenedDocument(response.data);
        });
        window.alert("Document Submited Successfully!");
        navigate('/');
       }

    return(
        <div>
            <center>
            <div className="submit-top spacesb" align="left">
                <center>
                    <h3>Signing for {openedDocument.document_title}</h3>
                <div className="submit-sgn"><span>Legal Department Signature</span> <span>Added</span></div>
                <div className="submit-sgn"><span>Group Head Signature</span> <span>Added</span></div>
                <div className="submit-sgn"><span>CIO Signature</span> <span>Added</span></div>
                </center>
            </div>
            <div className="submit-bottom spacesb" >
                <center>
                <button className='sign-btn' onClick={()=> navigate('/signed-document')}>Preview Document</button>
                <button className='sign-btn'>Download Document</button>
                <button className='sign-btn' onClick={submitDocument}>Submit to finance Team</button>
                </center>
            </div>
            </center>
        </div>
    )
}

export default Submit;