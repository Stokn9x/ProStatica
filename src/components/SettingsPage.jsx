import React, { useState } from 'react';
import './../Css/SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import userData from './../Data/users.json';


const SettingsPage = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = userData.users.find(user => user.username == currentUser.username);
    console.log(currentUserData);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { profilePic, bannerPic, name, age } = currentUserData;

    const [selectedSection, setSelectedSection] = useState('publicProfile');
    const navigate = useNavigate();

    const renderSection = () => {
        switch (selectedSection) {
            case 'publicProfile':
                return (
                    <div className="section-content">
                        <h2>Public Profile</h2>
                        <div className="form-group">
                            <label>Profile Picture</label>
                            <input type="file" accept="image/*" />
                            <img src={profilePic} alt="Profile" className="preview-image" />
                        </div>
                        <div className="form-group">
                            <label>Banner Picture</label>
                            <input type="file" accept="image/*" />
                            <img src={bannerPic} alt="Banner" className="preview-image" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" defaultValue={currentUser.username} />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" defaultValue={name} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" defaultValue={age} />
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea defaultValue={currentUser.bio}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" defaultValue={currentUser.location} />
                        </div>
                        <div className="form-group">
                            <label>Social Media Links</label>
                            <input type="text" placeholder="Facebook" defaultValue={currentUser.socialMedia?.facebook} />
                            <input type="text" placeholder="Twitter" defaultValue={currentUser.socialMedia?.twitter} />
                            <input type="text" placeholder="Instagram" defaultValue={currentUser.socialMedia?.instagram} />
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            case 'account':
                return (
                    <div className="section-content">
                        <h2>Account</h2>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" defaultValue={currentUser.email} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="New password" />
                        </div>
                        <div className="form-group">
                            <label>Two-Factor Authentication</label>
                            <input type="checkbox" checked={currentUser.twoFactorAuth} />
                        </div>
                        <div className="form-group">
                            <label>Security Question</label>
                            <input type="text" placeholder="Your first pet's name?" />
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="section-content">
                        <h2>Appearance</h2>
                        <div className="form-group">
                            <label>Theme</label>
                            <select defaultValue={currentUser.theme}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="section-content">
                        <h2>Notifications</h2>
                        <div className="form-group">
                            <label>Email Notifications</label>
                            <input type="checkbox" checked={currentUser.emailNotifications} />
                        </div>
                        <div className="form-group">
                            <label>Push Notifications</label>
                            <input type="checkbox" checked={currentUser.pushNotifications} />
                        </div>
                        <div className="form-group">
                            <label>Activity Notifications</label>
                            <input type="checkbox" checked={currentUser.activityNotifications} />
                        </div>
                        <div className="form-group">
                            <label>Newsletter</label>
                            <input type="checkbox" checked={currentUser.newsletter} />
                        </div>
                        <button className="setting-btn">Save Changes</button>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="section-content">
                        <h2>Privacy</h2>
                        <div className="form-group">
                            <label>Profile Visibility</label>
                            <select defaultValue={currentUser.profileVisibility}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Friends/List Visibility</label>
                            <select defaultValue={currentUser.friendsListVisibility}>
                                <option value="public">Public</option>
                                <option value="friends">Friends only</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Data Sharing Preferences</label>
                            <input type="checkbox" checked={currentUser.dataSharing} />
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            case 'connectedAccounts':
                return (
                    <div className="section-content">
                        <h2>Connected Accounts</h2>
                        <div className="form-group">
                            <label>Connect to Facebook</label>
                            <button>Connect</button>
                        </div>
                        <div className="form-group">
                            <label>Connect to Google</label>
                            <button>Connect</button>
                        </div>
                        <div className="form-group">
                            <label>Connect to Twitter</label>
                            <button>Connect</button>
                        </div>
                    </div>
                );
            case 'billing':
                return (
                    <div className="section-content">
                        <h2>Billing</h2>
                        <div className="form-group">
                            <label>Payment Methods</label>
                            <input type="text" placeholder="Add new payment method" />
                        </div>
                        <div className="form-group">
                            <label>Billing History</label>
                            <ul>
                                <li>Invoice #1234 - $10 - 01/01/2023</li>
                                <li>Invoice #1235 - $20 - 01/02/2023</li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Subscriptions</label>
                            <input type="text" placeholder="Manage subscriptions" />
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            case 'security':
                return (
                    <div className="section-content">
                        <h2>Security</h2>
                        <div className="form-group">
                            <label>Login Activity</label>
                            <ul>
                                <li>Last login: 01/01/2023 - 12:00 PM</li>
                                <li>Last login: 01/02/2023 - 12:00 PM</li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Recent Account Changes</label>
                            <ul>
                                <li>Changed email: 01/01/2023</li>
                                <li>Changed password: 01/02/2023</li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Trusted Devices</label>
                            <input type="text" placeholder="Manage trusted devices" />
                        </div>
                        <button>Save Changes</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <div className="sidebar">
                <div className="sidebar-item" onClick={() => setSelectedSection('publicProfile')}>Public Profile</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('account')}>Account</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('appearance')}>Appearance</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('notifications')}>Notifications</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('privacy')}>Privacy</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('connectedAccounts')}>Connected Accounts</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('billing')}>Billing</div>
                <div className="sidebar-item" onClick={() => setSelectedSection('security')}>Security</div>
            </div>
            <div className="content">
                {renderSection()}
            </div>
        </div>
    );
};

export default SettingsPage;
