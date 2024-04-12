import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const { storeToken, authenticateUser } = useContext(AuthContext);


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        axios.post("https://app.grupoerre.pt:1934/auth/login", requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                storeToken(response.data.token);
                authenticateUser({ userId: response.data.userId, firstName: response.data.returnFirstName, lastName: response.data.returnLastName, email: response.data.returnUserEmail, userGroup: response.data.returnUserGroup });
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                toast.error(errorMessage, {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.error("Error:", error);
            });
    };

    return (
        <div className="LoginPage" data-theme="darker">
            <ToastContainer />
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLoginSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">E-mail</span>
                            </label>
                            <input type="email" placeholder="E-mail" className="input input-bordered" required value={email} onChange={handleEmail} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered" required name="password" value={password} onChange={handlePassword} />
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className="text-center">Don't have an account? <Link to={"/register"} className="link link-accent">Register here.</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;