import React, { Fragment, useState, useRef } from "react";

const Signup = () => {
    const [user_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [pass2, setPassword2] = useState("");
    const [error, setError] = useState(""); // State to handle errors
    const [success, setSuccess] = useState(""); // State to handle success messages

    // Create refs for input fields
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            if (nextRef.current) {
                nextRef.current.focus(); // Focus the next input field
            }
        }
    };

    const onSubmitForm = async e => {
        e.preventDefault();

        setError(""); // Clear any previous errors
        setSuccess(""); // Clear previous success messages

        try {
            const body = { user_name, email, pass, pass2 };
            const response = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Signup successful! Redirecting...");
                setTimeout(() => {
                    window.location = "/login";
                }, 2000);
            } else {
                setError(data.error || data.msg || "Something went wrong");
            }
        } catch (err) {
            console.log(err.message);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Fragment>
            <div className="container-fluid d-flex flex-column vh-100 align-items-center justify-content-center">
                <h1 className="text-white mb-4">Welcome to Devth.io</h1>
                <div className="login p-5" style={{ maxWidth: "600px", width: "100%" }}>
                    <form className="m-2" onSubmit={onSubmitForm}>

                        <div className="form-group mb-3">
                            <label htmlFor="name" className="text-white">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={user_name}
                                placeholder="Enter full name"
                                onChange={e => setName(e.target.value)}
                                onKeyDown={e => handleKeyDown(e, emailRef)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="text-white">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange={e => setEmail(e.target.value)}
                                ref={emailRef}
                                onKeyDown={e => handleKeyDown(e, passwordRef)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="text-white">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={pass}
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                ref={passwordRef}
                                onKeyDown={e => handleKeyDown(e, password2Ref)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password2" className="text-white">Repeat Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                value={pass2}
                                placeholder="Repeat Password"
                                onChange={e => setPassword2(e.target.value)}
                                ref={password2Ref}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
                        {success && <div className="alert alert-success">{success}</div>} {/* Success message display */}
                        <button type="submit" className="btn btn-primary w-100 mb-3 mt-4">Submit</button>
                        <p className="text-white">Already have an account? <span className="text-primary">Log In</span></p>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;
