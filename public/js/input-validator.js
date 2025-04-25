document.addEventListener('DOMContentLoaded', function() {
  // フォーム要素の取得
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  if (emailInput && subjectInput && messageInput) {
    // 文字数カウンター表示用の要素を作成
    const subjectCounter = document.createElement('small');
    subjectCounter.className = 'char-counter';
    subjectInput.insertAdjacentElement('afterend', subjectCounter);
    
    const messageCounter = document.createElement('small');
    messageCounter.className = 'char-counter';
    messageInput.insertAdjacentElement('afterend', messageCounter);
    
    // 文字数カウンターの更新
    function updateCounter(input, counter, maxLength) {
      const remaining = maxLength - input.value.length;
      counter.textContent = `残り ${remaining} 文字`;
      
      if (remaining < 0) {
        counter.classList.add('error');
      } else {
        counter.classList.remove('error');
      }
    }
    
    // 入力イベントリスナーの設定
    subjectInput.addEventListener('input', function() {
      updateCounter(subjectInput, subjectCounter, 100);
    });
    
    messageInput.addEventListener('input', function() {
      updateCounter(messageInput, messageCounter, 3000);
    });
    
    // メールアドレスの検証
    emailInput.addEventListener('blur', function() {
      const emailValue = emailInput.value.trim();
      if (emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          emailInput.classList.add('invalid');
          
          // エラー表示がなければ追加
          if (!emailInput.nextElementSibling || !emailInput.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.textContent = '有効なメールアドレスを入力してください';
            emailInput.insertAdjacentElement('afterend', errorMsg);
          }
        } else {
          emailInput.classList.remove('invalid');
          
          // エラー表示を削除
          if (emailInput.nextElementSibling && emailInput.nextElementSibling.classList.contains('error-message')) {
            emailInput.nextElementSibling.remove();
          }
        }
      }
    });
    
    // 初期カウンター表示
    updateCounter(subjectInput, subjectCounter, 100);
    updateCounter(messageInput, messageCounter, 3000);
  }
}); 