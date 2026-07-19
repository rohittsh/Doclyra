import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'

const ICE_SERVERS = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

const VideoCall = () => {

    const { appointmentId } = useParams()
    const { backendUrl } = useContext(DoctorContext)
    const navigate = useNavigate()

    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)
    const socketRef = useRef(null)
    const pcRef = useRef(null)
    const localStreamRef = useRef(null)

    const [remoteConnected, setRemoteConnected] = useState(false)
    const [micOn, setMicOn] = useState(true)
    const [camOn, setCamOn] = useState(true)
    const [chatOpen, setChatOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        let isMounted = true

        const start = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                if (!isMounted) return

                localStreamRef.current = stream
                if (localVideoRef.current) localVideoRef.current.srcObject = stream

                const socket = io(backendUrl)
                socketRef.current = socket

                const pc = new RTCPeerConnection(ICE_SERVERS)
                pcRef.current = pc

                stream.getTracks().forEach(track => pc.addTrack(track, stream))

                pc.ontrack = (event) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0]
                    }
                    setRemoteConnected(true)
                }

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('signal', { appointmentId, data: { candidate: event.candidate } })
                    }
                }

                socket.emit('join-room', { appointmentId, role: 'doctor' })

                // Someone else just joined the room -> we make the offer
                socket.on('user-joined', async () => {
                    const offer = await pc.createOffer()
                    await pc.setLocalDescription(offer)
                    socket.emit('signal', { appointmentId, data: { type: 'offer', sdp: offer } })
                })

                socket.on('signal', async (data) => {
                    if (data.type === 'offer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
                        const answer = await pc.createAnswer()
                        await pc.setLocalDescription(answer)
                        socket.emit('signal', { appointmentId, data: { type: 'answer', sdp: answer } })
                    } else if (data.type === 'answer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
                    } else if (data.candidate) {
                        try {
                            await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
                        } catch (err) {
                            console.log(err)
                        }
                    }
                })

                socket.on('user-left', () => {
                    toast.info('The patient left the call')
                    setRemoteConnected(false)
                    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
                })

                socket.on('chat-message', ({ message, sender }) => {
                    setMessages(prev => [...prev, { message, sender, self: false }])
                })

            } catch (error) {
                console.log(error)
                toast.error('Camera/microphone access is required for video consultation')
            }
        }

        start()

        return () => {
            isMounted = false
            cleanup()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cleanup = () => {
        if (socketRef.current) {
            socketRef.current.emit('leave-room', { appointmentId })
            socketRef.current.disconnect()
        }
        if (pcRef.current) {
            pcRef.current.close()
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop())
        }
    }

    const endCall = () => {
        cleanup()
        navigate('/doctor-appointments')
    }

    const toggleMic = () => {
        const stream = localStreamRef.current
        if (!stream) return
        stream.getAudioTracks().forEach(track => { track.enabled = !track.enabled })
        setMicOn(prev => !prev)
    }

    const toggleCam = () => {
        const stream = localStreamRef.current
        if (!stream) return
        stream.getVideoTracks().forEach(track => { track.enabled = !track.enabled })
        setCamOn(prev => !prev)
    }

    const sendMessage = () => {
        if (!messageInput.trim()) return
        socketRef.current.emit('chat-message', { appointmentId, message: messageInput, sender: 'doctor' })
        setMessages(prev => [...prev, { message: messageInput, sender: 'doctor', self: true }])
        setMessageInput('')
    }

    return (
        <div className='w-full max-w-4xl m-5'>
            <p className='mb-4 text-lg font-medium'>Video Consultation</p>

            <div className='relative bg-black rounded-lg overflow-hidden' style={{ aspectRatio: '16/9' }}>
                <video ref={remoteVideoRef} autoPlay playsInline className='w-full h-full object-cover' />

                {!remoteConnected && (
                    <div className='absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40'>
                        Waiting for the patient to join...
                    </div>
                )}

                <video ref={localVideoRef} autoPlay playsInline muted className='absolute bottom-4 right-4 w-32 sm:w-48 rounded-md border-2 border-white object-cover' style={{ aspectRatio: '16/9' }} />

                {chatOpen && (
                    <div className='absolute top-0 right-0 h-full w-72 bg-white flex flex-col border-l'>
                        <div className='px-3 py-2 border-b flex items-center justify-between'>
                            <p className='text-sm font-medium text-gray-600'>In-call chat</p>
                            <button onClick={() => setChatOpen(false)} className='text-gray-400 text-sm'>✕</button>
                        </div>
                        <div className='flex-1 overflow-y-auto p-3 space-y-2'>
                            {messages.map((m, i) => (
                                <div key={i} className={`text-sm max-w-[80%] px-3 py-1.5 rounded-lg ${m.self ? 'ml-auto bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                                    {m.message}
                                </div>
                            ))}
                        </div>
                        <div className='p-2 border-t flex gap-2'>
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder='Type a message'
                                className='flex-1 text-sm border rounded px-2 py-1 outline-none'
                            />
                            <button onClick={sendMessage} className='text-sm text-primary font-medium'>Send</button>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex items-center justify-center gap-4 mt-5'>
                <button onClick={toggleMic} className={`px-4 py-2 rounded-full text-sm border ${micOn ? 'text-gray-600' : 'bg-red-500 text-white border-red-500'}`}>
                    {micOn ? 'Mute' : 'Unmute'}
                </button>
                <button onClick={toggleCam} className={`px-4 py-2 rounded-full text-sm border ${camOn ? 'text-gray-600' : 'bg-red-500 text-white border-red-500'}`}>
                    {camOn ? 'Stop Video' : 'Start Video'}
                </button>
                <button onClick={() => setChatOpen(prev => !prev)} className='px-4 py-2 rounded-full text-sm border text-gray-600'>
                    Chat
                </button>
                <button onClick={endCall} className='px-6 py-2 rounded-full text-sm bg-red-600 text-white'>
                    End Call
                </button>
            </div>
        </div>
    )
}

export default VideoCall
