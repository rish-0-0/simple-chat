import socketIOClient from "socket.io-client";
const PORT = 4203;
const socket = socketIOClient(`http://10.60.5.16:${PORT}`);
export default socket;