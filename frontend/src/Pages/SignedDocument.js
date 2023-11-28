import { useContext, useEffect } from 'react';
import AuthContext from '../UtilsAndContext/Contextprovider';
import signature1 from "../Data/Signature1.png";
import signature2 from "../Data/Signature2.png"
import signature3 from "../Data/Signature3.png"
import axios from 'axios';

const SignedDocument =()=>{
    const {openedDocument, setOpenedDocument} = useContext(AuthContext);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/getDocument/?query=${openedDocument?.document_id}`)
        .then(response => {
            setOpenedDocument(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },[])

    useEffect(()=>{
        document.getElementById('signed-document-body').innerHTML = openedDocument.document_body
    })

    return(
        <div>
            <h2 className='signed-doc-title'>{openedDocument.document_title}</h2><hr width='80%'/>
            <center>
            <div id ='signed-document-body' align='left'></div>
            <div id='all-signature-cont'>
                <img className="part-more" src={signature1} alt="Signature for Legal" width="100" />
                <img className="part-more" src={signature2} alt="Signature for Group Head" width="100" />
                <img className="part-more" src={signature3} alt="Signature for CIO" width="100" />
            </div>
            <div id='all-signature-cont'>
                <span className="part-more sp1">Legal Officer</span>
                <span className="part-more sp1">Group Head</span>
                <span className="part-more sp1">CIO</span>
            </div>
            </center>
        </div>)
}

export default SignedDocument;