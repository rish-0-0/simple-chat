import socketIOClient from "socket.io-client";
const PORT = 4203;
const socket = socketIOClient(`http://localhost:${PORT}`);
export default socket;