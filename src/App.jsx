import {Layout} from 'antd'
const {Header, Sider, Content} = Layout
import UserMenu from './components/User/UserMenu.jsx'
import ListMenu from "./components/List/ListMenu.jsx"
import TodoList from "./components/Todo/TodoList.jsx"
import './App.css'

function App() {
  return (
    <Layout>
      <Header className=''>
        <UserMenu />
      </Header>
      <Layout>
        <Sider theme='dark' className='' collapsible={true}>
          <ListMenu />
        </Sider>
        <Content className='h-screen'>
          <TodoList />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
