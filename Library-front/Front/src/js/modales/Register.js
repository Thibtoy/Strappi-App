import React from "react"
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import instance from "../utils/api"

import { useState } from "react"

const Register = () => {
  const modal = useSelector((state) => state.authReducer.isModalShowing)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [messageSuccess, setMessageSuccess] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    let body = { username, email, password }
    instance
      .post("user/register", body)
      .then((response) => {
        setSuccess(true)
        closeModalRegister()
      })
      .catch((error) => {
        setMessageError(error.response.data.message.sqlMessage)
      })
      .finally(() => {
        setIsLoading(false)
        // setMessageSuccess("Thank you for your registation ")
      })
  }

  const dispatch = useDispatch()

  const closeModalRegister = () =>
    dispatch({
      type: "TOGGLE_IS_MODAL_SHOWING",
      payload: { type: null, title: null },
    })

  return (
    <ModalContainer>
      <div className="modal d-block overlay" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registration</h5>
              <button
                type="button"
                className="close"
                onClick={closeModalRegister}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times</span>
              </button>
            </div>

            <div className="modal-body d-flex flex-wrap">
              <div className="w-100">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label
                      data-error="wrong"
                      data-success="right"
                      //	for="defaultForm-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(event) => setEmail(event.target.value)}
                      id="defaultForm-email"
                      className="form-control validate"
                    ></input>
                  </div>

                  <div className="form-group">
                    <i className="fas fa-person prefix grey-text"></i>
                    <label
                      data-error="wrong"
                      data-success="right"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      onChange={(event) => setUsername(event.target.value)}
                      id="defaultForm-userName"
                      className="form-control validate"
                    ></input>
                  </div>

                  <div className="form-group">
                    <i className="fas fa- prefix grey-text"> </i>
                    <label
                      data-error="wrong"
                      data-success="right"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
                      id="defaultForm-password"
                      className="form-control validate"
                    ></input>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning button "
                    data-dismiss="modal"
                  >
                    Register
                  </button>
                  {/* {messageSuccess && <span>{messageSuccess}</span>} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

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
      min-width: 15em;
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

export default Register;
