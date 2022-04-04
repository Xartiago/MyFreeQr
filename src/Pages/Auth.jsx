/* React */
import { useState } from 'react'
/* Pngs & Svgs */
import brand from '../myfreeqr.png'
/* Icons */
import { FaGoogle } from 'react-icons/fa'
/* Libraries */
import { Field, Form, Formik } from "formik"
/* ---- Styles ---- */
import { BigTtle, Buttons, CompCont, CompFlexCent, FlexCent, FlexRowCent, Input, Label, MiddleContCol } from "../Styles"
import { AuthTtle, Brand, FormCont, GoogleBttn, RowGap } from "../Styles/custom"
/* Schemas */
import { signinSchema, userSchema } from '../Schemas'
import { loginWithGoogle, register, signin } from '../Firebase/auth'
import { useNavigate } from 'react-router-dom'
import { createMenu, userMenus } from '../Firebase/firestore'

export const Auth = () => {

  /* Router */
  const navigate = useNavigate()
  /* Local States */
  const [authErrors, setAuthErrors] = useState(null)
  /* Auth Errors handler */
  if (authErrors) { setTimeout(() => { setAuthErrors(null) }, 3000); }

  const loginGoogle = async () => {
    const data = await loginWithGoogle()
    const getMenus = await userMenus(data.user.uid)
    if (getMenus.length === 0) {
      const newMenu = await createMenu(data.user.uid, 1)
      if (newMenu) navigate('/home')
    } else {
      navigate('/home')
    }
  }

  return (
    <div className={`${CompCont} ${CompFlexCent}`}>
      {/* Short description what the app does */}
      <div className={`${MiddleContCol}`}>
        <img src={brand} className={Brand} />
        <h2 className={`${AuthTtle}`}>
          Crea, personaliza y modifica tus propios codigos QR, impulsa tu empresa o negocio al siguiente nivel.
        </h2>
      </div>
      {/* Signin & Signup Form */}
      <div className={`${MiddleContCol}`}>
        {/* Form Containers */}
        <div className={`${FormCont} ${FlexCent}`}>
          {/* Sign in */}
          <h2 className={`${BigTtle} my-3`}>Registrate</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={userSchema}
            onSubmit={async (values) => {
              const { email, password } = values
              const data = await register(email, password)
              if (data) navigate('/home')
            }}>
            {({ errors, touched }) => (
              <Form className={`${FlexCent}`}>
                <div className={`${RowGap}`}>
                  <div className={`${FlexCent}`}>
                    <label className={`${Label}`} >Email<Field name='email' placeholder='Email' className={`${Input}`} /></label>
                    {errors.email && touched.email ? <div className={`text-rose-500 text-sm`}>{errors.email}</div> : null}
                  </div>
                  <div className={`${FlexCent}`}>
                    <label className={`${Label}`} >Contraseña nueva<Field name='password' placeholder='Contraseña' className={`${Input}`} type='password' /></label>
                    {errors.password && touched.password ? <div className={`text-rose-500 text-sm`}>{errors.password}</div> : null}
                  </div>
                </div>
                <button className={`${Buttons}`} type='submit' >Registrarse</button>
              </Form>
            )}
          </Formik>
          {/* Separador */}
          <div className={`${FlexRowCent} gap-3`}>
            <div className='border-2 w-38 my-6'></div>
            <span className='text-white font-bold text-xl'>Ó</span>
            <div className='border-2 w-38 my-6'></div>
          </div>
          {/* Inicio de sesion */}
          <h2 className={`${BigTtle}`}>Inicia sesion</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signinSchema}
            onSubmit={async (values) => {
              const { email, password } = values
              const data = await signin(email, password)
              console.log(data)
              if (data) navigate('/home')
              else setAuthErrors('Contraseña o correo invalidos')
            }}>
            {({ errors, touched }) => (
              <Form className={`${FlexCent}`}>
                <div className={`${RowGap}`}>
                  <div className={`${FlexCent}`}>
                    <label className={`${Label}`} >Email<Field name='email' placeholder='Email' className={`${Input}`} /></label>
                    {errors.email && touched.email ? <div className={`text-rose-500 text-sm`}>{errors.email}</div> : null}
                  </div>
                  <div className={`${FlexCent}`}>
                    <label className={`${Label}`} >Contraseña<Field name='password' placeholder='Contraseña' className={`${Input}`} type='password' /></label>
                    {errors.password && touched.password ? <div className={`text-rose-500 text-sm`}>{errors.password}</div> : null}
                  </div>
                </div>
                {authErrors && <div className={`text-rose-500 text-sm`}>{authErrors}</div>}
                <button className={`${Buttons}`} type='submit' >Entrar</button>
              </Form>
            )}
          </Formik>
          <div className='w-10/12 my-3'>
            <button className={`${FlexRowCent} ${GoogleBttn}`} onClick={loginGoogle}><FaGoogle /> Ingresar con Google</button>
          </div>
        </div>
      </div>
    </div>
  )
}
