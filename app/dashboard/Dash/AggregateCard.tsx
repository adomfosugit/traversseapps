import { ReactElement } from 'react';

interface AggregateCardProps {
  number?: string;
  description: string;
  icon?: ReactElement<any, any> | null;
  numberDescription?: string;
}
const AggregateCard = ({
  number,
  description,
  icon,
  numberDescription,
}: AggregateCardProps) => {
  return (
    <div className="border border-zinc-100 px-6 py-4">
      <div className="flex">
        {numberDescription && (
          <p className="mt-auto mr-1 text-zinc-500 font-medium">
            {numberDescription}
          </p>
        )}
        {number && <p className="text-3xl font-medium">{number}</p>}
      </div>
      {icon !== undefined && <>{icon}</>}
      <p className="text-sm text-zinc-500 pt-4">{description}</p>
    </div>
  );
};

export default AggregateCard;
