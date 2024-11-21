import React from "react";
import { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { registerUser } from "../../utils/registerUser.js";

const RegisterForm = ({ showRegisterForm, setShowRegisterForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameStatus, setUsernameStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
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

  const onRegister = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      const data = await registerUser(username, password);
      setLoading(false);
      if (data.success) {
        setShowRegisterForm(false);
        setUsername("");
        setPassword("");
        form.resetFields();
        message.success(data.message);
      }
      else {
        setUsernameStatus('error');
        message.error(data.message);
      }
    }
    else {
      setLoading(false);
      setConfirmPasswordStatus('error');
      message.error("Passwords do not match");
    }
    
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameStatus('');
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStatus('');
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showRegisterForm}
        onCancel={onCancel}
        footer={null}
        title="Register"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onRegister}
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
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "Please re-enter your password",
              },
            ]}
          >
            <Input.Password status={confirmPasswordStatus} onChange={(e) => onConfirmPasswordChange(e)} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterForm;
