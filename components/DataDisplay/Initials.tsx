import React from "react";

interface CardContainerProps {
  title: string;
  color: string;
}

export const Initials: React.FC<CardContainerProps> = ({ color, title }) => {
  const initials = title
    .match(/(^\S\S?|\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();

  return (
    <>
      <div
        className={
          "h-8 w-8 bg-white rounded-md border-none flex items-center justify-center bg-blueGray-700"
        }
      >
        <span className={"font-black text-white"}>{initials}</span>
      </div>
    </>
  );
};
