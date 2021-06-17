import { useParams } from 'react-router';
import { config } from '../config/constants';

export const PairProgramming = () => {
  const { id } = useParams();

  console.log(id);
  return (
    <>
      <h1>Pair Programming Page Here</h1>
    </>
  );
};
