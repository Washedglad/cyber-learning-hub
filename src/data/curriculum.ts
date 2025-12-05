export interface Topic {
  title: string;
  description: string;
}

export interface Page {
  id: string;
  title: string;
  route: string;
  topics: Topic[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  description: string;
  pages: Page[];
  quiz: QuizQuestion[];
}

export interface ExternalResource {
  name: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  title: string;
  icon: string;
  resources: ExternalResource[];
}

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Foundational Principles',
    icon: '🛡️',
    description: 'Understanding the "Why" of cybersecurity',
    pages: [
      {
        id: 'page-1-1',
        title: 'Security Philosophy',
        route: '/module-1/security-philosophy',
        topics: [
          {
            title: 'The CIA Triad',
            description: 'Confidentiality ensures that sensitive information is accessible only to authorized individuals. Integrity guarantees that data remains accurate and unaltered. Availability ensures that systems and data are accessible when needed by authorized users.',
          },
          {
            title: 'Defense in Depth',
            description: 'A layered security approach that uses multiple defensive mechanisms. If one layer fails, others continue to provide protection. Think of it like a castle with walls, moats, guards, and a keep.',
          },
          {
            title: 'Risk Management',
            description: 'The process of identifying, assessing, and mitigating risks. Identify potential threats, assess their likelihood and impact, then implement controls to reduce risk to acceptable levels.',
          },
        ],
      },
      {
        id: 'page-1-2',
        title: 'User Security',
        route: '/module-1/user-security',
        topics: [
          {
            title: 'Strong Passwords & Passphrases',
            description: 'Use long, unique passwords for each account. Passphrases like "correct-horse-battery-staple" are easier to remember and harder to crack than complex short passwords. Use a password manager.',
          },
          {
            title: 'Multi-Factor Authentication (MFA)',
            description: 'Adds an extra layer of security beyond passwords. Combines something you know (password), something you have (phone/token), and/or something you are (biometrics).',
          },
          {
            title: 'Phishing Identification',
            description: 'Learn to recognize suspicious emails, links, and requests. Check sender addresses carefully, hover over links before clicking, and never provide sensitive info via email.',
          },
          {
            title: 'Patching & Updates',
            description: 'Keep all software updated. Security patches fix known vulnerabilities that attackers actively exploit. Enable automatic updates when possible.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What does the "C" in CIA Triad stand for?',
        options: ['Cybersecurity', 'Confidentiality', 'Compliance', 'Control'],
        correctIndex: 1,
      },
      {
        id: 'q1-2',
        question: 'What is Defense in Depth?',
        options: [
          'A single strong firewall',
          'Multiple layers of security controls',
          'Deep packet inspection',
          'Underground data centers',
        ],
        correctIndex: 1,
      },
      {
        id: 'q1-3',
        question: 'Which is the BEST password practice?',
        options: [
          'Using the same strong password everywhere',
          'Short complex passwords like "P@ss1!"',
          'Long unique passphrases for each account',
          'Writing passwords on sticky notes',
        ],
        correctIndex: 2,
      },
      {
        id: 'q1-4',
        question: 'What does MFA combine?',
        options: [
          'Multiple passwords',
          'Multiple firewalls',
          'Something you know, have, and/or are',
          'Multiple antivirus programs',
        ],
        correctIndex: 2,
      },
      {
        id: 'q1-5',
        question: 'Why are software updates important for security?',
        options: [
          'They add new features',
          'They fix known vulnerabilities',
          'They make software faster',
          'They reduce storage space',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Network & Systems',
    icon: '🌐',
    description: 'Understanding the infrastructure',
    pages: [
      {
        id: 'page-2-1',
        title: 'Networking Essentials',
        route: '/module-2/networking-essentials',
        topics: [
          {
            title: 'TCP/IP Fundamentals',
            description: 'TCP/IP is the foundation of internet communication. Data is broken into packets, addressed with IP addresses, and reliably delivered using TCP. Think of IP as the address on an envelope and TCP as the postal tracking system.',
          },
          {
            title: 'Common Ports',
            description: 'Ports are like apartment numbers for network services. Key ports: 22 (SSH - secure shell), 80 (HTTP - web), 443 (HTTPS - secure web), 3389 (RDP - remote desktop). Knowing ports helps identify services and potential attack vectors.',
          },
          {
            title: 'Firewalls',
            description: 'Firewalls filter network traffic based on rules. They can block unauthorized access while allowing legitimate traffic. Think of them as security guards checking IDs at a building entrance.',
          },
          {
            title: 'VPNs',
            description: 'Virtual Private Networks create encrypted tunnels for your internet traffic. They protect data on untrusted networks and can mask your IP address. Essential for remote work and public WiFi.',
          },
        ],
      },
      {
        id: 'page-2-2',
        title: 'Operating System Basics',
        route: '/module-2/os-basics',
        topics: [
          {
            title: 'Basic Linux Commands',
            description: 'Essential commands every security professional should know: ls (list files), cd (change directory), pwd (print working directory), man (manual pages), cat (view files), grep (search text).',
          },
          {
            title: 'File Permissions',
            description: 'Linux uses read (r), write (w), and execute (x) permissions for owner, group, and others. Understanding permissions is crucial for securing systems and identifying misconfigurations.',
          },
          {
            title: 'Virtualization',
            description: 'Virtual Machines (VMs) run complete operating systems within your host OS. Essential for safely testing malware, practicing attacks in labs, and isolating different environments.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What port does HTTPS typically use?',
        options: ['22', '80', '443', '3389'],
        correctIndex: 2,
      },
      {
        id: 'q2-2',
        question: 'What does a firewall do?',
        options: [
          'Encrypts all data',
          'Filters network traffic based on rules',
          'Removes viruses',
          'Speeds up internet connection',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2-3',
        question: 'What does the Linux command "pwd" do?',
        options: [
          'Change password',
          'Print working directory',
          'Power down',
          'Process watch daemon',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2-4',
        question: 'What is the main purpose of a VPN?',
        options: [
          'Speed up downloads',
          'Block advertisements',
          'Create encrypted tunnels for traffic',
          'Store passwords',
        ],
        correctIndex: 2,
      },
      {
        id: 'q2-5',
        question: 'Why are VMs useful in cybersecurity?',
        options: [
          'They are faster than physical machines',
          'They allow safe testing in isolated environments',
          'They automatically patch vulnerabilities',
          'They replace firewalls',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Common Attacks & Defenses',
    icon: '📝',
    description: 'Understanding the "What" of threats',
    pages: [
      {
        id: 'page-3-1',
        title: 'Web Application Attacks',
        route: '/module-3/web-attacks',
        topics: [
          {
            title: 'SQL Injection (SQLi)',
            description: 'Attackers insert malicious SQL code into input fields to manipulate databases. Can lead to data theft, authentication bypass, or database destruction. Prevented by parameterized queries and input validation.',
          },
          {
            title: 'Cross-Site Scripting (XSS)',
            description: 'Attackers inject malicious scripts into web pages viewed by other users. Can steal session cookies, redirect users, or deface websites. Prevented by output encoding and Content Security Policy.',
          },
          {
            title: 'Broken Authentication',
            description: 'Weaknesses in authentication mechanisms allow attackers to compromise passwords, keys, or session tokens. MFA significantly reduces this risk by requiring multiple factors to authenticate.',
          },
          {
            title: 'OWASP Top 10',
            description: 'The Open Web Application Security Project maintains a list of the 10 most critical web application security risks. Understanding these helps prioritize security efforts.',
          },
        ],
      },
      {
        id: 'page-3-2',
        title: 'Malware & Social Engineering',
        route: '/module-3/malware-social',
        topics: [
          {
            title: 'Viruses',
            description: 'Malicious code that attaches to legitimate programs and spreads when executed. Requires user action to spread. Named after biological viruses due to similar behavior.',
          },
          {
            title: 'Ransomware',
            description: 'Encrypts victim files and demands payment for decryption keys. Major threat to businesses and individuals. Prevention: regular backups, email filtering, and user training.',
          },
          {
            title: 'Worms',
            description: 'Self-replicating malware that spreads automatically across networks without user interaction. Can cause massive network congestion and system damage.',
          },
          {
            title: 'Social Engineering Psychology',
            description: 'Attackers exploit human psychology: authority (pretending to be IT), urgency (act now!), trust (I\'m from your bank), and fear (your account is compromised). Always verify before acting.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'What is SQL Injection?',
        options: [
          'A database backup method',
          'Inserting malicious SQL code into inputs',
          'A type of firewall',
          'A programming language',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3-2',
        question: 'What can XSS attacks steal?',
        options: [
          'Physical hardware',
          'Session cookies',
          'Network cables',
          'CPU power',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3-3',
        question: 'What makes ransomware particularly dangerous?',
        options: [
          'It slows down your computer',
          'It encrypts files and demands payment',
          'It changes your wallpaper',
          'It sends spam emails',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3-4',
        question: 'How do worms differ from viruses?',
        options: [
          'Worms are larger files',
          'Worms spread automatically without user action',
          'Worms only affect Linux',
          'Worms are harmless',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3-5',
        question: 'Which is a social engineering tactic?',
        options: [
          'Installing antivirus',
          'Creating urgency to bypass critical thinking',
          'Using strong passwords',
          'Enabling MFA',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Cryptography & Data Protection',
    icon: '🔑',
    description: 'Understanding the "How" of protection',
    pages: [
      {
        id: 'page-4-1',
        title: 'Encryption Concepts',
        route: '/module-4/encryption-concepts',
        topics: [
          {
            title: 'Symmetric Encryption',
            description: 'Uses the same key for encryption and decryption. Fast and efficient for large data. Challenge: securely sharing the key. Example: AES (Advanced Encryption Standard).',
          },
          {
            title: 'Asymmetric Encryption',
            description: 'Uses a public key to encrypt and a private key to decrypt. Solves key distribution problem. Slower than symmetric. Example: RSA. Used in HTTPS, email encryption.',
          },
          {
            title: 'Hashing',
            description: 'One-way function that converts data into a fixed-length string. Cannot be reversed. Used for password storage and data integrity verification. Examples: SHA-256, bcrypt.',
          },
        ],
      },
      {
        id: 'page-4-2',
        title: 'Data In Transit & At Rest',
        route: '/module-4/data-protection',
        topics: [
          {
            title: 'HTTPS/TLS',
            description: 'HTTPS uses TLS (Transport Layer Security) to encrypt web traffic. The padlock icon indicates a secure connection. Protects data as it travels across networks.',
          },
          {
            title: 'Data in Transit',
            description: 'Data moving across networks is vulnerable to interception. Always use encrypted protocols: HTTPS, SFTP, SSH. Avoid transmitting sensitive data over unencrypted channels.',
          },
          {
            title: 'Data at Rest',
            description: 'Data stored on devices. Disk encryption (BitLocker, FileVault) protects data if devices are lost or stolen. Essential for laptops and mobile devices.',
          },
          {
            title: 'End-to-End Encryption',
            description: 'Data encrypted on sender\'s device, only decrypted on recipient\'s device. Service providers cannot read the content. Used by Signal, WhatsApp for messages.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the main difference between symmetric and asymmetric encryption?',
        options: [
          'Symmetric is more secure',
          'Symmetric uses one key, asymmetric uses two',
          'Asymmetric is faster',
          'They are identical',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4-2',
        question: 'What is hashing used for?',
        options: [
          'Two-way encryption',
          'Password storage and data integrity',
          'Network routing',
          'File compression',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4-3',
        question: 'What does the padlock icon in your browser indicate?',
        options: [
          'The website is trustworthy',
          'The connection uses HTTPS/TLS',
          'Your password is strong',
          'Ads are blocked',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4-4',
        question: 'What protects data on a stolen laptop?',
        options: [
          'Firewall',
          'Antivirus',
          'Disk encryption',
          'VPN',
        ],
        correctIndex: 2,
      },
      {
        id: 'q4-5',
        question: 'In end-to-end encryption, who can read the messages?',
        options: [
          'Anyone on the network',
          'The service provider',
          'Only sender and recipient',
          'Government agencies',
        ],
        correctIndex: 2,
      },
    ],
  },
];

export const skillForgeResources: ResourceCategory[] = [
  {
    title: 'Hands-on Practice (CTFs/Labs)',
    icon: '🎯',
    resources: [
      {
        name: 'TryHackMe',
        url: 'https://tryhackme.com',
        description: 'Guided, gamified cybersecurity training with hands-on virtual labs for all skill levels.',
      },
      {
        name: 'Hack The Box',
        url: 'https://www.hackthebox.com',
        description: 'Practice penetration testing skills on realistic vulnerable machines and challenges.',
      },
      {
        name: 'PicoCTF',
        url: 'https://picoctf.org',
        description: 'Free beginner-friendly capture-the-flag competition designed for students.',
      },
    ],
  },
  {
    title: 'Fundamental Learning (Courses/Docs)',
    icon: '📚',
    resources: [
      {
        name: 'Cisco Networking Academy',
        url: 'https://www.netacad.com',
        description: 'Industry-recognized networking courses from basic to advanced certification prep.',
      },
      {
        name: 'CompTIA Security+',
        url: 'https://www.comptia.org/certifications/security',
        description: 'Vendor-neutral security certification covering essential cybersecurity concepts.',
      },
      {
        name: 'Google Cybersecurity Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        description: 'Entry-level professional certificate covering security fundamentals and tools.',
      },
      {
        name: 'Linux Journey',
        url: 'https://linuxjourney.com',
        description: 'Free, beginner-friendly guide to learning Linux from the ground up.',
      },
    ],
  },
  {
    title: 'Key Tools',
    icon: '🔧',
    resources: [
      {
        name: 'Nmap',
        url: 'https://nmap.org/book/man.html',
        description: 'The essential network scanner for discovery and security auditing.',
      },
      {
        name: 'Wireshark',
        url: 'https://www.wireshark.org/docs/',
        description: 'Network protocol analyzer for capturing and inspecting network traffic.',
      },
    ],
  },
];

