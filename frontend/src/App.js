
import './App.css';
import Header from "./components/header"
import {Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import AddNewBlog from "./Pages/add-blog"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route  path='/' element={<Home />}/>
        <Route path='/add-blog' element={<AddNewBlog />}/>

      </Routes>
    </div>
  );
}

export default App;
