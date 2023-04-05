import * as config from "./../config.json";

const URLS = {
  OUVRAGES: `${config.BASE_URL}/ouvrages`,
};

export const getOuvrages = async (type) => {
  const response = await fetch(`${URLS.OUVRAGES}?type=${type}`, {
    method: "GET",
  });
  return response.json();
};

export const insertOuvrage = async (ouvrage) => {
  const response = await fetch(`${URLS.OUVRAGES}`, {
    method: "POST",
    body: ouvrage
  });
  return response.json();
};
