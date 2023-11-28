import { useState, useContext, useEffect } from "react";
import AuthContext from "../UtilsAndContext/Contextprovider";
import { useNavigate } from "react-router-dom";

const Authenticate =()=>{
    const {user, loginuser} = useContext(AuthContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{user? navigate("/"):<></>});

    return(
        <div>
            <center>
                <form id="authenticate-cont" onSubmit={loginuser}>
                    <h3 className="blue-heading">Verify your Identity</h3>
                    <div className='add-officials-lbl part-more'><span className="signatory-department">Enter Username</span>
                    <input type="text" name="username" className="auth-input" onChange={event =>setEmail(event.target.value)} value={email}></input></div>
                    <div className='add-officials-lbl part-more'><span className="signatory-department">Enter password</span>
                    <input type="password" name="password" className="auth-input" onChange={event =>setPassword(event.target.value)} value={password}></input></div>
                    <input type='submit' className='sign-btn' ></input>
                </form>
            </center>
        </div>
    )
}

export default Authenticate;