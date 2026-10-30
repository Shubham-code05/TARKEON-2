/**
 * Google Apps Script webhook: saves every website lead as a new row in a Google Sheet.
 *
 * Setup (5 minutes):
 * 1. Create a Google Sheet. In row 1 add headers: Received at | Type | Name | Phone | Email | Details
 * 2. Extensions → Apps Script. Delete the sample code and paste this whole file. Save.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me      Who has access: Anyone
 * 4. Click Deploy, allow the permissions, and copy the "Web app URL".
 * 5. Put that URL in GOOGLE_SHEET_WEBHOOK_URL (in .env.local and on Vercel). Redeploy the site.
 *
 * If you change this script later, use Deploy → Manage deployments → Edit → New version,
 * so the URL stays the same.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      data.receivedAt || new Date().toISOString(),
      data.kind || "",
      data.name || "",
      data.phone ? "'" + data.phone : "", // leading ' keeps the number as text
      data.email || "",
      data.details || "",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } finally {
    lock.releaseLock();
  }
}
