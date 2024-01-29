import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  
  const [Password, setPassword] = useState("");
  const [Length, setLength] = useState(8);
  const [NumbersAllowed, setNumbersAllowed] = useState(false);
  const [CharactersAllowed, setCharactersAllowed] = useState(false);

  const passwordGenerator = useCallback(
    () => {
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      if (NumbersAllowed) str += "0123456789";
      if (CharactersAllowed) str += "~!@#$%^&*()_+"

      for(let i=1; i<=Length; i++){
        let char = Math.floor(Math.random() * str.length+1 );
        pass += str.charAt(char)
      }

      setPassword(pass)

    },[Length, CharactersAllowed,NumbersAllowed, setPassword]
  )

  useEffect(() => {
    passwordGenerator()
  }, [Length,NumbersAllowed,CharactersAllowed,passwordGenerator])
  
  const passRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(Password)
  },[Password])



  return (

    <>
      <div className=' overflow-hidden flex justify-center items-center w-full h-screen ' >
        <div className=' bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:from-pink-500 hover:to-yellow-500 rounded-xl px-5 py-3 shadow-lg mt-2 mb-4 max-w-md mx-auto w-full  text-orange-500'>

          {/* Password Input and Copy starts here */}

          

          <h1 className='px-4 text-2xl text-white text-center mb-2 font-cus'>Password Generator</h1>
          <div className='flex shadow-xl rounded-xl overflow-hidden mb-4'>
            <input 
            type='text'
            value={Password}  
            className='w-full px-3 py-1 selection:bg-fuchsia-300 selection:text-fuchsia-900'
            readOnly
            placeholder='Password'
            ref={passRef}
            />
            <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>

          {/* Range, NumCheckBox and CharCheckBox starts here */}

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center text-center gap-x-1'>
              <input
              type='range'
              min={8}
              max={100}
              className='rounded-full shadow-sm cursor-pointer'
              value={Length}
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label className="text-white ">Length: {Length} </label>
            </div>

            <div className='flex items-center text-center gap-x-1'>
              <input
              type='checkbox'
              defaultChecked = {NumbersAllowed}
              id='numberInput'
              onChange={()=>{setNumbersAllowed((prev) => !prev)}}
              />
              <label htmlFor="numberInput" className="text-white ">Numbers</label>
            </div>

            <div className='flex items-center text-center gap-x-1'>
              <input
              type='checkbox'
              defaultChecked = {CharactersAllowed}
              id='charactersAllowed'
              onChange={()=>{setCharactersAllowed((prev) => !prev)}}
              />
              <label htmlFor="numberInput" className="text-white ">Charaters</label>
            </div>

          </div>


        </div>

      </div>


    </>
    
  )
}

export default App
