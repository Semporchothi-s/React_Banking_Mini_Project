import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInScreen from './screens/SignInScreen'
import Signup from './screens/SignupScreen'
import DashboardPage from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import TransferMoneyScreen from "./screens/TransferMoneyScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import GlobalToast from "./components/GlobalToast";

function App() {
  return (
    <BrowserRouter>
      <GlobalToast />
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<DashboardPage />}>
          {/* Default redirect to home when accessing /dashboard directly */}
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="transfer" element={<TransferMoneyScreen />} />
          <Route path="history" element={<TransactionHistoryScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;