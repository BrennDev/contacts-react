export const submitContact = async (contactData) => {
  const url = 'https://reqres.in/api/users?delay=1';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error('Error creating contact');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
