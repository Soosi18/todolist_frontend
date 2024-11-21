import { listContext } from '../../context/listContext.jsx'
import { useState, useContext } from "react";
import { addTodo } from '../../utils/addTodo.js';
import { Modal, Button, Form, Input, message } from "antd";

export const AddTodoForm = ({ showAddTodoForm, setShowAddTodoForm, todos, setTodos }) => {
  const [description, setDescription] = useState();
  const [descriptionStatus, setDescriptionStatus] = useState('');
  const {selectedList} = useContext(listContext);
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
    const data = await addTodo(selectedList, description);
    setLoading(false);

    if (data.success) {
      setShowAddTodoForm(false);
      setDescription('');
      form.resetFields();
      message.success(data.message);
      setTodos([...todos, data.todo])
    }
    else {
      setDescriptionStatus('error');
      message.error(data.message);
    }
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowAddTodoForm(!showAddTodoForm);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showAddTodoForm}
        onCancel={onCancel}
        footer={null}
        title="Add New Task"
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the task description",
              },
            ]}
          >
            <Input status={descriptionStatus} onChange={(e) => onDescriptionChange(e)} />
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

export default AddTodoForm;
