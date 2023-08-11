import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import { useEffect } from "react";

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://pnfxkxosxkitbnyywsao.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTY5MTc3OTEzMiwiZXhwIjoxNjkyMzgzOTMyfQ.3CX8um6omWxqbUC5U1iXPLvO2jDqbAaeBiFLFiUyoSI&t=2023-08-11T18%3A38%3A52.830Z"
        alt="cabin 1"
      />
    </Row>
  );
}

export default Cabins;
