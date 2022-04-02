/* Pngs & Svgs */
import brand from '../myfreeqr.png'
/* Libraries */
import { Field, Form, Formik } from "formik"
/* ---- Styles ---- */
import { Buttons, CompCont, CompFlexCent, FlexCent, Input, Label, MiddleContCol } from "../Styles"
import { AuthTtle, Brand, FormCont, RowGap } from "../Styles/custom"
import { atom } from 'jotai'
/* Schemas */
import { userSchema } from '../Schemas'

export const Auth = () => {
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
        {/* Sign in */}
        <div className={`${FormCont} ${FlexCent}`}>
          <h2 className={`text-white text-xl font-bold md:text-2xl`}>Registrate</h2>
          <hr className='border-1 w-10/12 my-4' />
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={userSchema}
            onSubmit={values => {
              console.log(values)
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
        </div>
      </div>
    </div>
  )
}
