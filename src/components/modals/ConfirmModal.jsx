import PropeType from "prop-types";
import { createContext } from "react";
import { Button, Modal, Space } from "antd";
const ReachableContext = createContext(null);
// const UnreachableContext = createContext(null);

const ConfirmModal = ({ title, message, onDeleteItem, confirmBtnRef }) => {
  const config = {
    title,
    content: (
      <>
        <ReachableContext.Consumer>
          {(name) => ` Are you sure you want to delete ${name}?`}
        </ReachableContext.Consumer>
      </>
    ),
    okButtonProps: {
      danger: true,
    },
  };
  const [modal, contextHolder] = Modal.useModal();
  return (
    <ReachableContext.Provider value={message}>
      <Space>
        <Button
          style={{ display: "none" }}
          ref={confirmBtnRef}
          onClick={async () => {
            const confirmed = await modal.confirm(config);
            if (confirmed) onDeleteItem();
          }}
        >
          Confirm
        </Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
    </ReachableContext.Provider>
  );
};
ConfirmModal.propTypes = {
  title: PropeType.string,
  message: PropeType.string,
  onDeleteItem: PropeType.func,
  confirmBtnRef: PropeType.any,
};
export default ConfirmModal;
