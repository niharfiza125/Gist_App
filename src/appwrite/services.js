import { Client, Databases, ID, Query } from 'appwrite';
import authService from './authService';  

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL)  
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    this.databases = new Databases(this.client);
  }


  async createGist({ description, files, isPublic }) {
    try {
      const user = await authService.getCurrentUser(); 
      if (!user) {
        throw new Error('User not logged in');
      }
      const userId = user.$id; 

      if (!description || !files) {
        throw new Error('Missing required fields');
      }

   
      const filesArray = files.map(file => file.name); 

  
      const response = await this.databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        ID.unique(),
        { description, files: filesArray, isPublic, userId, starredUsers: [] } 
      );

      console.log('Gist created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error creating Gist:', error);
      return null;
    }
  }


  async getPublicGists(limit = 10, offset = 0) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal('isPublic', true), Query.limit(limit), Query.offset(offset)]
      );
    } catch (error) {
      console.error('Error fetching Gists:', error);
      return null;
    }
  }

  
  async getUserGists(userId) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
    } catch (error) {
      console.error('Error fetching user gists:', error);
      return null;
    }
  }

 

async getGist(gistId) {
  try {
    console.log('Fetching gist with ID:', gistId); 
    return await this.databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      gistId
    );
  } catch (error) {
    console.error('Error fetching Gist:', error.message, 'Gist ID:', gistId); 
    return null;
  }
}



  async starGist(gistId) {
    try {
      const user = await authService.getCurrentUser(); 
      if (!user) {
        throw new Error('User not logged in');
      }
      const userId = user.$id;

      const gist = await this.getGist(gistId);
      if (gist) {
        const starredUsers = gist.starredUsers || [];
        if (!starredUsers.includes(userId)) {
          starredUsers.push(userId);

          return await this.databases.updateDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            gistId,
            { starredUsers }
          );
        }
      }
      return null;
    } catch (error) {
      console.error('Error starring Gist:', error);
      return null;
    }
  }

 
  async forkGist(gistId) {
    try {
      const user = await authService.getCurrentUser(); 
      if (!user) {
        throw new Error('User not logged in');
      }
      const userId = user.$id;

      const gist = await this.getGist(gistId);
      if (gist) {
       
        return await this.createGist({
          description: gist.description,
          files: gist.files,  
          isPublic: gist.isPublic,
          userId,
        });
      }
      return null;
    } catch (error) {
      console.error('Error forking Gist:', error);
      return null;
    }
  }




async getStarredGists() {
  try {
    const user = await authService.getCurrentUser();
    if (!user) {
      throw new Error('User not logged in');
    }
    const userId = user.$id;

    
    return await this.databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      [Query.equal('starredUsers', userId)]  
    );
  } catch (error) {
    console.error('Error fetching starred gists:', error);
    return null;
  }
}




  async deleteGist(gistId) {
    try {
      return await this.databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        gistId
      );
    } catch (error) {
      console.error('Error deleting Gist:', error);
      return null;
    }
  }
}

const service = new Service();
export default service;



