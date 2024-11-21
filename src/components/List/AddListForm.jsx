import { useState } from "react";
import { addList } from "../../utils/addList"
import { Modal, Button, Form, Input, message } from "antd";

export const AddListForm = ({ showListForm, setShowListForm, lists, setLists }) => {
  const [listName, setListName] = useState('');
  const [listStatus, setListStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

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

  const onFinish = async () => {
    setLoading(true);
    const data = await addList(listName);
    setLoading(false);

    if (data.success) {
      setListName('');
      form.resetFields();
      setLists([...lists, data.list]);
      setShowListForm(!showListForm);
      message.success(data.message);
    }
    else {
      setListStatus('error');
      message.error("Please Log In");
    }
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowListForm(!showListForm);
  };

  const onListNameChange = (e) => {
    setListName(e.target.value);
    setListStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showListForm}
        onCancel={onCancel}
        footer={null}
        title="Add New List"
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the list name",
              },
            ]}
          >
            <Input status={listStatus} onChange={(e) => onListNameChange(e)} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddListForm;
