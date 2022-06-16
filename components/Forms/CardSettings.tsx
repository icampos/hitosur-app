import React from "react";

// components
interface FormCardSettingsProps {
  title: string;
  subtititle: string;
  buttonText: string;
  children: any;
  setIsDisabled: any;
  status: string;
  isDisabled: boolean;
}

export const CardSettings: React.FC<FormCardSettingsProps> = ({
  title,
  subtititle,
  buttonText,
  children,
  setIsDisabled,
  status,
  isDisabled
}) => {
  const statusStyle = status === 'ACTIVE' ? 'text-emerald-500' : 'text-red-500';
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {title} <i className={`fas fa-circle mr-2 ${statusStyle}`} />
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {buttonText}
            </button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
