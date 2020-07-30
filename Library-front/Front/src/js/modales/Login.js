import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import instance, { addAuth } from "../utils/api";

const Login = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.authReducer.isModalShowing);
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.token);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSucces] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);
    let body = { email, password };
    instance
      .post("user/authenticate", body)
      .then((response) => {
        let result = response.data.data;

        if (result && result.token) {
          addAuth(result.token);
          dispatch({ type: "SET_AUTH_TOKEN", payload: result.token });
        }
        if (result && result.user) {
          closeModalLogin();
        }
        dispatch({ type: "SET_AUTH_USER", payload: result.user });
      })
      .catch((error) => {
        setErrors(error.response.message);
      })
      .finally(() => {
        setIsLoading(false);
        // setSucces("You ared");
      });
  };

  const closeModalLogin = () =>
    dispatch({
      type: "TOGGLE_IS_MODAL_SHOWING",
      payload: { type: null, title: null },
    });

  return (
    <ModalContainer>
      <div className="modal d-block overlay" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="close"
                onClick={closeModalLogin}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex flex-wrap">
              <article className="w-100">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-warning button">Submit</button>
                  {errors && <span>{errors}</span>}
                  {/* {success && <span>{success}</span>} */}
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
   {
    @import url("https://fonts.googleapis.com/css2?family=Revalia&display=swap");
    font-size: 1em;
    font-family: "Revalia", "Times New Roman", Times, serif;

    .overlay {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .close {
      color: red;
    }

    .modal-content {
      min-height: 80vh;
      background-color: #003140 !important;
      color: #fff;
      border: 1px solid yellow !important;
      border-radius: 10px;
    }

    .button {
      position: absolute;
      bottom: 4em;
      right: 4em;
      width: 13em;
      height: 5em;
      font-family: "Revalia", "Roboto", sans-serif;
      font-size: 0.6em;
      margin-top: 1em;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      color: #fff;
      background-color: rgba(212, 214, 117, 0.1);
      border: 2px solid rgba(212, 214, 117, 0.8);
      border-radius: 35px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease 0s;
      cursor: pointer;
      outline: none;
    }
    .button:hover {
      background-color: #b8f46e;
      border: 1px solid gray;
      box-shadow: 0px 15px 20px rgba(183, 244, 110, 0.4);
      color: #fff;
      transform: translateY(-5px);
      text-shadow: 2px 2px gray;
    }
  }
`;

export default Login;
