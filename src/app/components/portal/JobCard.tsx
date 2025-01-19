"use client";

import * as React from 'react';
import { PortalJobCardProps } from '@/types/Props/PortalJobCardProps';

export const JobCard: React.FC<PortalJobCardProps> = ({ title, location, tags }) => {
  return (
    <div className="flex flex-col pb-4 w-full border border-b bg-black bg-opacity-0 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between bg-black bg-opacity-0 max-md:max-w-full">
        <div className="flex flex-col py-px bg-black bg-opacity-0">
          <div className="text-base font-semibold leading-none text-black max-md:mr-0.5">
            {title}
          </div>
          <div className="self-start mt-3 text-sm leading-none text-gray-600">
            {location}
          </div>
          <div className="flex gap-2 pr-16 mt-3.5 text-xs text-white whitespace-nowrap bg-black bg-opacity-0 max-md:pr-5">
            {tags.map((tag, index) => (
              <div key={index} className={`px-2 py-1.5 rounded ${index === 0 ? 'bg-orange-300' : 'bg-stone-500'}`}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <button className="self-start px-4 py-3.5 text-base text-center text-white bg-black rounded">
          Apply Now
        </button>
      </div>
    </div>
  );
};