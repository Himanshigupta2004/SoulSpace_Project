# import pandas as pd
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.preprocessing import LabelEncoder
# from flask import Flask, request, jsonify

# app = Flask(__name__)

# # Sample historical mood data (user mood, scale, and activity)
# data = {
#     'mood_type': ['happy', 'sad', 'angry', 'neutral', 'happy', 'sad', 'angry', 'happy', 'neutral'],
#     'mood_scale': [8, 3, 4, 5, 9, 2, 6, 7, 4],
#     'activity': ['walk', 'comedy', 'run', 'read', 'music', 'call', 'exercise', 'friends', 'organize']
# }

# # Convert to DataFrame
# df = pd.DataFrame(data)

# # Encode the mood_type and activity labels
# le_mood = LabelEncoder()
# le_activity = LabelEncoder()
# df['mood_type_encoded'] = le_mood.fit_transform(df['mood_type'])
# df['activity_encoded'] = le_activity.fit_transform(df['activity'])

# # Define features and target
# X = df[['mood_type_encoded', 'mood_scale']]
# y = df['activity_encoded']

# # Train Decision Tree Classifier
# clf = DecisionTreeClassifier()
# clf.fit(X, y)

# @app.route('/get_suggestion', methods=['POST'])
# def get_suggestion():
#     try:
#         data = request.get_json()
#         mood_type = data['mood_type']
#         mood_scale = data['mood_scale']
        
#         # Predict activity based on the user's mood
#         mood_type_encoded = le_mood.transform([mood_type])[0]
#         predicted_activity = clf.predict([[mood_type_encoded, mood_scale]])
        
#         # Convert the predicted label back to activity
#         predicted_activity_label = le_activity.inverse_transform(predicted_activity)
#         return jsonify({"suggested_activity": predicted_activity_label[0]})
#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)  # Ensure the Flask server is running on port 5000


import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
import random  # To randomize suggestions based on mood_scale

app = Flask(__name__)


data = {
    'mood_type': ['happy', 'sad', 'angry', 'neutral', 'happy', 'sad', 'angry', 'happy', 'neutral', 'sad', 'angry', 'happy', 'neutral'],
    'mood_scale': [8, 3, 4, 5, 9, 2, 6, 7, 4, 3, 6, 10, 5],
    'activity': ['walk', 'comedy', 'run', 'read', 'music', 'call', 'exercise', 'friends', 'organize', 'movie', 'exercise', 'celebrate', 'journal']
}


df = pd.DataFrame(data)

le_mood = LabelEncoder()
le_activity = LabelEncoder()
df['mood_type_encoded'] = le_mood.fit_transform(df['mood_type'])
df['activity_encoded'] = le_activity.fit_transform(df['activity'])

# Define features and target
X = df[['mood_type_encoded', 'mood_scale']]
y = df['activity_encoded']

# Train Decision Tree Classifier with adjusted parameters
clf = DecisionTreeClassifier(max_depth=3, min_samples_split=2)
clf.fit(X, y)

# Predefined mood-based activity suggestions with more options
mood_activity_templates = {
    'happy': [
        "You can spend time with friends and celebrate.",
        "Listen to your favorite upbeat music.",
        "Take a walk outside to enjoy the moment.",
        "Go to a party and share the joy.",
        "Dance to your favorite music.",
        "Try something creative like painting or crafting."
    ],
    'sad': [
        "Watch a comforting movie or show to lift your mood.",
        "Call a loved one and share your thoughts.",
        "Listen to calming music to soothe your mind.",
        "Take a long bath and relax.",
        "Write in your journal to process your feelings.",
        "Take a nap to recharge your energy."
    ],
    'angry': [
        "Try exercising or going for a run to release the tension.",
        "Listen to music that helps you cool down.",
        "Take a deep breath and read something relaxing.",
        "Do a quick workout to burn off the anger.",
        "Take a walk and cool your head down.",
        "Try meditation to center your emotions."
    ],
    'neutral': [
        "How about organizing your space for a sense of productivity?",
        "Take a break and read a good book.",
        "Go for a short walk to refresh yourself.",
        "Do a puzzle to stimulate your mind.",
        "Cook a new recipe and try something different.",
        "Try journaling or writing down your thoughts."
    ]
}

@app.route('/get_suggestion', methods=['POST'])
def get_suggestion():
    try:
        # Parse JSON input
        data = request.get_json()
        mood_type = data['mood_type'].lower()
        mood_scale = data['mood_scale']
        
        # Validate input
        if mood_type not in mood_activity_templates:
            return jsonify({"error": "Invalid mood_type. Allowed values are: happy, sad, angry, neutral."})
        
        if not (isinstance(mood_scale, int) and 1 <= mood_scale <= 10):
            return jsonify({"error": "mood_scale must be an integer between 1 and 10."})
        
        # Predict activity based on the user's mood and scale
        mood_type_encoded = le_mood.transform([mood_type])[0]
        
        # Ensure feature names are consistent by creating a DataFrame
        input_features = pd.DataFrame([[mood_type_encoded, mood_scale]], columns=['mood_type_encoded', 'mood_scale'])
        predicted_activity = clf.predict(input_features)
        
        # Convert the predicted label back to activity
        predicted_activity_label = le_activity.inverse_transform(predicted_activity)[0]
        
        # Adjust activity suggestions based on mood_scale
        mood_suggestions = mood_activity_templates.get(mood_type)
        
        # Dynamically adjust suggestions based on scale
        if mood_scale >= 8:  # High mood scale, suggest energetic and social activities
            filtered_suggestions = [activity for activity in mood_suggestions if 'friends' in activity or 'celebrate' in activity or 'dance' in activity]
        elif mood_scale <= 4:  # Low mood scale, suggest calming and relaxing activities
            filtered_suggestions = [activity for activity in mood_suggestions if 'calming' in activity or 'nap' in activity or 'relax' in activity]
        else:  # Moderate scale, mix of active and relaxing
            filtered_suggestions = mood_suggestions

        # Ensure that filtered suggestions are never empty
        if not filtered_suggestions:
            filtered_suggestions = mood_suggestions  # Fallback to all suggestions if no match
        
        # Randomly pick a suggestion from the filtered list for diversity
        final_suggestion = random.choice(filtered_suggestions)
        
        # Combine predicted activity into a proper message
        activity_message = f"Also, consider {predicted_activity_label.lower()} to improve your mood."
        
        # Return the final suggestion with the predicted activity
        return jsonify({
            "additional_activity": activity_message,
            "suggestion": final_suggestion
        })
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ensure the Flask server is running on port 5000
