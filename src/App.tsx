import { useRef , useState } from "react"

interface Query{
   "inputs" : string,
};

function App() {
 const inputRef = useRef<HTMLInputElement>(null)
 const [img,setImg] = useState('');
 const [isLoading,setIsLoading] = useState(false)
  
  async function query(data : Query) {
	  try{
    const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		 {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		 }
	  );
	  const result = await response.blob();
	  return result;
    }catch(err){
      console.log(err)
    }

  }

function generate(){
   const inputElement:HTMLInputElement | null = inputRef.current
      if (!inputElement) {
            alert('Type anything on the Text Box');
            return;
      }
   setIsLoading(true);
     
   query({"inputs": `${inputElement.value}`}).then((response : Blob | undefined) => {
      if(response === undefined){
          console.log('invalid response');
          return
      }
	    const objectUrl = URL.createObjectURL(response);
      setIsLoading(false);      
      setImg(objectUrl);
   });
   
}

function downloadImage(){
   if (!img) return;
  
  const link = document.createElement('a');
  link.href = img;
  link.download = 'image.jpg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black"> 
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl text-bold justify-center">Text to Image </h1>
        <div className="flex justify-center w-full gap-2">
          <input className="w-1/2 h-8 rounded" ref={inputRef} />
          <button onClick={generate} className="border-solid border-2 border-white rounded-lg px-1">Generate</button>
          <button onClick={downloadImage} className="border-solid border-2 border-white rounded-lg px-1">Download</button>
        </div>
        {img &&  <img src={img} className="w-1/3 h-1/3 "/> }
        {isLoading  &&  <img src='loader.gif' className="w-1/2 h-1/2 "/> }
      </div>
    </div>
  )
}

export default App


