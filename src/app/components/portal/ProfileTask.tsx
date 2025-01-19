"use client";

import * as React from 'react';
import { ProfileTaskProps } from '@/types/Props/ProfileTaskProps';

export const ProfileTask: React.FC<ProfileTaskProps> = ({ icon, label, completed }) => {
  return (
    <div className="flex flex-wrap gap-2 py-0.5 w-full bg-black bg-opacity-0 max-md:max-w-full">
      <div className="flex overflow-hidden justify-center items-center self-start min-h-[14px]">
        <img loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-3 aspect-[0.86]" />
      </div>
      <div className={`flex-auto text-sm leading-none ${completed ? 'text-black' : 'text-gray-400'} w-[1050px] max-md:max-w-full`}>
        {label}
      </div>
    </div>
  );
};