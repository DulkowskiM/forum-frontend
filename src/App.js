import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Logout from './pages/Auth/Logout/Logout';
import { useReducer } from 'react';
import { reducer, initialState } from './store/auth/authReducer';
import ReducerContext from './contexts/ReducerContext';
import Layout from './components/Layout/Layout';
import Menu from './components/Layout/Menu/Menu';
import Footer from './components/Layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Messages from './pages/Message/Messages';
import AddPost from './pages/AddPost/AddPost';
import { AuthenticatedRoute } from './hoc/AuthenticatedRoute';
import EditTopic from './components/Topics/Topic/Edit/Edit';
import TopicList from './components/Topics/Topics';
import Department from './pages/Departments/Department';
import SubDepartment from './pages/Departments/SubDepartment/SubDepartment';
import DepartmentList from './components/Departments/Department/Department_list';
import CreateDepartment from './components/Departments/Department/Department_add';
import EditDepartment from './components/Departments/Department/Department_edit';
import SubDepartmentList from './components/Departments/Department/SubDepartments/SubDepartment_list';
import CreateSubDepartment from './components/Departments/Department/SubDepartments/SubDepartment_add';
import EditSubDepartment from './components/Departments/Department/SubDepartments/SubDepartment_edit';
import EditCategory from './components/Departments/Department/SubDepartments/Categories/Category_edit';
import Category_list from './components/Departments/Department/SubDepartments/Categories/Category_list';
import Categories from './pages/Departments/SubDepartment/Categories/Categories';
import { AdminRoute } from './hoc/AdminRoute';
import ViewTopic from './components/ViewTopic/ViewTopic';
import NewTopic from './pages/NewTopic/NewTopic';
function App() {
  const menu = <Menu />;
  const [state, dispatch] = useReducer(reducer, initialState);
  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route
        path="/admin"
        element={
          <AuthenticatedRoute>
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </AuthenticatedRoute>
        }
      /> */}
      <Route
        path="/forum/:id_dep/:id_sub/:id_cat/:id_top"
        element={<ViewTopic />}
      />
      <Route path="/forum/:id_dep" element={<Department />} />
      <Route path="/forum/:id_dep/:id_sub" element={<SubDepartment />} />
      <Route path="/forum/:id_dep/:id_sub/:id_cat" element={<Categories />} />

      <Route
        path="/message"
        element={
          <AuthenticatedRoute>
            <Messages />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/forum/:id_dep/:id_sub/:id_cat/addPost"
        element={
          <AuthenticatedRoute>
            <AddPost />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/forum/:id_dep/:id_sub/:id_cat/newtopic"
        element={
          <AuthenticatedRoute>
            <NewTopic />
          </AuthenticatedRoute>
        }
      />
      {/* Działy */}
      <Route
        path="/department/create"
        element={
          <AuthenticatedRoute>
            <CreateDepartment />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/department/edit/:id"
        element={
          <AuthenticatedRoute>
            <EditDepartment />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/departments"
        element={
          <AuthenticatedRoute>
            <DepartmentList />
          </AuthenticatedRoute>
        }
      />
      {/* pod Działy */}
      <Route
        path="/subdepartment/create"
        element={
          <AuthenticatedRoute>
            <CreateSubDepartment />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/subdepartment/edit/:id"
        element={
          <AuthenticatedRoute>
            <EditSubDepartment />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/subdepartments"
        element={
          <AuthenticatedRoute>
            <SubDepartmentList />
          </AuthenticatedRoute>
        }
      />
      {/* Kategorie */}
      <Route
        path="/category/edit/:id"
        element={
          <AuthenticatedRoute>
            <EditCategory />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/categories"
        element={
          <AuthenticatedRoute>
            <Category_list />
          </AuthenticatedRoute>
        }
      />

      {/* Posty */}
      <Route
        path="/topic/edit/:id"
        element={
          <AuthenticatedRoute>
            <EditTopic />
          </AuthenticatedRoute>
        }
      />
      <Route
        exact
        path="/topics"
        element={
          <AuthenticatedRoute>
            <TopicList />
          </AuthenticatedRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
  const footer = <Footer />;
  return (
    <Router>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {/* <ReducerContext.Provider
          value={{
            state: state,
            dispatch: dispatch,
          }}
        > */}
        <Layout menu={menu} content={content} footer={footer} />
        {/* </ReducerContext.Provider> */}
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
