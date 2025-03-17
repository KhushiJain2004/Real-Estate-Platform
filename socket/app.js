import {Server} from "socket.io"
import http from 'http';
import express from 'express'

const app=express();
const server=http.createServer(app);
const io= new Server(server,{
    cors: {
        origin:"http://localhost:5173"
    }
})
const userMap={};
io.on("connection",(socket)=>{
    console.log("Connected via server "+socket.id);

    socket.on("register",(userId)=>
        {
            console.log("registered user: "+userId);
            userMap[userId]=socket.id
        });
    socket.on("msg",({to,msg})=>{
        const receiverSocket=userMap[to];
        console.log("message for "+to+msg);
        console.log(userMap);
        if(receiverSocket) 
        {
            console.log("receiver exists")
            io.to(receiverSocket).emit("msgReceived",msg);
            console.log(`Message sent to socket ID: ${receiverSocket}`);

        }
        // socket.emit()
    })
})

const PORT=4000;
server.listen(4000,()=>
{
    console.log("socket server listening at 4000");
});

// server.listen("3000");