import React, { useState } from 'react';
import './ProfileSettings.css';

const ProfileSettings: React.FC = () => {
    const profilePictures = [
        'https://via.placeholder.com/100?text=Avatar+1',
        'https://via.placeholder.com/100?text=Avatar+2',
        'https://via.placeholder.com/100?text=Avatar+3',
    ];

    const [selectedPicture, setSelectedPicture] = useState(profilePictures[0]);
    const [name, setName] = useState('Jane Doe');
    const [email, setEmail] = useState('jane.doe@example.com');

    const handleSave = () => {
        console.log('Saving profile:', { selectedPicture, name, email });
    };

    return (
        <div className="profile-settings">
            <h2>Profile</h2>
            <p>
                Your profile information is used to personalize your LionTrade experience. You can edit your name and
                email, and change your profile picture.
            </p>

            <div className="profile-settings__pictures">
                {profilePictures.map(pic => (
                    <div
                        key={pic}
                        className={`profile-settings__picture ${selectedPicture === pic ? 'active' : ''}`}
                        onClick={() => setSelectedPicture(pic)}
                    >
                        <img src={pic} alt="Profile option" />
                    </div>
                ))}
            </div>

            <div className="profile-settings__fields">
                <label htmlFor="profileName">Name</label>
                <input id="profileName" type="text" value={name} onChange={e => setName(e.target.value)} />

                <label htmlFor="profileEmail">Email</label>
                <input id="profileEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <button className="profile-settings__save-btn" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default ProfileSettings;
