'use client';
import { Button } from '@/components/ui/button';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';


interface IHeaderProps {
  backText?: string;
  title: string;
  subText: string;
  buttonText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  linkPath?: string;
  buttonDisabled?: boolean;
}
const Header = ({
  backText,
  title,
  subText,
  buttonText,
  linkPath,
  onClick,
  buttonDisabled,
}: IHeaderProps) => {
  const router = useRouter();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (buttonDisabled) {
        return;
      }
      if (linkPath) {
        router.push(linkPath);
      }
      onClick?.(event);
    },
    [onClick, buttonDisabled, linkPath, router]
  );

  return (
    <div className="mt-10">
      {backText && (
        <div className="flex text-center mb-3">
          <ArrowLongLeftIcon className="w-4 h-4 mr-2" />
          <p className="text-sm text-gray-400">{backText}</p>
        </div>
      )}
      <div className="flex flex-row justify-between">
        <div className="mr-6">
          <p className="font-bold text-base">{title}</p>
          <p className="text-sm text-gray-400 mt-2">{subText}</p>
        </div>
        <div>
          {buttonText && <Button onClick={handleClick}>{buttonText ?? ''}</Button>}
        </div>
      </div>
    </div>
  );
};

export default Header;
