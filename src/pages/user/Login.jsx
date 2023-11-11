import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { subscribeToken } from "../../store/index";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { loginSchema } from "../../schema/userValidater";
import { useFormik } from "formik";
import { PostAnyApi } from "../../api/api";

function Login() {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      PostAnyApi("user/login", {
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          dispatch(subscribeToken(res.data.token));
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    },
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-screen text-white items-center align-middle justify-center">
        <div className="bg-[#1E1E1E] p-16 mx-auto  z-10 w-[350px] md:w-[400px] flex flex-col justify-center rounded-lg items-center opacity-70">
          <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-8">
            LOG IN
          </h1>
          <Input
            onChange={(event) => {
              formik.handleChange(event);
              setError("");
            }}
            required
            placeholder="EMAIL ADDRESS"
            name="email"
            class="mt-8 text-xs md:text-sm"
            value={formik.values.email}
            type="text"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          <Input
            onChange={(event) => {
              formik.handleChange(event);
              setError("");
            }}
            required
            placeholder="PASSWORD"
            name="password"
            class="mt-2 text-xs md:text-sm"
            value={formik.values.password}
            type="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}

          <p className="text-slate-500 text-[10px] md:text-sm mt-10">
            By signing in you accept the Terms and Conditions of example.com
          </p>
          <div className="text-center text-red-500 mb-5 tracking-wide font-semibold">
            {error}
          </div>

          <Button
            onClick={formik.handleSubmit}
            class="w-full"
            outline
            color="transparent"
          >
            LOG IN
          </Button>
          <p className="my-2 text-white">
            Not registered?{" "}
            <button
              className="text-blue-800"
              onClick={() => navigate("/signup")}
            >
              Signup now
            </button>
          </p>

          <p className="my-4 rounded p-2 cursor-pointer bg-black" onClick={()=>navigate("/admin-login")}>Admin Login</p>
        </div>
      </div>
    </>
  );
}

export default Login;
