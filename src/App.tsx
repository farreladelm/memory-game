import { useState } from 'react'
import StartPage from './components/StartPage'
import Game from './components/Game'

function App() {
  const [started, setStarted] = useState(false)

  return started ? (
    <Game onQuit={() => setStarted(false)} />
  ) : (
    <StartPage onStart={() => setStarted(true)} />
  )
}

export default App
