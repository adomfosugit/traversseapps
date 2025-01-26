'use client';

import { ChangeEvent, useCallback } from 'react';

interface ILandAreaProps {
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
}
const LandArea = ({ title, subtitle, onChange }: ILandAreaProps) => {
  const onAdd = useCallback(
    (e: ChangeEvent<HTMLInputElement> | undefined) => {
      onChange(Number(e?.target.value ?? 1));
    },
    [onChange]
  );
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <input
          title="Area input"
          onChange={(e) => onAdd(e)}
          className="font-light text-neutral-600 border rounded-md border-traverse-yellow outline-traverse-yellow w-20 p-2"
        />
        <div className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          m<sup>2</sup>
        </div>
      </div>
    </div>
  );
};

export default LandArea;