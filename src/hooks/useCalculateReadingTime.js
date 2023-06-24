const useCalculateReadingTime = (text) => {
  const calculateReadingTime = (content) => {
    if (!content) return;
    const averageReadingSpeed = 200;
    const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const words = cleanContent.split(/\s+/);
    const readingTime = Math.ceil(words.length / averageReadingSpeed);

    const noun = readingTime <= 1 ? "minute" : "minutes";
    return `${readingTime} ${noun}`;
  };

  return calculateReadingTime(text);
};

export default useCalculateReadingTime;
