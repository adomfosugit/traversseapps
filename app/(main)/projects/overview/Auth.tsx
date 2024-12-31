import React from 'react'

interface AuthDetails  {
    name:string,
}

const Auth:React.FC<AuthDetails> = ({name})=> {
  return (
    <div className='rounded-full w-8 h-8 bg-slate p-3  ring-1 ring-primary items-center justify-center flex text-xl font-bold text-primary '>{name.charAt(0)}</div>
  )
}

export default Auth