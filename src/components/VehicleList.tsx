import {
    createExpandedRowModel,
    rowExpandingFeature,
    tableFeatures,
    useTable,
    type ColumnDef,
    type ExpandedState,
} from "@tanstack/react-table";
import { Pagination, Popconfirm, Spin, Tag } from "antd";
import { Fragment, useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import FilterPopup from "./FilterPopup";
import useVehicleList from "./hooks/useVehicleList";
import LogModal from "./LogModal";
import SearchInput from "./SearchInput";
import VehicleExpandRow from "./VehicleExpandRow";
import styles from "./vehicleList.module.css";

const features = tableFeatures({
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

const columns: Array<ColumnDef<typeof features, VehicleReponse>> = [
  {
    header: "+",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          className={styles["expand-btn"]}
        >
          {row.getIsExpanded() ? "-" : "+"}
        </button>
      ) : (
        ""
      );
    },
  },
  {
    accessorKey: "vin",
    header: "VIN",
    cell: (info) => (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
       <a className={styles["vehicle-vin-text"]} href="/">{info.getValue<string>()}</a> 
      </div>
    ),
  },
  {
    accessorKey: "make",
    header: () => <span>Make</span>,
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: "model",
    header: () => <span>Model</span>,
    cell: (info) => info.getValue<string>(),
  },
  {
    accessorKey: "color",
    header: () => <span>Color</span>,
    cell: (info) => (
      <div className={styles["tbl-item-color"]}>
        <div className={styles["text"]}>{info.getValue<string>()}</div>
        <div
          style={{
            backgroundColor: info.getValue<string>(),
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <span>Price</span>,
    cell: (info) => info.getValue<number>(),
  },
  {
    accessorKey: "year",
    header: () => "Year",
    cell: (info) => info.getValue<number>(),
  },
  {
    accessorKey: "isAging",
    header: () => "Status",
    cell: (info) => (
      <div className={styles["tbl-item-aging"]}>
        <Tag
          className={styles["text"]}
          color={info.getValue<boolean>() ? "red" : "green"}
        >
          {info.getValue<boolean>() ? "Aging Stock" : "Fresh Inventory"}
        </Tag>
      </div>
    ),
  },

  {
    accessorKey: "action",
    header: () => "Action",
    cell: ({ row }) => (
      <div className={styles["tbl-item-action"]}>
        <LogModal item={row?.original} />
        <button className={`${styles["action-btn"]} ${styles["edit-btn"]}`}>
          <FaEdit className={styles["action-btn-icon"]} />
        </button>
        <Popconfirm
          title="Are you sure you want to delete this vehicle?"
          description="This action cannot be undone."
          placement="left"
          onConfirm={() => {
            console.log("Delete confirmed");
          }}
        >
          <button className={`${styles["action-btn"]} ${styles["delete-btn"]}`}>
            <FaRegTrashAlt className={styles["action-btn-icon"]} />
          </button>
        </Popconfirm>
      </div>
    ),
  },
];

function VehicleList() {
  const {
    data,
    isLoading,
    isError,
    error,
    pageSize,
    currentPage,
    setCurrentPage,
    setPageSize,
    filters,
  } = useVehicleList();

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useTable({
    key: "person-table",
    features,
    columns,
    data: data?.data || [],
    getRowCanExpand: () => true,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
  });

  if (isLoading) {
    return (
      <div className={styles["loading-container"]}>
        <Spin size="medium" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="">
        Unable to load vehicles.{" "}
        {error instanceof Error ? error.message : "Please try again."}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles["vehicle-list-header"]}>
        <div className={styles.title}>Vehicle List</div>
        <div className={styles["vehicle-list-header-content"]}>
          <SearchInput filters={filters} setCurrentPage={setCurrentPage} />
          <FilterPopup />
        </div>
      </div>
      <div className={styles["vehicle-table-container"]}>
        {data?.data.length === 0 ? (
          <div className="">
            No vehicles match the current search and filters.
          </div>
        ) : (
          <>
            <table className={styles["vehicle-table"]}>
              <thead className={styles["vehicle-tbl-thead"]}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <table.FlexRender header={header} />
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className={styles["vehicle-tbl-body"]}>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr key={row.id}>
                      {row.getAllCells().map((cell) => (
                        <td key={cell.id}>
                          <table.FlexRender cell={cell} />
                        </td>
                      ))}
                    </tr>
                    {/* If the row is expanded, render the expanded UI as a separate row with a single cell that spans the width of the table */}
                    {row.getIsExpanded() && (
                      <VehicleExpandRow
                        vehicleId={row.original.id}
                        colSpan={row.getAllCells().length}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
            <Pagination
              showSizeChanger
              align="center"
              defaultCurrent={1}
              pageSize={pageSize}
              current={currentPage}
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              }}
              total={data?.totalRows || 0}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VehicleList;
