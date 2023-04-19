import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const {
    required,
    patternEmail,
    minLengthPass,
    validateEquals,
    validateTrim,
  } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
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
      <h1>Register</h1>
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
        <label>Confirm password</label>
        <br />
        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            required,
            validate: validateEquals(getValues("password")),
          })}
        ></FormInput>
        <FormError error={errors.repassword} />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
