export const fetchContacts = () => {
  const apiUrl = 'https://reqres.in/api/users?delay=4';

  return fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.error('Error fetching contacts:', error);
      return [];
    });
};
