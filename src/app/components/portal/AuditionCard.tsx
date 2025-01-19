import * as React from 'react';
import { AuditionCardProps } from '@/types/Props/AuditionCardProps';

export const AuditionCard: React.FC<AuditionCardProps> = ({ date, month, title, time, location }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-between pb-4 w-full border border-b bg-black bg-opacity-0 max-md:max-w-full">
      <div className="flex gap-4 bg-black bg-opacity-0">
        <div className="flex flex-col px-3 py-3 text-center text-white whitespace-nowrap bg-orange-300 rounded-lg">
          <div className="px-px pt-px pb-2.5 text-sm bg-black bg-opacity-0">{month}</div>
          <div className="px-1.5 pt-0.5 pb-3 text-xl font-bold bg-black bg-opacity-0">{date}</div>
        </div>
        <div className="flex flex-col px-px py-1 my-auto leading-none bg-black bg-opacity-0">
          <div className="self-start text-base font-semibold text-black">{title}</div>
          <div className="mt-3 text-sm text-gray-600">{time} - {location}</div>
        </div>
      </div>
      <div className="flex flex-col my-auto bg-black bg-opacity-0">
        <button className="flex gap-2 px-1.5 py-1 w-full bg-black bg-opacity-0">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/ab9e7a566eabf63df0e6c7c8db5e520f82558167d52e8921b069188a8c1a1df7?apiKey=7fae980a988640eea8add1e49a5d542e&" alt="" className="object-contain self-stretch my-auto w-3.5 aspect-[0.87]" />
          <span className="grow shrink text-base text-center text-stone-500 w-[114px]">
            Add to Calendar
          </span>
        </button>
      </div>
    </div>
  );
};