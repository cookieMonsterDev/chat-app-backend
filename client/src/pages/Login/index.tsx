import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "@components/Input";
import { initialValues, validationSchema } from "./validation.config";
import { Loader } from "@components/Loader";
import { signIn } from "../../store/reducers/auth";

const Login = () => {
  const { user, isLoading, errorMessage } = useAppSelector((state) => state.auth);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) navigator("/");
  }, [user]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      dispatch(signIn({ ...values }));
      return;
    },
  });

  return (
    <div className="absolute inset-0 w-96 h-fit m-auto p-8 bg-white shadow-lg shadow-Zinc-500/50">
      <h1 className="font-semibold text-2xl mb-7">Sign in to your account</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Your email"
          placeholder="Email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={(formik.touched.email && Boolean(formik.errors.email)) || Boolean(errorMessage)}
          errorText={formik.errors.email || errorMessage!}
        />
        <Input
          label="Password"
          placeholder="password"
          name="password"
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={(formik.touched.password && Boolean(formik.errors.password)) || Boolean(errorMessage)}
          errorText={formik.errors.password || errorMessage!}
        />
        {isLoading ? (
          <Loader className="m-auto"/>
        ) : (
          <button
            type="submit"
            className="w-full bg-sky-500 p-1 rounded-lg text-white text-lg font-medium hover:bg-sky-200 hover:text-sky-500 transition-colors"
          >
            Sign in
          </button>
        )}
      </form>
      <p className="mt-5 text-slate-500">
        Don’t have an account yet?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-medium transition-all hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
