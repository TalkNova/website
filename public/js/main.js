document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Live Chat Mockup Animation
  const chatContainer = document.getElementById('live-chat-container');
  const chatTitle = document.getElementById('chat-title');
  if (chatContainer) {
    const scenarios = [
      {
        title: "Customer Support",
        messages: [
          { sender: 'user', text: "Hi there! I have an issue with my recent order." },
          { sender: 'bot', text: "Hello! I'd be happy to help you with that. Can you please provide your order number?" },
          { sender: 'user', text: "Yes, it's ORDER-12345." },
          { sender: 'bot', text: "Thank you. Let me check the status of your order." },
          { sender: 'bot', text: "I see the delay. I've upgraded your shipping to overnight for free as an apology." },
          { sender: 'user', text: "Wow, that's amazing! Thank you so much!" }
        ]
      },
      {
        title: "Marketing Campaign",
        messages: [
          { sender: 'bot', text: "Hey Sarah! 👋 We noticed you left some items in your cart." },
          { sender: 'bot', text: "Complete your purchase in the next 2 hours and get 15% off with code SAVE15! 🛍️" },
          { sender: 'user', text: "Oh, thanks! Does the code work for the new sneakers?" },
          { sender: 'bot', text: "Yes it does! The 15% discount applies to everything in your cart." },
          { sender: 'user', text: "Awesome, checking out now. Thanks!" }
        ]
      },
      {
        title: "Feedback Survey",
        messages: [
          { sender: 'bot', text: "Hi Alex! How would you rate your recent experience with our service out of 5? ⭐" },
          { sender: 'user', text: "I'd give it a 5! The response time was incredibly fast." },
          { sender: 'bot', text: "We're thrilled to hear that! What did you like most about the experience?" },
          { sender: 'user', text: "The agent understood my problem immediately and fixed it in minutes." },
          { sender: 'bot', text: "Thank you for the wonderful feedback! Have a great day!" }
        ]
      }
    ];

    let currentScenarioIdx = 0;

    const renderTypingIndicator = () => {
      const div = document.createElement('div');
      div.id = 'typing-indicator';
      div.style.cssText = 'align-self: flex-end; position: relative; max-width: 80%; display: flex; justify-content: flex-end; margin-bottom: 0.5rem;';
      div.innerHTML = `
        <div class="typing-indicator-container" style="position: static; animation: chatFadeIn 0.3s ease forwards; opacity: 1;">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      chatContainer.appendChild(div);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      return div;
    };

    const renderMessage = (msg) => {
      const div = document.createElement('div');
      div.className = 'chat-message-added';
      if (msg.sender === 'user') {
        div.style.cssText = 'background: var(--bg-tertiary); padding: 1rem; border-radius: 15px; border-bottom-left-radius: 0; align-self: flex-start; max-width: 80%; opacity: 0; animation: chatFadeIn 0.4s ease forwards;';
      } else {
        div.style.cssText = 'background: var(--accent-primary); color: #fff; padding: 1rem; border-radius: 15px; border-bottom-right-radius: 0; align-self: flex-end; max-width: 80%; opacity: 0; animation: chatFadeIn 0.4s ease forwards;';
      }
      div.textContent = msg.text;
      chatContainer.appendChild(div);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const playChat = async () => {
      chatContainer.innerHTML = '';
      const currentScenario = scenarios[currentScenarioIdx];
      
      // Update Title
      if (chatTitle) {
        chatTitle.style.animation = 'none';
        chatTitle.offsetHeight; /* trigger reflow */
        chatTitle.textContent = currentScenario.title;
        chatTitle.style.animation = 'chatFadeIn 0.5s ease forwards';
      }
      
      for (const msg of currentScenario.messages) {
        if (msg.sender === 'bot') {
          const indicator = renderTypingIndicator();
          await new Promise(r => setTimeout(r, 1200));
          indicator.remove();
        } else {
          await new Promise(r => setTimeout(r, 600));
        }
        
        renderMessage(msg);
        await new Promise(r => setTimeout(r, 1500));
      }
      
      currentScenarioIdx = (currentScenarioIdx + 1) % scenarios.length;
      setTimeout(playChat, 5000);
    };

    setTimeout(playChat, 1000);
  }
});
