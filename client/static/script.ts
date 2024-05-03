import Board from "./components/board";

window.onload = async () => {
  const res = await fetch("/data");
  const data = await res.json();
  const board = new Board(data)
  document.body.appendChild(board)

}
