
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import Posts from './containers/Posts/Posts';
import PostForm from './containers/PostForm/PostForm';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import {useState} from 'react';
import {Post} from './types';

function App() {
  const [posts, setPosts] =useState<Post[]>([
    {id: '1', date:'01', title: 'First day'},
    {id: '2', date:'02', title: 'Second day'},
    {id: '3', date:'03', title: 'Third day'},
  ]);

  return (
    <div>
      <header style={{borderBottom:'1px solid blue', marginBottom: '10px', float: 'right' }}>
        <NavLink to="/posts" >Home</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="new-post">Add</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="about">About</NavLink>
        <span style={{margin: '0 10px'}}>|</span>
        <NavLink to="contacts">Contacts</NavLink>
      </header>
      <Routes>
        <Route path='/about' element={(<About/>)}></Route>
        <Route path='/contacts' element={(<Contacts/>)}></Route>
        <Route path='/posts' element={(<Posts/>)}></Route>
        <Route path='/new-post' element={(<PostForm/>)}></Route>
      </Routes>
    </div>
  );
}

export default App;
