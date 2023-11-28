import {  useState, useContext } from 'react';
import {IoChevronForwardCircle, IoChevronDownCircle, IoMailOutline, IoPersonAdd, IoArrowRedoCircleSharp, IoTrashBin} from 'react-icons/io5'
import { Link } from 'react-router-dom';
import AuthContext from '../UtilsAndContext/Contextprovider';
import axios from 'axios';

const SLAProcessing =()=>{
    const backend_url = 'http://127.0.0.1:8000/documents';
    const {official} = useContext(AuthContext);
    const [openUploadNew, setOpenUploadNew] = useState(false);
    const [openViewActive, setOpenViewActive] = useState(false);
    const [deleteDoc, setDeleteDoc] = useState(false);
    const [openAddOfficials, setOpenAddOfficials] = useState(false);
    const [docTitle, setDocTitle] = useState(null);
    const [docDescription, setDocDescription] = useState(null);
    const [docBody, setDocBody] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [officerDepartment, setOfficerDepartment] = useState(null);
    const [officerID, setOfficerID] = useState(null);
    const [currentDocument, setCurrentDocument] = useState(null);

    const expandUploadNew = () => setOpenUploadNew((prev)=>!prev);
    const expandViewActive = () => setOpenViewActive((prev)=>!prev);
    const expandDeleteDoc = () => setDeleteDoc((prev)=>!prev);
    const expandAddOfficials = () => setOpenAddOfficials((prev)=>!prev);
 
    function createDocument() { //sends a post request to the backend to save the posts made  
        axios.post(backend_url, { 
            document_title: docTitle,
            document_description: docDescription,         
            document_body: docBody,
        })       
          .then((response) => {         
            setCurrentDocument(response.data);       
        });   
        window.alert('SLA document titled "' +docTitle+ '" created successfully') 
      } 

    const addOfficial =()=>{
        axios.post('http://127.0.0.1:8000/addOfficial/', {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            email: email,
            officer_department: officerDepartment,
            officer_id: officerID,
        })
        .then((response) => {         
            let a = response.data;       
        })
        .catch(error => {
          console.error(error);
        }); 
        window.alert('Official Added')
        expandAddOfficials();
    }

    return(
        <div>
            <center>
            <div id="welcome-PO" align="left">
                <h3 className="doc-title">{`Welcome! ${official.first_name} ${official.last_name}`}</h3>
            </div>
            <br/><hr/><br/>
            <div>
                <div align="left" id='manage-sla'><span >Manage SLAs</span></div>
                <div className="processes" align="left">
                    {openUploadNew === false?<IoChevronForwardCircle className='process-icon'/>:<IoChevronDownCircle/>}
                    <span className="processestxt" onClick={expandUploadNew}>Upload New SLA</span>
                    {openUploadNew && (<div id='new-sla'>
                    <div className='newsla-cont'>
                        <span>Document Title</span><br/>
                        <input type='text' id='title-txt' onChange={event =>setDocTitle(event.target.value)} value={docTitle}></input><br/>
                        <span>Document description</span><br/>
                        <textarea id='desc-txt' onChange={event =>setDocDescription(event.target.value)} value={docDescription}></textarea>
                    </div>
                    <div>
                        <span className='newsla-cont'>Document Body</span><br/>
                        <textarea id='body-txt' className='newsla-cont' onChange={event =>setDocBody(event.target.value)} value={docBody}></textarea>
                    </div>
                    <div>
                    <span>Document Signatories</span><br/>
                    <input type='checkbox'></input><p className='newdocoptions'>Include Legal Department</p><br/>
                    <input type='checkbox'></input><p className='newdocoptions'>Include Head Manager</p><br/>
                    <input type='checkbox'></input><p className='newdocoptions'>Include CIO</p><br/>
                    <button className='sign-btn sla-btn' onClick={createDocument}>Upload SLA</button>
                    </div>
                    </div>)}
                </div>
                <div className="processes" align="left">
                {openViewActive === false?<IoChevronForwardCircle className='process-icon'/>: <IoChevronDownCircle/>}
                <span className="processestxt" onClick={expandViewActive}>View Active SLAs</span>
                {openViewActive && (
                    <div>
                        <Link to={"/"} className="Links">
                        <span className="processestxt gotosla"><IoArrowRedoCircleSharp/>Go to SLAs</span>
                        </Link>
                    </div>
                )}
                </div>
                <div className="processes" align="left">
                {deleteDoc === false?<IoChevronForwardCircle className='process-icon'/>: <IoChevronDownCircle/>}
                <span className="processestxt" onClick={expandDeleteDoc}>Delete SLA</span>
                {deleteDoc && (
                    <div>
                        <span className="processestxt gotosla"><IoTrashBin/>Delete SLA</span>
                    </div>
                )}
                </div>
            </div>
            <br/><hr/><br/>
            <div align='left' className="processes" >
            <IoMailOutline/> <Link to='/sign' className='style2'><span className="processestxt " >Message Pending Signatories</span></Link>
            </div>
            <div align='left' className="processes" >
            <IoPersonAdd/> <span className="processestxt" onClick={expandAddOfficials}>Add Officials</span>
            {openAddOfficials && (<div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Name</span>
                    <input type='text' onChange={event =>setFirstName(event.target.value)} value ={firstName}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Surname</span>
                    <input type='text' onChange={event =>setLastName(event.target.value)} value ={lastName}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Email</span>
                    <input type='email' onChange={event =>setEmail(event.target.value)} value ={email}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Username</span>
                    <input type='email' onChange={event =>setUsername(event.target.value)} value ={username}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Password</span>
                    <input type='password' onChange={event =>setPassword(event.target.value)} value ={password}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Department</span>
                    <input type='text' onChange={event =>setOfficerDepartment(event.target.value)} value ={officerDepartment}></input><br/>
                    </div>
                    <div className='add-officials-lbl'>
                    <span className='add-off-txt'>Officer ID</span>
                    <input type='text' onChange={event =>setOfficerID(event.target.value)} value ={officerID}></input><br/>
                    </div>
                    <button onClick={addOfficial}>Add Official</button>
            </div>)}
            </div>
            </center>
            
        </div>
    )
}

export default SLAProcessing;