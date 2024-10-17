import { loginUser } from "../../utils/loginUser";
import { userContext } from '../../context/userContext.jsx'
import { useState, useContext } from "react";
import { Modal, Button, Form, Input, message } from "antd";

const LoginForm = ({ showLoginForm, setShowLoginForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const {setCurrentUser} = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      message: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      message: message,
    });
  };

  const onLogin = async () => {
    setLoading(true);
    const data = await loginUser(username, password);
    setLoading(false);

    if (data.success) {
      setShowLoginForm(false);
      setUsername("");
      setPassword("");
      setCurrentUser(data.username);
      message.success(data.message);
    }
    else {
      setPassword("");
      setUsernameStatus('error');
      setPasswordStatus('error');
      message.error(data.message);
    }
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowLoginForm(!showLoginForm);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameStatus('');
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showLoginForm}
        onCancel={onCancel}
        footer={null}
        title="Log In"
      >
        <Form
          layout="vertical"
          onFinish={onLogin}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input status={usernameStatus} onChange={(e) => onUsernameChange(e)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password status={passwordStatus} onChange={(e) => onPasswordChange(e)} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
