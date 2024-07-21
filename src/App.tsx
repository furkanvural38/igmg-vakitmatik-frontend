import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/electron-vite.animate.svg';

function App() {
    const [count, setCount] = useState(0);


    return (
        <div className="max-w-screen-xl mx-auto p-8 text-center">
            <div className="flex justify-center space-x-4 mb-8">
                <a href="https://electron-vite.github.io" target="_blank" rel="noopener noreferrer">
                    <img
                        src={viteLogo}
                        className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]"
                        alt="Vite logo"
                    />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img
                        src={reactLogo}
                        className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)] animate-logo-spin"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="text-4xl font-bold mb-8">Vite + React</h1>
            <div className="card p-8 bg-white shadow-lg rounded-lg mb-8">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    count is {count}
                </button>
                <p className="mt-4">
                    Edit <code className="bg-gray-100 p-1 rounded">src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="text-gray-500">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
