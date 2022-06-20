import * as yup from 'yup'
const loginValidationSchema = yup.object().shape({
  Logemail: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  Logpassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  regEmail: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  regPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  
})
export default loginValidationSchema

