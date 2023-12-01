
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';

import PostForm from './containers/PostForm/PostForm';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';

import PostItem from './containers/Post/PostItem';
import Posts from './containers/Post/Posts';



function App() {

  return (
    <div>
        <h4 className="float-start"> My blog</h4>
      <header>
        <NavLink to="/posts" >Home</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="new-post">Add</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="about">About</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="contacts">Contacts</NavLink>
      </header>
      <div>
        <Routes>
          <Route path='/about' element={(<About/>)}></Route>
          <Route path='/contacts' element={(<Contacts/>)}></Route>
          <Route path='/' element={(<Posts />)}></Route>
          <Route path='/posts' element={(<Posts />)}></Route>
          <Route path="/post/:postId" element={(<PostItem />)}/>
          <Route path='/new-post' element={(<PostForm/>)}></Route>
          <Route path="/post/:postId/edit" element={(<PostForm/>)}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
