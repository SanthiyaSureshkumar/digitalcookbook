import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons
import bg from "../bg.png";
import { validate } from "./validate";
import { notify } from "./toast";
import styles from "./SignUp.module.css";
import { fireAuth, firestore } from "../firebaseData";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const auth = fireAuth;

  useEffect(() => {
    setErrors(validate(data, "login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, touched]);
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };
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
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          firestore()
            .collection("client")
            .doc(auth().currentUser.uid)
            .get()
            .then((user) => {
              if (user.exists) {
                const userData = user.data();
                if (
                  (userData && userData.role === "client") ||
                  (userData && userData.role === "admin")
                ) {
                  notify("You Logged in", "success");
                  navigate("/Dashboard", {
                    state: { recipes: recipes, role: user.data().role },
                  });
                } else {
                  notify("Your role is not authorized", "error");
                }
              } else {
                notify("User does not exist", "error");
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              notify("An error occurred. Please try again later", "error");
            });
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          notify("An error occurred. Please try again later", "error");
        });
    } else {
      notify("Invalid data", "error");
      setTouched({
        email: true,
        password: true,
      });
    }
  };
  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    await firestore()
      .collection("recipes")
      .get()
      .then((snap) => {
        let recipe = [];
        snap.docs.forEach((doc) => {
          recipe.push(doc.data());
        });
        setRecipes(recipe);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        notify("An error occurred. Please try again later", "error");
      });
    console.log(recipes);
  };

 

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={submitHandler}
        className={styles.formContainer}
        style={{ height: "400px" }}
      >
        <h2 className={styles.header}>Login</h2>
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
          <label>Password : </label>
          <div className={styles.passwordField}>
            <input
              className={
                errors.password && touched.password
                  ? styles.uncompleted
                  : styles.formInput
              }
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={changeHandler}
              onFocus={focusHandler}
            ></input>
            <span
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.showPasswordButton}
              style={{ backgroundColor: "#ffffff", marginLeft: "0" }}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <NavLink
              style={navActive}
              to="/Contact"
              className=" hover:text-orange-900  duration-300 font-bold"
            >
              Contact
              <span className="favourites-count font-bold text-sky-400"></span>
            </NavLink>
        <div className={styles.formButtons}>
          <Link
            to="/signup"
            style={{
              color: "#ff6f00",
              fontSize: "20px",
              fontWeight: "initial",
            }}
          >
            Sign Up
          </Link>
          <button type="submit" style={{ marginLeft: "20px" }}>
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
