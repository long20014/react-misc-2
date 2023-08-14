import { AppStateProvider } from 'contexts/AppStateProvider';
import './App.scss';
import MainRouter from 'router/MainRouter';

function App() {
  return (
    <AppStateProvider>
      <MainRouter />
    </AppStateProvider>
  );
}

export default App;
