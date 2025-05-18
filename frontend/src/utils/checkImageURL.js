const isValidImageURL = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
  
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };
  

  const url = "http://localhost:5173/laptop";
  isValidImageURL(url).then((isValid) => {
    console.log("Is valid image:", isValid);
  });
  