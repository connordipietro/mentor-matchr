import { useSelector } from 'react-redux';
import _ from 'lodash';

function TestDataDisplay() {
  const { data } = useSelector((state) => state.testData);

  const renderDataDisplay = () => {
    /* If data has been fetched and updated in redux store, data will no longer be empty, let's render that data recived from the DB. */
    if (!_.isEmpty(data)) {
      const dataDivs = data.map((dataItem) => (
        <h3 key={dataItem._id}>{dataItem.name}</h3>
      ));

      return dataDivs;
    }
    return <h3>Fetched Data Here</h3>;
  };

  return <div>{renderDataDisplay()}</div>;
}

export default TestDataDisplay;
