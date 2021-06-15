import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { GIVE_A_MOVE } from "../gql/queries";
import { mapWInToColor, showError, winFunc } from "../utils";

import ROCK_IMG from "../assets/icon-rock.svg";
import PAPER_IMG from "../assets/icon-paper.svg";
import SCISSOR_IMG from "../assets/icon-scissors.svg";

import styled from 'styled-components';

const Card = styled.div`
  background: #fbfbfb;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.65);
  padding: 30px;
  margin-top: 20px;
`
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const FlexItem = styled("div")<{size?: any}>`
  text-align: center;
  background-color: white;
  display: flex;
  width: 40%;
  flex-direction: column;
  padding: 12px 44px;
  align-items: center;
  justify-content: center;
`

const Head = styled.h2`
  font-size: 40px;
  letter-spacing: 4px;
  padding-top: 10px;
  text-align: center;
  font-weight: 600
`

const MoveHead = styled.h2`
  font-size: 20px;
  padding-top: 10px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 50px
`

const ImgButton = styled.img`
cursor: pointer;
 padding-left: 40px;
 padding-right: 40px;
 margin: 5px;
 width: 100px;
`
const WinnerHead = styled("h2")<{type: any}>`
  letter-spacing: 4px;
  text-align: center;
  font-weight: 600;
  padding: 20px 10px;
  width: 300px;
  border: 4px solid ${props => mapWInToColor(props.type)};
  color: ${props => mapWInToColor(props.type)};
`

export const mapValuesToImg = (mov: string) => {
  switch (mov) {
    case "R":
      return ROCK_IMG;
    case "P":
      return PAPER_IMG;
    case "S":
      return SCISSOR_IMG;
    default:
      return '';
  }
};

const GameChild = (props: any) => {
  const [addMove] = useMutation(GIVE_A_MOVE, {
    onError: showError,
  });

  const history = useHistory();

  const { data, user_id, loading, error } = props;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }

  if (!loading && data && !data.game_by_pk) {
    history.push("/");
  }

  const { id, move_1, move_2, user, userByUserId2 } = data.game_by_pk;

  if (user.id !== user_id && userByUserId2.id !== user_id) {
    history.push("/");
  }

  const submitMove = async (move: string) => {
    let input: any = {};
    if (user_id === user.id) {
      input.move_1 = move;
    } else {
      input.move_2 = move;
    }

    await addMove({ variables: { id, input } });
  };

  const myMove: any = user_id === user.id ? move_1 : move_2;
  const oppMove: any = user_id === user.id ? move_2 : move_1;

  return (
    <Card>
    <FlexContainer>{myMove && oppMove && <WinnerHead type={winFunc(myMove, oppMove)}>{winFunc(myMove, oppMove)}!</WinnerHead>}</FlexContainer>
    <FlexContainer>
      <FlexItem>
      <Head>
        You
      </Head>


      <p>
        {myMove ? (
          <>
          <MoveHead>
            Your move
          </MoveHead>
          <ImgButton 
          alt={myMove} src={mapValuesToImg(myMove)} 
          />
          </>
        ) : (
          <>
          <MoveHead>
            Select your move
          </MoveHead>
          <ImgButton onClick={() => submitMove("R")} alt="Rock" src={ROCK_IMG} />
          <ImgButton onClick={() => submitMove("P")} alt="Paper" src={PAPER_IMG}/>
          <ImgButton onClick={() => submitMove("S")} alt="Scissors" src={SCISSOR_IMG}/>
          </>
        )}</p>
      </FlexItem>
      <FlexItem>
      <Head>
        {user_id !== user.id ? user.username : userByUserId2.username}
      </Head>

      <p>
      <MoveHead>
      Opponent's move
       </MoveHead>
      {myMove ? (
          (oppMove &&
          <ImgButton 
          alt={oppMove} src={mapValuesToImg(oppMove)} 
          />) || "Not Yet Given"
          
        ) : (
          <>
          Provide your move first!
          </>
        )}
      </p>
      </FlexItem>
    </FlexContainer>
    </Card>
  );
};

export default GameChild;
