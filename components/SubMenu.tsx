'use client';

import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { TDrawerStage } from './Stages';

interface ISubMenuProps {
  item: TDrawerStage;
  path: string;
  highlight: Record<string, boolean | null>; // key = stage.path
}

const SubMenu = ({ item, path, highlight }: ISubMenuProps) => {

  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subNav);
  

  return (
    <>
      <button
        onClick={item.subNavigation && showSubNav}
        className="flex text-primary font-semibold mt-4 hover:text-traverse-primary items-center"
      >
        {item.icon}
        <p className="ml-5 mr-2">{item.title}</p>
        <div>
          {item.subNavigation && subNav ? (
            <ChevronUpIcon className="w-3 h-3 my-2 text-primary" />
          ) : item.subNavigation ? (
            <ChevronDownIcon className="w-3 h-3 text-primary my-2" />
          ) : null}
        </div>
      </button>

      {subNav &&
        item.subNavigation?.map((subItem, index) => {
          const isEnabled = !!highlight[subItem.path];
        

          return (
            <Link
              href={isEnabled ? `${path}?q=${subItem.path}` : '#'}
              key={index}
              className={`ml-16 flex m-4 text-sm items-center ${
                isEnabled
                  ? 'text-primary hover:text-traverse-primary'
                  : 'text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              <CheckCircleIcon
                className={`w-4 h-4 ${
                  isEnabled ? 'text-green-600' : 'text-gray-400'
                }`}
              />
              <p className="ml-2">{subItem.title}</p>
            </Link>
          );
        })}
    </>
    
  );
};

export default SubMenu;
