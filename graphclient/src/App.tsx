import Canvas from './Canvas'
import SideBar from './optionBars/sideBar';
import NavBar from './Header'
import './App.css';

function App() {
  return (
    <>
      <NavBar/>
      <div className="AppContainer">
          <SideBar/>
          <Canvas/>
      </div>
    </>
  );
}

export default App;
