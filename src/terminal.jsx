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
  const [help, setHelp] = useState(false);
  const [error, setError] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [ls, setLs] = useState("");
  const [echo, setEcho] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (command.startsWith("echo ")) {
      setEcho(command.slice(5));
    } else {
      switch(command) {
        case "help":
          setHelp(true);
          break;
        case "cat about.txt":
          setAboutMe(`Hello! I'm Tyler Mestery, a Computer Science undergraduate at Iowa State University with a strong focus on software engineering, AI systems, and backend development.
  I enjoy working close to the system level - performance, correctness, automation, and scalability - and I’m especially interested in how modern LLMs and AI tooling 
  integrate with real production systems.`);
          break;
        case "cat contact.txt":
          setAboutMe(`Email: tmest@iastate.edu
  Linkedin: linkedin.com/in/tmest
  Github: github.com/tmestery`);
          break;
        case "ls":
          setLs(`contact.txt  about.txt`);
          break;
        case "clear":
          setHelp(false)
          setError(false)
          setAboutMe(false)
          setLs(false)
          setEcho(false)
          break;
        case "resume":
          resumeCommand();
          break;
        case "github":
          githubCommand();
          break;
        case "linkedin":
          linkedinCommand();
          break;
        default:
          setError(`command not found: ${command}`);
          break;
      }
    }

    // Set it to blank after enter key
    setCommand("")
  }

  function handleChange(e) {
    setCommand(e.target.value);
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>guest@online-5173 %
          <input
            type="text"
            value={command}
            onChange={handleChange}
          />
        </label>
      </form>
      {help && commandsDiv}
      {error && <pre><p>{error}</p></pre>}
      {ls && <p>{ls}</p>}
      {aboutMe && <pre><p>{aboutMe}</p></pre>}
      {echo && <p>{echo}</p>}
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