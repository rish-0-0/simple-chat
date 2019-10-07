import socketIOClient from "socket.io-client";
const PORT = 4203;
const SERVER = '10.20.13.227';
const socket = socketIOClient(`http://${SERVER}:${PORT}`);
export default socket;