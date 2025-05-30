import PropTypes from "prop-types";
import { Button, Col, Drawer, Row, Space } from "antd";
const FormDrawer = ({
  open,
  onCloseDrawer,
  onSubmitForm,
  title,
  isUpdate = false,
  children,
}) => {
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
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Space className="flex flex-row justify-end">
            <Button
              className="bg-red-500  hover:bg-red-400  hover: transition-colors duration-300 "
              onClick={onCloseDrawer}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 rounded-md font-medium text-md ml-4 py-0.5" 
              onClick={onSubmitForm}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          </Space>
        </Col>
      </Row>
    </Drawer>
  );
};
FormDrawer.propTypes = {
  open: PropTypes.bool,
  onCloseDrawer: PropTypes.func,
  title: PropTypes.string,
  onSubmitForm: PropTypes.func,
  children: PropTypes.node,
  isUpdate: PropTypes.bool,
};
export default FormDrawer;
