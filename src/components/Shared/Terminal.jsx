import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    {
      type: "system",
      text: "Welcome to AdarshInDev Terminal! Type 'help' for available commands.",
    },
  ]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: "Show available commands",
      execute: () => ({
        type: "system",
        text: `Available commands:
          ./show-skills - Display my technical skills
          ./contact-info - Show my contact information
          ./fun-facts - Random facts about me
          clear - Clear terminal
          help - Show this help message`,
      }),
    },
    "./show-skills": {
      description: "Display technical skills",
      execute: () => ({
        type: "code",
        text: `const skills = {
  frontend: ["React", "Next.js", "Flutter", "Tailwind"],
  backend: ["Node.js", "Python", "MongoDB", "Firebase"],
  tools: ["Git", "Docker", "Kubernetes", "AWS"],
  languages: ["JavaScript", "TypeScript", "Dart", "Python"]
};`,
      }),
    },
    "./contact-info": {
      description: "Show contact information",
      execute: () => ({
        type: "info",
        text: `📧 Email: your.email@example.com
🔗 LinkedIn: linkedin.com/in/yourprofile
🐦 Twitter: @yourhandle
🌐 Website: yourwebsite.com`,
      }),
    },
    "./fun-facts": {
      description: "Random facts about me",
      execute: () => ({
        type: "success",
        text: [
          "🎮 I love playing video games",
          "🌱 I contribute to open source",
          "🎸 I play guitar in my free time",
          "✈️ I love traveling and exploring new places",
        ][Math.floor(Math.random() * 4)],
      }),
    },
    clear: {
      description: "Clear terminal",
      execute: () => {
        setOutput([]);
        return null;
      },
    },
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const command = commands[trimmedCmd];

    if (command) {
      const result = command.execute();
      if (result) {
        setOutput((prev) => [...prev, { type: "command", text: `$ ${cmd}` }, result]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        { type: "command", text: `$ ${cmd}` },
        { type: "error", text: `Command not found: ${cmd}` },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto p-4"
    >
      <div className="bg-lightNavy rounded-lg overflow-hidden">
        <div className="bg-darkNavy p-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-textSecondary ml-2 text-sm font-mono">~/adarsh-terminal</span>
        </div>
        <div
          ref={terminalRef}
          className="p-4 h-[400px] overflow-y-auto font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {output.map((line, i) => (
            <div
              key={i}
              className={`mb-2 ${
                line.type === "error" ? "text-red-400" :
                line.type === "success" ? "text-green-400" :
                line.type === "info" ? "text-blue-400" :
                line.type === "code" ? "text-yellow-400" :
                "text-textPrimary"
              }`}
            >
              <pre className="whitespace-pre-wrap">{line.text}</pre>
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-secondary mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent flex-1 outline-none text-textPrimary"
              spellCheck="false"
              autoFocus
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;