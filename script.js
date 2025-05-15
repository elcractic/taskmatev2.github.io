document.addEventListener('DOMContentLoaded', function() {
    // Cursor trail effect
    const cursor = document.querySelector('.cursor-trail');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Create small trailing dots
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const dot = document.createElement('div');
                dot.classList.add('cursor-trail');
                dot.style.width = (15 - i*5) + 'px';
                dot.style.height = (15 - i*5) + 'px';
                dot.style.opacity = 0.5 - (i*0.15);
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
                document.body.appendChild(dot);
                
                // Remove after animation
                setTimeout(() => {
                    dot.remove();
                }, 300);
            }, i * 50);
        }
    });
    
    // Tab switching for solutions section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    function setActiveTab(button) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Move indicator
        const buttonRect = button.getBoundingClientRect();
        const tabsRect = button.parentElement.getBoundingClientRect();
        tabIndicator.style.left = (buttonRect.left - tabsRect.left) + 'px';
        tabIndicator.style.width = buttonRect.width + 'px';
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => setActiveTab(button));
    });
    
    // Initialize first tab as active
    if (tabButtons.length > 0) {
        setActiveTab(tabButtons[0]);
    }
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Terminal animation
    const terminalContent = document.querySelector('.terminal-content');
    const commands = [
        {
            command: "optimize schedule",
            output: "> Analyzing calendar...<br>> Found 12 meetings this week<br>> Suggested consolidations: 4 meetings can be combined<br>> Estimated time saved: 3.5 hours"
        },
        {
            command: "automate tasks",
            output: "> Scanning recent activity...<br>> Found 8 repetitive tasks<br>> Created automation for: email sorting, file organization<br>> Estimated weekly savings: 2 hours"
        },
        {
            command: "generate report",
            output: "> Compiling productivity data...<br>> Last week's efficiency: 82%<br>> Focus time: 18 hours<br>> Distractions: 23 (avg. 3.3/day)<br>> Report saved to /reports/weekly.pdf"
        }
    ];
    
    let commandIndex = 0;
    
    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback();
            }
        }
        typing();
    }
    
    function animateTerminal() {
        if (commandIndex < commands.length) {
            const cmd = commands[commandIndex];
            const commandLine = document.createElement('div');
            commandLine.classList.add('command-line');
            commandLine.innerHTML = `<span class="prompt">user@taskmate:~$</span><span class="command"></span>`;
            terminalContent.appendChild(commandLine);
            
            const commandElement = commandLine.querySelector('.command');
            
            typeWriter(cmd.command, commandElement, 50, function() {
                const outputElement = document.createElement('div');
                outputElement.classList.add('command-output');
                terminalContent.appendChild(outputElement);
                
                typeWriter(cmd.output, outputElement, 10, function() {
                    const newCommandLine = document.createElement('div');
                    newCommandLine.classList.add('command-line');
                    newCommandLine.innerHTML = `<span class="prompt">user@taskmate:~$</span><span class="command"></span><span class="blinking-cursor"></span>`;
                    terminalContent.appendChild(newCommandLine);
                    
                    commandIndex++;
                    if (commandIndex < commands.length) {
                        setTimeout(animateTerminal, 1500);
                    }
                });
            });
        } else {
            // Loop animation
            commandIndex = 0;
            setTimeout(() => {
                terminalContent.scrollTop = terminalContent.scrollHeight;
                animateTerminal();
            }, 5000);
        }
    }
    
    // Start terminal animation after a delay
    setTimeout(animateTerminal, 3000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
