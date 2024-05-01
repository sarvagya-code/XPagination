import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const rowsPerPage = 10;
  const lastElement = currentPage * rowsPerPage;
  const firstElement = lastElement - rowsPerPage;
  const currentView = data.slice(firstElement, lastElement);

  const fetchData = async() => {
    try {
     const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
     setData(res.data);
    }catch(err){
      alert('failed to fetch data');
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div className='table'>
        <table className='tableData'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {currentView.map((user)=>(
            <tr id={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
          </tbody>  
        </table>  
      </div>
      <div className='toggle'>
          <button className='toggleButton' onClick={() => setcurrentPage((prev)=>prev -1)}>Previous</button>
          <span className='pageNum'>{currentPage}</span>
          <button className='toggleButton' onClick={() => setcurrentPage((prev)=>prev +1)}>Next</button>
      </div>      
    </div>
  );
}

export default App;
