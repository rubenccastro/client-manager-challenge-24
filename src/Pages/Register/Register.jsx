import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [securePasswordFlag] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => {
        if (securePasswordFlag) {
            setPasswordStrength(calculatePasswordStrength(e.target.value));
        }
        setPassword(e.target.value);
    }

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 20;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 20;
        }
        if (password.match(/[0-9]+/)) {
            strength += 20;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 20;
        }
        if (password.length >= 8) {
            strength += 20;
        }
        return strength;
    };


    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (email === "" && password === "" && firstName === "" && lastName === "") {
            toast.error("Please fill in all fields.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (email === "") {
            toast.error("Please fill in the email field.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (password === "") {
            toast.error("Please fill in the password field.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (firstName === "") {
            toast.error("Please fill in the first name field.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (lastName === "") {
            toast.error("Please fill in the last name field.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters long and must contain special characters.", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const requestBody = { firstName, lastName, email, password, securePasswordFlag };

        axios.post("https://app.grupoerre.pt:1934/auth/create-user", requestBody, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                toast.success("User created successfully.", {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }).catch(error => {
                if (error.response.data.message === "User already exists.") {
                    toast.error("User already exists.", {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    return;

                } else if (error.response.data.message === "Weak password.") {
                    toast.error("Weak password.", {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    return;
                }
            });

    };

    return (
        <div className="LoginPage" data-theme="darker">
            <ToastContainer />
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleRegisterSubmit}>
                        <div className="flex gap-x-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" placeholder="First Name" className="input input-bordered w-[156px]" required onChange={handleFirstName} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="Last Name" className="input input-bordered w-[156px]" required onChange={handleLastName} />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">E-mail</span>
                            </label>
                            <input type="email" placeholder="E-mail" className="input input-bordered" required onChange={handleEmail} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered" required name="password" onChange={handlePassword} />
                        </div>
                        <div className="form-control">
                        </div>
                        <progress className={`progress w-auto ${passwordStrength <= 20 && "progress-error"} ${passwordStrength > 20 && passwordStrength <= 60 && "progress-warning"} ${passwordStrength > 60 && "progress-success"}`} value={passwordStrength} max="100"></progress>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary">Create Account</button>
                        </div>
                        <p className="text-center">Already have an Account? <Link to={"/"} className="link link-accent">Login here.</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;