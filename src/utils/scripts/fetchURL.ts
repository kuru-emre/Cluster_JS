export const fetchURL = async (url: string, type: string | undefined) => {
  if (type === "image") {
    const pattern = /(https?:\/\/.*\.(?:png|jpe?g))/i;

    if (pattern.test(url)) {
      const blob = await fetch(url).then((res) => res.blob());
      return blob;
    }
  } else if (type === "dataset") {
    const pattern = /(https?:\/\/.*\.(?:ods|xls|xlsx|csv))/i;

    if (pattern.test(url)) {
      const blob = await fetch(url).then((res) => res.blob());
      return blob;
    }
  }

  return null;
};
