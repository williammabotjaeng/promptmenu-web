import { apiCall } from "@/services/apiCall";

export const handleCreateUserEvent = async (useremail: string) => {
    try {
    
      console.log('User created:', useremail);
      
      await apiCall('/audit/log', 'POST', {
        event: 'createUser',
        useremail,
      });

    } catch (error) {
      console.error('Error logging createUser event: ', error);
    }
};
