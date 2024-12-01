import './App.css';
import { useEffect } from 'react';
import { fetchDataFromAPI } from './utils/api';

function App() {

  useEffect(()=>[
    apiTesting()
  ], [])

  function apiTesting(){
        fetchDataFromAPI("movie/popular").then((res) =>{
          console.log(res)
        } )
  }
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
