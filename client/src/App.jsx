import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Dummy song data (replace with backend logic later)
const dummySongs = [
  { name: "Song 1", url: "https://www.youtube.com/watch?v=1mVhKgCq9Dw" },
  { name: "Song 2", url: "https://www.youtube.com/watch?v=22IEnKGVuUY" },
  { name: "Song 3", url: "https://www.youtube.com/watch?v=CKpbdCciELk" },
  { name: "Song 4", url: "https://www.youtube.com/watch?v=AiD6SOOBKZI" },
  { name: "Song 5", url: "https://www.youtube.com/watch?v=F67EVY_sg4E" },
  { name: "Song 6", url: "https://www.youtube.com/watch?v=oGjYV6dix-o" },
  { name: "Song 7", url: "https://www.youtube.com/watch?v=vlkNcHDFnGA7" },
  { name: "Song 8", url: "https://www.youtube.com/watch?v=2VmgpHUld8o1" },
  { name: "Song 9", url: "https://www.youtube.com/watch?v=12fcHpwLKl4" },
  { name: "Song 10", url: "https://www.youtube.com/watch?v=qYcUn8FmtKk" },
];

const App = () => {
  const [songs, setSongs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [url, setUrl] = useState('');
  const [songName, setSongName] = useState('');

  // Load dummy songs on mount (later replace with API call)
  useEffect(() => {
    setSongs(dummySongs);
    // Example of how you would call the backend:
    // fetch('/api/songs')
    //   .then(res => res.json())
    //   .then(data => setSongs(data));
  }, []);

  const handleCheck = () => {
    if (url.includes('youtube.com')) {
      const name = `Song from ${url}`;
      setSongName(name);
    } else {
      toast.error("Invalid YouTube URL");
    }
  };

  const handlePublish = () => {
    if (songName) {
      const newSong = { name: songName, url };
      setSongs([...songs, newSong]);
      toast.success("Song published successfully!");
      setSongName('');
      setUrl('');
    } else {
      toast.error("Please check the song before publishing.");
    }
  };

  return (
    <div className="p-5 text-white bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Playlist</h1>

      <ul>
        {songs.slice(0, showAll ? songs.length : 3).map((song, index) => (
          <li key={index} className="mb-2">
            {song.name}
          </li>
        ))}
      </ul>
      <button
        className="text-blue-500 underline mt-2"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "Show More"}
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Add a Song</h2>
        <input
          type="text"
          className="border p-2 mb-2 w-full"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
          onClick={handleCheck}
        >
          Check
        </button>
        {songName && (
          <div className="mt-2">
            <p>Song Name: {songName}</p>
            <button
              className="bg-green-500 text-white py-1 px-3 rounded"
              onClick={handlePublish}
            >
              Publish Song
            </button>
          </div>
        )}
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
