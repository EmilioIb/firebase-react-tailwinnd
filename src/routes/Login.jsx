import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { required, patternEmail, minLengthPass, validateTrim } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email} />
        <br />
        <label>Password</label>
        <br />
        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            required,
            minLength: minLengthPass,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password} />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
