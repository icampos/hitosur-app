import React from "react";
import dayjs from 'dayjs'

interface CardContainerProps {
  title: string;
  color: string;
}

export const Initials: React.FC<CardContainerProps> = ({ color, title }) => {

  const formattedTitle = title ? title.replace('_', ' ') : '';
  const initials = formattedTitle
    .match(/(^\S\S?|\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();

    const InitialColors = {
      RC: 'bg-blueGray-700',
      PC: 'bg-yellow-500'
    }

    const InitialColor = InitialColors[initials]

  return (
    <>
      <div
        className={
          `h-8 w-8 bg-white rounded-md border-none flex items-center justify-center ${InitialColor}`
        }
      >
        <span className={"font-bold text-white"}>{initials}</span>
      </div>
    </>
  );
};
