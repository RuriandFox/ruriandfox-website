# 法務ドキュメント運用メモ

ぐんぐん！の法務ドキュメントは「Markdown（obenkyoリポジトリ）→ PDF 生成 → Web 配布（ruriandfox-website）」の最小構成で運用する。以下は想定ワークフローと、抑えておきたい最低限のハードニング事項。

## ディレクトリ構成

- **ソース**：`RuriandFox/obenkyo/legal/gungun/<lang>/{terms.md,privacy.md}`
- **公開**：`RuriandFox/ruriandfox-website/static/legal/gungun/vX.Y.Z/{terms.pdf,privacy.pdf}`
- **エイリアス**：`static/_redirects` で `/legal/gungun/latest/*.pdf` を該当版へ 301

## CI ハイライト

1. Markdown を PDF 化（言語ごと）し、SHA-256 を取得。
2. 生成 PDF をアプリ同梱ディレクトリと Web リポジトリに配置。
3. Firestore `policies/consent` の `requiredVersion` / `requiredCode` / `document_hash` を更新。
4. Web リポジトリで `latest` リダイレクトを更新してデプロイ。

## セキュリティ最小要件

- **DNS 側**：DNSSEC・CAA・レジストラ MFA を有効化してドメイン乗っ取りを抑止。
- **配布 PDF**：`X-Frame-Options: DENY` と `X-Content-Type-Options: nosniff` を `/legal/gungun/*` に付与（`static/_headers`）。
- **Firestore**：`requiredCode` とユーザプロファイルの整合チェックを維持。`document_hash` は監査用に保存すると改ざん検知しやすい。

追加の WAF・CSP・Last-Modified 固定運用などは現構成では必須としないが、将来別サービスで動的配信に戻る場合は再検討する。
