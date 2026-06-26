const SHEET_NAME = "Aurora Hunter Leads";
const DEFAULT_NOTIFY_EMAIL = "your-email@example.com";

function doPost(event) {
  const payload = JSON.parse((event && event.postData && event.postData.contents) || "{}");
  const sheet = getLeadSheet_();
  const row = [
    new Date(),
    payload.name || "",
    payload.contact || "",
    payload.departureDate || "",
    payload.travelers || "",
    payload.interest || "",
    payload.notes || "",
    payload.page || "",
    payload.referrer || "",
    payload.source || "",
  ];
  sheet.appendRow(row);
  sendLeadReminder_(payload);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLeadSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "提交时间",
      "称呼",
      "联系电话或微信",
      "预计出发日期",
      "出行人数",
      "感兴趣的方向",
      "补充需求",
      "提交页面",
      "来源页面",
      "来源标记",
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendLeadReminder_(payload) {
  const notifyEmail = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL") || DEFAULT_NOTIFY_EMAIL;
  const subject = `Aurora Hunter 新咨询：${payload.name || "未填写称呼"} / ${payload.interest || "未选择方向"}`;
  const body = [
    "网站收到新的摩尔曼斯克极光旅行咨询：",
    "",
    `称呼：${payload.name || ""}`,
    `联系电话或微信：${payload.contact || ""}`,
    `预计出发日期：${payload.departureDate || ""}`,
    `出行人数：${payload.travelers || ""}`,
    `感兴趣的方向：${payload.interest || ""}`,
    `补充需求：${payload.notes || ""}`,
    "",
    `提交页面：${payload.page || ""}`,
    `来源页面：${payload.referrer || ""}`,
    "",
    "请尽快联系客人，并在 Google Sheet 中更新跟进状态。",
  ].join("\n");
  MailApp.sendEmail(notifyEmail, subject, body);
}
