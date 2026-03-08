import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const commands = [
  { name: "cat",      desc: "Display File Contents" },
  { name: "ls",       desc: "List Directory Contents" },
  { name: "echo",     desc: "Display Text" },
  { name: "clear",    desc: "Clear the Terminal Screen" },
  { name: "resume",   desc: "Open a New Tab With Resume" },
  { name: "github",   desc: "Open my GitHub in a New Tab" },
  { name: "linkedin", desc: "Open my LinkedIn in a New Tab" },
  { name: "help",     desc: "Show this help message" },
];

const commandsDiv = (
  <div>
    <pre style={{ fontFamily: 'JetBrains Mono, Courier New, monospace', textAlign: 'left' }}>
      {commands.map(({ name, desc }) => `${name.padEnd(12)}- ${desc}`).join('\n')}
    </pre>
  </div>
);

createRoot(document.getElementById('root')).render(commandsDiv);