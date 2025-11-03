# 1. アプリケーション概要

* **目的**

  * 既存のポートフォリオサイトに「Blog」を追加し、**Markdown/MDX をリポジトリに置いて `git push` するだけで公開できる**ようにする。
  * 表示構造（カード/リストの骨格）とCSSを**常に一定**にし、記事ごとのバラつきを無くす。
  * 将来サイト全体を **「Works / Blog / About / Contact」** に拡張しても、このBlogの構造がそのまま再利用できるようにする。

* **記事の配置ポリシー**

  * 記事は **`posts/YYYY/slug.lang.md` または `posts/YYYY/slug.lang.mdx`** で保存する。

    * 例：`posts/2025/chiang-mai-tea.en.mdx`
    * 例：`posts/2025/chiang-mai-tea.ja.md`
  * **同じ年・同じslugで、言語だけ違うファイルは「同一記事の多言語版」とみなす。**
  * ファイル名で記事の言語を決める：`.en.md(x)` が英語、`.ja.md(x)` が日本語。

* **URL設計（固定）**

  * 英語一覧：`/blog`
  * 日本語一覧：`/ja/blog`
  * 英語詳細：`/blog/YYYY/slug`
  * 日本語詳細：`/ja/blog/YYYY/slug`
  * → **URLが真実**であり、クッキーやブラウザロケールで言語を決めない。

* **表示の基本ルール**

  * 一覧は、URLで決まった言語と一致する `lang` を持ち、かつ `draft: false` の記事だけを表示する。

    * `/blog` → `lang: "en" && draft: false`
    * `/ja/blog` → `lang: "ja" && draft: false`
  * 一覧は**テキスト前提の1カラムリスト**で、`thumbnail` がなくても崩れない。
  * 詳細ページには、同じslugの他言語記事が存在する場合のみ「Other language」リンクを表示する。

* **frontmatter（共通スキーマ）**

  ```yaml
  ---
  title: ""              # 必須
  date: "2025-11-03"     # 必須（並び順にも使う）
  summary: ""            # 一覧で使う。手書きで、120字表示を想定
  tags: ["dev", "blog"]  # 英語スラッグのみ
  lang: "en"             # "en" または "ja"
  draft: false           # true のときは公開一覧・詳細に出さない
  slug: ""               # 必要なときだけ。通常はファイル名から
  thumbnail: ""          # オプショナル
  ---
  ```

* **スコープ外（現時点）**

  * ブラウザからの投稿・編集UI
  * フリーテキスト検索
  * 複数著者・権限管理
  * コメント・いいね等のインタラクション
  * 動的OGP（静的OGPは将来対応余地として残す）

---

## 次に確認したいこと（AI用質問リスト／1層用）

* なし（この層は一旦確定）

---

# 2. 要件定義（機能要件 / 非機能要件 / スコープ外）

## 2.1 機能要件

### F-1 ブログ一覧表示

* ルート：

  * 英語：`/blog`
  * 日本語：`/ja/blog`
* 取得条件：

  * `draft: false`
  * `lang` がURLに対応した言語と一致する
* 表示項目：

  * タイトル
  * 日付
  * タグ（英語のまま）
  * summary（frontmatterから取り、**120字でトリム**して表示）
* 並び順：`date` の降順
* ページング：**1ページ30件**

  * `?page=2` 形式でページを指定する想定
  * 将来 `/blog/page/2` にもできるようにしておく
* 年別一覧も同じルールで表示する

  * 英語：`/blog/2025`
  * 日本語：`/ja/blog/2025`

### F-2 タグフィルタ（単一）

* 一覧でタグを**1つだけ**指定できる：

  * 英語：`/blog?tag=dev`
  * 日本語：`/ja/blog?tag=dev`
* 指定したタグを含む記事だけに絞り込む
* タグは**英語スラッグのまま表示**する
* 将来の拡張として「複数タグのANDフィルタ」を許容する旨を残しておく

### F-3 ブログ詳細表示

* ルート：

  * 英語：`/blog/YYYY/slug`
  * 日本語：`/ja/blog/YYYY/slug`
* URLから年・slug・言語を決定し、該当する `posts/YYYY/slug.lang.md(x)` を読み込む
* 表示順：

  1. タイトル
  2. 日付・タグ（タイトルの下）
  3. 本文（MarkdownまたはMDX）
  4. 他言語リンク（存在する場合のみ表示）
  5. 前の記事 / 次の記事（同一言語・公開済み・日付順）
* 対象が見つからない、または `draft: true` → 通常の404を表示

### F-4 ドラフト一覧（開発者向け）

* ルート：

  * 英語：`/blog/drafts`
  * 日本語：`/ja/blog/drafts`
* 対象：`draft: true` かつ URLと同じ言語のもの
* レイアウトは一覧と同じ
* `noindex, nofollow` を付与
* URLを知っている人が見られる前提（初期はこれでOK）

### F-5 ナビゲーション統合

* 既存のグローバルナビに「Blog」を1項目追加する
* `Works / Blog / About / Contact` は今回プレースホルダでOK（2層以降で詰める）

### F-6 デプロイ運用

* デプロイのトリガーは **GitHubへのpush**
* pushをトリガーに **Vercelがビルドし、そのままVercelが配信**する
* GitHub Actionsは必須ではない（後から前処理を入れたい場合だけ使う）

### F-7 RSS（将来対応）

* 英語：`/blog/feed.xml`
* 日本語：`/ja/blog/feed.xml`
* 現時点では「将来出せるようにする」だけ記述し、実装は後回し
* Atomは未決定のまま残す

---

## 2.2 非機能要件

* アクセスは小規模前提 → **SSG（静的出力）で全記事をビルド**する
* 一覧・詳細・ドラフト一覧は**同じコンポーネント構造とクラス名**で出力し、一貫性を保持する
* 404は**通常の404ページ**を表示し、`/blog` へはリダイレクトしない
* ドラフト一覧は検索エンジンにインデックスさせない
* 言語は**URLで決める**（クッキーやブラウザロケールには依存しない）

---

## 2.3 スコープ外

* フリーテキスト検索（全文検索）
* ブラウザ上での投稿・編集UI
* 複数著者・ロール管理
* コメント機能
* 高トラフィック向け最適化
* 動的なOGP生成（静的画像の指定だけ将来に残す）

---

## 次に確認したいこと（AI用質問リスト／2層用）

* なし（今回ぶんは固まった）

---

# 3. 基本設計（画面 / API / データ構造のアウトライン）

## 3.1 画面

### 3.1.1 一覧画面（/blog, /ja/blog）

* レイアウト：**1カラムのブログ型リスト**
* 構成：

  1. ページタイトル（Blog / ブログ）
  2. タグフィルタ（一覧に出た記事で使われたタグを**使われた順**に並べる）
  3. 記事リスト（最大30件）

     * タイトル（リンク）
     * 日付
     * タグ（タイトルのすぐ下、英語のまま）
     * summary（frontmatterから。120字でトリム）
  4. ページネーション（`?page=2`）

### 3.1.2 詳細画面（/blog/YYYY/slug, /ja/blog/YYYY/slug）

* 構成：

  1. タイトル
  2. メタ（公開日・タグ）※タイトルの下
  3. 本文（MarkdownまたはMDX）
  4. 他言語リンク（同じ年・同じslugで他言語が存在するときのみ表示）
  5. 前の記事 / 次の記事（同一言語で日付順）

### 3.1.3 ドラフト一覧（/blog/drafts, /ja/blog/drafts）

* 一覧とほぼ同じレイアウト
* `draft: true` だけを表示
* `noindex, nofollow`

---

## 3.2 データ取得（擬似API）

```ts
type Post = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  lang: "en" | "ja";
  draft: boolean;
  slug: string;
  year: number;
  path: string;       // 実ファイルパス
  thumbnail?: string;
  hasOtherLang?: boolean;
};

// 全記事を再帰的に読み込む
getAllPosts(): Post[];

// 一覧用：公開済み＆言語一致
getPublicPostsByLang(lang: "en" | "ja"): Post[];

// タグ指定（単一）
getPublicPostsByLangAndTag(lang: "en" | "ja", tag: string): Post[];

// ページング（1ページ30件）
paginate(posts: Post[], page: number, perPage = 30): Post[];

// 詳細表示
getPost(year: number, slug: string, lang: "en" | "ja"): Post | null;

// 前の記事・次の記事
getAdjacentPosts(year: number, slug: string, lang: "en" | "ja"): {
  prev?: Post;
  next?: Post;
};
```

---

## 3.3 ディレクトリ構造（例）

```text
posts/
  2025/
    chiang-mai-tea.en.mdx
    chiang-mai-tea.ja.md
    blog-structure.en.md
  2026/
    ...
```

* `.md` と `.mdx` の両方を許可する
* 画像は記事と同じフォルダか直下の `images/` に相対パスで置く
  例：`./images/tea1.jpg`
* ビルド時に相対パスを正規化して public 配下に持っていけるようにする

---

## 次に確認したいこと（AI用質問リスト／3層用）

* なし（現段階では確定）

---

# 4. 技術スタック・アーキテクチャ方針

## 4.1 フレームワーク

* **Next.js** を採用する（最新の安定版）。
* ルーティングで `/blog` と `/ja/blog` を分け、静的出力に対応させる。

## 4.2 ビルド・ホスティング

* **ビルドする：Vercel**
* **配る：Vercel**
* **きっかけ：GitHubのpush**

  * GitHubの `main` にpush → Vercelがhookでビルド → VercelのCDNから配信
* 今回は「完全に静的出力（SSG / `next export` 相当）」で構成するので、Vercel以外に持っていくことも将来的には可能（Cloudflare PagesやS3など）。

## 4.3 スタイル

* **Tailwind CSS** を採用する。
* ブログ本文には `@tailwindcss/typography` を使い、記事の見た目を揃える。
* 一覧・詳細・ドラフトで同じTailwindクラスを使い回すことで、レイアウトを安定させる。

## 4.4 Markdown / MDX

* `.md` と `.mdx` の両方を読み込む。
* MDXでは以下のコンポーネントを標準で使えるようにしておく：

  * `<InfoBox />`
  * `<YouTube />`
  * `<Divider />`
* それ以上のコンポーネントは「記事側で利用が出たら追加」という運用にする。

## 4.5 今後の拡張メモ

* OGPはfrontmatterの `thumbnail` があるときだけ使う
* RSS/Atomは将来対応
* ISRや動的OGPをやりたくなったら、その時点で「配る人」をVercel固定にして動的機能を有効にする

---

# 記事追加運用手順

1. **年のフォルダを確認する**
   例：2025年の記事 → `posts/2025/`
   なければ作る。

2. **記事ファイルを作る**

   * 英語：`posts/2025/<slug>.en.md` または `.en.mdx`
   * 日本語：`posts/2025/<slug>.ja.md` または `.ja.mdx`

3. **frontmatterを書く**

   ```yaml
   ---
   title: "..."
   date: "2025-11-03"
   summary: "一覧で出す120字前後の説明"
   tags: ["dev", "blog"]
   lang: "en"   # or "ja"
   draft: false
   slug: "..."  # 省略可
   thumbnail: ""
   ---
   ```

4. **本文を書く**

   * テキストだけなら `.md`
   * コンポーネントを埋めたいなら `.mdx`
   * 画像は同じフォルダに置いて相対パスで参照する

5. **ローカルで確認（任意）**

   ```bash
   npm run dev
   # http://localhost:3000/blog または /ja/blog を見る
   ```

6. **GitHubにpushする**

   ```bash
   git add posts/2025/xxx.en.mdx
   git commit -m "add: 2025 blog post xxx (en)"
   git push origin main
   ```

7. **Vercelが自動でビルド・配信**

   * 成功すればすぐに `/blog` または `/ja/blog` で見える

8. **ドラフトとして置きたいとき**

   * `draft: true` にしたままpush
   * 公開一覧には出ず、`/blog/drafts` / `/ja/blog/drafts` でだけ見える想定

