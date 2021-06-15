import { useEffect, useState } from 'react';
import { CreateBanner } from '../components';
/* import { useHistory } from 'react-router-dom'; */
import { getAdminStatus } from '../utilities/api';

export const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState(true);
  // const history = useHistory();

  useEffect(() => {
    getAdminStatus()
      .then(() => {
        setLoading(false);
        setAdminStatus(true);
      })
      .catch((err) => {
        setLoading(false);
        setAdminStatus(false);
      });
  });

  return !loading ? (
    <div>
      <h3>Admin Dashboard</h3>
      {!adminStatus ? (
        <h3>Access Denied</h3>
      ) : (
        <div>
          <h3>Access granted</h3>
          <CreateBanner />
        </div>
      )}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default AdminPage;
