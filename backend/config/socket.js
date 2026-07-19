import { Server } from "socket.io"

// Very small WebRTC signaling layer.
//
// Room = appointmentId. Each appointment only ever has 2 participants
// (the patient and the doctor), so we don't need to track individual
// socket-to-socket routing — broadcasting to "everyone else in the room"
// is sufficient and keeps this simple.
//
// Events:
//   join-room        { appointmentId, role }         client -> server
//   user-joined       { role }                        server -> other client(s) in room
//   signal            { appointmentId, data }          client -> server -> other client(s) in room
//     (data is a WebRTC offer, answer, or ICE candidate — opaque to the server)
//   leave-room        { appointmentId }                client -> server
//   user-left         {}                               server -> other client(s) in room
//   chat-message       { appointmentId, message, sender } client -> server -> other client(s) in room (used for in-call text chat)

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: [
                "https://doclyra.vercel.app",
                "https://doclyra-ipvc.vercel.app",
                "http://localhost:5173",
                "http://localhost:5174"
            ],
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {

        socket.on("join-room", ({ appointmentId, role }) => {
            socket.join(appointmentId)
            socket.data.appointmentId = appointmentId
            socket.data.role = role
            socket.to(appointmentId).emit("user-joined", { role })
        })

        socket.on("signal", ({ appointmentId, data }) => {
            socket.to(appointmentId).emit("signal", data)
        })

        socket.on("chat-message", ({ appointmentId, message, sender }) => {
            socket.to(appointmentId).emit("chat-message", { message, sender })
        })

        socket.on("leave-room", ({ appointmentId }) => {
            socket.to(appointmentId).emit("user-left")
            socket.leave(appointmentId)
        })

        socket.on("disconnect", () => {
            if (socket.data.appointmentId) {
                socket.to(socket.data.appointmentId).emit("user-left")
            }
        })
    })

    return io
}

export default initSocket