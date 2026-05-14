'use client';

import { useEffect, useRef, useState } from 'react';

type ChatMsg = { sender: 'user' | 'bot'; text: string };

const scenarios: { title: string; messages: ChatMsg[] }[] = [
  {
    title: 'Customer Support',
    messages: [
      { sender: 'user', text: 'Hi there! I have an issue with my recent order.' },
      {
        sender: 'bot',
        text: "Hello! I'd be happy to help you with that. Can you please provide your order number?",
      },
      { sender: 'user', text: "Yes, it's ORDER-12345." },
      { sender: 'bot', text: 'Thank you. Let me check the status of your order.' },
      {
        sender: 'bot',
        text: "I see the delay. I've upgraded your shipping to overnight for free as an apology.",
      },
      { sender: 'user', text: "Wow, that's amazing! Thank you so much!" },
    ],
  },
  {
    title: 'Marketing Campaign',
    messages: [
      {
        sender: 'bot',
        text: 'Hey Sarah! 👋 We noticed you left some items in your cart.',
      },
      {
        sender: 'bot',
        text: 'Complete your purchase in the next 2 hours and get 15% off with code SAVE15! 🛍️',
      },
      { sender: 'user', text: 'Oh, thanks! Does the code work for the new sneakers?' },
      {
        sender: 'bot',
        text: 'Yes it does! The 15% discount applies to everything in your cart.',
      },
      { sender: 'user', text: 'Awesome, checking out now. Thanks!' },
    ],
  },
  {
    title: 'Feedback Survey',
    messages: [
      {
        sender: 'bot',
        text: 'Hi Alex! How would you rate your recent experience with our service out of 5? ⭐',
      },
      {
        sender: 'user',
        text: "I'd give it a 5! The response time was incredibly fast.",
      },
      {
        sender: 'bot',
        text: "We're thrilled to hear that! What did you like most about the experience?",
      },
      {
        sender: 'user',
        text: 'The agent understood my problem immediately and fixed it in minutes.',
      },
      {
        sender: 'bot',
        text: 'Thank you for the wonderful feedback! Have a great day!',
      },
    ],
  },
];

export function LiveChatMock() {
  const [title, setTitle] = useState(scenarios[0].title);
  const [lines, setLines] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [lines, typing]);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    const run = async () => {
      await delay(1000);
      let scenarioIdx = 0;

      while (!cancelled) {
        const scenario = scenarios[scenarioIdx];
        setTitle(scenario.title);
        setLines([]);

        for (const msg of scenario.messages) {
          if (cancelled) return;

          if (msg.sender === 'bot') {
            setTyping(true);
            await delay(1200);
            if (cancelled) return;
            setTyping(false);
          } else {
            await delay(600);
          }

          if (cancelled) return;
          setLines((prev) => [...prev, msg]);
          await delay(1500);
        }

        scenarioIdx = (scenarioIdx + 1) % scenarios.length;
        await delay(5000);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="glass-card floating"
      style={{ padding: '1rem', borderRadius: '30px' }}
    >
      <div
        style={{
          background: 'var(--bg-primary)',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            background: '#1e293b',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            borderBottom: '1px solid var(--glass-border)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <i className="fa-solid fa-robot" aria-hidden />
          </div>
          <div>
            <h4 id="chat-title" style={{ margin: 0, fontSize: '1rem' }}>
              {title}
            </h4>
            <small className="text-accent">Online</small>
          </div>
        </div>
        <div
          id="live-chat-container"
          className="chat-container-scroll"
          style={{
            padding: '2rem',
            height: '350px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            scrollBehavior: 'smooth',
          }}
        >
          {lines.map((msg, idx) => (
            <div
              key={`${idx}-${msg.text.slice(0, 12)}`}
              className="chat-message-added"
              style={
                msg.sender === 'user'
                  ? {
                      background: 'var(--bg-tertiary)',
                      padding: '1rem',
                      borderRadius: '15px',
                      borderBottomLeftRadius: 0,
                      alignSelf: 'flex-start',
                      maxWidth: '80%',
                      opacity: 0,
                      animation: 'chatFadeIn 0.4s ease forwards',
                    }
                  : {
                      background: 'var(--accent-primary)',
                      color: '#fff',
                      padding: '1rem',
                      borderRadius: '15px',
                      borderBottomRightRadius: 0,
                      alignSelf: 'flex-end',
                      maxWidth: '80%',
                      opacity: 0,
                      animation: 'chatFadeIn 0.4s ease forwards',
                    }
              }
            >
              {msg.text}
            </div>
          ))}
          {typing ? (
            <div
              id="typing-indicator"
              style={{
                alignSelf: 'flex-end',
                position: 'relative',
                maxWidth: '80%',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '0.5rem',
              }}
            >
              <div
                className="typing-indicator-container"
                style={{
                  position: 'static',
                  animation: 'chatFadeIn 0.3s ease forwards',
                  opacity: 1,
                }}
              >
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
