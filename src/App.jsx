import { useState } from 'react'
import TextField from './components/TextField'

const SVG_MAP = {
  최고: {
    folder: 'best',
    files: ['best.svg', 'prize.svg'],
  },
  사랑: {
    folder: 'love',
    files: ['code.svg', 'heart.svg', 'star.svg'],
  },
  졸업: {
    folder: 'graduation',
    files: ['code.svg', 'completed.svg', 'end.svg', 'level.svg'],
  },
  축하: {
    folder: 'celebration',
    files: ['ascii.svg', 'code.svg', 'star.svg'],
  },
  짱: {
    folder: 'celebration',
    files: ['ascii.svg', 'code.svg', 'star.svg'],
  },
}

const CARD_COLORS = ['#00E1FF', '#DBDFDE', '#FFFFFF']
const STORAGE_KEY = 'text-cards'

const parseTextWithSvgs = (text) => {
    const parts = []
    let remaining = text
    let lastIndex = 0

    const matches = []
    for (const [keyword, config] of Object.entries(SVG_MAP)) {
      let index = remaining.indexOf(keyword, lastIndex)
      while (index !== -1) {
        matches.push({
          index,
          keyword,
          config,
          length: keyword.length,
        })
        index = remaining.indexOf(keyword, index + 1)
      }
    }

    matches.sort((a, b) => a.index - b.index)

    const filteredMatches = []
    let currentEnd = 0
    for (const match of matches) {
      if (match.index >= currentEnd) {
        filteredMatches.push(match)
        currentEnd = match.index + match.length
      }
    }

    let currentPos = 0
    for (const match of filteredMatches) {
      if (match.index > currentPos) {
        const textPart = remaining.substring(currentPos, match.index)
        if (textPart) {
          parts.push({ type: 'text', content: textPart })
        }
      }

      const randomFile = match.config.files[Math.floor(Math.random() * match.config.files.length)]
      const svgPath = `/${match.config.folder}/${randomFile}`
      parts.push({ type: 'svg', content: svgPath, keyword: match.keyword })

      currentPos = match.index + match.length
    }

    if (currentPos < remaining.length) {
      const textPart = remaining.substring(currentPos)
      if (textPart) {
        parts.push({ type: 'text', content: textPart })
      }
    }

    if (parts.length === 0) {
      parts.push({ type: 'text', content: text })
    }

    return parts
}

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      return parsed.map((item) => {
        if (!item.parts && item.original) {
          const parts = parseTextWithSvgs(item.original)
          return {
            ...item,
            parts,
            color: item.color || CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)],
          }
        }
        return {
          ...item,
          color: item.color || CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)],
        }
      })
    } catch (e) {
      console.error('Failed to parse saved cards', e)
      return []
    }
  })

  const persistCards = (next) => {
    setCards(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const handleSend = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const parts = parseTextWithSvgs(trimmed)
    const color = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
    const card = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      original: trimmed,
      parts,
      color,
    }

    const next = [card, ...cards]
    persistCards(next)
  }

  return (
    <div className="min-h-screen bg-[#a5a5a5] flex flex-col">
      <div className="relative flex-1 w-full flex justify-center">
        <div className="w-full max-w-[1872px] px-6 py-8">
          <div className="flex flex-wrap gap-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="group relative inline-block p-3 rounded-sm border border-[#9F9F9F] text-black text-lg leading-relaxed"
                style={{ backgroundColor: card.color, maxWidth: '1872px' }}
              >
                <div className="inline-flex items-baseline gap-1 flex-wrap">
                  {card.parts.map((part, idx) =>
                    part.type === 'svg' ? (
                      <img
                        key={idx}
                        src={part.content}
                        alt={part.keyword}
                        className="h-[1em] w-auto object-contain inline-block align-baseline"
                        style={{ verticalAlign: 'baseline' }}
                      />
                    ) : (
                      <span
                        key={idx}
                        className="whitespace-pre-wrap inline-block"
                      >
                        {part.content}
                      </span>
                    )
                  )}
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-3 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <span className="text-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {card.original}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextField onSend={handleSend} />
    </div>
  )
}

export default App

