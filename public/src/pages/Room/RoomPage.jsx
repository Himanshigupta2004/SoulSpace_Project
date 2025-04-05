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
            const appID = 125761789;
            const serverSecret = "402c970a79787c4d53d3ded8bb7ed54c";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                Date.now().toString(),
                "Radhika Gupta"
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
