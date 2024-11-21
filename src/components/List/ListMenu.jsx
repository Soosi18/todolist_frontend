import { useState, useEffect, useContext } from "react";
import { userContext } from "../../context/userContext";
import { listContext } from "../../context/listContext";
import { Menu } from "antd";
import { getLists } from "../../utils/getLists";
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons'
import AddListForm from "./AddListForm";

const ListMenu = () => {
  const [lists, setLists] = useState(null);
  const { currentUser } = useContext(userContext);
  const { setSelectedList } = useContext(listContext);
  const [showListForm, setShowListForm] = useState(false);
  const [showManageListsForm, setShowManageListsForm] = useState(false);
  let items = [];
  let listItems = [];


  useEffect(() => {
    const loadLists = async () => {
      if (currentUser) {
        const data = await getLists();
        if (data.success) {
          setLists(data.content);
        }
      }
      else {
        setLists(null);
      }
    }

    loadLists();

    return () => {};
  }, [lists, currentUser]);

  const handleSelectList = (list_id) => {
    setSelectedList(list_id);
  }

  const handleAddList = () => {
    setShowListForm(!showListForm);
  }

  const handleManageLists = () => {
    setSelectedList('all');
  }

  if(lists){
    lists.forEach((list) => {
      listItems.push(
        {
          key: list.list_id,
          label: list.name,
          icon: <UnorderedListOutlined />,
          onClick: function(){handleSelectList(list.list_id)},
        }
      )
    })
    items.push(
      {
        key: 'myLists',
        label: 'My Lists',
        icon: <UnorderedListOutlined />,
        children: listItems
      },
      {
        key: 'manageLists',
        label: 'Manage Lists',
        icon: <UnorderedListOutlined />,
        onClick: function(){handleManageLists()}
      }
    )
  }
  items.push(
    {
      key: 'addlist',
      icon: <PlusOutlined />,
      label: "Add List",
      onClick: handleAddList
    }
  )  
  
  return (
    <>
      <Menu
        theme="dark"
        items={items}
        mode="inline"
        className="h-screen text-white"
      />
      <AddListForm
        showListForm={showListForm}
        setShowListForm={setShowListForm}
        lists={lists}
        setLists={setLists}
      />
    </>
  );
};

export default ListMenu;
