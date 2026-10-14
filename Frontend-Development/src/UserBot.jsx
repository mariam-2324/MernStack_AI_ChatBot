import { useState } from "react";
import axios from "axios";

const UserBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleMessage = async () => {
    setLoading(true);

    if (!input.trim()) return;

    const submittedInput = input;

    setLoading(true)
    setInput("")


    
   try {
      const response = await axios.post("http://localhost:3000/userRoute/userRout", {
        text: submittedInput,
        
      });

      if (response.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: response.data.userMessage, sender: "user" },
          { text: response.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);

    } finally {
      setLoading(false);
    }
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleMessage()

  }
// class={"box-border border-amber-600 bg-stone-700"}
  return (
    <div className="min-h-screen w-full bg-[#020812] text-white flex justify-center overflow-hidden">

  <div className="relative flex h-screen w-full max-w-7xl flex-col overflow-hidden border-x border-cyan-400/20 bg-[#030b14] shadow-[0_0_80px_rgba(0,220,255,0.08)]">

    {/* ================= HEADER ================= */}
    <header className="relative flex items-center justify-between border-b border-cyan-400/20 bg-[#06121d]/90 px-5 py-4 backdrop-blur-md">

      {/* Glow behind logo */}
      <div className="absolute left-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-2xl" />

      <div className="relative flex items-center gap-3">

        {/* AI LOGO */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/70 bg-rose-400/10 shadow-[0_0_18px_rgba(236,0,63,0.6)]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-orange-700"
            fill="currentColor"
          >
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
          </svg>
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-[0.27em] bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
            WebNexa
          </h1>
{/* bg-gradient-to-r from-violet-600 to-fuchsia-600 */}
          <p className="text-sm font-semibold tracking-[0.3em] text-rose-400">
            AI
          </p>

          <p className="mt-1 text-[7px] tracking-[0.25em] text-rose-400">
            ✦ WEB DEVELOPMENT INTELLIGENCE ONLINE ✦
          </p>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-900/20 bg-cyan-400/5 text-rose-500 transition duration-300 hover:border-orange-700/60 hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(236,0,63,0.6)]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M20 11a8 8 0 0 0-14.9-3M4 5v4h4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M4 13a8 8 0 0 0 14.9 3M20 19v-4h-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </header>


    {/* ================= CHAT AREA ================= */}
    <main className="relative flex-1 overflow-y-auto py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-pink-400/20">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-700/5 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-5">

        {messages.map((msg, index) => {

          const isUser = msg.sender === "user";

          return (
            <div
              key={index}
              className={`flex w-full items-start gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >

              {/* ================= AI LOGO ================= */}
              {!isUser && (
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-300/70 bg-rose-400/10 shadow-[0_0_18px_rgba(236,0,63,0.6)]">

                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-orange-700"
                    fill="currentColor"
                  >
                    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
                  </svg>

                </div>
              )}


              {/* ================= MESSAGE BOX ================= */}
              <div
                className={`max-w-[78%] rounded-2xl border px-4 py-3 backdrop-blur-md transition-all duration-300 ${
                  isUser
                    ? "border-violet-400/30 bg-violet-400/[0.07] shadow-[0_0_22px_rgba(139,92,246,0.12)] hover:border-violet-300/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.2)]"
                    : "border-cyan-400/25 bg-cyan-400/[0.045] shadow-[0_0_22px_rgba(34,211,238,0.10)] hover:border-cyan-300/40 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                }`}
              >

                {/* Message Heading */}
                <div
                  className={`mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isUser
                      ? "text-rose-400"
                      : "text-rose-500"
                  }`}
                >
                  {isUser ? "YOU" : "WebNexa AI"}
                </div>

                {/* Message */}
                <p className="whitespace-pre-wrap text-lg leading-6 text-slate-200">
                  {msg.text}
                </p>

              </div>


              {/* ================= HUMAN LOGO ================= */}
              {isUser && (
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-300/70 bg-rose-400/10 shadow-[0_0_18px_rgba(236,0,63,0.6)]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 text-orange-700"
                  >
                    {/* Head */}
                    <circle
                      cx="12"
                      cy="8"
                      r="3.2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    {/* Body */}
                    <path
                      d="M5.5 20c.7-3.5 3-5.3 6.5-5.3s5.8 1.8 6.5 5.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                  </svg>

                </div>
              )}

            </div>
          );
        })}

      </div>
    </main>


    {/* ================= INPUT AREA ================= */}
    <div className="relative border-t border-cyan-400/15 bg-[#030b14]/95 px-4 py-4 backdrop-blur-xl">

      {/* Input Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl items-center">

        {/* INPUT */}
        <input
          name="userMessage"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={pressEnter}
          disabled={loading}
          placeholder="Type your message..."
          className="h-14 w-full rounded-2xl border border-cyan-400/40 bg-[#071923] px-5 pr-32 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 shadow-[0_0_25px_rgba(236,0,63,0.6)] focus:border-cyan-300 focus:shadow-[0_0_25px_rgba(236,0,63,0.6)],inset_0_0_15px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
        />


        {/* SUBMIT BUTTON */}
        <button
          onClick={handleMessage}
          disabled={loading}
          type="button"
          className="absolute right-2 flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-gradient-to-r from-orange-900 to-pink-800 px-4 text-sm font-semibold tracking-wide text-white shadow-[0_0_18px_rgba(148,85,7,0.35)] transition-all duration-300 hover:scale-105 hover:from-rose-800 hover:to-orange-900 hover:shadow-[0_0_25px_rgba(236,0,63,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >

          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-25"
                />

                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              Sending...
            </>
          ) : (
            <>
              Submit

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M5 12h13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="m13 6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}

        </button>

      </div>

      {/* Bottom Status */}
      <p className="relative mt-2 text-center text-[8px] tracking-[0.2em] text-rose-400">
        WebNexa AI • WEB DEVELOPMENT INTELLIGENCE ONLINE
      </p>

    </div>

  </div>

</div>
  );
};

export default UserBot;


















{/* <div className="box-border min-h-screen px-4 py-0 bg-linear-to-r from-gray-700 to-sky-700 w-full flex items-center justify-center">
      <div className="">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <div className="relative flex-1 top-70 justify-center ml-60">
      <input
      name="userMessage"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={pressEnter}
        placeholder="Type your message"
        className="w-dvh rounded-2xl border border-slate-700 bg-slate-800 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button onClick={handleMessage} disabled={loading} className="absolute right-2 top-1/2 flex h-11 w-20 -translate-y-1/2 items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-900/30 transition hover:scale-105 hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 mr-30">
								<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
									<path
										d="M5 12h13"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"/>

                    <path
										d="m13 6 6 6-6 6"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
                      
        {loading ? "Sending..." : "Send"}
        
      </button>
      </div>
    </div> */}