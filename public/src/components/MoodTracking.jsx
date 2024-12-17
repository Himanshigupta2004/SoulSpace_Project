// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './MoodTracker.css';

// const MoodTracker = ({ userId }) => {
//   const [mood, setMood] = useState("");
//   const [rating, setRating] = useState(3); 
//   const [history, setHistory] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get(`/api/moods/${userId}/history`);
//         setHistory(response.data);
//       } catch (error) {
//         console.error("Error fetching mood history:", error);
//       }
//     };

//     fetchHistory();
//   }, [userId]);


//   const handleSubmit = async () => {
//     if (!mood) {
//       setMessage("Please select a mood!");
//       return;
//     }

//     try {
//       const response = await axios.post(`/api/moods/${userId}/track`, {
//         mood,
//         rating,
//       });

//       setMessage(response.data.msg);
//       setHistory([response.data.mood, ...history]); 
//       setMood("");
//       setRating(3);
//     } catch (error) {
//       console.error("Error tracking mood:", error);
//       setMessage("Error tracking mood. Please try again.");
//     }
//   };

//   return (
//     <div className="mood-tracker">
//       <h1>Track Your Mood</h1>

//       <div className="mood-selection">
//         <h2>Select Your Mood:</h2>
//         <div className="emoji-grid">
//           {[
//             { emoji: "😊", label: "Happy" },
//             { emoji: "😢", label: "Sad" },
//             { emoji: "😟", label: "Anxious" },
//             { emoji: "😭", label: "Cry" },
//             { emoji: "😐", label: "Neutral" },
//           ].map(({ emoji, label }) => (
//             <button
//               key={label}
//               className={`emoji-button ${mood === label ? "selected" : ""}`}
//               onClick={() => setMood(label)}
//             >
//               {emoji}
//               <span>{label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="rating-slider">
//         <h2>Rate Your Mood:</h2>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={(e) => setRating(e.target.value)}
//         />
//         <span>Rating: {rating}</span>
//       </div>

//       <button onClick={handleSubmit} className="track-button">
//         Track Mood
//       </button>

//       {message && <p className="message">{message}</p>}

//       <div className="mood-history">
//         <h2>Your Mood History:</h2>
//         {history.length > 0 ? (
//           <ul>
//             {history.map((entry) => (
//               <li key={entry._id}>
//                 <span>{entry.mood} </span>
//                 <span>{entry.rating}⭐ </span>
//                 <span>({new Date(entry.timestamp).toLocaleString()})</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No mood history found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MoodTracker;






// import React, { useState } from 'react';
// import axios from 'axios';
// import './MoodTracker.css';

// const MoodTracking = () => {
//   // State to track selected mood and scale
//   const [mood, setMood] = useState('');
//   const [scale, setScale] = useState(1);
//   const [username, setUsername] = useState('johndoe');  // Replace with the actual username
//   const [message, setMessage] = useState('');

//   // Handle change of mood
//   const handleMoodChange = (e) => {
//     setMood(e.target.value);
//   };

//   // Handle change of scale (mood intensity)
//   const handleScaleChange = (e) => {
//     setScale(e.target.value);
//   };

//   // Send mood data to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!mood) {
//       setMessage('Please select a mood.');
//       return;
//     }
//     if (scale < 1 || scale > 10) {
//       setMessage('Scale must be between 1 and 10.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/moods/add/${username}`,
//         {
//           mood,
//           scale: parseInt(scale),
//         }
//       );
//       setMessage(response.data.message); // Display success message
//     } catch (error) {
//       setMessage('An error occurred while recording your mood.');
//     }
//   };

//   return (
//     <div className="mood-tracking">
//       <h2>How are you feeling today, {username}?</h2>
      
//       {/* Mood Selection */}
//       <div className="mood-options">
//         <label>
//           <input
//             type="radio"
//             value="happy"
//             checked={mood === 'happy'}
//             onChange={handleMoodChange}
//           />
//           Happy
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="angry"
//             checked={mood === 'angry'}
//             onChange={handleMoodChange}
//           />
//           Angry
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="sad"
//             checked={mood === 'sad'}
//             onChange={handleMoodChange}
//           />
//           Sad
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="tired"
//             checked={mood === 'tired'}
//             onChange={handleMoodChange}
//           />
//           Tired
//         </label>
//       </div>

//       {/* Mood Scale (1-10) */}
//       <div className="scale-input">
//         <label>Scale (1-10):</label>
//         <input
//           type="number"
//           min="1"
//           max="10"
//           value={scale}
//           onChange={handleScaleChange}
//         />
//       </div>

//       {/* Submit Button */}
//       <button onClick={handleSubmit}>Submit</button>

//       {/* Message Display */}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default MoodTracking;





// import React, { useState } from "react";
// import axios from "axios";

// const MoodTracking = () => {
//   const [moodType, setMoodType] = useState("happy");
//   const [moodScale, setMoodScale] = useState(5);
//   const [suggestedActivity, setSuggestedActivity] = useState("");

//   const handleMoodChange = (event) => {
//     setMoodType(event.target.value);
//   };

//   const handleScaleChange = (event) => {
//     setMoodScale(event.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Send mood data to Node.js server, which will forward it to the Flask backend
//       const response = await axios.post("http://localhost:5000/api/moods/get_suggestion", {
//         mood_type: moodType,
//         mood_scale: moodScale,
//       });

//       if (response.data.suggested_activity) {
//         setSuggestedActivity(response.data.suggested_activity);
//       }
//     } catch (error) {
//       console.error("Error fetching suggestion:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Mood Tracking</h2>
//       <div>
//         <label>
//           Mood:
//           <select value={moodType} onChange={handleMoodChange}>
//             <option value="happy">Happy</option>
//             <option value="sad">Sad</option>
//             <option value="angry">Angry</option>
//             <option value="neutral">Neutral</option>
//           </select>
//         </label>
//       </div>
//       <div>
//         <label>
//           Mood Scale (1-10):
//           <input
//             type="number"
//             value={moodScale}
//             onChange={handleScaleChange}
//             min="1"
//             max="10"
//           />
//         </label>
//       </div>
//       <button onClick={handleSubmit}>Get Suggestion</button>
//       <div>
//         {suggestedActivity && <p>Suggested Activity: {suggestedActivity}</p>}
//       </div>
//     </div>
//   );
// };

// export default MoodTracking;










import React, { useState } from "react";
import axios from "axios"; // Axios for making API requests
import './MoodTracker.css';

const MoodTracking = () => {
  const [moodType, setMoodType] = useState("happy");
  const [moodScale, setMoodScale] = useState(5);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");

  // Handle form submission to get suggestion based on mood and scale
  const getSuggestion = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get_suggestion", {
        mood_type: moodType,
        mood_scale: moodScale,
      });

      setSuggestion(response.data.suggestion);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch suggestion. Please try again.");
      setSuggestion("");
    }
  };

  return (
    <div className="mood-tracking-container">
      <h2>Mood Activity Suggestions</h2>

      {/* Mood Type Selection */}
      <div className="form-group">
        <label htmlFor="mood_type">Select your mood:</label>
        <select
          id="mood_type"
          value={moodType}
          onChange={(e) => setMoodType(e.target.value)}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      {/* Mood Scale (1-10) */}
      <div className="form-group">
        <label htmlFor="mood_scale">Rate your mood (1-10):</label>
        <input
          type="number"
          id="mood_scale"
          value={moodScale}
          onChange={(e) => setMoodScale(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>

      {/* Submit Button to get suggestion */}
      <button onClick={getSuggestion}>Get Suggestion</button>

      {/* Error Handling */}
      {error && <p className="error">{error}</p>}

      {/* Display Suggested Activity */}
      {suggestion && (
        <div className="suggestion">
          <h3>Suggested Activity:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracking;
