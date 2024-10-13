import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import mainlogo from '../../assets/white_logo.png';
import boyimg from '../../assets/boy.png';
import bg from '../../assets/bg.png';

const HomePage = () => {
    const [value, setValue] = useState();

    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        navigate(`/RoomPage/${value}`);
    }, [navigate, value]);

    return (
        <div className='page'>
                <div className='logo'>
                    <img src={mainlogo} className='main-logo' ></img>
                </div>
                <div className='boy'>
                    <img src={boyimg} className='boy-image'></img>
                    <div className='video'>
                        <h1 className='vedio-font'>Let's Video Call!</h1>
                        <h1 className='line'>"Get relief from stress by sharing your feelings face-to-face with others."</h1>
                    </div>
                </div>
            <div className='RoomCode'>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Create Room Code"
                />
                <br />
                <button className='join-btn' onClick={handleJoinRoom}>Join</button>
            </div>
        </div>
    );
};

export default HomePage;
