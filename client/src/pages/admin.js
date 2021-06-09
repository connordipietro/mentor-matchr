import { useEffect, useState } from 'react';
/* import { useHistory } from 'react-router-dom'; */
import { getAdminStatus } from '../utilities/api';

export const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [adminStatus, setAdminStatus] = useState(true);
  // const history = useHistory();

  useEffect(() => {
    getAdminStatus()
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setAdminStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAdminStatus(false);
      });
  });

  return !loading ? (
    <div>
      <h3>Admin Dashboard</h3>
      {!adminStatus ? <h3>Access Denied</h3> : <h3>Access granted</h3>}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default AdminPage;
