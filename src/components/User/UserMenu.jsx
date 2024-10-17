import { Menu } from 'antd'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { userContext } from '../../context/userContext.jsx'
import { useState, useContext } from 'react'
import { logoutUser } from '../../utils/logoutUser.js'

const UserMenu = () => {
  const {currentUser, setCurrentUser} = useContext(userContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  }

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  }

  const handleLogout = async() => {
    await logoutUser();
    setCurrentUser(null);
  }

  const items = [];

  if (currentUser){
    items.push(
      {
      key: '1',
      label: `Welcome, ${currentUser} !`
      },
      {
        key: '2',
        label: 'Logout',
        onClick: handleLogout
      }
    )
  }
  else{
    items.push(
      {
        key: '1',
        label: 'Login',
        onClick: toggleLoginForm
      },
      {
        key: '2',
        label: 'Register',
        onClick: toggleRegisterForm
      }
    )
  }
  
  return (
    <>
      <Menu theme="dark" mode="horizontal" selectable={false} className="flex justify-end items-center" items={items} />
      <LoginForm 
        showLoginForm={showLoginForm} 
        setShowLoginForm={setShowLoginForm} 
      />
      <RegisterForm 
        showRegisterForm={showRegisterForm} 
        setShowRegisterForm={setShowRegisterForm} 
      />
    </>
    
  )
}

export default UserMenu