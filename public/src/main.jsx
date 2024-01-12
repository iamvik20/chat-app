import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider as Router, createBrowserRouter } from 'react-router-dom';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './index.css'
import SetAvatar from './pages/SetAvatar.jsx';
import VerifyOtp from './pages/VerifyOtp.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Chat />
      },
      {
        path: '/setAvatar',
        element: <SetAvatar />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router router={router}/>
)
