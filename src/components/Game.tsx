import { useQuery } from "@apollo/client";
import { useRouteMatch } from "react-router-dom";

import { GAME_SUB, GET_GAME } from "../gql/queries";
import GameChild from "./GameChild";

const Game = () => {
  const match: any = useRouteMatch();

  const id: number = Number(match.params.id);

  const user_id: number = Number(localStorage.getItem("user_id"));

  const { subscribeToMore, ...result } = useQuery(GET_GAME, {
    variables: {
      id,
    },
  });

  subscribeToMore({
    document: GAME_SUB,
    variables: {
      id,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { game_by_pk } = subscriptionData.data;
      return Object.assign({}, prev, {
        game_by_pk,
      });
    },
  });

  return <GameChild {...result} user_id={user_id} />;
};

export default Game;
