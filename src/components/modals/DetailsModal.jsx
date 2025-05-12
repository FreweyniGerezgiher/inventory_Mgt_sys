import { Modal } from "antd";
import PropTypes from "prop-types";

const FormModal = ({
  isModalOpen,
  //   onSubmitForm,
  onCloseModal,
  title,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={onCloseModal}
      footer={null}
      //   closable={false}
    >
      {children}
    </Modal>
  );
};

FormModal.propTypes = {
  isModalOpen: PropTypes.bool,
  //   onSubmitForm: PropTypes.func,
  onCloseModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default FormModal;
