export type WinnerDataType = {
  player: string;
  won: boolean;
  squares: number[];
};

export function calculateWinner(squares: string[]): WinnerDataType | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        won: true,
        squares: element,
      };
    }
  }
  return null;
}
