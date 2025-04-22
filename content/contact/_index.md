---
title: "お問い合わせ"
description: "RURI AND FOX へのお問い合わせ"
layout: "single"
---

{{< rawhtml >}}
<div class="contact-section">
  <h2>お問い合わせ</h2>
  <p>
    当社のサービスや製品に関するご質問、お問い合わせは以下のフォームよりお寄せください。
    また、メンタルヘルスに関するコンサルティングや共同開発のご相談も承っております。
  </p>
  
  <div class="contact-form">
    <form id="contact-form" action="#" method="POST">
      <div class="form-group">
        <label for="name">お名前 <span class="required">*</span></label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">メールアドレス <span class="required">*</span></label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="company">会社名・組織名</label>
        <input type="text" id="company" name="company">
      </div>
      
      <div class="form-group">
        <label for="subject">件名 <span class="required">*</span></label>
        <input type="text" id="subject" name="subject" required>
      </div>
      
      <div class="form-group">
        <label for="message">お問い合わせ内容 <span class="required">*</span></label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      
      <div class="form-group">
        <button type="submit" class="submit-button">送信する</button>
      </div>
    </form>
  </div>
  
  <div class="contact-info">
    <h3>その他の連絡方法</h3>
    <p>
      <strong>メール:</strong> info@ruriandfox.com<br>
      <strong>所在地:</strong> 東京都渋谷区<br>
      <strong>営業時間:</strong> 平日 10:00〜18:00
    </p>
  </div>
</div>

<script>
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // ここに実際のフォーム送信処理を実装
    alert('お問い合わせありがとうございます。折り返しご連絡いたします。');
    this.reset();
  });
</script>
{{< /rawhtml >}} 