import React from "react";

interface CardContainerProps {
  children: any;
  color: string;
  title?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  color,
  children,
  title,
}) => {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded cursor-pointer hover:bg-blueGray-600 " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        {title && (
          <div className="rounded-t mb-0 px-4 py-3 border">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg mb-2 mt-2 " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  {title}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="block w-full overflow-x-auto">{children}</div>
      </div>
    </>
  );
};
