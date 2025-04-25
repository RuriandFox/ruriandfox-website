// Google Apps Script - コンタクトフォーム処理
// このスクリプトをGoogle Apps Scriptとして保存し、Webアプリとしてデプロイします

function doPost(e) {
  try {
    // CORSヘッダーの設定
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // パラメータの取得と検証
    const params = e.parameter;
    const email = params.email || '';
    const subject = params.subject || '';
    const message = params.message || '';
    const recaptchaResponse = params.recaptchaResponse || '';
    
    // 必須項目の検証
    if (!email || !subject || !message || !recaptchaResponse) {
      return outputJSON({ success: false, message: 'すべての必須フィールドを入力してください。' });
    }
    
    // メールアドレスの検証
    if (!validateEmail(email)) {
      return outputJSON({ success: false, message: '有効なメールアドレスを入力してください。' });
    }
    
    // reCAPTCHAの検証
    if (!verifyRecaptcha(recaptchaResponse)) {
      return outputJSON({ success: false, message: 'reCAPTCHA検証に失敗しました。もう一度お試しください。' });
    }
    
    // スプレッドシートへの保存
    saveToSpreadsheet(email, subject, message);
    
    // メール送信
    sendEmail(email, subject, message);
    
    // 成功レスポンス
    return outputJSON({ success: true, message: 'お問い合わせが正常に送信されました。ありがとうございます。' });
    
  } catch (error) {
    // エラーハンドリング
    return outputJSON({ success: false, message: 'エラーが発生しました: ' + error.toString() });
  }
}

// メールアドレス検証の関数
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// reCAPTCHA検証の関数
function verifyRecaptcha(recaptchaResponse) {
  const SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY'; // reCAPTCHAシークレットキーを設定
  
  const response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: {
      secret: SECRET_KEY,
      response: recaptchaResponse
    }
  });
  
  const result = JSON.parse(response.getContentText());
  return result.success;
}

// スプレッドシートへの保存関数
function saveToSpreadsheet(email, subject, message) {
  // スプレッドシートのIDを設定（URLから取得）
  const SHEET_ID = 'YOUR_SPREADSHEET_ID';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // タイムスタンプを追加
  const timestamp = new Date();
  
  // データを行として追加
  sheet.appendRow([timestamp, email, subject, message]);
}

// メール送信の関数
function sendEmail(email, subject, message) {
  const to = 'support@ruriandfox.com'; // 受信メールアドレス
  const emailSubject = 'ウェブサイトからのお問い合わせ: ' + subject;
  const emailBody = 
    '以下の内容でウェブサイトからお問い合わせがありました。\n\n' +
    '送信者: ' + email + '\n' +
    '件名: ' + subject + '\n\n' +
    'メッセージ:\n' + message;
  
  // メール送信
  MailApp.sendEmail({
    to: to,
    subject: emailSubject,
    body: emailBody
  });
}

// JSON出力のヘルパー関数
function outputJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
} 