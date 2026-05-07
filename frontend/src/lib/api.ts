const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function apiClient(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  getAll: (category?: string) => 
    apiClient(`/products${category ? `?category=${category}` : ''}`),
  getById: (id: string) => apiClient(`/products/${id}`),
  getCategories: () => apiClient('/products/categories'),
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => apiClient('/testimonials'),
};

// Contact API
export const contactApi = {
  submit: (data: any) => apiClient('/contact', { method: 'POST', body: data }),
};

// Enquiry API
export const enquiryApi = {
  submit: (data: any) => apiClient('/enquiries', { method: 'POST', body: data }),
};
