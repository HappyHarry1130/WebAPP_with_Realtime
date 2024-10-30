import Aboutindex from './components/welcome/about/aboutindex';
import Showimage from './components/welcome/showimage';
import Developer from './components/welcome/Developer/developer';
import Firstsection from './components/welcome/FirstSection';
import Services from './components/welcome/Services/services';
import OurWork from './components/welcome/ourwork/ourwork';
import GrowingClient from './components/welcome/GrowingClient/GrowingClient._index';
import './App.css';

function App1() {
  return (
    <div className='body'>
      <Firstsection/>
      
      <Aboutindex/>
      <Showimage/>
      <Developer/>
      <Services/>
      <OurWork/>
      <GrowingClient num={0}/>
      
    </div>
  );
}

export default App1;