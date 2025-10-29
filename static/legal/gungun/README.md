# ぐんぐん！法務文書（公開用）

このディレクトリはアプリ側リポジトリ（`RuriandFox/obenkyo`）でビルドした PDF を公開用に配置する場所です。

## 配置ルール

- `vX.Y.Z/terms.pdf` と `vX.Y.Z/privacy.pdf` をバージョンごとに格納する。
- `latest/` は常に最新版へ 301 リダイレクトさせる。Netlify の `_redirects` を更新することで実現する（`static/_redirects` を参照）。
- ローカルで `latest/` にファイルを直接複製する運用は行わない。

### v2.1.0 の例

- `v2.1.0/terms.pdf`
- `v2.1.0/privacy.pdf`

## リリースフロー（抜粋）

1. `obenkyo/legal/gungun/<lang>/{terms.md,privacy.md}` から PDF を生成（言語・版ごと）。
2. 生成物と SHA-256 ハッシュをアプリバンドルおよびこのディレクトリに配置。
3. `/static/_redirects` の `/legal/gungun/latest/*.pdf` を新しいバージョンに差し替える。
4. Firestore の `requiredVersion` / `requiredCode` / `document_hash` を更新し、デプロイ。

詳細な CI 手順は `SECURITY-HARDENING.md` の該当セクションを参照してください。
