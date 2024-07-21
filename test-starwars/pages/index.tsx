import { Box, Heading } from "@chakra-ui/react";
import HeroList from "../components/HeroList";
import { StarWarsIcon } from "@/icons/StarWarsIcon";
import { DarthVaderIcon } from "@/icons/DarthVaderIcon";
import { StormtrooperIcon } from "@/icons/StormtrooperIcon";

const Home: React.FC = () => {
  return (
    <Box>
      <Box display="flex" gap="20px" justifyContent='center' alignItems='center'>
        <StormtrooperIcon />
        <Heading padding={"25px"}>Star Wars Heroes</Heading>
        <DarthVaderIcon />
      </Box>
      <HeroList />
    </Box>
  );
};

export default Home;
