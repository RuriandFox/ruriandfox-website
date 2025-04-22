---
title: "Ruri and Fox"
description: "家族の知恵で楽しく生きる未来を創る"
---

{{< rawhtml >}}
<!-- ヒーローセクション -->
<section class="hero-section">
  <div class="hero-content">
    <h1><strong>家族の知恵で<br>楽しく生きる未来を創る</strong></h1>
    <p>
      身近な人の便利・楽しいをカタチにしてお届けします。<br>
      アプリとか動画とか・・・。30代子持ちの夫婦の会社です。
    </p>
  </div>
  <div class="hero-image">
    <img src="/images/about-ruri-fox.png" alt="Ruri and Fox">
  </div>
</section>

<!-- サービスセクション -->
<section class="services-section" id="services">
  <h2 class="section-title">Services</h2>
  <div class="service-cards">
    <div class="service-card">
      <div class="service-badge">Apps</div>
      <div class="service-image">
        <img src="/images/exam-support.png" alt="小学校受験の見方" class="service-img">
      </div>
      <div class="service-content">
        <h3>小学校受験のミカタ</h3>
        <p>やることをシンプルに<br>小学校受験の学習アプリ</p>
        <div class="service-button disabled">
          <span>coming soon</span>
        </div>
      </div>
    </div>
    
    <div class="service-card">
      <div class="service-badge">Apps</div>
      <div class="service-image">
        <img src="/images/counselmate.png" alt="カウンセルメイト" class="service-img">
      </div>
      <div class="service-content">
        <h3>カウンセルメイト</h3>
        <p>心理カウンセラー向け<br>レポート作成支援アプリ</p>
        <div class="service-button">
          <a href="https://apps.apple.com/" target="_blank">無料ダウンロード</a>
        </div>
      </div>
    </div>
    
    <div class="service-card">
      <div class="service-badge">Movie</div>
      <div class="service-image">
        <img src="/images/baby-sign.png" alt="ベイビーサイン" class="service-img">
      </div>
      <div class="service-content">
        <h3>ベイビーサイン</h3>
        <p>ベイビーサインが学べる<br>動画など</p>
        <div class="service-button">
          <a href="https://www.youtube.com/" target="_blank">Youtube</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ニュースセクション -->
<section class="news-section">
  <div class="container">
    <h2 class="section-title">News</h2>
    <div class="news-content">
      <p class="coming-soon">coming soon!</p>
    </div>
  </div>
</section>

<!-- お問い合わせセクション -->
<section class="contact-section" id="contact">
  <h2 class="section-title">Contact</h2>
  <p>
    サービスや製品に関するご質問、お問い合わせは以下のフォームよりお寄せください。
  </p>
  
  <div class="contact-form">
    <form id="contact-form" action="mailto:support@ruriandfox.com" method="POST" enctype="text/plain">

      <div class="form-group">
        <label for="email">メールアドレス <span class="required">*</span></label>
        <input type="email" id="email" name="email" required>
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
</section>
{{< /rawhtml >}}