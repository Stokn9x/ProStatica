// services/authService.js

import users from './../Data/users.json';

const authService = {
    isAuthenticated: false,
    currentUser: null,

    login(email, password) {
        console.log('Login Attempt:', email, password);
        const user = users.users.find(user => user.email === email && user.password === password);
        console.log('Found User:', user);
        if (user) {
            this.isAuthenticated = true;
            this.currentUser = {
                email: user.email,
                username: user.username,
                rank: user.rank,
                name: user.name,
                age: user.age,
                bio: user.bio,
                bannerPic: user.bannerPic,
                profilePic: user.profilePic,
                location: user.location,
                socialMedia: user.socialMedia
            };
            console.log('Setting currentUser:', this.currentUser);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    },

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");
    },

    getAuthStatus() {
        return localStorage.getItem("isAuthenticated") === "true";
    },

    getCurrentUser() {
        const user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : null;
    }
};

export default authService;
