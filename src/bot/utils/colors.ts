export enum Color {
  GREEN = "#2CFD6E",
  RED = "#e04141",
  BLUE = "#41a1e0",
  YELLOW = "#e0e041",
  PURPLE = "#a141e0",
  ORANGE = "#e07a41",
  PINK = "#e041a1",
  WHITE = "#FFFFFF",
  BLACK = "#000000",
  GRAY = "#808080",
  LIGHT_GRAY = "#D3D3D3",
  DARK_GRAY = "#A9A9A9",
  GOLD = "#FFD700",
}

export const randomColor = (): Color => {
  const colors = Object.values(Color);
  return colors[Math.floor(Math.random() * colors.length)];
};

export const randomBritghtColor = (): Color => {
  const colors = [
    Color.RED,
    Color.BLUE,
    Color.YELLOW,
    Color.PURPLE,
    Color.ORANGE,
    Color.PINK,
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};
