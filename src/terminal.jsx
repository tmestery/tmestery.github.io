import { useState } from 'react'
import './App.css'

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

export const commandsDiv = (
  <div>
    <pre style={{ fontFamily: 'JetBrains Mono, Courier New, monospace', textAlign: 'left' }}>
      {commands.map(({ name, desc }) => `${name.padEnd(12)}- ${desc}`).join('\n')}
    </pre>
  </div>
);

function Terminal() {
  const [command, setCommand] = useState("");
  const [help, setHelp] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    switch(command) {
      case "help":
        helpCommand();
      case "resume":
        resumeCommand();
      case "github":
        githubCommand();
      case "linkedin":
        linkedinCommand();
      default:
        setError(`command not found: ${command}`);
    }

    // Set it to blank after enter key
    setCommand("")
  }

  function handleChange(e) {
    setCommand(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>guest@online-5173 %
          <input
            type="text"
            value={command}
            onChange={handleChange}
          />
        </label>
      </form>
      {help && commandsDiv}
      {error && <p>{error}</p>}
    </div>
  );
}

function linkedinCommand() {
  window.open("https://linkedin.com/in/tmest", "_blank");
}

function githubCommand() {
  window.open("https://github.com/tmestery", "_blank");
}

function resumeCommand() {
  window.open("https://drive.google.com/file/d/1pUonqFGMaKIlSa5G3wrMRlfxfr_ncbIi/view?usp=sharing", "_blank");
}

export default Terminal;