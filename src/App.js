import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { TierProvider } from './contexts/TierContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TierProvider>
      <AuthProvider>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
      </AuthProvider>
    </TierProvider>
  );
}

export default App;