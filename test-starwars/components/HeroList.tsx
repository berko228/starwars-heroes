import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { getHeroes } from "../api/api";
import { Spinner } from "@chakra-ui/react";

interface Hero {
  name: string;
  url: string;
}

const HeroList: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadButtonAvailable, setLoadButtonAvailable] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        setLoading(true);

        const heroesListResponse = await getHeroes(page);

        if (!heroesListResponse?.next) { 
          setLoadButtonAvailable(false); // in case we don't have next page of heroes
        }

        setHeroes((prevHeroes) => [
          ...prevHeroes,
          ...heroesListResponse.results,
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroes();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSelectHero = (url: string) => {
    // spilting url to get the hero id
    const id = url.split("/").slice(-2, -1)[0];

    router.push(`/hero/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        width="100%"
        gap="20px"
        paddingInline="100px"
      >
        {heroes.map((hero, index) => (
          <Box
            padding="10px"
            border="1px solid black"
            borderRadius="15px"
            cursor="pointer"
            _hover={{
              backgroundColor: "black",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
            }}
            m={2}
            key={index}
            onClick={() => handleSelectHero(hero.url)}
          >
            {hero.name}
          </Box>
        ))}
      </Box>
      {isLoadButtonAvailable ? (
        <Button
          onClick={loadMore}
          disabled={loading}
          margin="30px"
          bg={"#000"}
          color={"#fff"}
        >
          {loading ? <Spinner /> : "Load More"}
        </Button>
      ) : (
        <Button
          disabled={true}
          margin="30px"
          colorScheme="red"
        >
          We have no more heroes
        </Button>
      )}
    </Box>
  );
};

export default HeroList;
