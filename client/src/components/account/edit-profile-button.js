import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

export default function EditProfileButton() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/edit-account');
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => handleClick()}
      >
        Edit
      </Button>
    </>
  );
}
