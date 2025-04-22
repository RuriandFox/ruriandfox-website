# Ruri and Fox ウェブサイト

このリポジトリは、Ruri and Fox公式ウェブサイトのソースコードを含んでいます。

## 技術スタック

- [Hugo](https://gohugo.io/) - 静的サイトジェネレーター
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod) - Hugoテーマ

## ローカル開発

### 必要条件

- [Hugo](https://gohugo.io/getting-started/installing/) (バージョン 0.80.0 以上)
- Git

### インストール手順

1. リポジトリをクローン：
   ```
   git clone --recursive https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. ローカルサーバーを起動：
   ```
   hugo server -D
   ```

3. ブラウザで http://localhost:1313 にアクセス

## ディレクトリ構造

```
├── archetypes/
├── assets/
│   └── css/custom.css
├── content/
│   ├── about/_index.md
│   ├── contact/_index.md
│   ├── apps/_index.md
│   │ 　 └── apps/counselmate/_index.md
│   └── company/_index.md
├── layouts/            （カスタムpartial置き場）
├── static/images/      （PNG等イラスト配置）
├── themes/PaperMod/    （Git submodule）
├── hugo.toml
└── README.md
```

## デプロイ

プロジェクトをビルドするには、以下のコマンドを実行します：

```
hugo
```

ビルドされたサイトは `public/` ディレクトリに出力されます。このディレクトリの内容をウェブサーバーにアップロードすることでサイトをデプロイできます。

## ライセンス

このプロジェクトは独自のライセンスの下で公開されています。詳細については、[ライセンスファイル](LICENSE)を参照してください。 