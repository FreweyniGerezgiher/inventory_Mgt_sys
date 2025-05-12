import PropeType from "prop-types";
import { createContext } from "react";
import { Button, Modal, Space } from "antd";
const ReachableContext = createContext(null);
// const UnreachableContext = createContext(null);

const ActivateDeactivateModal = ({
  title,
  message,
  onActivateDeactivate,
  activateBtnRef,
  statusValue = "",
}) => {
  const config = {
    title,
    content: (
      <>
        <ReachableContext.Consumer>
          {(name) => ` Are you sure you want to ${name}?`}
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
          ref={activateBtnRef}
          onClick={async () => {
            const confirmed = await modal.confirm(config);
            if (confirmed) onActivateDeactivate();
          }}
        >
          {statusValue === "Active" ? "Deactivate" : "Activate"}
        </Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
    </ReachableContext.Provider>
  );
};
ActivateDeactivateModal.propTypes = {
  title: PropeType.string,
  message: PropeType.string,
  onActivateDeactivate: PropeType.func,
  activateBtnRef: PropeType.any,
  statusValue: PropeType.string,
};
export default ActivateDeactivateModal;
