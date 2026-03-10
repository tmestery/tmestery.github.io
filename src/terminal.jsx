import { useState } from 'react'
import './index.css'

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
  const [history, setHistory] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let output;

    if (command.startsWith("echo ")) {
      output = <p>{command.slice(5)}</p>;
    } else {
      switch(command) {
        case "help":
          output = commandsDiv;
          break;
        case "cat about.txt":
          output = <pre>{`Hello! I'm Tyler Mestery, a Computer Science undergraduate at Iowa State University with a strong focus on software engineering, AI systems, and backend development.\nI enjoy working close to the system level - performance, correctness, automation, and scalability - and I'm especially interested in how modern LLMs and AI tooling integrate with real production systems.`}</pre>;
          break;
        case "cat contact.txt":
          output = <pre>{`Email: tmest@iastate.edu\nLinkedin: linkedin.com/in/tmest\nGithub: github.com/tmestery`}</pre>;
          break;
        case "ls":
          output = <p>contact.txt  about.txt</p>;
          break;
        case "clear":
          setHistory([]);
          setCommand("");
          return;
        case "resume":
          window.open("https://drive.google.com/file/d/1pUonqFGMaKIlSa5G3wrMRlfxfr_ncbIi/view?usp=sharing", "_blank");
          break;
        case "github":
          window.open("https://github.com/tmestery", "_blank");
          break;
        case "linkedin":
          window.open("https://linkedin.com/in/tmest", "_blank");
          break;
        default:
          output = <p>command not found: {command}</p>;
          break;
      }
    }

    setHistory(prev => [...prev, 
      <p>guest@online-5173 % {command}</p>,
      output
    ]);
    setCommand("");
  }

  return (
    <div>
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <form className="form" onSubmit={handleSubmit}>
        <label>guest@online-5173 %
          <input
            type="text"
            value={command}
            onChange={e => setCommand(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}

export default Terminal;