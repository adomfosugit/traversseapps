import React from 'react'

type Props = {}

const SHeader = (props: Props) => {
  return (
    <div>
        <h1 className='font-bold text-xl '>Land Selection</h1>
        <p className='text-sm text-zinc-400'>select your preferred land listing</p>
    </div>
  )
}

export default SHeader