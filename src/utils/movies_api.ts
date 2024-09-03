export const getTvShowList = async (query: string) => {
  if (!query) return;

  const api = "https://api.themoviedb.org/3/search/tv";
  const url = `${api}?query=${query}&include_adult=false&language=es-MX&page=1`;

  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMBD_TOKEN}`,
      },
    });

    return await data.json();
  } catch (error) {
    console.log(error);
  }
};
