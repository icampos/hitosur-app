import React from "react";

interface HeaderContainerProps {
    children: any;
  }
export default function HeaderContainer() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
