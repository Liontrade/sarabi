import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './ProfileSettings.css';
import { toast } from 'react-toastify';

const ProfileSettings: React.FC = () => {
    const currentUser = auth.currentUser;
    const profilePictures = [
        'https://via.placeholder.com/100?text=Avatar+1',
        'https://via.placeholder.com/100?text=Avatar+2',
        'https://via.placeholder.com/100?text=Avatar+3',
    ];

    const [selectedPicture, setSelectedPicture] = useState<string>(profilePictures[0]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    const validateName = (value: string): string | null => {
        const trimmed = value.trim();
        if (!trimmed) {
            return 'Name cannot be empty.';
        }
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(trimmed)) {
            return 'Name can only contain letters and spaces.';
        }
        return null;
    };

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.displayName || '');
            setEmail(currentUser.email || '');
            if (currentUser.photoURL) {
                setSelectedPicture(currentUser.photoURL);
            }
        }
    }, [currentUser]);

    const handleSave = async () => {
        const errorMsg = validateName(name);
        if (errorMsg) {
            setNameError(errorMsg);
            return;
        } else {
            setNameError('');
        }
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: selectedPicture,
                });

                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                await setDoc(userDocRef, { name: name, photoURL: selectedPicture }, { merge: true });
                console.log('Profile updated successfully');
                toast.success('Profile updated successfully');
            }
        } catch (error: unknown) {
            console.error('Error updating profile:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div className="profile-settings">
            <h2>Profile</h2>
            <p>
                Your profile information is used to personalize your LionTrade experience. You can edit your name and
                change your profile picture. Your email is verified and cannot be changed.
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
                <input
                    id="profileName"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => {
                        const errorMsg = validateName(name);
                        setNameError(errorMsg ? errorMsg : '');
                    }}
                    className={nameError ? 'input-error' : ''}
                />
                {nameError && <div className="error-message">{nameError}</div>}

                <label htmlFor="profileEmail">Email</label>
                <input id="profileEmail" type="email" value={email} disabled />
            </div>

            <button className="profile-settings__save-btn" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default ProfileSettings;
