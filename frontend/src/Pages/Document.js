import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../UtilsAndContext/Contextprovider';

const Document =()=>{
    const {openedDocument, setOpenedDocument} = useContext(AuthContext);
    const navigate = useNavigate();
    const navigateToSignaturePage =()=> navigate('/sign')
    openedDocument.document_title? localStorage.setItem('opened-document', JSON.stringify(openedDocument)): <p></p>;

    useEffect(()=>{
        setOpenedDocument(()=>(localStorage.getItem('opened-document')?JSON.parse(localStorage.getItem('opened-document')):{}))
    },[])
    
    useEffect(()=>{
        document.getElementById('document-body').innerHTML = openedDocument.document_body
    })

    return(
        <div>
            <h2 className='doc-title'>{openedDocument.document_title}</h2><hr width='90%'/>
            <div id="description-cont" align='center'>
                <p id="description-txt"  align='left'>
                    { openedDocument.document_description}
                </p>
            </div>
            <center>
            <div id='document-body' align='left'></div>
            <button className='sign-btn' onClick={navigateToSignaturePage}>Sign</button>
            </center>
        </div>
    )
}

export default Document;