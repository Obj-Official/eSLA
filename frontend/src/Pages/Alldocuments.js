import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../UtilsAndContext/Contextprovider";
import axios from "axios";

const Alldocuments =()=>{
    const {documentDetails, openedDocument, setDocumentDetails, setOpenedDocument, official} = useContext(AuthContext);
    const [signedDocuments, setSignedDocuments] = useState(null)
    const [viewCurrentDocument, setViewCurrentDocument] = useState(true);
    var current = document.getElementsByClassName("current");
    var past = document.getElementsByClassName("past");
    var navigate = useNavigate();

    const viewCurrent =()=> setViewCurrentDocument(true);
    const viewPast =()=> setViewCurrentDocument(false);
    const goToSLAProcessing =()=> navigate('/SLAProcessing');

    useEffect(()=>{
        // get unsigned documents from the database
        axios.get(`http://127.0.0.1:8000/documents`)
        .then(response => {
          setDocumentDetails(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      },[]);

    useEffect(()=>{
        // get signed documents from the database
        axios.get(`http://127.0.0.1:8000/signedDocuments/`)
        .then(response => {
          setSignedDocuments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    })

    const setdocument =(b)=>{setOpenedDocument(documentDetails[b]); navigate('/document')}
    const setSignedDocument =(b)=>{setOpenedDocument(signedDocuments[b]); navigate('/signed-document')}

    return(
        <div>  
            <div align='right' width={'80%'}>{official.isProcessingOfficer && (<button className="sign-btn" onClick={goToSLAProcessing}>Manage SLAs</button>)}</div>
            <div id='currentpast'>
                {viewCurrentDocument === true?<span className='currentpastopt current' onClick={viewCurrent}>Current Document</span>:
                <span className='currentpastopt' onClick={viewCurrent}>Current Document</span>}
                {viewCurrentDocument === false?<span className='currentpastopt past' onClick={viewPast}>Past Document</span>:
                <span className='currentpastopt ' onClick={viewPast}>Past Document</span>}
            </div>
            {viewCurrentDocument === true?
            <center>
            {documentDetails?.map((documenthandle, documentindex)=>{//used to map all the cuurent document 
                return(
                    <div className="current-documents" align='left'>
                    <span className="link" key={documentindex}>
                        <div align='left' onClick={(e)=>{setdocument(documentindex)}}>
                            <h3 className="doc-title">{documenthandle.document_title}</h3><br/>
                            <span className="sb2 link1">Processing Officer: Chiamaka Ezeani</span><br/><br/>
                            <span className="sb2 link1">Drafted: {documenthandle.created_at}</span><br/><br/>
                            <span className="sb2 link1">Status: Available for Signature</span>
                        </div><br/>
                    </span></div>
                )
            })}
            </center>
            :
            <div>
            {signedDocuments?.map((documenthandle, documentindex)=>{
                return(
                    <div className="processes sgn" align='left'>
                    <span className="link" key={documentindex}>
                        <div align='left' onClick={(e)=>{setSignedDocument(documentindex)}}>
                            <h3 className="doc-title">{documenthandle.document_title}</h3><br/>
                            <span className="sb2 link1">Drafted: {documenthandle.created_at}</span><br/>
                        </div><br/>
                    </span></div>
                )
            })}
            {signedDocuments[0]?<></>:<div id="no-past">No Past Document</div>}</div>}
        </div>
    )
}

export default Alldocuments;