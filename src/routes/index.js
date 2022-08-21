import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ActivityGroup from '../pages/ActivityGroup';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route index path="/activity-group/:id" element={<ActivityGroup />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
