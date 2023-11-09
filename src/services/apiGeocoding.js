export async function getGeolocation({ latitude, longitude }) {
  const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
  if (!res.ok) throw Error("Failed getting location");

  const data = await res.json();
  return data;
}
