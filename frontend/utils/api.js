import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts/`);
        return response.data;
    } catch (error) {
        console.error("Axios Error:", error.message);
        if (error.response) {
            console.error("Response Data:", error.response.data);
        }
        throw error;
    }
};

export const fetchPostById = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
    const response = await axios.post(`${API_URL}/posts/`, postData);
    return response.data;
};

export const updatePost = async (id, postData) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return response.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
};
