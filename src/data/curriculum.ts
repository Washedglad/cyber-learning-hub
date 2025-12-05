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
  {
    id: 'module-5',
    title: 'Incident Response Lab',
    icon: '🚨',
    description: 'Triage, contain, and recover from security incidents',
    pages: [
      {
        id: 'page-5-1',
        title: 'Incident Triage',
        route: '/module-5/incident-triage',
        topics: [
          {
            title: 'What is Incident Response?',
            description: 'A structured approach to handling security breaches or attacks. The goal is to minimize damage, reduce recovery time, and mitigate future risks. Every organization needs an IR plan.',
          },
          {
            title: 'Detection & Identification',
            description: 'The first step is recognizing that an incident has occurred. Sources include SIEM alerts, IDS/IPS notifications, user reports, and anomaly detection. False positives must be filtered out.',
          },
          {
            title: 'Severity Classification',
            description: 'Not all incidents are equal. Critical: active data breach. High: malware on production systems. Medium: phishing attempt. Low: policy violation. Classification drives response priority.',
          },
          {
            title: 'Initial Assessment Checklist',
            description: 'What systems are affected? What data is at risk? Is the attack ongoing? Who needs to be notified? Document everything from the start—timestamps, actions taken, and evidence.',
          },
        ],
      },
      {
        id: 'page-5-2',
        title: 'Containment Strategies',
        route: '/module-5/containment',
        topics: [
          {
            title: 'Short-term Containment',
            description: 'Immediate actions to stop the bleeding: isolate affected systems, block malicious IPs, disable compromised accounts. Goal: prevent further damage while preserving evidence.',
          },
          {
            title: 'Long-term Containment',
            description: 'Temporary fixes that allow business to continue while you prepare for full remediation. May include rebuilding systems on clean networks or implementing additional monitoring.',
          },
          {
            title: 'Evidence Preservation',
            description: 'Never modify potential evidence! Create forensic images of affected systems. Maintain chain of custody documentation. This may be needed for legal proceedings or insurance claims.',
          },
          {
            title: 'Communication Protocols',
            description: 'Who needs to know? Internal: management, legal, PR. External: customers, regulators, law enforcement. Have pre-drafted templates ready. Timing and transparency matter.',
          },
        ],
      },
      {
        id: 'page-5-3',
        title: 'Recovery & Lessons Learned',
        route: '/module-5/recovery',
        topics: [
          {
            title: 'Eradication',
            description: 'Remove the threat completely: delete malware, close vulnerabilities, reset credentials. Verify clean before restoration. Attackers often leave backdoors—find them all.',
          },
          {
            title: 'System Restoration',
            description: 'Rebuild from known-good backups or clean installs. Prioritize critical business systems. Implement additional security controls before bringing systems back online.',
          },
          {
            title: 'Post-Incident Review',
            description: 'Blameless retrospective: What happened? How did we detect it? What worked? What failed? Document timeline and root cause. This is how organizations improve.',
          },
          {
            title: 'Updating Playbooks',
            description: 'Turn lessons into action: update detection rules, improve procedures, conduct training. The best incident response teams continuously evolve based on experience.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the primary goal of incident response?',
        options: [
          'Punish the attacker',
          'Minimize damage and reduce recovery time',
          'Delete all affected files',
          'Shut down all systems',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5-2',
        question: 'Which severity level would an active data breach receive?',
        options: ['Low', 'Medium', 'High', 'Critical'],
        correctIndex: 3,
      },
      {
        id: 'q5-3',
        question: 'Why is evidence preservation important during containment?',
        options: [
          'To save storage space',
          'For legal proceedings and root cause analysis',
          'To speed up recovery',
          'To train new employees',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5-4',
        question: 'What should you do before restoring systems after an incident?',
        options: [
          'Immediately restore from the most recent backup',
          'Verify the threat is completely eradicated',
          'Notify all customers first',
          'Delete all logs',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5-5',
        question: 'What is a post-incident review?',
        options: [
          'A punishment meeting',
          'A blameless analysis of what happened and how to improve',
          'A celebration of successful response',
          'A technical audit by external vendors',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-6',
    title: 'Cloud & DevSecOps',
    icon: '☁️',
    description: 'Securing modern cloud infrastructure and CI/CD pipelines',
    pages: [
      {
        id: 'page-6-1',
        title: 'Cloud Security Fundamentals',
        route: '/module-6/cloud-fundamentals',
        topics: [
          {
            title: 'Shared Responsibility Model',
            description: 'Cloud providers secure the infrastructure; you secure your data and configurations. AWS/Azure/GCP handle physical security, but misconfigurations are your responsibility.',
          },
          {
            title: 'Cloud Service Models',
            description: 'IaaS (Infrastructure): you manage OS, apps, data. PaaS (Platform): you manage apps and data. SaaS (Software): provider manages everything. Security responsibilities shift accordingly.',
          },
          {
            title: 'Common Misconfigurations',
            description: 'Public S3 buckets, open security groups, default credentials, excessive permissions. These cause most cloud breaches. Use cloud security posture management (CSPM) tools.',
          },
          {
            title: 'Multi-Cloud Considerations',
            description: 'Many organizations use multiple cloud providers. Each has different security controls and terminology. Standardize policies across environments where possible.',
          },
        ],
      },
      {
        id: 'page-6-2',
        title: 'IAM & Access Control',
        route: '/module-6/iam-access',
        topics: [
          {
            title: 'Identity and Access Management',
            description: 'IAM controls who can access what resources. Core concepts: users, groups, roles, and policies. Follow principle of least privilege—grant only necessary permissions.',
          },
          {
            title: 'Role-Based Access Control (RBAC)',
            description: 'Assign permissions to roles, then assign roles to users. Easier to manage than individual permissions. Examples: Admin, Developer, ReadOnly, Auditor roles.',
          },
          {
            title: 'Service Accounts & Keys',
            description: 'Applications need credentials too. Use service accounts with minimal permissions. Rotate keys regularly. Never commit credentials to source code!',
          },
          {
            title: 'Just-in-Time Access',
            description: 'Grant elevated permissions only when needed, for limited time. Reduces standing privilege risk. Tools like AWS IAM Identity Center support this pattern.',
          },
        ],
      },
      {
        id: 'page-6-3',
        title: 'CI/CD Pipeline Security',
        route: '/module-6/cicd-security',
        topics: [
          {
            title: 'What is DevSecOps?',
            description: 'Integrating security into every stage of the development lifecycle. Shift left: find and fix vulnerabilities early, when they are cheaper to address. Security is everyone\'s job.',
          },
          {
            title: 'Pipeline Security Controls',
            description: 'SAST: scan source code for vulnerabilities. DAST: test running applications. SCA: check dependencies for known CVEs. Secret scanning: detect hardcoded credentials.',
          },
          {
            title: 'Container Security',
            description: 'Scan container images for vulnerabilities. Use minimal base images. Don\'t run as root. Keep images updated. Sign and verify images in production.',
          },
          {
            title: 'Infrastructure as Code Security',
            description: 'Terraform, CloudFormation, Pulumi define infrastructure. Scan IaC templates for misconfigurations before deployment. Tools: Checkov, tfsec, cfn-lint.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'In the Shared Responsibility Model, who is responsible for data encryption?',
        options: [
          'Only the cloud provider',
          'Only the customer',
          'The customer, though providers offer tools',
          'Neither—encryption is automatic',
        ],
        correctIndex: 2,
      },
      {
        id: 'q6-2',
        question: 'What is the principle of least privilege?',
        options: [
          'Give everyone admin access',
          'Grant only the permissions necessary for a task',
          'Remove all permissions by default',
          'Use the same password everywhere',
        ],
        correctIndex: 1,
      },
      {
        id: 'q6-3',
        question: 'What does SAST scan for in a CI/CD pipeline?',
        options: [
          'Network vulnerabilities',
          'Source code vulnerabilities',
          'Social engineering risks',
          'Physical security issues',
        ],
        correctIndex: 1,
      },
      {
        id: 'q6-4',
        question: 'Why should you never commit credentials to source code?',
        options: [
          'It makes the code run slower',
          'Attackers can find them in version history',
          'It uses too much storage',
          'Credentials don\'t work in code',
        ],
        correctIndex: 1,
      },
      {
        id: 'q6-5',
        question: 'What is "shift left" in DevSecOps?',
        options: [
          'Moving servers to a different data center',
          'Finding security issues earlier in development',
          'Using left-handed keyboards',
          'Deploying to production faster',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-7',
    title: 'Threat Hunting & Blue Team',
    icon: '🔍',
    description: 'Proactive defense and security operations',
    pages: [
      {
        id: 'page-7-1',
        title: 'Security Operations Center',
        route: '/module-7/soc-fundamentals',
        topics: [
          {
            title: 'What is a SOC?',
            description: 'A Security Operations Center is the nerve center for monitoring and defending an organization. Analysts monitor alerts 24/7, investigate incidents, and coordinate response.',
          },
          {
            title: 'SOC Analyst Tiers',
            description: 'Tier 1: Alert triage and initial investigation. Tier 2: Deeper analysis and incident handling. Tier 3: Advanced threat hunting and tool development. Career progression path.',
          },
          {
            title: 'SIEM Fundamentals',
            description: 'Security Information and Event Management systems aggregate logs from across the environment. Correlation rules detect suspicious patterns. Examples: Splunk, Elastic, Microsoft Sentinel.',
          },
          {
            title: 'Alert Fatigue',
            description: 'Too many false positives cause analysts to miss real threats. Tune detection rules, use risk-based alerting, and automate repetitive tasks (SOAR) to combat fatigue.',
          },
        ],
      },
      {
        id: 'page-7-2',
        title: 'Log Analysis & IOCs',
        route: '/module-7/log-analysis',
        topics: [
          {
            title: 'Critical Log Sources',
            description: 'Authentication logs, firewall logs, DNS queries, endpoint detection, email gateway, web proxy. Each tells part of the story. Correlate across sources for full picture.',
          },
          {
            title: 'Indicators of Compromise (IOCs)',
            description: 'Evidence that a breach may have occurred: malicious IP addresses, file hashes, domain names, registry keys, unusual network traffic patterns. Share IOCs to help others defend.',
          },
          {
            title: 'Common Attack Patterns',
            description: 'Failed logins followed by success (credential stuffing). Unusual outbound traffic (data exfiltration). New scheduled tasks (persistence). PowerShell execution (living off the land).',
          },
          {
            title: 'MITRE ATT&CK Framework',
            description: 'A knowledge base of adversary tactics and techniques. Use it to understand attack patterns, map detections, and identify gaps in coverage. Essential blue team resource.',
          },
        ],
      },
      {
        id: 'page-7-3',
        title: 'Threat Hunting Techniques',
        route: '/module-7/threat-hunting',
        topics: [
          {
            title: 'Hypothesis-Driven Hunting',
            description: 'Start with a theory: "Attackers may be using PowerShell for lateral movement." Then search for evidence. Better than waiting for alerts—find threats before they trigger rules.',
          },
          {
            title: 'Baseline Analysis',
            description: 'Know what normal looks like to spot abnormal. Establish baselines for user behavior, network traffic, process execution. Anomalies deserve investigation.',
          },
          {
            title: 'Hunting Playbooks',
            description: 'Documented procedures for common hunts: unauthorized admin accounts, beaconing traffic, suspicious scheduled tasks. Repeatable, measurable, improvable.',
          },
          {
            title: 'Threat Intelligence Integration',
            description: 'Use external intelligence (APT reports, threat feeds) to guide hunting. If a new attack technique is published, hunt for it in your environment proactively.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'What is the primary function of a SOC?',
        options: [
          'Software development',
          'Monitoring and defending against threats',
          'Marketing',
          'Hardware repair',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7-2',
        question: 'What are Indicators of Compromise (IOCs)?',
        options: [
          'Security certifications',
          'Evidence that a breach may have occurred',
          'Firewall rules',
          'Password policies',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7-3',
        question: 'What is alert fatigue?',
        options: [
          'Physical tiredness from work',
          'Missing real threats due to too many false positives',
          'Computer slowdown from alerts',
          'Running out of storage for logs',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7-4',
        question: 'What is hypothesis-driven threat hunting?',
        options: [
          'Waiting for alerts to investigate',
          'Starting with a theory and searching for evidence',
          'Guessing passwords',
          'Reading news articles',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7-5',
        question: 'What is the MITRE ATT&CK framework used for?',
        options: [
          'Attacking other organizations',
          'Understanding adversary tactics and mapping defenses',
          'Writing software',
          'Physical security',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'module-8',
    title: 'Privacy & Compliance',
    icon: '📋',
    description: 'Data protection regulations and privacy principles',
    pages: [
      {
        id: 'page-8-1',
        title: 'Privacy Fundamentals',
        route: '/module-8/privacy-fundamentals',
        topics: [
          {
            title: 'Privacy vs Security',
            description: 'Security protects data from unauthorized access. Privacy ensures data is collected, used, and shared appropriately. You can have security without privacy, but not privacy without security.',
          },
          {
            title: 'Personal Data Types',
            description: 'PII (Personally Identifiable Information): name, SSN, address. PHI (Protected Health Information): medical records. Financial data, biometrics, location data. Different regulations apply.',
          },
          {
            title: 'Privacy Principles',
            description: 'Data minimization: collect only what you need. Purpose limitation: use data only for stated purposes. Retention limits: delete when no longer needed. Transparency: tell users what you do.',
          },
          {
            title: 'Data Subject Rights',
            description: 'Individuals have rights over their data: access (see what you have), rectification (fix errors), erasure (right to be forgotten), portability (take data elsewhere), objection (stop processing).',
          },
        ],
      },
      {
        id: 'page-8-2',
        title: 'Key Regulations',
        route: '/module-8/regulations',
        topics: [
          {
            title: 'GDPR Overview',
            description: 'EU General Data Protection Regulation. Applies to anyone handling EU resident data. Requires consent, enables data subject rights, mandates breach notification. Fines up to 4% of global revenue.',
          },
          {
            title: 'HIPAA Basics',
            description: 'US Health Insurance Portability and Accountability Act. Protects patient health information. Requires administrative, physical, and technical safeguards. Applies to healthcare providers and associates.',
          },
          {
            title: 'PCI DSS',
            description: 'Payment Card Industry Data Security Standard. Protects credit card data. 12 requirements covering network security, access control, monitoring. Required for anyone processing card payments.',
          },
          {
            title: 'CCPA/CPRA',
            description: 'California Consumer Privacy Act / California Privacy Rights Act. US state-level privacy law. Right to know, delete, and opt-out of sale of personal information. Other states following suit.',
          },
        ],
      },
      {
        id: 'page-8-3',
        title: 'Privacy by Design',
        route: '/module-8/privacy-by-design',
        topics: [
          {
            title: 'Privacy by Design Principles',
            description: 'Build privacy into systems from the start, not as an afterthought. Seven principles: proactive, default, embedded, positive-sum, end-to-end security, visibility, and respect for users.',
          },
          {
            title: 'Data Classification',
            description: 'Categorize data by sensitivity: Public, Internal, Confidential, Restricted. Apply appropriate controls to each level. Classification drives access controls, encryption, and retention policies.',
          },
          {
            title: 'Privacy Impact Assessments',
            description: 'Evaluate new projects for privacy risks before launch. Identify what data is collected, why, how it\'s protected, and who has access. Required by GDPR for high-risk processing.',
          },
          {
            title: 'Vendor Management',
            description: 'Third parties with access to your data extend your risk. Due diligence: assess their security and privacy practices. Contracts: require compliance with your policies. Monitor: ongoing oversight.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the relationship between privacy and security?',
        options: [
          'They are the same thing',
          'You can have privacy without security',
          'You can have security without privacy, but not vice versa',
          'They are unrelated',
        ],
        correctIndex: 2,
      },
      {
        id: 'q8-2',
        question: 'What does GDPR stand for?',
        options: [
          'Global Data Privacy Rules',
          'General Data Protection Regulation',
          'Government Data Processing Requirements',
          'Generic Data Privacy Regulation',
        ],
        correctIndex: 1,
      },
      {
        id: 'q8-3',
        question: 'What is data minimization?',
        options: [
          'Compressing data to save storage',
          'Collecting only the data you actually need',
          'Deleting all data immediately',
          'Encrypting data',
        ],
        correctIndex: 1,
      },
      {
        id: 'q8-4',
        question: 'What is the "right to be forgotten"?',
        options: [
          'Forgetting your password',
          'The right to have your data erased',
          'Anonymous browsing',
          'Data encryption',
        ],
        correctIndex: 1,
      },
      {
        id: 'q8-5',
        question: 'What is Privacy by Design?',
        options: [
          'Adding privacy features after launch',
          'Building privacy into systems from the start',
          'Designing privacy policies',
          'Hiring privacy designers',
        ],
        correctIndex: 1,
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



