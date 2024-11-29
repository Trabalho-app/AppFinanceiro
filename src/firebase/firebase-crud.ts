import axios from 'axios';
import { firebaseConfig } from './firebase-config';

// Função para obter a URL com autenticação opcional
export const getUrl = (path: string): string => {
  const authPart = firebaseConfig.authToken
    ? `?auth=${firebaseConfig.authToken}`
    : '';
  return `${firebaseConfig.baseURL}/${path}.json${authPart}`;
};

// Função para tratar erros
const handleError = (error: any) => {
  console.error('Firebase Error:', error?.response?.data || error.message);
  throw error;
};

// Criar dados no Firebase (POST)
export const createData = async (path: string, data: object): Promise<string> => {
  try {
    const response = await axios.post(getUrl(path), data);
    console.log('Data created:', response.data);
    return response.data.name; // Retorna o ID gerado automaticamente
  } catch (error) {
    handleError(error);
    return '';
  }
};

// Ler dados do Firebase (GET)
export const readData = async (path: string): Promise<any> => {
  try {
    const response = await axios.get(getUrl(path));
    console.log('Data read:', response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Atualizar dados no Firebase (PUT)
export const updateData = async (path: string, data: object): Promise<void> => {
  try {
    await axios.put(getUrl(path), data);
    console.log('Data updated:', data);
  } catch (error) {
    handleError(error);
  }
};

// Atualizar parcialmente (PATCH)
export const patchData = async (path: string, data: object): Promise<void> => {
  try {
    await axios.patch(getUrl(path), data);
    console.log('Data patched:', data);
  } catch (error) {
    handleError(error);
  }
};

// Deletar dados do Firebase (DELETE)
export const deleteData = async (path: string): Promise<void> => {
  try {
    await axios.delete(getUrl(path));
    console.log(`Data at ${path} deleted.`);
  } catch (error) {
    handleError(error);
  }
};
