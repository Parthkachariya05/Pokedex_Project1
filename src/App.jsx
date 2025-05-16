
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'

function App() {

  return (
    <div className='outer-pokedex'>
      <h1 id='pokedex-heading'>
        <a href="/">Pokedex</a>
      </h1>

      <CustomRoutes />
    </div>
  )
}

export default App
