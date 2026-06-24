function processUnreadEmails() {
  var threads = GmailApp.search('is:unread label:inbox', 0, 5);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  var apiKey = "Bearer YOUR API KEY HERE ";
  var model = "llama-3.1-8b-instant";

  for (var i = 0; i < threads.length; i++) {
    try {
      var thread = threads[i];
      var message = thread.getMessages()[0];

      var date = message.getDate();
      var from = message.getFrom();
      var subject = message.getSubject();
      var body = message.getPlainBody().substring(0, 1500);

      var payload = {
        model: model,
        messages: [
          {
            role: "system",
            content: "You are an email classifier. Given the body of an email, respond ONLY with a raw JSON object with exactly two keys: 'Category' (one of: Urgent, Newsletter, Meeting, Task, Other) and 'Summary' (one short sentence). Do NOT include any markdown formatting, backticks, code fences, or extra explanation. Just return the raw JSON object only."
          },
          {
            role: "user",
            content: "Classify this email:\n\n" + body
          }
        ],
        temperature: 0.2,
        max_tokens: 150
      };

      var options = {
        method: "POST",
        contentType: "application/json",
        headers: {
          "Authorization": apiKey
        },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };

      var response = UrlFetchApp.fetch(apiUrl, options);
      var responseCode = response.getResponseCode();
      var responseText = response.getContentText();

      if (responseCode !== 200) {
        Logger.log("API Error for email '" + subject + "': HTTP " + responseCode + " - " + responseText);
        continue;
      }

      var responseJson = JSON.parse(responseText);
      var rawContent = responseJson.choices[0].message.content;

      // Safely strip any accidental markdown code fences before parsing
      var cleaned = rawContent
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      var classified = JSON.parse(cleaned);

      var category = classified.Category || "Unknown";
      var summary = classified.Summary || "No summary available.";

      sheet.appendRow([date, from, subject, category, summary, "Processed by Llama-3.1"]);

      thread.markRead();

      Logger.log("Processed: [" + category + "] " + subject);

    } catch (e) {
      Logger.log("Error processing email at index " + i + ": " + e.message);
    }
  }

  Logger.log("processUnreadEmails() completed. " + threads.length + " thread(s) checked.");
}
