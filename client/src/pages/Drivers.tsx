import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
// import { Link } from "react-router-dom";

export interface Driver {
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
  flex-direction: column;
`;

const CardLeft = styled.div`
  height: 8rem;
  width: 50%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2rem;
  margin-right: 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CardRight = styled.div`
  height: 8rem;
  width: 50%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2rem;
  margin-right: 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin-left: 648px;
`;

const OverTakeButton = styled.button`
  width: auto;
  border-radius: 2rem;
`;

const Image = styled.img`
  width: auto;
  height: 100px;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 2rem;
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

// const Content = styled.p``;

const Drivers = () => {
  const [drivers, setArticles] = useState<Driver[]>([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const { data: response } = await axios.get("http://localhost:8080/drivers");
    setArticles(response);
  };

  const overTakeDriver = async (driverId: number) => {
    const { data: response } = await axios.post(
      `http://localhost:8080/drivers/${driverId}/overtake`
    );
    setArticles(response);
  };

  const dispatch = useDispatch();


  bindActionCreators(actionCreators, dispatch);
  
  useSelector((state: State) => state.drivers);

  bindActionCreators(actionCreators, dispatch);

  useSelector((state: State) => state.drivers);

  return (
    <Container>
      {drivers.length ? (
        <CardsContainer>
          {drivers.map((driver, index) => {
            if (index % 2 !== 0) {
              console.log(index);
              return (
                <CardRight key={driver.id}>
                  <Image src={`http://localhost:8080${driver.imageUrl}`} />
                  <Header>
                    {driver.firstname} {driver.lastname}
                  </Header>
                  <Header>{driver.country}</Header>
                  <Header>{driver.team}</Header>
                  <Header>{driver.place}</Header>
                  <OverTakeButton
                    onClick={async () => await overTakeDriver(driver.id)}
                  >
                    Overtake
                  </OverTakeButton>
                </CardRight>
              );
            } else {
              return (
                <CardLeft key={driver.id}>
                  <Image src={`http://localhost:8080${driver.imageUrl}`} />
                  <Header>
                    {driver.firstname} {driver.lastname}
                  </Header>
                  <Header>{driver.country}</Header>
                  <Header>{driver.team}</Header>
                  <Header>{driver.place}</Header>
                  <OverTakeButton
                    onClick={async () => await overTakeDriver(driver.id)}
                  >
                    Overtake
                  </OverTakeButton>
                </CardLeft>
              );
            }
          })}
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
