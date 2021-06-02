import axios from 'axios';

function GenerateTestDataButton() {
  const handleGenerateTestDataClick = () => {
    axios.get(`/generate-test-data`);
  };

  return (
    <div>
      <h3>
        Generate Test Data Once On Startup To Initiate A Database w/ Test
        Entries
      </h3>
      <button type="button" onClick={() => handleGenerateTestDataClick()}>
        Generate
      </button>
    </div>
  );
}

export default GenerateTestDataButton;
