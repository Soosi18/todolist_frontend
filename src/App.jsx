import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import UserMenu from './components/User/UserMenu.jsx'
import ListMenu from "./components/List/ListMenu.jsx"
import TodoList from "./components/Todo/TodoList.jsx"
import ManageLists from './components/List/ManageLists.jsx'
import { useContext } from 'react'
import { listContext } from './context/listContext.jsx'
import './App.css'

function App() {
  const { selectedList } = useContext(listContext);
  return (
    <Layout>
      <Header className=''>
        <UserMenu />
      </Header>
      <Layout>
        <Sider theme='dark' className='' collapsible={true}>
          <ListMenu />
        </Sider>
        <Layout>
          <Content className='p-20'>
            {selectedList === 'all' ? (<ManageLists />) : (<TodoList />)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
