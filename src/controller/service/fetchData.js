export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Something went wrong: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.log("Fetch error: ", error);
    throw error;
  }
};
