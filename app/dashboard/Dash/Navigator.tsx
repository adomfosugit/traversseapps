'use client'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import React from 'react'
import { usePathname } from 'next/navigation'
type Props = {}

const Navigator = (props: Props) => {
    const pathname = usePathname()
    const isActive = pathname === '/dashboard/JobProject';
  return (
    <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink  href='/dashboard' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/dashboard' ? 'bg-primary text-white' : ''}`}  >Home</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <NavigationMenuLink
  href="/dashboard/JobProject"
  className={`${navigationMenuTriggerStyle()} ${isActive ? 'bg-primary text-white' :  'hover:bg-primary hover:text-white'}`}
>
  Projects
</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href='/Profile' className={`${navigationMenuTriggerStyle()} hover:bg-primary hover:text-white ${pathname === '/Profile' ? 'bg-primary text-white' : ''}`}  >Profile</NavigationMenuLink>
    </NavigationMenuItem>

  
 
    

  </NavigationMenuList>
</NavigationMenu>
 )
  
}

export default Navigator
