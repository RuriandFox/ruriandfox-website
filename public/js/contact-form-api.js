document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  
  // Google Apps ScriptのWebアプリURLを設定
  const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
  
  // 送信制限用の変数
  let lastSubmitTime = 0;
  const THROTTLE_TIME = 60000; // 60秒 (1分)
  
  if (contactForm) {
    // フォームのアクションとメソッドを変更
    contactForm.setAttribute('action', 'javascript:void(0);');
    contactForm.setAttribute('method', 'POST');
    
    contactForm.addEventListener('submit', function(e) {
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
      
      // フォームデータの作成
      const formData = new FormData();
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);
      formData.append('recaptchaResponse', recaptchaResponse);
      
      // Google Apps Scriptにデータを送信
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'  // CORS制限に対応
      })
      .then(response => {
        // no-corsモードではレスポンスの中身が読めないため、成功したと仮定
        // 最終送信時間を更新
        lastSubmitTime = now;
        
        // 成功メッセージを表示
        displayMessage('お問い合わせありがとうございます。メッセージが正常に送信されました。', 'success');
        
        // フォームをリセット
        contactForm.reset();
        
        // CAPTCHAをリセット
        grecaptcha.reset();
      })
      .catch(error => {
        // エラーメッセージを表示
        displayMessage('送信中にエラーが発生しました。もう一度お試しください。', 'error');
        console.error('送信エラー:', error);
      })
      .finally(() => {
        // ボタンを元に戻す
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
      });
    });
  }
  
  // メッセージ表示関数
  function displayMessage(text, type) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // 新しいメッセージ要素を作成
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}-message`;
    messageDiv.textContent = text;
    
    // フォームの後に挿入
    contactForm.insertAdjacentElement('afterend', messageDiv);
    
    // 5秒後にメッセージを削除
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}); 