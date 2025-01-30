import { store } from "../redux/store";

export const token = store.getState().auth.token;

export const handleQuantityInputChange = (productId, value, setQuantities) => {
  const newValue = Math.max(1, parseInt(value, 10) || 1);
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: newValue,
  }));
};

export const handleQuantityChange = (productId, amount, setQuantities) => {
  store;
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
  }));
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate(); // Без нуля перед числом
  const year = date.getFullYear();

  // Об'єкт місяців у родовому відмінку
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const monthName = months[date.getMonth()]; // Отримуємо назву місяця у родовому відмінку
  return `${day} ${monthName} ${year}`;
};
