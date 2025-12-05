'use client';

import { modules } from '@/data/curriculum';
import ContentPage from '@/components/ContentPage';
import CodeChallenge from '@/components/CodeChallenge';

export default function WebAttacksPage() {
  const currentModule = modules[2];
  const page = currentModule.pages[0];
  const nextPage = currentModule.pages[1];

  const vulnerableCode = [
    { lineNumber: 1, code: 'def login(username, password):' },
    { lineNumber: 2, code: '    """Authenticate user login"""' },
    { lineNumber: 3, code: '    connection = db.connect()' },
    { lineNumber: 4, code: '    cursor = connection.cursor()' },
    { lineNumber: 5, code: '' },
    { lineNumber: 6, code: '    # Build the SQL query' },
    {
      lineNumber: 7,
      code: '    query = "SELECT * FROM users WHERE username=\'" + username + "\' AND password=\'" + password + "\'"',
      isVulnerable: true,
      explanation: 'This line concatenates user input directly into the SQL query without sanitization. An attacker could input something like: username = admin\' OR \'1\'=\'1\' -- to bypass authentication. The fix is to use parameterized queries: cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))',
    },
    { lineNumber: 8, code: '' },
    { lineNumber: 9, code: '    cursor.execute(query)' },
    { lineNumber: 10, code: '    result = cursor.fetchone()' },
    { lineNumber: 11, code: '' },
    { lineNumber: 12, code: '    if result:' },
    { lineNumber: 13, code: '        return {"success": True, "user": result}' },
    { lineNumber: 14, code: '    return {"success": False, "error": "Invalid credentials"}' },
  ];

  return (
    <ContentPage
      module={currentModule}
      page={page}
      nextPage={nextPage}
    >
      <CodeChallenge
        title="SQL Injection Vulnerability Hunt"
        description="Review the login function below. Click on the line that contains a SQL Injection vulnerability."
        language="Python"
        codeLines={vulnerableCode}
        hint="Look for where user input is being directly inserted into a SQL query string using concatenation."
        correctLineNumber={7}
      />
    </ContentPage>
  );
}
