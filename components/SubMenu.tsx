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
}
const SubMenu = ({ item }: ISubMenuProps) => {
  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subNav);
  return (
    <>
      <button
        onClick={item.subNavigation && showSubNav}
        className="flex text-primary font-semibold mt-4 hover:text-traverse-yellow items-center"
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
        item.subNavigation.map((item, index) => {
          return (
            <Link
              href={item.path}
              key={index}
              className="ml-16 flex text-primary m-4 text-sm hover:text-traverse-yellow"
            >
              <CheckCircleIcon className="w-4 h-4" />
              <p className="ml-2">{item.title}</p>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;