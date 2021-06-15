import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER, LOGIN_USER } from "../gql/queries";

import styled from "styled-components";

const Input = styled.input`
  font-size: 19px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 15px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
  margin-bottom: 22px;

  &:active,
  &:focus {
    text-align: left;
  }
`;

const Card = styled.div`
  background: #fbfbfb;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  margin: 7rem auto 8.1rem auto;
  width: 380px;
`;

const Content = styled.div`
  padding: 12px 44px;
  align-items: left;
  display: flex;
  flex-direction: column;
`;

const Head = styled.h2`
  letter-spacing: 4px;
  padding-bottom: 23px;
  padding-top: 10px;
  text-align: center;
`;

const Button = styled("button")<{ primary?: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#1e88e5" : "palevioletred")};
  font-size: 16px;
  border-radius: 3px;
  color: white;
  border: ${(props) =>
    props.primary ? "2px solid #1e88e5" : "2px solid palevioletred"};
  padding: 8px 1em;
  transition: 0.5s all ease-out;
  margin-bottom: 20px;
  border-radius: 3%;

  &:hover {
    color: ${(props) => (props.primary ? "#1e88e5" : "palevioletred")};
    background: transparent;
  }
`;

const ErrorBlock = styled.span`
  border: 1px solid red;
  padding: 12px 1em;
  margin-bottom: 30px;
  color: red;
  background: #ffe6e6;
`;

const UserSignUp = () => {
  const isAuth = localStorage.getItem("auth_token");

  if (isAuth) {
    window.location.reload();
  }

  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoad] = useState(false);

  const showError = (e: any) => setError(e);

  const updateStorageRegister = (
    _: any,
    {
      data: {
        register: { id, username, token },
      },
    }: any
  ) => {
    addLocalStorage(id, username, token);
  };

  const updateStorageLogin = (
    _: any,
    {
      data: {
        login: { id, username, token },
      },
    }: any
  ) => {
    addLocalStorage(id, username, token);
  };

  const addLocalStorage = (id: any, username: string, auth_token: string) => {
    localStorage.setItem("user_id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("auth_token", auth_token);
    window.location.reload();
  };

  const [addUser] = useMutation(REGISTER, {
    update: updateStorageRegister,
    onError: showError,
  });

  const [login] = useMutation(LOGIN_USER, {
    update: updateStorageLogin,
    onError: showError,
  });

  const loginUser = async () => {
    setLoad(true);
    await login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    setLoad(false);
  };

  const signInUser = async () => {
    setLoad(true);
    await addUser({ variables: { username, password } });
    setPassword("");
    setUsername("");
    setLoad(false);
  };

  return (
    <Card>
      <Content>
        <Head>Rock Paper Scissors Game</Head>
        {error && <ErrorBlock>{error.toString()}</ErrorBlock>}
        <Input
          disabled={loading}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          disabled={loading}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button disabled={loading} onClick={loginUser}>
          Log in
        </Button>
        <Button disabled={loading} onClick={signInUser} primary>
          Sign Up
        </Button>
      </Content>
    </Card>
  );
};

export default UserSignUp;
