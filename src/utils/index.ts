export const winFunc = (move1: string, move2: string) => {
  if (move1 === move2) return "Match Draw";
  if (
    (move1 === "P" && move2 === "R") ||
    (move1 === "R" && move2 === "S") ||
    (move1 === "S" && move2 === "P")
  ) {
    return "You Won";
  } else return "Opponent Won";
};

export const showError = (e: any) => console.log(e);

export const mapValues = (mov: any) => {
  switch (mov) {
    case "R":
      return "Rocks";
    case "P":
      return "Paper";
    case "S":
      return "Scissors";
    default:
      return null;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.reload();
};

export const mapWInToColor = (mov: any) => {
  switch (mov) {
    case "You Won":
      return "green";
    case "Opponent Won":
      return "Red";
    case "Match Draw":
      return "palevioletred";
    default:
      return '#bbb';
  }
}
