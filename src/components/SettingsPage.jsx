import React, { useState } from 'react';
import './../Css/SettingsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//Ja ved godt det skal laves om og hentes fra en api, men gad jeg ik lige til, så den får en fremtidige person lov til :).
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const roles = ["Ingame Leader", "Support", "Lurker", "Rifler", "Entry", "AWP'er", "Coach", "Stand-In"]

const SettingsPage = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }
    //Should be a useEffect to get the data from the api, but i'm lazy so i'm just gonna use the data from the currentUser.
    const [formData, setFormData] = useState({
        profilePic: currentUser.profilePic,
        bannerPic: currentUser.bannerPic,
        username: currentUser.username,
        name: currentUser.name,
        age: currentUser.age,
        role: currentUser.role,
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        socialMedia: {
            faceit: currentUser.socialMedia?.faceit || '',
            twitter: currentUser.socialMedia?.twitter || '',
            instagram: currentUser.socialMedia?.instagram || ''
        }

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            socialMedia: {
                ...formData.socialMedia,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUserData = {
            ...currentUser,
            ...formData,
            socialMedia: {
                ...currentUser.socialMedia,
                ...formData.socialMedia
            }
        };

        axios.post('http://localhost:5001/updateProfile', updatedUserData)
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the profile!', error);
            });
    };
    
    const { profilePic, bannerPic, username, name, age, role, bio, location, socialMedia } = formData;

    const [selectedSection, setSelectedSection] = useState('publicProfile');
    const navigate = useNavigate();

    const renderSection = () => {
        switch (selectedSection) {
            case 'publicProfile':
                return (
                    <div className="section-content">
                        <h2>Public Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Profile Picture(Don't work)</label>
                                <input type="file" accept="image/*" />
                                <img src={profilePic} alt="Profile" className="preview-image" />
                            </div>
                            <div className="form-group">
                                <label>Banner Picture(Don't work)</label>
                                <input type="file" accept="image/*" />
                                <img src={bannerPic} alt="Banner" className="preview-image" />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" value={username} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={name} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={age} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={role} onChange={handleInputChange}>
                                    <option value="">Select your role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea name="bio" value={bio} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <select name="location" value={location} onChange={handleInputChange}>
                                    <option value="">Select a country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Social Media Links</label>
                                <input type="text" name="faceit" placeholder="Faceit" value={socialMedia.faceit} onChange={handleSocialMediaChange} />
                                <input type="text" name="twitter" placeholder="Twitter" value={socialMedia.twitter} onChange={handleSocialMediaChange} />
                                <input type="text" name="instagram" placeholder="Instagram" value={socialMedia.instagram} onChange={handleSocialMediaChange} />
                            </div>
                            <button type="submit">Save Changes</button>
                        </form>
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
                                <option value="light">Dark</option>
                                <option value="dark">Light</option>
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
