import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    //  passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) {
      str += "0123456789";
    }
    if (characters) {
      str += "!@#$%^&*()_";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  useEffect(() => {
    passwordGen();
  }, [numbers, length, characters]);

  return (
    <div className="m-4 p-4 mt-[200px] rounded-lg bg-gray-700 flex flex-col items-center ">
      <h1 className="text-3xl font-bold p-4">Password Generator</h1>
      <div className="p-4  flex flex-col gap-2 items-center">
        <div className="p-4 flex ">
          <input
            type="text"
            placeholder="Password"
            ref={passwordRef}
            className="p-2 text-base rounded-l-lg w-[100%] text-gray-600 font-bold"
            value={password}
            readOnly
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 rounded-r-lg p-2"
          >
            Copy
          </button>
        </div>

        <div className="flex gap-5  p-4">
          <div className="flex gap-1 justify-center ">
            <label htmlFor="len">Length({length})</label>
            <input
              type="range"
              min="1"
              max="100"
              value={length}
              id="len"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex gap-1 justify-center ">
            <label htmlFor="num">Numbers</label>
            <input
              type="checkbox"
              id="num"
              onChange={() => setNumbers((prev) => !prev)}
            />
          </div>
          <div className="flex gap-1 justify-center ">
            <label htmlFor="char">Characters</label>
            <input
              type="checkbox"
              id="char"
              onChange={() => setCharacters((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
