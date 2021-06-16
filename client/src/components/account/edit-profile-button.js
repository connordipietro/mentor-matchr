import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

export default function EditProfileButton() {
  const history = useHistory();

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => history.push('/edit-account')}
      >
        Edit
      </Button>
    </>
  );
}
