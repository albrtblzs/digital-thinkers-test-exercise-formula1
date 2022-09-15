import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
// import { Link } from "react-router-dom";

interface Driver {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  country: string;
  team: string;
  imageUrl: string;
  place: number;
}

const CardsContainer = styled.div`
  padding: 4rem 0;
  display: flex;
`;

const Card = styled.div`
  height: 35rem;
  width: 50%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 2rem;
`;

const Image = styled.img`
  width: auto;
  height: 300px;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const NoDriversContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;

  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const Content = styled.p``;

const Drivers = () => {
  const [drivers, setArticles] = useState<Driver[]>([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const { data: response } = await axios.get(
      "http://localhost:8080/drivers"
    );
      console.log(response);
    setArticles(response);
  };

  return (
    <Container>
      {drivers.length ? (
        <CardsContainer>
          {drivers.map((driver) => (
            <Card key={driver.id}>
              <Image src={`http://localhost:8080${driver.imageUrl}`} />
              <Header>
                {driver.firstname} {driver.lastname}
              </Header>
              <Content>{driver.country}</Content>
              <Content>{driver.team}</Content>
              <Content>{driver.place}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoDriversContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
        </NoDriversContainer>
      )}
    </Container>
  );
};

export default Drivers;
