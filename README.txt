Yuki Koizumi 研究者ホームページ（ローカル版）

ZIPを展開し、index.htmlをブラウザで開いてください。サーバーやビルド作業は不要です。各項目は独立したHTMLページです。公開・デプロイはしていません。

ページ：Home / Publications / Talks / Contact & CV / Press Releases / Materials & Blog（EN・JPの各6ページ。MaterialsとBlog、ContactとCVはそれぞれ同じHTMLページ内の別セクション）。下層ページではナビゲーション直下の分野名・氏名・所属の繰り返しを省き、そのページの見出しを先頭に置いています。
Contact / CVには本人から提供された氏名・所属・専門分野・連絡先と、学歴、研究・教育経験、受賞歴、採択歴、研究プログラム・学術活動を英語版・日本語版の両方に掲載しています。研究プログラム・学術活動にはQEdサマースクール2022への選抜参加も含み、この一覧は欄内でスクロールできます。奨学金・フェローシップ等の各項目には公式の制度紹介ページへのリンクを付けています。連絡先は確認済みのgmail.com表記です。セミナー講演・インタビューの依頼についての案内と、連絡時にホームページ経由であることの明記をお願いする文も掲載しています。
Press Releasesはpress.htmlとpress-jp.htmlに独立したページとして設けています。2024年と2026年の合同プレスリリース各1件を掲載し、各リリースの日本語版と英語版を2欄に分けてリンクしています。2024年の東京大学の英語ページには機械翻訳である旨の注意書きがあります。
各ページのナビゲーションのMaterials / Blogの右にEN/JP切り替えがあります。JP版にも国際発表5件・国内発表9件を掲載しています。国際発表は和訳せず、題名・著者・会議名を原文のまま掲載しています。国内発表でも提供された英語の題目は原題のままです。論文も正式な英語題名をそのまま掲載しています。
研究分野と所属はHomeとContact / CVに掲載しています。Homeの「興味の対象」の下に関連リンクとしてXとGoogle Scholarを設けています。Research、About、Newsのページは含めていません。
Homeには本人の自己紹介と鯉の背景に込めた思い、「興味の対象」として研究を導く3つの問いを掲載しています。英語版には対応する英訳があります。日本語版の名前表記は「小泉 勇樹」です。本人から提供されたポートレート写真は英語版・日本語版のHomeに掲載しています。PCでは名前から自己紹介の見出しにまたがる右側の位置に、スマートフォンでは名前の下に配置します。画像はassets/yuki-koizumi-portrait.pngで、元画像の比率と色を維持しています。
本文はPC幅で短い文を途中で折り返さず、文と文の間で改行します。幅に収まらない長い文とスマートフォン幅では自然に折り返します。本文の処理はsentence-wrap.jsで行います。Homeの自己紹介は文面を変えず、本文の幅を広げて写真を右端に配置しています。
全ページの英語版・日本語版に、画面全体を泳ぐ青い点群の鯉と紫のネットワークを背景として表示します。鯉の数はHomeフッターの「Homepage」の横にある「# of Koi」0 / 3 / 5で変更でき、選択は各ページにも引き継ぎます。点数70%削減・点の大きさ1.25倍・濃さ75%で、視点は真上から50度傾けています。鯉の数以外の画面上の設定欄は設けていません。
参考サイト（https://k-mizuta.github.io/publications.html）の青い点と細い線の背景から着想を得て、鯉より背面にvioletのネットワークを追加しました。ページを開くたびに各ノードの位置を近傍内でランダムにずらします。点群全体に流れる波と各点の異なる周期の揺れを重ね、線はその点を追従します。18本の補助線が滑らかに現れて消え、一部の線では光が移動します。全ノードは中心の点と周囲の光が一緒に明暗を変えます。描画コードはkoi/network-field.js、JavaScriptが使えない場合の静止画像はkoi/quantum-field.svg（暗色用はkoi/quantum-field-dark.svg）です。「動きを減らす」設定ではランダムな配置を静止表示します。紙色と文字の配色は従来どおりです。全体の濃さはstyles.cssの.home-fieldのopacity、点の移動幅と速さはkoi/network-field.jsのdraw関数内で変更できます。鯉の透明度はネットワークには影響しません。
点は鯉の表面全体から固定した順序で均等に間引いています。鯉の開始位置はページを開くたびにランダムに選び、複数の鯉が重なりにくいようにします。口元には口角から短く下がる2対のひげを点列で描き、胴体の点を間引いても見えるようにしています。頭部と肩の厚み、細くなる尾の付け根、扇状の胸びれ、二股の尾びれ、尾側へ強くなる体の波を調整しました。視点は真上から50度傾けた斜め上とし、手前の点を少し明るく描いて胴体の立体感を出しています。角度の設定はkoi/koi-home-canvas.jsのVIEW_ZとVIEW_Yです。点の色相はstyles.cssの--koi-colorで指定する青です。点群に5pxの明るい光と12pxの広い光を重ね、輪郭全体を発光させています。発光色は--koi-glowと--koi-glow-soft、広がりは.home-koi canvasのdrop-shadowで調整できます。鯉の透明度は本文や罫線には影響しません。スクロール中も鯉は画面内を移動し、ときどき1匹ずつ水面から跳ねます。跳躍時は体を傾けて上昇・下降し、点で描いた小さな波紋を水面に残します。画面端ではジャンプせず、キャンバスは文字・リンクより背面で、クリックを妨げません。動きを減らすOS設定ではジャンプも泳ぎも静止します。ジャンプは初回がおよそ5～10秒後、以降は約20～33秒間隔で、タイミング・高さ・傾きはkoi/koi-home-canvas.jsのnextJumpAt、jumpLift、jumpPitchで変更できます。描画はCanvas 2Dを使用し、WebGLは不要です。表示位置はstyles.css、削減率・大きさ・泳ぐ範囲・速度はkoi/koi-home-canvas.js、濃さはstyles.cssの--koi-opacityで調整できます。鯉の数はlocalStorageに保存し、ローカルファイル間の移動にはURLのkoiパラメータも引き継ぎます。
点群の元の造形はSourany PhomhomeのKoi Pond Gardenです。形態の確認にはFAOのCyprinus carpio解説（https://www.fao.org/fishery/docs/CDrom/aquaculture/I1129m/file/en/en_commoncarp.htm）、遊泳の確認には実写映像（https://www.pexels.com/video/elegant-koi-swimming-in-a-tranquil-pond-29048557/）と鯉の運動計測研究（https://doi.org/10.1016/S1672-6529(09)60190-6）を参照しました。映像や写真の素材自体は同梱していません。造形データの生成にはthree.jsを使用しています。ライセンスはkoi/LICENSEとkoi/THREE-LICENSEに同梱しています。JavaScriptもZIP内に含めているため、鯉の表示自体に外部通信は不要です。

Publicationsには、提供された2026年9月30日付の論文リストに基づき、プレプリント1件と査読付き学術論文4件を掲載しています。論文題名は原題を保持し、DOIまたはarXivへのリンクを付けています。題名は1行表示とし、長い題名は一覧内を横にスクロールして読めます。

TalksにはEN版・JP版とも提供された国際発表5件・国内発表9件を掲載しています。日付・題目を選び、矢印で昇順と降順を切り替えます。EN版のRegionはAll / International / Domestic、FormatはAll / Talk with selection / Talk / Posterです。Talk with selectionは査読ありの講演を指します。講演・ポスター両方の発表はTalkとPosterの両方に表示されます。約5件分を表示し、一覧内でスクロールできます。
Talksの一覧幅はstyles.cssの.talk-list（現在は最大1200px）で変更できます。題目は1行表示とし、狭い画面では一覧を横方向にもスクロールして全文を読めます。
発表を追加する場合は、talks.html内の class="record talk-record" の行を複製し、data-date（YYYY-MMまたはYYYY-MM-DD）、data-title、data-region、data-formats、data-selected-talk、表示する日付と本文を書き換えてください。talks-jp.htmlにも対応する行を追加してください。talks.jsは両ページの件数を自動的に数え、並べ替え・絞り込みを行います。

Materials / Blogはmaterial.htmlとmaterial-jp.htmlです。Materialsには本人から提供された2026年4月24日の二国研セミナー発表資料PDF（assets/nikuni-seminar-slides-yuki-koizumi-2026.pdf）、2026年1月提出の修士論文PDF（assets/master-thesis-yuki-koizumi-2026.pdf）、Quantum Fall Fest 2025の公開コードを年月の新しい順に掲載しています。発表資料PDFにはTalksの該当する発表からも移動できます。Blogには本人が執筆した博士課程院試体験記（note、2026年6月10日）とQuantikzの解説記事（物理学科 Advent Calendar 2022）へのリンクと概要を掲載しています。院試体験記の点数開示部分は有料です。今後の記事は各ページのclass="blog-post"の記事を複製して追加できます。

色を変える場合は、styles.css先頭の--paper（背景）、--ink（本文）、--quiet（補助文字）、--rule（罫線）、--accent（文字などのviolet）、--koi-color（青）、--koi-glow（鯉の近い光）、--koi-glow-soft（鯉の広い光）、--network-color（violet）を編集してください。light-dark(左, 右)の左がライトモード、右がダークモードです。ネットワークの静止表示用SVGは別に同じvioletで指定しています。

IBM Plex Serif / Sans / Monoはインターネット接続時にGoogle Fontsから読み込みます。オフラインでは代替書体になります。
