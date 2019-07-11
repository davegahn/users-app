import axios from 'axios';
import { USERS_IN_LIST, USERS_START, ALL_USERS } from '../config.js';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// 1й способ обращения к серверу
/**
 * Получаем всех пользователей
 */
export const getAllUsers = async () => {
  return await axiosInstance
    .get(`/users?_start=${USERS_START}&_limit=${ALL_USERS / USERS_IN_LIST}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response));
};

// 2й способ обращения к серверу
/**
 * Получаем полтзователей в зависимости от того, сколько будет их на странице
 */
export const getLimitUsers = async offset => {
  try {
    return await axiosInstance
      .get(`/users?_start=${offset}&_limit=${USERS_IN_LIST}`)
      .then(response => response.data);
  } catch (error) {
    throw new Error('Ошибка сети. Попробуйте ещё раз');
  }
};

/**
 * Получаем одного пользователя
 */
export const getUser = async id => {
  return await axiosInstance
    .get(`/users/${id}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response));
};

/**
 * Редакктируем имя
 */
export const editUser = async (newName, id) => {
  return await axiosInstance
    .patch(`/users/${id}`, { name: newName })
    .then(response => response.data)
    .catch(error => Promise.reject(error.response));
};
