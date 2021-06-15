import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { GET_GAMES } from "../gql/queries";
import { mapWInToColor, winFunc } from "../utils";

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
      width: 40%;
      padding: 15px;
      text-align: center;
      padding: 20px;
    }
    th {
      border-bottom: 1px solid black;
    }
  }
`;

const Td = styled("table")<{ type: any }>`
  font-weight: 700;
  letter-spacing: 1.5px;
  word-spacing: 2px;
  width: 100%;
  padding: 15px;
  text-align: center;
  color: ${(props) => mapWInToColor(props.type)};
`;

const Button = styled("button")`
  cursor: pointer;
  background-color: palevioletred;
  font-size: 13px;
  border-radius: 3px;
  color: white;
  width: 60px;
  border: 2px solid palevioletred;
  padding: 5px;
  transition: 0.5s all ease-out;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);

  &:hover {
    color: palevioletred;
    background: transparent;
  }
`;

const MyGames = () => {
  const history = useHistory();

  const id: number = Number(localStorage.getItem("user_id"));

  const { loading, error, data } = useQuery(GET_GAMES, {
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
      <Head>My Games</Head>
      {data.user_by_pk &&
      data.user_by_pk.games &&
      data.user_by_pk.games.length > 0 ? (
        <Table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.user_by_pk.games.map((item: any) => (
              <tr key={item.id}>
                <td>{item.userByUserId2.username}</td>
                <Td
                  type={
                    item.move_1 && item.move_2
                      ? winFunc(item.move_1, item.move_2)
                      : "Incomplete"
                  }
                >
                  {item.move_1 && item.move_2
                    ? winFunc(item.move_1, item.move_2)
                    : "Incomplete"}
                </Td>
                <td>
                  <Button onClick={() => history.push(`/game/${item.id}`)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card>You have not challenged anyone yet.</Card>
      )}
      <br />
      <Head>Challenges</Head>
      {data.user_by_pk &&
      data.user_by_pk.gamesByUserId2 &&
      data.user_by_pk.gamesByUserId2.length > 0 ? (
        <Table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.user_by_pk.gamesByUserId2.map((item: any) => (
              <tr key={item.id}>
                <td>{item.user.username}</td>
                <Td
                  type={
                    item.move_1 && item.move_2
                      ? winFunc(item.move_2, item.move_1)
                      : "Incomplete"
                  }
                >
                  {item.move_1 && item.move_2
                    ? winFunc(item.move_2, item.move_1)
                    : "Incomplete"}
                </Td>
                <td>
                  <Button onClick={() => history.push(`/game/${item.id}`)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card>No Challenges yet.</Card>
      )}
    </ContentCard>
  );
};

export default MyGames;
