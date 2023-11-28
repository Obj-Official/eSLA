import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './Contextprovider'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext);

    return !user ? <Navigate to='/authenticate'/> : children;
}

export default PrivateRoute;