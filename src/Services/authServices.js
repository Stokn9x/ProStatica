// services/authService.js

const authService = {
    isAuthenticated: false,
    currentUser: null,
    users: [],

    fetchUsers: async () => {
        try {
            const response = await fetch('http://localhost:5001/getAllUsers');
            if (response.ok) {
                const data = await response.json();
                authService.users = data;
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
  
    login: async (email, password) => {
        try {
            if (authService.users.length === 0) {
                await authService.fetchUsers();
            }

            const user = authService.users.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                authService.isAuthenticated = true;
                authService.currentUser = {
                    email: user.email,
                    username: user.username,
                    rank: user.rank,
                    name: user.name,
                    age: user.age,
                    role: user.role,
                    bio: user.bio,
                    bannerPic: user.bannerPic,
                    profilePic: user.profilePic,
                    location: user.location,
                    firstLogin: user.firstLogin,
                    socialMedia: user.socialMedia,
                    signupTime: user.signupTime,
                    currentTeam: user.currentTeam,
                    previousTeams: user.previousTeams,
                };

                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem(
                    'currentUser',
                    JSON.stringify(authService.currentUser)
                );
                return true;
            } else {
                console.log('Invalid email or password.');
                return false;
            }
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    },

    logout: () => {
        authService.isAuthenticated = false;
        authService.currentUser = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
    },

    getAuthStatus: () => {
        return localStorage.getItem('isAuthenticated') === 'true';
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    updateCurrentUser: (updatedUser) => {
        authService.currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    },

    initializeAuth: () => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('currentUser');

        if (storedAuthStatus === 'true' && storedUser) {
            authService.isAuthenticated = true;
            authService.currentUser = JSON.parse(storedUser);
        }
    }
};

authService.initializeAuth();

export default authService;
