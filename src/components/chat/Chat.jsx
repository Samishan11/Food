import axios from 'axios'
import React, {useRef} from 'react'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
const socket = io.connect("http://localhost:5000")
const Chat = () => {
    const bottomRef = useRef(null);

    // jsonwebtoken
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    // get user form the token
    const token_data = localStorage.getItem("token")
    const token = parseJwt(token_data)
    const user = token

    // 
    const { roomId } = useParams()
    const [room, setRoom] = React.useState({})
    
    const [image, setimage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [chat, setChat] = React.useState([])
    const [isOnline, setisOnline] = React.useState(false)
    // 

console.log(image);
    React.useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [message]);

    const changImg = (e) =>{
        setimage(e.target.files[0])
        setMessage(e.target.files[0].name)
    }
    React.useEffect(() => {
        var a = socket.emit("joinRoom", { roomId: roomId })
        if(a){
            setisOnline(true)
        }
    }, [roomId])
    console.log(isOnline);

    React.useEffect(() => {
        axios.get(`/get-room/${roomId}`).then(function (res) {
            setRoom(res.data)
        })
    }, [roomId])
    React.useEffect(() => {
       const chat = async() =>{
        const res = await axios.get(`/get-chat/${roomId}`)
        setChat(res.data)
       }
       chat()
    }, [roomId])

    const sendMessage = () => {
        let formdata = new FormData();
        formdata.append('image',image)
        socket.emit("sendMessage", ({
            sender: user._id ,
            receiver: user._id === room.user1?._id ? room.user2?._id : room.user1?._id,
            chat: message || formdata,
            room: roomId
        }))
        setMessage("")
        setChat((list)=>[...list, {sender: user._id,
            receiver: user._id === room.user1?._id ? room.user2?._id : room.user1?._id,
            chat: message || image,
            room: roomId}])
    }
    React.useEffect(() => {
        socket.off("receiveMessage").on("receiveMessage", (data) => {
            // console.log(data);
            setChat((list) => [...list, data])
        })
    },[])
    

    return (
        <div style={{ marginTop: '100px' }} className='col-md-12 d-flex'>
            <div className='h-100' style={{ width: "1px", background: "#e0e0e0" }}></div>

            <div className='w-100' style={{ position: "relative" }}>
                {
                    // room ?
                    <>
                        <div className='d-flex pt-2 pb-2 px-3 bg-light' style={{ borderBottom: "2px solid #e0e0e0" }}>
                            <div className='d-flex'>
                                <div>
                                    <img className='rounded-circle' style={{ height: "5ch", width: "5ch", objectFit: "cover" }} src="https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png" alt="" />
                                </div>
                                <div className='mx-2'>
                                    {
                                        user?._id === room?.user1?._id ?
                                            <small>{room?.user2?.username}</small> :
                                            <small>{room?.user1?.username}</small>
                                    }
                                    <small className='d-block text-xs'>{isOnline?<>online</>:<>offline</>}</small>
                                </div>
                            </div>
                        </div>

                        <div className='px-3 my-5 '>
                            <div className='py-4 message-container m-0'>
                                <div className='d-flex justify-content-center bg-light rounded my-4 py-4'>
                                    <div>
                                        {
                                            room?.user1?._id === user?._id ?
                                                <> <p className='text-sm mt-2'>You created this conversation <span className='fw-bold'>Room </span></p></> :
                                                <>
                                                    <p className='text-sm mt-2'>{room?.user1?.username}  created this conversation <span className='fw-bold'>Room </span></p>
                                                </>
                                        }
                                    </div>
                                </div>
                                {
                                    chat.slice(0.20)?.map((val, ind) => {
                                        return (
                                            <div key={ind}>
                                                {
                                                    val?.sender !== user?._id ?
                                                        <div className='d-flex my-2'>
                                                            <div className='rounded px-3 py-1' style={{ background: "#ffffff" }}>
                                                                <small className='text-xs fw-bold d-block'>{user?._id === room?.user1?._id ? room?.user2?.username : room?.user1?.username}</small>
                                                                <small className='text-sm'>{val?.chat}</small>
                                                                <small className='d-block text-end text-xs text-primary'>1:34PM</small>
                                                            </div>
                                                        </div> :
                                                        <div className='d-flex my-2'>
                                                            <div className='rounded px-3 py-1 ms-auto' style={{ background: "#78A0FF", maxWidth: "40ch" }}>
                                                                <small className='text-xs fw-bold d-block text-light'>You</small>
                                                                <small className='text-sm text-light m-0'>{val.chat}</small>
                                                                <small className='d-block text-end text-xs text-primary text-light'>1:34PM</small>
                                                            </div>
                                                            <div ref={bottomRef} />
                                                        </div>
                                                        
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                }
                <div className='bg-dark w-100 p-0'>
                    <div className='w-100' style={{ position: 'absolute', bottom: "0" }}>
                        <form action="">
                            <div className='form-group my-3'>
                                <div className='d-flex mx-3 border py-1 px-2 bg-light'>
                                    <input value={message} onChange={e => { setMessage(e.target.value) }} className='w-100 text-sm' type="text" style={{ border: "none", outline: "none" }} placeholder="Type message here..." />

                                    <div className='d-flex'>
                                    <input onChange={changImg} accept='image/*'  id='img_upload' className='d-none' type="file" />
                                    <button type='button' onClick={()=>{document.getElementById("img_upload").click()}} className='btn text-dark btn-outline-primary mx-2 fas fa-paper-plane'></button>
                                        <button className='btn text-dark btn-outline-primary' onClick={sendMessage} type="button">Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat