import { Modal, Button, Space } from "antd";
import PropTypes from "prop-types";

const FormModalWithRemoveButton = ({
  isModalOpen,
  onSubmitForm,
  onCloseModal,
  onRemove,
  title,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={onCloseModal}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button danger onClick={onRemove}>
            Remove All
          </Button>
          <Space>
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button type="default" onClick={onSubmitForm}>
              Submit
            </Button>
          </Space>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

FormModalWithRemoveButton.propTypes = {
  isModalOpen: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  onRemove: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default FormModalWithRemoveButton;
