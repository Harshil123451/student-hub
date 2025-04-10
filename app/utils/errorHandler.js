export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export const handleApiError = async (error, showToast = true) => {
  // Log the error
  console.error('API Error:', error);

  // Handle different error types
  if (error instanceof APIError) {
    // Custom API error
    if (showToast) {
      // You can implement your toast notification here
      console.error('API Error:', error.message);
    }
    return { error: error.message, status: error.status, data: error.data };
  } else if (error.response) {
    // Axios error
    const message = error.response.data?.message || 'An error occurred';
    if (showToast) {
      console.error('API Error:', message);
    }
    return { error: message, status: error.response.status };
  } else if (error.request) {
    // Network error
    if (showToast) {
      console.error('Network Error:', 'Please check your internet connection');
    }
    return { error: 'Network error. Please check your internet connection.', status: 0 };
  } else {
    // Other errors
    if (showToast) {
      console.error('Error:', error.message);
    }
    return { error: error.message || 'An unexpected error occurred', status: 500 };
  }
};

// Helper function for Supabase errors
export const handleSupabaseError = (error, showToast = true) => {
  console.error('Supabase Error:', error);
  
  if (error.message) {
    if (showToast) {
      console.error('Supabase Error:', error.message);
    }
    return { error: error.message, status: error.status };
  }
  
  return { error: 'An error occurred with the database', status: 500 };
};

// Helper function for external API errors
export const handleExternalApiError = (error, showToast = true) => {
  console.error('External API Error:', error);
  
  if (error.message) {
    if (showToast) {
      console.error('External API Error:', error.message);
    }
    return { error: error.message, status: error.status };
  }
  
  return { error: 'An error occurred with the external service', status: 500 };
}; 