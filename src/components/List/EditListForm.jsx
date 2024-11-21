import { useState } from "react";
import { editListName } from "../../utils/editListName"
import { Modal, Button, Form, Input, message } from "antd";

export const EditListForm = ({ showEditForm, setShowEditForm, lists, setLists, activeListId, activeListName }) => {
  const [name, setName] = useState(activeListName);
  const [nameStatus, setNameStatus] = useState('');
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
    const data = await editListName(activeListId, name);
    setLoading(false);

    if (data.success) {
      setShowEditForm(false);
      setName(name);
      form.resetFields();
      message.success(data.message);
      setLists(lists.map((list) => {
        if(list.list_id === activeListId){
          return {...list, name: name}
        }
        else{
          return list;
        }
      }))
    }
    else {
      setNameStatus('error');
      message.error(data.message);
    }
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowEditForm(!showEditForm);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
    setNameStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showEditForm}
        onCancel={onCancel}
        footer={null}
        title="Edit List Name"
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please enter list Name",
              },
            ]}
          >
            <Input status={nameStatus} onChange={(e) => onNameChange(e)} />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditListForm;
