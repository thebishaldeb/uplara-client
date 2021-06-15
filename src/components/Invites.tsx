import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { GET_USER_GAMES } from "../gql/queries";

import styled from "styled-components";

const ContentCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Head = styled.h2`
  letter-spacing: 4px;
  padding-bottom: 23px;
  padding-top: 10px;
  text-align: center;
  font-weight: 600;
`;
const Card = styled.div`
  padding: 40px;
  background: white;
  text-align: center;
  font-size: 20px;
  max-width: 800px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);
`;

const Table = styled("table")`
  background: white;
  max-width: 800px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);
  &&& {
    th,
    td,
    tr {
      width: 50%;
      padding: 15px;
      text-align: center;
    }
    th {
      border-bottom: 1px solid black;
    }
  }
`;

const Button = styled("button")<{ primary?: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#1e88e5" : "palevioletred")};
  font-size: 16px;
  border-radius: 3px;
  color: white;
  width: 80px;
  border: 2px solid palevioletred;
  padding: 5px 8px;
  transition: 0.5s all ease-out;
  margin: 20px 0;
  border-radius: 3%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);

  &:hover {
    color: palevioletred;
    background: transparent;
  }
`;

const Invites = () => {
  const history = useHistory();

  const id: number = Number(localStorage.getItem("user_id"));

  const { loading, error, data } = useQuery(GET_USER_GAMES, {
    variables: {
      id,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <ContentCard>
      <Head>Games</Head>
      {data.game.length > 0 ? (
        <Table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.game.map((item: any) => (
              <tr key={item.id}>
                <td>{item.user.username}</td>
                <td>
                  <Button onClick={() => history.push(`/game/${item.id}`)}>
                    Play
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card>No invites yet.</Card>
      )}
    </ContentCard>
  );
};

export default Invites;
