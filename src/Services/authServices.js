const authService = {
    isAuthenticated: false,

    login(email, password) {
        // In a real application, you would make an API request here.
        // For now, we'll just simulate a successful login.
        if (email === "user@example.com" && password === "password") {
            this.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", "true");
            return true;
        }
        return false;
    },

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
    },

    getAuthStatus() {
        return localStorage.getItem("isAuthenticated") === "true";
    }
};

export default authService;
