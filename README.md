# OWASP 資安闖關（多頁版）

給老師的 OWASP Top 10 教學闖關網站。先體驗漏洞情境 → 找出問題 → 看原因與解法 → 解鎖下一關，A01 到 A10。
所有情境皆為「前端安全模擬」，使用假資料，不連真實系統、不含可運作的攻擊程式。

## 檔案結構
- `index.html` — 闖關地圖首頁（依進度顯示解鎖狀態）
- `a01.html` ~ `a10.html` — 每一關一個獨立頁面（要改某關就只開那一個檔）
- `style.css` — 共用樣式（顏色、版面都在這）
- `common.js` — 共用邏輯：進度解鎖、頁首進度條、主題切換

## 本機預覽
用 VS Code 裝 Live Server，對 `index.html` 按右鍵 → Open with Live Server。

## 發佈
把整個資料夾上傳 GitHub，Settings → Pages 開啟即可。入口為 index.html。

## 改哪裡
- 某關的文字、情境、原因、解法 → 開該關的 aXX.html，找 `① 情境體驗` 段落與 `<section class="reveal">`
- 某關的互動模擬 → 該關 aXX.html 最下方 `<script>` 裡
- 顏色、字體、版面 → style.css 最上方的 :root
- 進度／解鎖邏輯 → common.js（非必要不動）

進度存在瀏覽器 localStorage，清除瀏覽器資料會重設；首頁也有「重設進度」。
