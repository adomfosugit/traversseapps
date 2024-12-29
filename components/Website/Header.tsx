import React from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import NavMenu from '../NavMenu'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='border-b-2  px-8 py-2 flex justify-between items-center sticky top-0 z-10 bg-white '>
    
        <Logo />
        <Navigation />
    
        <NavMenu />
    </div>
  )
}

export default Header