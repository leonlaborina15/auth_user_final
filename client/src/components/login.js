import React, { Fragment, useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(""); // State to handle errors
    const [success, setSuccess] = useState(""); // State to handle success messages



    const onSubmitForm = async e => {
        e.preventDefault();

        setError("");
        try {
            const body = { email, pass };
            const response = await fetch("http://localhost:4000/login",
                {


                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const data = await response.json();

            if (response.ok) {
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location = "/";
                }, 2000);
            } else {
                setError(data.error || data.msg || "Something went wrong");
            }
        } catch (err) {
            console.log(err.message)
        }


    }
    return (
        <Fragment>
            <div className="container-fluid d-flex flex-column vh-100 align-items-center justify-content-center">
                <h1 className="text-white mb-4">Welcome Back :)</h1>
                <div className="login p-5" style={{ maxWidth: "600px", width: "100%" }}>
                    <form method="POST" className="m-2" onSubmit={onSubmitForm}>

                        <div className="form-group mb-3">
                            <label htmlFor="exampleInputEmail1" className="text-white">Email address</label>
                            <input
                                type="email"
                                className="form-control text-dark"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="exampleInputPassword1" className="text-white">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
                        {success && <div className="alert alert-success">{success}</div>} {/* Success message display */}
                        <button type="submit" className="btn btn-primary w-100 mb-3 mt-3">Submit</button>
                        <p className="text-white">Already have an acoount? <span className="text-primary"> Log In</span></p>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
