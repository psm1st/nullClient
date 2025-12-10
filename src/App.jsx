import { useState} from 'react'
import TextField from './components/TextField'

const SVG_MAP = {
  '최고': {
    folder: 'best',
    files: ['best.svg', 'prize.svg']
  },
  '사랑': {
    folder: 'love',
    files: ['code.svg', 'heart.svg', 'star.svg']
  },
  '졸업': {
    folder: 'graduation',
    files: ['code.svg', 'completed.svg', 'end.svg', 'level.svg']
  },
  '축하': {
    folder: 'celebration',
    files: ['ascii.svg', 'code.svg', 'star.svg']
  }
}

function App() {
  const [currentSvg, setCurrentSvg] = useState(null)

  const handleTextChange = (text) => {
    for (const [keyword, config] of Object.entries(SVG_MAP)) {
      if (text.includes(keyword)) {
        const randomFile = config.files[Math.floor(Math.random() * config.files.length)]
        const svgPath = `/${config.folder}/${randomFile}`
        setCurrentSvg(svgPath)
        return
      }
    }
    setCurrentSvg(null)
  }

  return (
    <div className="min-h-screen relative">
      {currentSvg && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img src={currentSvg} alt="emoji" className="max-w-md max-h-md" />
        </div>
      )}
      <TextField onTextChange={handleTextChange} />
    </div>
  )
}

export default App
