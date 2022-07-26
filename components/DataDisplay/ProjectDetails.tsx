import React from "react";


interface ProjectSummaryProps {
    color: string;
    project?: any;
    onClick?: any;
}


export const ProjectDetails = ({color, project, onClick}: ProjectSummaryProps) => {

    const { name } = project

    return (
        <tr onClick={()=>onClick()}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img
            src="/img/bootstrap.jpg"
            className="h-12 w-12 bg-white rounded-full border"
            alt="..."
          ></img>{" "}
          <span
            className={
              "ml-3 font-bold " +
              +(color === "light" ? "text-blueGray-600" : "text-white")
            }
          >
            {name}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          $2,500 USD
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2"></i> pending
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex">
            <img
              src="/img/team-1-800x800.jpg"
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
            ></img>
            <img
              src="/img/team-2-800x800.jpg"
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
            ></img>
            <img
              src="/img/team-3-800x800.jpg"
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
            ></img>
            <img
              src="/img/team-4-470x470.png"
              alt="..."
              className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
            ></img>
          </div>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex items-center">
            <span className="mr-2">60%</span>
            <div className="relative w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                <div
                  style={{ width: "60%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    )

}