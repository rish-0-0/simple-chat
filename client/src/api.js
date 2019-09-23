import socketIOClient from "socket.io-client";
const PORT = 4203;
const SERVER = '10.60.5.16';
const socket = socketIOClient(`http://${SERVER}:${PORT}`);
export default socket;