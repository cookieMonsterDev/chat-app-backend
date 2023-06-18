import * as yup from "yup";
import {
  AT_LEAST_ONE_LOWER_CASE_LETTER,
  AT_LEAST_ONE_NUMBER,
  AT_LEAST_ONE_SPECIAL_CHARACTER,
  AT_LEAST_ONE_UPPER_CASE_LETTER,
} from "../../base/constants";
import { SignUpPayload } from "../../store/reducers/auth";


export const initialValues: SignUpPayload = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("Name is required")
    .max(20, "Max 64 characters"),
  lastName: yup.string().max(20, "Max 64 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email is not provided"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min 8 characters")
    .max(64, "Max 64 characters")
    .matches(AT_LEAST_ONE_UPPER_CASE_LETTER, "Required 1 uppercase letter")
    .matches(AT_LEAST_ONE_LOWER_CASE_LETTER, "Required 1 lower letter")
    .matches(AT_LEAST_ONE_NUMBER, "Required 1 number")
    .matches(AT_LEAST_ONE_SPECIAL_CHARACTER, "Required 1 special character"),
});
