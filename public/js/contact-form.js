document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  
  // 送信制限用の変数
  let lastSubmitTime = 0;
  const THROTTLE_TIME = 60000; // 60秒 (1分)
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // まずデフォルトの送信を止める
      e.preventDefault();
      
      // 送信頻度の制限（スロットリング）
      const now = new Date().getTime();
      if (now - lastSubmitTime < THROTTLE_TIME) {
        const remainingTime = Math.ceil((THROTTLE_TIME - (now - lastSubmitTime)) / 1000);
        alert(`送信頻度が高すぎます。${remainingTime}秒後にお試しください。`);
        return;
      }
      
      // 入力値の取得とバリデーション
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // 基本的なバリデーション
      if (!email || !subject || !message) {
        alert('すべての必須フィールドを入力してください。');
        return;
      }
      
      // メールアドレスの形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('有効なメールアドレスを入力してください。');
        return;
      }
      
      // 入力の長さ制限チェック
      if (subject.length > 100) {
        alert('件名は100文字以内で入力してください。');
        return;
      }
      
      if (message.length > 3000) {
        alert('お問い合わせ内容は3000文字以内で入力してください。');
        return;
      }
      
      // 入力値のサニタイズ（特殊文字をエスケープ）
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedSubject = sanitizeInput(subject);
      const sanitizedMessage = sanitizeInput(message);
      
      // reCAPTCHAのチェック
      // reCAPTCHAがロードされていない場合のフォールバック
      if (typeof grecaptcha === 'undefined') {
        alert('reCAPTCHAの読み込みに失敗しました。ページをリロードしてお試しください。');
        return;
      }
      
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('「ロボットではない」にチェックを入れてください。');
        return;
      }
      
      // 送信中の状態を表示
      submitButton.disabled = true;
      submitButton.textContent = '送信中...';
      
      // フォームデータを整形してmailto:リンクに適した形式にする
      contactForm.action = `mailto:support@ruriandfox.com?subject=${encodeURIComponent(sanitizedSubject)}&body=${encodeURIComponent("From: " + sanitizedEmail + "\n\n" + sanitizedMessage)}`;
      
      // 送信確認
      const confirmSend = confirm('メッセージを送信しますか？');
      if (!confirmSend) {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
        return;
      }
      
      // 最終送信時間を更新
      lastSubmitTime = now;
      
      // フォーム送信（メールクライアントが開く）
      contactForm.submit();
      
      // 送信完了のアラート
      setTimeout(function() {
        alert('メールクライアントが開きます。送信を完了してください。');
        
        // CAPTCHAをリセット
        grecaptcha.reset();
        
        // ボタンを元に戻す
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
      }, 100);
    });
  }
  
  // 入力値のサニタイズ関数
  function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  }
}); 