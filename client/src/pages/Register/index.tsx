import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "@components/Input";
import { initialValues, validationSchema } from "./validation.config";
import { Loader } from "@components/Loader";
import { signUp } from "../../store/reducers/auth";

const Register = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (user) navigator("/");
  }, [user]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      dispatch(signUp({ ...values }));
      return;
    },
  });

  return (
    <div className="absolute inset-0 w-96 h-fit m-auto p-8 bg-white shadow-lg shadow-Zinc-500/50">
      <h1 className="font-semibold text-2xl mb-7">Create an account</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Name"
          placeholder="Name"
          name="firstName"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          errorText={formik.errors.firstName}
        />
        <Input
          label="Surname"
          placeholder="Surname"
          name="lastName"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          errorText={formik.errors.lastName}
        />
        <Input
          label="Your email"
          placeholder="Email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          errorText={formik.errors.email}
        />
        <Input
          label="Password"
          placeholder="password"
          name="password"
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          errorText={formik.errors.password}
        />
        {isLoading ? (
          <Loader className="m-auto" />
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
        Have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-medium transition-all hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
