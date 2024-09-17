import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const authService = {
 
  loginWithGitHub: async () => {
    try {
      await account.createOAuth2Session(
        'github',
        'http://localhost:5173/profile', 
        'http://localhost:5173/'        
      );
    } catch (error) {
      console.error('Error during GitHub login:', error);
    }
  },

 
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  
  logout: async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
};

export default authService;



