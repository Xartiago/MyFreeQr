/* 
  The main idea when we work with components is re-use
  the styles, but the biggest challenge when we use tailwind
  , in my opinion, if u want to change some puntual 
  thing, u must read some times hundred lines of code,
  here i try to separate and allow fix or change more 
  efffectivly
*/
/* Component Container */
export const CompCont = `
  p-4 /* Spacing */
  w-full h-auto relative flex /* Width, Height, Position, Display */
  bg-slate-900 /* Background */
  md:h-screen /* > 1024 */
`
/* Center flex Comp Cont */
export const CompFlexCent = `
  w-full flex flex-col relative /* Width Display Position */
  justify-center items-center /* Center */
  md:flex-row /* > 1024px */
`
/* Middle & Middle */
export const MiddleContCol = `
  flex flex-col justify-center items-center /* Display */
  w-full /* > 320px */
  md:w-1/2 /* > 1024px */
`
/* Flex col Cent */
export const FlexCent = `
  w-full flex flex-col relative /* Width Display Position */
  justify-center items-center /* Center */
`
export const FlexRowCent = `
  w-full flex flex-row relative /* Spacing */
  justify-center items-center /* Center */
`
/* Buttons */
export const Buttons = `
  w-10/12 py-1.5 mt-4 /* Spacing */
  text-white font-bold /* Text */
  bg-indigo-500 rounded-lg /* Customization */
  hover:bg-indigo-700 transition duration-500 /* Hover */
`
/* Labels */
export const Label = `
  w-full mt-1.5 /* Spacing */
  text-white font-bold text-md /* Text */
`
/* Inputs */
export const Input = `
  my-1.5 py-1.5 px-3 rounded-md w-full /* Spacing */
  text-gray-900 /* Text */
`
/* Bigger title */
export const BigTtle = `
  text-indigo-400 text-xl font-bold 
  md:text-2xl /* > 740px */
  xl:text-3xl /* 1240px */
`