# AI-Email-Automator
Automate your inbox! A Google Apps Script that fetches unread Gmails, uses Llama-3.1 (via Groq API) to categorize &amp; summarize them, and logs everything into Google Sheets in real-time. Fast, free, and smart. 🚀
# Gmail AI Automator 🚀

An automated email management pipeline that fetches unread emails from Gmail, uses **Llama-3.1 (via Groq API)** to categorize and summarize them, and logs the structured data into **Google Sheets** in real-time.

## Features ✨
- **Automated Fetching:** Scans the inbox for top unread emails.
- **LLM-powered Insights:** Uses `llama-3.1-8b-instant` for ultra-fast, zero-cost JSON classification and summarization.
- **Structured Logging:** Appends Date, Sender, Subject, Category, and Summary directly into Google Sheets.
- **Duplication Control:** Marks processed emails as 'Read' automatically to prevent reprocessing.

## Tech Stack 🛠️
- **Language:** Google Apps Script (JavaScript)
- **AI Model:** Llama-3.1-8b-instant (via Groq API)
- **Platform:** Google Workspace (Gmail + Sheets)

## Setup Instructions ⚙️
1. Create a Google Sheet and open **Extensions > Apps Script**.
2. Copy the code from `Code.gs` into the editor.
3. Get a free API key from the [Groq Console](https://console.groq.com/).
4. Replace `YOUR_GROQ_API_KEY_HERE` with your actual key in the script.
5. Click **Run** and authorize the necessary permissions.
