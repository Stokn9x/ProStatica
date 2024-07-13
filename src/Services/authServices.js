// services/authService.js

const authService = {
    isAuthenticated: false,
    currentUser: null,

    login(email, password) {
        // In a real application, you would make an API request here.
        // For now, we'll just simulate a successful login.
        if (email === "user@example.com" && password === "password") {
            this.isAuthenticated = true;
            this.currentUser = { email };
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userEmail", email);
            return true;
        }
        return false;
    },

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
    },

    getAuthStatus() {
        return localStorage.getItem("isAuthenticated") === "true";
    },

    getCurrentUser() {
        return localStorage.getItem("userEmail");
    }
};

export default authService;
