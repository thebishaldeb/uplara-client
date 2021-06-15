import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($id: Int!) {
    user(where: { id: { _neq: $id } }) {
      id
      username
    }
  }
`;

export const SUB_USERS = gql`
  subscription GetUsersSub($id: Int!) {
    user(where: { id: { _neq: $id } }) {
      id
      username
    }
  }
`;

export const REGISTER = gql`
  mutation ($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
      username
    }
  }
`;

export const ADD_GAME = gql`
  mutation ($user_id_1: Int!, $user_id_2: Int!) {
    insert_game_one(object: { user_id_1: $user_id_1, user_id_2: $user_id_2 }) {
      id
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($id: Int!) {
    game_by_pk(id: $id) {
      id
      move_1
      move_2
      user {
        id
        username
      }
      userByUserId2 {
        id
        username
      }
    }
  }
`;

export const GAME_SUB = gql`
  subscription GetGameSub($id: Int!) {
    game_by_pk(id: $id) {
      id
      move_1
      move_2
      user {
        id
        username
      }
      userByUserId2 {
        id
        username
      }
    }
  }
`;

export const GIVE_A_MOVE = gql`
  mutation ($id: Int!, $input: game_set_input) {
    update_game(where: { id: { _eq: $id } }, _set: $input) {
      returning {
        id
        move_1
        move_2
        user {
          id
          username
        }
        userByUserId2 {
          id
          username
        }
      }
    }
  }
`;

export const GET_GAMES = gql`
  query GetGames($id: Int!) {
    user_by_pk(id: $id) {
      games {
        id
        move_1
        move_2
        userByUserId2 {
          username
        }
      }
      gamesByUserId2 {
        id
        move_1
        move_2
        user {
          username
        }
      }
    }
  }
`;

export const GET_USER_GAMES = gql`
  query GetUserGames($id: Int) {
    game(where: { move_2: { _is_null: true }, user_id_2: { _eq: $id } }) {
      id
      user {
        username
      }
    }
  }
`;

export const GET_USER_INV_COUNT = gql`
  query GetUserGames($id: Int) {
    game_aggregate(
      where: { move_2: { _is_null: true }, user_id_2: { _eq: $id } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const SUB_USER_INV_COUNT = gql`
  subscription GetUserGamesCount($id: Int) {
    game_aggregate(
      where: { move_2: { _is_null: true }, user_id_2: { _eq: $id } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
