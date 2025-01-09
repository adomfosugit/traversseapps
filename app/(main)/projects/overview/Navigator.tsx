'use client'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import React from 'react'
import { usePathname } from 'next/navigation'
type Props = {}

const Navigator = (props: Props) => {
    const pathname = usePathname()
  return (
    <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink  href='/home' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/home' ? 'bg-primary text-white' : ''}`}  >Home</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href='/projects' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/projects' ? 'bg-primary text-white' : ''}`}  >Projects</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href='/faq' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/faq' ? 'bg-primary text-white' : ''}`}  >FAQ</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href='/settings' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/settings' ? 'bg-primary text-white' : ''}`}  >Settings</NavigationMenuLink>
    </NavigationMenuItem>
  
 
    

  </NavigationMenuList>
</NavigationMenu>
 )
  
}

export default Navigator
