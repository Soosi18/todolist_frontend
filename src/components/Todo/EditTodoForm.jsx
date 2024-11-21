import { listContext } from '../../context/listContext.jsx'
import { useState, useContext } from "react";
import { editTodoDescription } from "../../utils/editTodoDescription"
import { Modal, Button, Form, Input, message } from "antd";

export const EditTodoForm = ({ showEditForm, setShowEditForm, todo_id, todo_description, todos, setTodos }) => {
  const [description, setDescription] = useState(todo_description);
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
    const data = await editTodoDescription(selectedList, todo_id, description);
    setLoading(false);

    if (data.success) {
      setShowEditForm(false);
      setDescription('');
      form.resetFields();
      message.success(data.message);
      setTodos(todos.map((todo) => {
        if(todo.todo_id === todo_id){
          return {...todo, description: description}
        }
        else{
          return todo;
        }
      }))
    }
    else {
      setDescriptionStatus('error');
      message.error(data.errors.error);
    }
  }

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onCancel = () => {
    setShowEditForm(!showEditForm);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionStatus('');
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showEditForm}
        onCancel={onCancel}
        footer={null}
        title="Edit Task Description"
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

export default EditTodoForm;
