import * as Yup from 'yup'

/* User Authenication */
export let userSchema = Yup.object().shape({
  /* Correo */
  email: Yup.string()
    .email('Correo invalido')
    .required('Ingresa un correo'),
  /* Contraseña */
  password: Yup.string()
    .min(6, '¡Demasiado corta!')
    .max(20, '¡Demasiado larga!')
    .required('Ingresa una contraseña')
})
export let signinSchema = Yup.object().shape({
  /* Correo */
  email: Yup.string()
    .email('Correo invalido')
    .required('Ingresa un correo'),
  /* Contraseña */
  password: Yup.string()
    .required('Ingresa tu contraseña')
})