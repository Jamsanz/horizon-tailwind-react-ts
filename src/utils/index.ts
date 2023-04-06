import axios from "axios";
import moment from "moment";

const http = axios.create({
  baseURL: "https://galaxy-backend-production.up.railway.app/",
});

http.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { http };
  
export const getToken = () => window.localStorage.getItem("token");
export const getUser = () => window.localStorage.getItem("user");

export async function AsyncSaveItem(key: string, value: any) {
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export async function AsyncGetItem(key: string) {
  const item = window.localStorage.getItem(key);
  return JSON.parse("" + item);
}
export async function AsyncDeleteItem(key: string) {
  return window.localStorage.removeItem(key);
}

export const dateTimeFormatter = (date: string): string =>
  moment(date).format("Do MMMM, h:mm:ss A ");

export const timeFormatter = (date: string): string =>
  moment(date).format("Do MMMM, YYYY h:mm:ss A ");

export const shortDateFormatter = (date: string): string =>
  moment(date).format("D MMM");

export const orderDateFormatter = (date: string): string =>
  moment(date).format("dd, Do MMM h:mm:ss A");

  export function formatToCurrency(amount?: number) {
    return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

export function getTimeAgo(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diff / (1000 * 60));
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
}

export interface IFile {
  uri: string;
  type: string;
  name: string;
}
  
interface ICloudinary {
  secure_url: string;
  public_id: string;
}

export const cloudinaryUpload = async (file: any): Promise<ICloudinary> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jimdhhpn");
  formData.append("cloud_name", "wootlab");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/wootlab/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return await response.data;
};
