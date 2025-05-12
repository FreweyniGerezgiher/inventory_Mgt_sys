import PropTypes from "prop-types";
import { Col, Drawer, Row } from "antd";
const DetailsDrawer = ({ open, onCloseDrawer, title, children }) => {
  return (
    <Drawer
      title={title}
      width={720}
      theme="dark"
      onClose={onCloseDrawer}
      className=""
      open={open}
      styles={{
        body: {
          paddingBottom: 50,
        },
      }}
    >
      <Row gutter={16}>
        <Col span={24}>{children}</Col>
      </Row>
      {/* <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Space className="flex flex-row justify-end">
            <Button
              className="bg-red-500  hover:bg-red-400  hover: transition-colors duration-300 "
              onClick={onCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600  hover:bg-green-500 hover: transition-colors duration-300"
              onClick={onSubmitForm}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </Space>
        </Col>
      </Row> */}
    </Drawer>
  );
};
DetailsDrawer.propTypes = {
  open: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};
export default DetailsDrawer;
