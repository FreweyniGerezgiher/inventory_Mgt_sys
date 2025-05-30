import PropTypes from "prop-types";
import { Table, ConfigProvider } from "antd";

const DataTable = ({
  data,
  columns,
  tableProps,
  loading = false,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          colorBgContainer: "#ffffff",
          colorText: "#000000",
          colorTextHeading: "#000000",
          fontFamily: "sans-serif",
          colorLink: "#000000",
          colorLinkHover: "#000000",
          colorLinkActive: "#000000",
          tableHeaderBg: "#f3f4f6", // light gray for header
          headerBg: "#ffffff",
          headerSplitColor: "#e5e7eb",
          headerBorderRadius: 8,
          colorTextDisabled: "#6b7280",
          colorTextDescription: "#6b7280",
        },
        components: {
          Table: {
            colorBgContainer: "#ffffff",
            stickyScrollBarBg: "#e5e7eb",
            rowExpandedBg: "#ffffff",
            rowHoverBg: "#f9fafb",
            rowBg: "#ffffff",
            footerBg: "#ffffff",
            headerBg: "#f3f4f6",
            borderColor: "#d1d5db",
            expandIconBg: "#000000",
            footerColor: "#000000",
            headerColor: "#000000",
            headerSortColor: "#000000",
            headerSortBg: "#f3f4f6",
            bodyColor: "#000000",
            colorPrimary: "#000000",
            borderColorSecondary: "#d1d5db",
          },
        },
      }}
    >
      <Table
        {...tableProps}
        className="overflow-x-auto text-sm"
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={false}
        key={"key"}
      />
    </ConfigProvider>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  tableProps: PropTypes.object,
  loading: PropTypes.bool,
};

export default DataTable;
