export const API_PATH = 'http://localhost:8000/';

export const triggersGet = async() =>{
  const response = await fetch(`${API_PATH}api/trigger/`);
  return  await response.json();
}