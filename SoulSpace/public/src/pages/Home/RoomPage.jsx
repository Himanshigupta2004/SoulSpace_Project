import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
    // Correct the case to match the route parameter defined in App.js
    const { roomId } = useParams(); // Use `roomId` instead of `RoomId`
    
    // Create a ref to attach to the DOM element
    const meetingRef = useRef(null);

    useEffect(() => {
        // Ensure the ref and roomId are defined before calling myMeeting
        if (meetingRef.current && roomId) {
            const appID = 2074852907;
            const serverSecret = "4f25d5c2538074f8f8b2910c0d87f81b";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                "Himanshi Gupta"
            );
            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: meetingRef.current, // Use the ref here
                sharedLinks: [
                    {
                        name: 'Copy Link',
                        url: `https://localhost:3000/Room/${roomId}`, // Ensure the URL matches the route
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
                showLeaveRoomConfirmDialog: true,
            });
        }
    }, [roomId]); // Dependency array, triggers useEffect when roomId changes

    return (
        <div>
            <div ref={meetingRef} />
        </div>
    );
};

export default RoomPage;
