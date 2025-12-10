import { useState } from 'react';

function TextField() {
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const hasText = text.trim().length > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-6 bg-white border-t border-black flex justify-center items-center gap-2.5">
      <div className="flex-1 h-20 p-4 bg-zinc-100 flex justify-start items-center gap-2.5 overflow-hidden">
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="텍스트를 입력해 주세요."
          className="w-full h-full bg-transparent border-none outline-none text-neutral-400 text-2xl font-normal font-['Apple_SD_Gothic_Neo'] placeholder:text-neutral-400 resize-none overflow-y-auto"
        />
      </div>
      <div
        className={`w-40 h-20 p-4 flex justify-center items-center gap-2.5 ${
          hasText ? 'bg-cyan-400' : 'bg-zinc-100'
        }`}
      >
        <div
          className={`text-center justify-start text-2xl font-['Apple_SD_Gothic_Neo'] ${
            hasText ? 'text-black font-bold' : 'text-neutral-400 font-normal'
          }`}
        >
          보내기
        </div>
      </div>
    </div>
  );
}

export default TextField;

