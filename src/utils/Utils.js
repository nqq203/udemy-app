import { v4 as uuidv4 } from 'uuid';

export function generateUuid() {
  return uuidv4(); // Returns a UUID string, e.g., '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}

// export function objectToFormData(obj) {
//   const formData = new FormData();
//   Object.keys(obj).forEach((key) => {
//     formData.append(key, obj[key]);
//   });
//   return formData;
// }