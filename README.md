# 互動噪聲藝術裝置專案 (Interactive Chaos Project)

這個資料夾包含了完整的新媒體藝術互動裝置實作程式碼，結合了 **Arduino 實體距離感測** 與 **p5.js 生成式影音噪聲合成**。

## 目錄結構
* `arduino_sketch/` : 存放 Arduino 硬體程式碼
  * `arduino_sketch.ino` : 讀取超音波感測器距離並傳送序列訊號。
* `p5_project/` : 存放網頁端影音合成程式碼
  * `index.html` : 網頁入口，引入了 p5.js、p5.sound 與 p5.webserial 庫。
  * `sketch.js` : 核心互動邏輯、Glitch 特效演算法與音頻合成引擎。

## 快速開始指南

### 步驟 1：燒錄 Arduino 程式
1. 用 **VS Code** 打開本專Folder（推薦安裝 `Arduino` 或 `PlatformIO` 擴充功能），或直接使用官方 Arduino IDE。
2. 將超音波感測器（HC-SR04）連接至 Arduino：
   * **VCC** -> 5V
   * **GND** -> GND
   * **Trig** -> Pin 9
   * **Echo** -> Pin 10
3. 開啟 `arduino_sketch/arduino_sketch.ino`，編譯並燒錄至你的 Arduino 開發板中。

### 步驟 2：執行 p5.js 網頁
1. 在 VS Code 中安裝 **Live Server** 擴充功能（由 Ritwick Dey 開發）。
2. 在 VS Code 中右鍵點擊 `p5_project/index.html`，選擇 **"Open with Live Server"**。
3. 瀏覽器（推薦使用 Google Chrome 或 Edge）會自動打開網頁。

### 步驟 3：建立實體與數位連接
1. 網頁開啟後，點擊畫面左上角的 **「連接 Arduino 感測器」** 按鈕。
2. 瀏覽器會跳出權限提示視窗，選擇你剛才接上 Arduino 的 **COM Port**（Mac 系統通常顯示為 `/dev/cu.usbserial...`），然後點擊連接。
3. **開始測試：** 試著將手靠近或遠離超音波感測器，投影畫面與喇叭音效將會隨之產生劇烈的隨機混亂與平靜變化！

## 技術特點
1. **數據平滑演算法 (Data Smoothing):** 採用線性插值 (`lerp`) 處理感測器雜訊，防止畫面與聲音產生突兀的跳躍。
2. **畫面故障藝術 (Glitch Engine):** 透過隨機抓取畫布像素區塊進行位置錯位（Chromatic Aberration 概念），模擬電子元件壞損的失真感。
3. **即時音頻合成 (Audio Synthesis):** 完全不使用外部音檔，100% 由 `p5.sound` 的白噪音（White Noise）與鋸齒波振盪器（Sawtooth Oscillator）隨機即時運算產生。
# DO-NOT-NEAR-ME-Simulation
