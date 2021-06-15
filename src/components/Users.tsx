import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { GET_USERS, ADD_GAME } from "../gql/queries";
import { showError } from "../utils";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const FlexItem = styled("div")<{ size?: any }>`
  text-align: center;
  background-color: white;
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding: 12px 44px;
  align-items: center;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.65);
  justify-content: center;
`;

const Head = styled("span")<{ lp?: number }>`
  letter-spacing: ${(props) => (props.lp ? props.lp : 1)}px;
  padding-top: 10px;
  text-align: center;
  font-size: 18px;
`;

const Button = styled("button")<{ primary?: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#1e88e5" : "palevioletred")};
  font-size: 16px;
  border-radius: 3px;
  color: white;
  width: 80px;
  border: ${(props) =>
    props.primary ? "2px solid #1e88e5" : "2px solid palevioletred"};
  padding: 5px 8px;
  transition: 0.5s all ease-out;
  margin: 20px 0;
  border-radius: 3%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);

  &:hover {
    color: ${(props) => (props.primary ? "#1e88e5" : "palevioletred")};
    background: transparent;
  }
`;

const Card = styled.div`
  padding: 40px;
  background: white;
  text-align: center;
  font-size: 20px;
  margin-top: 50px;
  max-width: 800px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.65);
`;

const Users = () => {
  const history = useHistory();

  const id: number = Number(localStorage.getItem("user_id"));

  const onUpdate = (
    _: any,
    {
      data: {
        insert_game_one: { id },
      },
    }: any
  ) => {
    history.push(`/game/${id}`);
  };

  const [addGame] = useMutation(ADD_GAME, {
    update: onUpdate,
    onError: showError,
  });

  const { loading, error, data } = useQuery(GET_USERS, {
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

  const startGame = async (user_id_2: number) => {
    await addGame({ variables: { user_id_1: id, user_id_2 } });
  };

  return (
    <>
      <FlexContainer>
        {data.user.length > 0 ? (
          data.user.map((item: any) => (
            <FlexItem key={item.id}>
              <Head lp={2}>
                <strong>User</strong>
              </Head>
              <Head>{item.username}</Head>
              <Button onClick={() => startGame(item.id)}>Play</Button>
            </FlexItem>
          ))
        ) : (
          <Card>No other users yet.</Card>
        )}
      </FlexContainer>
    </>
  );
};

export default Users;
