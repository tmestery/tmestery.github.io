import { useState } from 'react'
import './index.css'
import './matrixBackground.jsx'

const commands = [
  { name: "cat",             desc: "Display File Contents" },
  { name: "ls",              desc: "List Directory Contents" },
  { name: "echo",            desc: "Display Text" },
  { name: "clear",           desc: "Clear the Terminal Screen" },
  { name: "resume",          desc: "Open a New Tab With Resume" },
  { name: "github",          desc: "Open my GitHub in a New Tab" },
  { name: "linkedin",        desc: "Open my LinkedIn in a New Tab" },
  { name: "color",           desc: "Change text color (hex)"},
  { name: "help",            desc: "Show this help message" },
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
  const [textColor, setTextColor] = useState("#00FF00");
  const [history, setHistory] = useState([
  <pre style={{ margin: 0 }}>{`Welcome to Tyler Mestery's terminal. Type 'help' to get started.`}</pre>
]);

  function handleSubmit(e) {
    e.preventDefault();
    let output;

    if (command.startsWith("echo ")) {
      output = <p>{command.slice(5)}</p>;
    } else if (command.startsWith("color ")) {
      var re = /[0-9A-Fa-f]{6}/g;
      const color = command.slice(6).trim();
      if (re.test(color)) {
        setTextColor(`${color}`)
      } else {
        output = <pre>{`hex invalid: ${color}`}</pre>
      }
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
        case "cat bgColors.txt":
          output = <pre>{`Here are some example hex colors you can change the background to:
#00FF00 (Green),
#ff0000 (Red),
#1c03ff(Blue),
#ffffff (White)`}</pre>;
          break;
        case "ls":
          output = <p>contact.txt  about.txt  bgColors.txt</p>;
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
      <p style={{display: 'flex', gap: '0.5rem', margin: 0, whiteSpace: 'nowrap' }}>guest@online-5173 % {command}</p>,
      output
    ]);
    setCommand("");
  }

  return (
  <div style={{backgroundColor: 'transparent', minHeight: '100vh', padding: '1rem', position: 'relative', zIndex: 1 }}>
    {history.map((item, index) => (
      <div key={index}>{item}</div>
    ))}
    <form className="form" onSubmit={handleSubmit}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
        <span>guest@online-5173 %</span>
        <input
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          style={{
            backgroundColor: 'transparent',
            color: textColor,
            border: 'none',
            outline: 'none',
            fontFamily: 'JetBrains Mono, Courier New, monospace',
            fontSize: 'inherit',
            caretColor: '#00FF00',
            width: '60vw',
          }}
        />
      </label>
    </form>
  </div>
);
}

export default Terminal;