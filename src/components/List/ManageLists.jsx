import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/userContext";
import { List, Button, Popconfirm, message } from "antd";
import { getLists } from "../../utils/getLists";
import EditListForm from "./EditListForm";
import { deleteList } from "../../utils/deleteList";

const ManageLists = () => {
  const { currentUser } = useContext(userContext);
  const [lists, setLists] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeListId, setActiveListId] = useState();
  const [activeListName, setActiveListName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const loadLists = async () => {
      if (currentUser) {
        const data = await getLists();
        if (data.success) {
          setLists(data.content);
        }
      }
      else {
        setLists();
      }
    };

    loadLists();

    return () => {};
  }, [lists, currentUser]);

  const success = (message) => {
    message.open({
      type: "success",
      message: message,
    });
  };

  const error = (message) => {
    message.open({
      type: "error",
      message: message,
    });
  };

  const handleEditList = (item) => {
    setActiveListId(item.list_id);
    setActiveListName(item.name);
    setShowEditForm(!showEditForm);
  };

  const handleDeleteList = async (item) => {
    const data = await deleteList(item.list_id);
    if (data.success) {
      message.success(data.message);
      setLists(lists.filter((list) => list.list_id !== item.list_id));
    } else {
      message.error("Something went wrong. Please try again later");
    }
  };

  return (
    <>
      {contextHolder}
      <h1>Manage Lists</h1>
      <EditListForm 
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        lists={lists}
        setLists={setLists}
        activeListId={activeListId}
        activeListName={activeListName}
      />
      <List
        bordered
        dataSource={lists}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <Button key="edit" onClick={() => handleEditList(item)}>
                  Edit
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Delete List"
                  description="Are you sure you want to delete this list?"
                  onConfirm={() => handleDeleteList(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>,
              ]}
            >
              {item.name}
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default ManageLists;
