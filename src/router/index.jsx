import { Route, Routes, Navigate } from 'react-router-dom';

// Layout
import AppLayout from '../layouts/AppLayout';

// Public Pages
import Landing from '../pages/public/Landing';
import Auth from '../pages/public/Auth';
import Terms from '../pages/public/Terms';
import NotFound from '../pages/public/NotFound';

// Workspace Pages 
import Overview from '../pages/workspace/Overview';
import MyRecovery from '../pages/workspace/MyRecovery';
import Assessments from '../pages/workspace/Assessments';
import Plans from '../pages/workspace/RehabilitationPlans';
import Sessions from '../pages/workspace/ExerciseSessions';
import Progress from '../pages/workspace/ProgressInsights';
import Reports from '../pages/workspace/MedicalReports';
import Settings from '../pages/workspace/ProfileSettings';
import Sync from '../pages/workspace/SyncQueue';

// Auth Guard
import ProtectedRoute from './ProtectedRoute';

 const Approuter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Landing />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/terms' element={<Terms />} />
      
      {/* Protected Workspace Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/overview' element={<Overview />} />
        <Route path='/recovery' element={<MyRecovery />} />
        <Route path='/assessments' element={<Assessments />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/sessions' element={<Sessions />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/sync' element={<Sync />} />
      </Route>

      {/* Catch All */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Approuter