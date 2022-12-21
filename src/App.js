import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useReducer } from 'react';
import { reducer, initialState } from './recducer';
import ReducerContext from './contexts/ReducerContext';
import Layout from './components/Layout/Layout';
import Menu from './components/Layout/Menu/Menu';
import Footer from './components/Layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Message from './pages/message/Message';
import AddPost from './components/Editor/Editor';
import { AuthenticatedRoute } from './hoc/AuthenticatedRoute';
import EditTopic from './components/admin/edit.component';
import TopicList from './components/admin/list.component';
//import AuthenticatedRoute from './hoc/AuthenticatedRoute';
function App() {
  const menu = <Menu />;
  const [state, dispatch] = useReducer(reducer, initialState);
  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <AuthenticatedRoute>
            <Admin />
          </AuthenticatedRoute>
        }
      />
      <Route path="/message" element={<Message />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/topic/edit/:id" element={<EditTopic />} />
      <Route exact path="/topics" element={<TopicList />} />

      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  );
  const footer = <Footer />;
  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) =>
            dispatch({
              type: 'login',
              user,
            }),
          logout: () =>
            dispatch({
              type: 'logout',
            }),
        }}
      >
        <ReducerContext.Provider
          value={{
            state: state,
            dispatch: dispatch,
          }}
        >
          <Layout menu={menu} content={content} footer={footer} />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
