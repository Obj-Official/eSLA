import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../UtilsAndContext/Contextprovider";
import signature1 from "../Data/Signature1.png";
import signature2 from "../Data/Signature2.png"
import signature3 from "../Data/Signature3.png"


const Signature =()=>{
    const{official, openedDocument, setOpenedDocument} = useContext(AuthContext);
    const [showSign, setShowSign] = useState(false);
    const [showSign1, setShowSign1] = useState(false);
    const [showSign2, setShowSign2] = useState(false);
    const [secretCode1, setSecretCode1] = useState(null);
    const [secretCode2, setSecretCode2] = useState(null);
    const [secretCode3, setSecretCode3] = useState(null);
    const [signed1, setSigned1] = useState(openedDocument.signature1_added);
    const [signed2, setSigned2] = useState(openedDocument.signature2_added);
    const [signed3, setSigned3] = useState(openedDocument.signature3_added);
    const navigate = useNavigate();

    const navigateToSubmit = ()=> navigate('/submit')
    const toggleShowSign = ()=> setShowSign((prev)=>!prev);
    const toggleShowSign1 = ()=> setShowSign1((prev)=>!prev);
    const toggleShowSign2 = ()=> setShowSign2((prev)=>!prev);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/getDocument/?query=${openedDocument?.document_id}`)
        .then(response => {
            setOpenedDocument(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },[])
    
    function signDocument() {
        axios.put(`http://127.0.0.1:8000/updateDocument/?query=${openedDocument?.document_id}`, {
            signature1_added: signed1,
            signature2_added: signed2,
            signature3_added: signed3,
        } )
        .then((response) => {
        setOpenedDocument(response.data);
        });
       }
       const handleMessage1=()=>{
        window.location= 'mailto:davidezeani11@gmail.com?,&Subject=Sigature Required&body=Hello, This is a Gentle Reminder to sign the electronic SLA document in order to authorize the transaction with our vendor';
           }
       const handleMessage2=()=>{
        window.location= 'mailto:danjuma.ali@gmail.com?cc=davidezeani11@gmail.com,&Subject=Signature Required&body=Hello, This is a Gentle Reminder to sign the electronic SLA document in order to authorize the transaction with our vendor';
           }
        const handleMessage3=()=>{
        window.location= 'mailto:bolarhodes@gmail.com?cc=davidezeani11@gmail.com,&Subject=Signature Required&body=Hello, This is a Gentle Reminder to sign the electronic SLA document in order to authorize the transaction with our vendor';
           }
    return(
        <div>
            <center>
            <div className="signature-cont" align='left'>
                <div>
                    <span className="signatory-department">Legal Department Signature</span>
                    {signed1?<div><br/><img className="part-more" src={signature1} alt="Signature for Legal" width="100" /></div>:official.officer_department === 'Legal'?<button className='sign-btn signpg' onClick={toggleShowSign}>{showSign?"Cancel": "Add Signature"}</button>: <div className="not-signatory">Not a signatory</div> 
                    }
                    {showSign && (<div>
                        <span className="signpg code-entry">Enter Secret Code: </span><input type="password" onChange={event =>setSecretCode1(event.target.value)} value={secretCode1}></input>
                        {secretCode1===official.officer_id?<span><center><br/>{signed1?<></>:<button onClick={()=>{setSigned1(true)}}>Enter Signature</button>}{signed1?<button  onClick={()=>{ setShowSign(false); signDocument()}}>Sign</button>:<></>}</center></span>:<></>}
                        </div>)}
                </div>
                <div>
                    {secretCode1===official.officer_id? 
                    <span ><br/><img className="part-more" src={signature1} alt="Signature for Legal" width="100" /></span>:<></>}
                </div>
                {official.isProcessingOfficer && !signed1? <div className="msg-signatory" onClick={handleMessage1}>Message Signatory</div>:<></> }
            </div>
            <div className="signature-cont" align='left'>
                <div>
                    <span className="signatory-department">IT Department - Group Head Signature</span>
                    {signed2?<div><br/><img className="part-more" src={signature2} alt="Signature for Legal" width="100" /></div>:official.officer_department === 'GroupHead'? <button className='sign-btn signpg' onClick={toggleShowSign1}>{showSign1?"Cancel": "Add Signature"}</button>: <div className="not-signatory">Not a signatory</div>
                    }
                    {showSign1 && (<div>
                        <span className="signpg code-entry">Enter Secret Code: </span><input type="password" onChange={event =>setSecretCode2(event.target.value)} value={secretCode2}></input>
                        {secretCode2===official.officer_id?<span><center><br/>{signed2?<></>:<button onClick={()=>{setSigned2(true)}}>Enter Signature</button>}{signed2?<button  onClick={()=>{ setShowSign1(false); signDocument()}}>Sign</button>:<></>}</center></span>:<></>}
                        </div>)}
                </div>
                <div>
                    {secretCode2===official.officer_id? 
                    <span ><br/><img className="part-more" src={signature2} alt="Signature for Legal" width="100" /></span>:<></>}
                </div>
                {official.isProcessingOfficer && !signed2? <div className="msg-signatory" onClick={handleMessage2}>Message Signatory</div>:<></> }
            </div>
            <div className="signature-cont" align='left'>
                <div>
                    <span className="signatory-department">Chief Information Officer (CIO) Signature</span>
                    {signed3?<div><br/><img className="part-more" src={signature3} alt="Signature for Legal" width="100" /></div>:official.officer_department === 'CIO'? <button className='sign-btn signpg' onClick={toggleShowSign2}>{showSign2?"Cancel": "Add Signature"}</button>: <div className="not-signatory">Not a signatory</div>
                    }{showSign2 && (<div>
                        <span className="signpg code-entry">Enter Secret Code: </span><input type="password" onChange={event =>setSecretCode3(event.target.value)} value={secretCode3}></input>
                        {secretCode3===official.officer_id?<span><center><br/>{signed3?<></>:<button onClick={()=>{setSigned3(true)}}>Enter Signature</button>}{signed3?<button  onClick={()=>{ setShowSign2(false); signDocument()}}>Sign</button>:<></>}</center></span>:<></>}
                        </div>)}
                </div>
                <div>
                    {secretCode3===official.officer_id? 
                    <span><br/><img className="part-more" src={signature3} alt="Signature for Legal" width="100" /></span>:<></>}
                </div>
                {official.isProcessingOfficer && !signed3? <div className="msg-signatory"onClick={handleMessage3}>Message Signatory</div>:<></> }
            </div>
            {official.isProcessingOfficer && openedDocument.signature1_added && openedDocument.signature2_added && openedDocument.signature3_added?  <button className='sign-btn' onClick={navigateToSubmit}>Proceed</button>:<></>}
            </center>
        </div>
    )
}

export default Signature;