import { Avatar, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import auth from "../../services/http/auth";
import { userService } from "../../services/storageService";
import avatar from "../../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  let email = userService.getUser();

  const items = [
    {
      label: <h3 className="text-md font-semibold">{email}</h3>,
      key: "1",
      icon: (
        <UserOutlined className="text-blue-400" style={{ fontSize: "110%" }} />
      ),
    },
    {
      type: "divider",
    },
    {
      label: <h3 className="text-md font-semibold">Change Password</h3>,
      key: "2",
      icon: <i className="fa fa-lock text-sky-600" style={{ fontSize: 20 }} />,
    },
    {
      type: "divider",
    },
    {
      label: <h3 className="text-md font-semibold">Log out</h3>,
      key: "3",
      icon: (
        <LogoutOutlined className="text-red-400" style={{ fontSize: "110%" }} />
      ),
    },
  ];

  const handleLogoutUser = () => {
    auth.signOut();
    window.location.reload();
  };

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      navigate("/change-password");
    } else if (e.key === "3") {
      handleLogoutUser(); 
    }
  };

  return (
    <div
      className="flex items-center justify-end border-b"
    >
      <div>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden"></section>

          <Space wrap size={8}>
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <a onClick={(e) => e.preventDefault()}>
                <Avatar
                  className="mx-6 cursor-pointer  sm:flex w-full h-full object-cover"
                  size={42}
                  src={avatar}
                />
              </a>
            </Dropdown>
          </Space>
        </nav>
      </div>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #342312;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
