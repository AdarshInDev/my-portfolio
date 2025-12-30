import { useEffect, useRef, useState } from "react";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        {
            type: "system",
            text: "System initialized. Welcome to AdarshOS v2.0. Type 'help' to begin.",
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
          ./skills      - List technical capabilities
          ./contact     - Show transmission frequencies
          ./status      - Current operational status
          ./clear       - Clear terminal display
          help          - Show this message`,
            }),
        },
        "./skills": {
            description: "Display technical skills",
            execute: () => ({
                type: "code",
                text: `const capabilities = {
  frontend: ["React", "Next.js", "Flutter", "Tailwind"],
  backend: ["Node.js", "Python", "MongoDB", "Firebase"],
  architecture: ["Microservices", "System Design", "Cloud Native"]
};`,
            }),
        },
        "./contact": {
            description: "Show contact information",
            execute: () => ({
                type: "info",
                text: `📧 Email: hello@adarshdev.com
🔗 LinkedIn: linkedin.com/in/adarsh-pradhan
🐦 Twitter: @adarshindev
📡 Signal: Open for opportunities`,
            }),
        },
        "./status": {
            description: "Current status",
            execute: () => ({
                type: "success",
                text: `SYSTEM STATUS: NOMINAL
Current Objective: Building the Future
Coffee Level: 85%
Sleep Cycle: Optimized`,
            }),
        },
        "./clear": {
            description: "Clear terminal",
            execute: () => {
                setOutput([]);
                return null;
            },
        }
    };

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        // Allow running without ./ if it exists with ./
        const commandKey = commands[trimmedCmd] ? trimmedCmd : `./${trimmedCmd}`;
        const command = commands[commandKey];

        if (command) {
            const result = command.execute();
            if (result) {
                setOutput((prev) => [...prev, { type: "command", text: `root@adarsh:~$ ${cmd}` }, result]);
            }
        } else {
            setOutput((prev) => [
                ...prev,
                { type: "command", text: `root@adarsh:~$ ${cmd}` },
                { type: "error", text: `Error: Command '${cmd}' not recognized. Try 'help'.` },
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "Tab") {
            e.preventDefault(); // Prevent focus switch

            const currentInput = input.trim().toLowerCase();
            if (!currentInput) return;

            // Find potential matches
            const availableCmds = Object.keys(commands);

            // Check 1: Exact match without ./ (e.g. user typed 'skills')
            const completionWithDot = `./${currentInput}`;
            if (availableCmds.includes(completionWithDot)) {
                setInput(completionWithDot);
                return;
            }

            // Check 2: Partial match (e.g. user typed './sk' or 'sk')
            const matches = availableCmds.filter(cmd =>
                cmd.startsWith(currentInput) || cmd.startsWith(`./${currentInput}`)
            );

            if (matches.length === 1) {
                setInput(matches[0]);
            }
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-white/10 bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.1)] font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-white/5 p-2 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2 ml-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-500 text-xs">root@adarsh:~</span>
                <div className="w-10" />
            </div>

            {/* Terminal Body */}
            <div
                ref={terminalRef}
                className="p-4 h-[400px] overflow-y-auto custom-scrollbar"
                onClick={() => inputRef.current?.focus()}
            >
                {output.map((line, i) => (
                    <div
                        key={i}
                        className={`mb-2 font-mono ${line.type === "error" ? "text-red-400" :
                                line.type === "success" ? "text-green-400" :
                                    line.type === "info" ? "text-cyan-200" :
                                        line.type === "code" ? "text-yellow-200" :
                                            line.type === "command" ? "text-gray-400 mt-4" :
                                                "text-cyan-400"
                            }`}
                    >
                        <pre className="whitespace-pre-wrap font-inherit">{line.text}</pre>
                    </div>
                ))}

                <div className="flex items-center mt-2">
                    <span className="text-green-400 mr-2">root@adarsh:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent flex-1 outline-none text-white caret-cyan-400"
                        spellCheck="false"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
