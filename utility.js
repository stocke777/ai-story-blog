export const flexCenter = "flex justify-center items-center"

export const useFetchTagsData = (url, setData, setLoading) => {

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const result = await response.json();
          setData(result.data);
        } catch (error) {
          console.error(error?.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  