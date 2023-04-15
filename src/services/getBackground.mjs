
import { useState, useEffect } from "react";



export const getBackground = () => {
    const [img, setImg] = useState([])

    useEffect(()=>{
        const pictures = [{
            url:"https://wallpaper.dog/large/749981.jpg"
          },
          {
            url: "https://wallpaper.dog/large/20352460.jpg"
          },
          {
              url: "https://wallpapers.com/images/hd/pikachu-with-pokemon-friends-uxxa8pvbvsqj0v3h.jpg"
            }]
    
            setImg(pictures)
    },[])
   


  return img
}

export default getBackground;
