/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "./validate";
import { notify } from "./toast";
import styles from "./SignUp.module.css";
import { fireAuth, firestore } from "../firebaseData";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    confirmPassword: "",
    isAccepted: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const auth = fireAuth;
  useEffect(() => {
    setErrors(validate(data, "signup"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      await fireAuth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          firestore().collection("client").doc(auth().currentUser.uid).set({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            password: data.password,
            role: "client",
            uid: auth().currentUser.uid,
          });
          notify("Account Created", "success");
          navigate("/");
        });
    } else {
      notify("invalid data", "error");
      setTouched({
        name: true,
        email: true,
        mobile: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <h2 className={styles.header}>Sign Up</h2>
        <div className={styles.formField}>
          <label>Name : </label>
          <input
            className={
              errors.name && touched.name
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          ></input>
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.formField}>
          <label>Email : </label>
          <input
            className={
              errors.email && touched.email
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          ></input>
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formField}>
          <label>Mobile : </label>
          <input
            className={
              errors.mobile && touched.mobile
                ? styles.uncompleted
                : styles.formInput
            }
            type="number"
            name="mobile"
            value={data.mobile}
            onChange={changeHandler}
            onFocus={focusHandler}
          ></input>
          {errors.mobile && touched.mobile && <span>{errors.mobile}</span>}
        </div>
        <div className={styles.formField}>
          <label>Password : </label>
          <input
            className={
              errors.password && touched.password
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          ></input>
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={styles.formField}>
          <label>Confirm Password : </label>
          <input
            className={
              errors.confirmPassword && touched.confirmPassword
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={changeHandler}
            onFocus={focusHandler}
          ></input>
          {errors.confirmPassword && touched.confirmPassword && (
            <span>{errors.confirmPassword}</span>
          )}
        </div>
        <div className={styles.formField}>
          <div className={styles.checkBoxContainer}>
            <label>I accept terms of privacy policy </label>
            <input
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            ></input>
          </div>
          {errors.isAccepted && touched.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>
        <div className={styles.formButtons}>
          <Link
            to="/login"
            style={{
              color: "#ff6f00",
              fontSize: "20px",
              fontWeight: "initial",
            }}
          >
            Login
          </Link>
          <button type="submit" style={{ marginLeft: "20px" }}>
            Sign Up
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
