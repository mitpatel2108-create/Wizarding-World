import { useState } from 'react'

const woods = ['Elder', 'Oak', 'Holly', 'Yew']
const cores = ['Phoenix Feather', 'Dragon Heartstring', 'Unicorn Hair']

export default function WandGenerator() {
  const [wand, setWand] = useState<any>(null)

  function generate() {
    const newWand = {
      wood: woods[Math.floor(Math.random() * woods.length)],
      core: cores[Math.floor(Math.random() * cores.length)],
      length: (Math.random() * 5 + 9).toFixed(1),
    }

    setWand(newWand)
  }

  return (
    <div className="text-center py-20">
      <button
        onClick={generate}
        className="border border-yellow-500 px-6 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
      >
        Generate Wand
      </button>

      {wand && (
        <div className="mt-10 border border-yellow-700 p-8 rounded-xl bg-black/40 backdrop-blur-md">
          <h2 className="text-3xl text-yellow-400 mb-4">
            {wand.wood} Wand
          </h2>

          <p>{wand.core}</p>
          <p>{wand.length} inches</p>
        </div>
      )}
    </div>
  )
}