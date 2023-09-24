import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { GameStatusProvider } from './hooks/useGameState.tsx'
import { store } from './store/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <GameStatusProvider>
    <App />
  </GameStatusProvider>
</Provider>
)