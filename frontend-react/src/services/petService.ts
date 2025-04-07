import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:5002/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

export interface Pet {
  _id: string;
  name: string;
  species: "Dog" | "Cat" | "Other";
  breed: string;
  age: "Puppy/Kitten" | "Young" | "Adult" | "Senior";
  gender: "Male" | "Female";
  description: string;
  imageUrl: string;
  owner: {
    _id: string;
    username: string;
  };
  status: "Available" | "Pending" | "Adopted";
  createdAt: string;
}

export interface CreatePetData {
  name: string;
  species: Pet["species"];
  breed: string;
  age: Pet["age"];
  gender: Pet["gender"];
  description: string;
  imageUrl: string;
}

export interface UpdatePetData extends Partial<CreatePetData> {
  status?: Pet["status"];
}

const petService = {
  async getAllPets(): Promise<Pet[]> {
    const response = await axios.get<Pet[]>(`${API_URL}/pets`);
    return response.data;
  },

  async getPet(id: string): Promise<Pet> {
    const response = await axios.get<Pet>(`${API_URL}/pets/${id}`);
    return response.data;
  },

  async createPet(data: CreatePetData): Promise<Pet> {
    const response = await axios.post<Pet>(`${API_URL}/pets`, data, {
      headers: authService.getAuthHeader(),
    });
    return response.data;
  },

  async updatePet(id: string, data: UpdatePetData): Promise<Pet> {
    const response = await axios.patch<Pet>(`${API_URL}/pets/${id}`, data, {
      headers: authService.getAuthHeader(),
    });
    return response.data;
  },

  async deletePet(id: string): Promise<void> {
    await axios.delete(`${API_URL}/pets/${id}`, {
      headers: authService.getAuthHeader(),
    });
  },

  async searchPets(filters: {
    species?: Pet["species"];
    age?: Pet["age"];
    gender?: Pet["gender"];
  }): Promise<Pet[]> {
    const params = new URLSearchParams();
    if (filters.species) params.append("species", filters.species);
    if (filters.age) params.append("age", filters.age);
    if (filters.gender) params.append("gender", filters.gender);

    const response = await axios.get<Pet[]>(
      `${API_URL}/pets/search/filters?${params}`
    );
    return response.data;
  },
};

export default petService;
