import GenerateTestDataButton from './generate-test-data-button';
import GetTestDataButton from './get-test-data-button';
import TestDataDisplay from './test-data-display';

function DataContainer() {
  return (
    <div>
      <GenerateTestDataButton />
      <GetTestDataButton />
      <TestDataDisplay />
    </div>
  );
}

export default DataContainer;
