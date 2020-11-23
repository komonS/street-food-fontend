import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiox from 'axios'
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import {UserContext} from '../../store/UserProvider'

function Login() {
    const { login, setLogin } = useContext(LoginContext)
    const { url } = useContext(UrlContext)
    const { user,setUser } = useContext(UserContext)

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [alertUI, setalertUI] = useState(false)
    /*
    useEffect(() => {
        let alertUI = <div></div>;
        if (login == true) {
            alertUI = <div className="alert alert-danger">
                <strong>Error!</strong> User or password Incorrect
            </div>
        }
        return alertUI
    }, [])
    */
    const Alerts = () => {
        return <div className="alert alert-danger">
            <strong>Error!</strong> User or Password incorrect
        </div>

    }
    const history = useHistory();

    const onLogin = async (event) => {
        event.preventDefault()
        let res = await axiox.get(url + 'login', {
            params: {
                username: username,
                password: password
            }
        })

        if (res.data.status === 'success') {
            if (res.data.result.length > 0) {
                setLogin(true)
                setUser(res.data.result[0])
                localStorage.userID = res.data.result[0].memberID
                console.log(user)
                history.push('/');
            } else {
                setalertUI(true)
            }

        } else {
            setalertUI(true)
        }

        //console.log(res.data)
    }
    return (
        <div>
            <h3 className="text-center">Login</h3>

            <form onSubmit={onLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-info">Login</button>
                </div>
            </form>
            { alertUI ? <Alerts /> : null}
        </div>
    );
}

export default Login;
