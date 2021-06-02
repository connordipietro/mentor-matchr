import { useDispatch } from 'react-redux';
import { getTestData } from '../actions';

function GetTestDataButton() {
  const dispatch = useDispatch();

  const handleGetTestDataClick = () => {
    dispatch(getTestData());
  };

  return (
    <div>
      <h3>Get Test Data</h3>
      <button type="button" onClick={() => handleGetTestDataClick()}>
        Get Test Data
      </button>
    </div>
  );
}

export default GetTestDataButton;
