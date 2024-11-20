import { useRef , useState } from "react"

interface Query{
   "inputs" : HTMLInputElement
}


function App() {
 const inputRef = useRef(null)
 const [img,setImg] = useState('')
  
  async function query(data :Query) {
	  const response =await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		 {
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		 }
	  );
	  const result = await response.blob();
	  return result;
  }

  function generate(){
   const inputElement:HTMLInputElement | null = inputRef.current
    if (!inputElement) {
      console.error('Input reference is null');
    return;
    }
     query({"inputs": `${inputElement.value}`}).then((response) => {
	    const objectUrl = URL.createObjectURL(response);
      setImg(objectUrl);
     });
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen "> 
      <div className=" flex flex-col">
      <label>Text to Image </label>
      <input ref={inputRef}/>
      <button onClick={generate}>generate</button>
      <img src={img}/>
      </div>
    </div>
  )
}

export default App
