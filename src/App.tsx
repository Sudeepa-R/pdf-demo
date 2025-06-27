import './App.css'
import { ConfigProvider } from 'antd';
import DemoDashboard from './components/DemoDashboard';
function App() {


  return (
   <>
    <ConfigProvider>
      <DemoDashboard />
    </ConfigProvider>
   </>
  )
}

export default App
