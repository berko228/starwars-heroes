import { useEffect, useState, useCallback } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
} from "react-flow-renderer";

import "react-flow-renderer/dist/style.css";
import { getHeroDetails } from "../../api/api";
import { useRouter } from "next/router";

interface HeroDetailProps {
  heroUrl: string;
}

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
];

const HeroDetail: React.FC<HeroDetailProps> = ({ heroUrl }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const router = useRouter();
  const { id } = router.query;
  const [heroData, setHeroData] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const loadHeroDetails = async () => {
      const heroResponse = await getHeroDetails(id as string);

      setHeroData(heroResponse);

      const formattedFilms = heroResponse?.films?.map(
        (film: number | string, index: number) => {
          return {
            id: `film-${index + 2}`,
            position: { x: 1 + index * 200, y: 300 },
            data: { label: `Film: ${film}` },
          };
        }
      );

      const formattedStarships = heroResponse?.starships?.map(
        (starship: number | string, index: number) => {
          return {
            id: `starship-${index + 100}`,
            position: { x: 1 + index * 200, y: 500 + index * 100 },
            data: { label: `Starship ${starship}` },
          };
        }
      );

      setNodes((nds) => [
        {
          id: "1",
          data: { label: heroResponse.name }, // hero 
          position: { x: 450, y: 5 },
        },
        ...formattedFilms, // hero films
        ...formattedStarships, // hero starships
      ]);

      const updatedEdges = [
        ...formattedFilms.map((film: Edge) => ({ 
          id: `e1-${film.id}`,
          source: "1",
          target: film.id,
        })), // There are connections from the hero to the films in which he appears.
        ...formattedFilms.flatMap((film: Edge) =>
          formattedStarships.map((starship: Edge) => ({
            id: `e-${film.id}-${starship.id}`,
            source: film.id,
            target: starship.id,
          })) // From each film there are links to spaceships on which the hero traveled
        ),
      ];

      setEdges(updatedEdges);
    };

    loadHeroDetails();
  }, [heroUrl]);

  const handleBack = () => {
    router.push("/");
  };

  if (!heroData) return <Heading padding={'25px'}>Loading...</Heading>; // Small Loading Handling

  return (
    <Box height="95vh" width="100%">
      <Button onClick={handleBack} ml={"20px"} mt={'20px'}>
        Back
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultZoom={0.6}
        defaultPosition={[400, 50]}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default HeroDetail;
