import './App.scss';
import SimpleCalcor from '@/components/SimpleCalcor';
import AdvancedCalcor from './components/AdvancedCalcor'
function App() {
  return (
    <div className="App">
      <SimpleCalcor></SimpleCalcor>
      <AdvancedCalcor></AdvancedCalcor>
    </div>
  );
}

export default App;
