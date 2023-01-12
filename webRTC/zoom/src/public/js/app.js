const socket = io()

const myFace = document.getElementById("myFace")
const muteBtn = document.getElementById("mute")
const cameraBtn = document.getElementById("camera")
const cameraSelect = document.getElementById("cameras")


const call = document.getElementById("call")

call.hidden = true

let myStream
let muted = false
let cameraOff = false
let roomName;
let myPeerConnection

async function getCameras(deviceId){
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(device => device.kind === "videoinput")
        const currentCamera = myStream.getVideoTracks()[0]
        cameras.forEach(camera => {
            const option = document.createElement("option")
            option.value = camera.deviceId
            option.innerText = camera.label
            if (currentCamera.label === camera.label){
                option.selected = true
            }
            cameraSelect.appendChild(option)
        })
        // console.log(cameras)
        // console.log(devices)

    } catch (error) {
        console.log(error)
    }
}

async function getMedia(deviceId){
    const initialConstrains = {
        audio: true,
        video: { facingMode: "user" },
    }
    const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
        )
        myFace.srcObject = myStream
        if(!deviceId){
            await getCameras()
        }
    } catch(e){
        console.log(e)
    }
}
// getMedia()

function handleMuteClick(){
    myStream
        .getAudioTracks()
        .forEach(track => {
            track.enabled = !track.enabled
        });
    if(!muted){
        muteBtn.innerText = "Unmute"
        muted = true
    }else{
        muteBtn.innerText = "Mute"
        muted = false
    }
}
function handleCameraClick(){
    myStream
        .getVideoTracks()
        .forEach(track => {
            track.enabled = !track.enabled
        });
    if(cameraOff){
        cameraBtn.innerText = "camera OFF"
        cameraOff = false
    }else{
        cameraBtn.innerText = "camera ON"
        cameraOff = true
    }
}
async function handleCameraChange(){
    // 새로운 비디오 ID로 다른 스트림 생성
    await getMedia(cameraSelect.value)
    if(myPeerConnection){
        const videoTrack = myStream.getVideoTracks()[0]
        const videoSender = myPeerConnection
            .getSenders()
            .find(sender => sender.track.kind === "video")
        // 다른 브라우저로 보내진 비디오, 오디오 컨트롤
        videoSender.replaceTrack(videoTrack)

    }
}

muteBtn.addEventListener("click", handleMuteClick)
cameraBtn.addEventListener("click", handleCameraClick)
cameraSelect.addEventListener("input", handleCameraChange)

// Welcome Form (join a room)

const welcome = document.getElementById("welcome")
const welcomeForm = welcome.querySelector("form")

async function initCall(){
    welcome.hidden = true
    call.hidden = false
    await getMedia()
    makeConnection()
}

async function handelWelcomeSubmit(event){
    event.preventDefault();
    const input = welcomeForm.querySelector("input")
    await initCall()
    socket.emit("join_room", input.value)
    roomName = input.value
    input.value = ""
}

welcomeForm.addEventListener("submit", handelWelcomeSubmit)

// Socket code

// 방을 만든 곳
socket.on("welcome", async ()=>{
    const offer = await myPeerConnection.createOffer()
    myPeerConnection.setLocalDescription(offer)
    console.log('sent the offer')
    socket.emit("offer", offer, roomName)
    
})

// 응답
socket.on("offer", async(offer) => {
    console.log('received the offer')
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    myPeerConnection.setLocalDescription(answer)
    socket.emit("answer", answer, roomName)
    console.log('sent the answer')
})

socket.on("answer", (answer) => {
    console.log('recieve answer')
    myPeerConnection.setRemoteDescription(answer)
})

socket.on("ice", (ice) => {
    console.log('recieved Candidate')
    myPeerConnection.addIceCandidate(ice)
})

// RTC Code

// Node Get ICE STUN and TURN list
let o = {
    format: "urls"
};

let bodyString = JSON.stringify(o);
let https = require("https");
let options = {
    host: "global.xirsys.net",
    path: "/_turn/MyFirstApp",
    method: "PUT",
    headers: {
        "Authorization": "Basic " + Buffer.from("heeje:82ab192c-9279-11ed-bea5-0242ac130006").toString("base64"),
        "Content-Type": "application/json",
        "Content-Length": bodyString.length
    }
};
let httpreq = https.request(options, function(httpres) {
    let str = "";
    httpres.on("data", function(data){ str += data; });
    httpres.on("error", function(e){ console.log("error: ",e); });
    httpres.on("end", function(){ 
        console.log("ICE List: ", str);
    });
});
httpreq.on("error", function(e){ console.log("request error: ",e); });
httpreq.end();
console.log(temp)

function makeConnection(){
    myPeerConnection = new RTCPeerConnection({
        
        iceServers: [{
            urls: [ "stun:ntk-turn-2.xirsys.com" ]
         }, {
            username: "i6IJUYY7msLuAO-UkGxLCT1AVOHFXmdPb9aLS7fnqNlJIdFQXnp5igmgid2L-ix1AAAAAGPACiJoZWVqZQ==",
            credential: "7da942ca-927c-11ed-88e3-0242ac120004",
            urls: [
                "turn:ntk-turn-2.xirsys.com:80?transport=udp",
                "turn:ntk-turn-2.xirsys.com:3478?transport=udp",
                "turn:ntk-turn-2.xirsys.com:80?transport=tcp",
                "turn:ntk-turn-2.xirsys.com:3478?transport=tcp",
                "turns:ntk-turn-2.xirsys.com:443?transport=tcp",
                "turns:ntk-turn-2.xirsys.com:5349?transport=tcp"
            ]
         }]
        // iceServers: [
        //     {
        //         urls: [
        //             "stun:stun.l.google.com:19302",
        //             "stun:stun1.l.google.com:19302",
        //             "stun:stun2.l.google.com:19302",
        //             "stun:stun3.l.google.com:19302",
        //             "stun:stun4.l.google.com:19302",
        //         ],
        //     },
        // ],
    })
    myPeerConnection.addEventListener("icecandidate", handleIce)
    myPeerConnection.addEventListener("track", handleTrack)
    // myPeerConnection.addEventListener("addstream", handleAddStream)
    myStream
        .getTracks()
        .forEach(track => myPeerConnection.addTrack(track, myStream))
}


function handleIce(data){
    console.log("sent candidate")
    socket.emit("ice",data.candidate, roomName)
    // console.log(data)
}

function handleAddStream(data){
    const peerFace = document.getElementById("peerFace")
    peerFace.srcObject = data.stream
    console.log("got and event from my peer")
    console.log("Peer's Sream", data.stream)
    console.log("MyStream", myStream)
}

function handleTrack(data) {
    console.log("handle track")
    const peerFace = document.querySelector("#peerFace")
    peerFace.srcObject = data.streams[0]
}
// CHAT Socket IO

// const socket = io();

// const welcome = document.getElementById("welcome")
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// // room.hidden = true
// let roomName

// function addMessage(message){
//     const ul = room.querySelector("ul")
//     const li = document.createElement("li");
//     li.innerText = message;
//     ul.appendChild(li)
// }

// function handleMessageSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#msg input");
//     const value = input.value
//     socket.emit("new_message", value, roomName,()=>{
//         addMessage(`You: ${value}`);
//     });
//     input.value = "";

// }

// function handleNicknameSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#name input");
//     socket.emit("nickname", input.value);
// }


// function showRoom(){    
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}`
//     const msgForm = room.querySelector('#msg');
//     const nameForm = room.querySelector('#name');
//     msgForm.addEventListener("submit", handleMessageSubmit)
//     nameForm.addEventListener("submit", handleNicknameSubmit)
// }

// function handleListen(event){
//     event.preventDefault();
//     const input = form.querySelector("input");
//     socket.emit("enter_room", input.value, showRoom);
//     roomName = input.value;
//     input.value = "";
// }



// form.addEventListener("submit", handleListen)
// room.addEventListener("submit", handleMessageSubmit)

// socket.on("welcome", (user, newCount)=>{
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`
//     addMessage(`${user} "welcome"`)
// })
// socket.on("bye", (left, newCount)=>{
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName} (${newCount})`
//     addMessage(`${left} "TT bye"`)
// })
// socket.on("new_message", (msg)=>{
//     addMessage(msg)
// })
// socket.on("room_change", rooms => {
//     const roomList = welcome.querySelector("ul")
//     roomList.innerHTML = "";
//     if(rooms.length === 0){
//         return
//     }
//     rooms.forEach(room => {
//         const li = document.createElement("li")
//         li.innerText = room
//         roomList.append(li)
//     });
// });