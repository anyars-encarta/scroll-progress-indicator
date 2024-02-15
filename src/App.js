import CustomScrollIndicator from './components/custom-scroll-indicator';
import './App.css';

function App() {
  return (
    <div className="App">
      <CustomScrollIndicator url={'https://dummyjson.com/products?limit=100'}/>
    </div>
  );
}

export default App;
