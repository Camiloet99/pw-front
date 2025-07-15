import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
    </AuthProvider>
  );
}

export default App;