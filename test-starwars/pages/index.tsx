import { Box, Heading } from '@chakra-ui/react';
import HeroList from '../components/HeroList';

const Home: React.FC = () => {
  return (
    <Box>
      <Heading padding={'25px'}>Star Wars Heroes</Heading>
      <HeroList />
    </Box>
  );
};

export default Home;
