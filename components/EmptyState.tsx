'use client';
import { useRouter } from 'next/navigation';

import Button from './Modal/Button';
import Header from '@/app/(main)/landlisting/Header';



interface IEmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = 'No data found for this page',
  subtitle = 'Perform an action to generate some data.',
  showReset,
}: IEmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Header title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button outline label="Refresh" onClick={() => router.refresh()} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
