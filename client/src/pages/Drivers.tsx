import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import { motion, AnimatePresence } from "framer-motion";

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

const backgroundImage = `url("http://localhost:8080/static/foruma-one-background.jpg")`;

const PageBackground = styled.div`
background-image: ${backgroundImage};
background-repeat: no-repeat;
background-size: cover;
`
const CardsContainer = styled.div`
display: flex;
flex-direction: column;
`;

const Card = styled(motion.div)`
  height: 3rem;
  width: 50%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 2rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #F5F5F5;
`;

const OverTakeButton = styled.button`
  width: auto;
  height: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Image = styled.img`
  width: auto;
  height: 30px;
  border-radius: 2rem;
`;

const Header = styled.h2`
  font-size: 1.2rem;
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


  const buttonDisplay = (place: number, id: number) => {
    if(place > 0) {
      return (
        <OverTakeButton
        onClick={async () => await overTakeDriver(id)}
      >
        <p style={{margin: 0}}>Overtake</p>
      </OverTakeButton>
      )
    }
  }

  const dispatch = useDispatch();

  bindActionCreators(actionCreators, dispatch);

  useSelector((state: State) => state.drivers);

  bindActionCreators(actionCreators, dispatch);

  useSelector((state: State) => state.drivers);


  return (
    <PageBackground>      
    <Container>
      {drivers.length ? (
        <CardsContainer>
          <AnimatePresence>
          {drivers.map((driver, index) => {
            const marginLeft = index % 2 !== 0 ? 648 : 0;
            return (
              <Card style={{marginLeft: marginLeft}}
                // whileHover={{ scale: 1.2 }}
                layout
                key={driver.id}
              >
                <Header>{driver.place}</Header>
                <Image src={`http://localhost:8080${driver.imageUrl}`} />
                <Header>
                  {driver.firstname} {driver.lastname}
                </Header>
                <Header>{driver.country}</Header>
                <Header>{driver.team}</Header>
                
              {buttonDisplay(index, driver.id)}
              </Card>
            );
          })}
          </AnimatePresence>
        </CardsContainer>
      ) : (
        <NoDriversContainer>
          <ErrorHeader>You don't have access yet</ErrorHeader>
        </NoDriversContainer>
      )}
    </Container>
    </PageBackground>
  );
};

export default Drivers;
