import BootstrapTable from "react-bootstrap-table-next";

interface BootstrapTableProps {
  color: string;
  columns: any;
  title: string;
  data: any;
}

const BootstrapTableComponent: React.FC<BootstrapTableProps> = ({
  color,
  columns,
  title,
  data,
}) => {
  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto"></div>
      <div style={{ maxWidth: "100%" }}>
        <BootstrapTable columns={columns} data={data} keyField="id" />
      </div>
    </div>
  );
};
export default BootstrapTableComponent;
