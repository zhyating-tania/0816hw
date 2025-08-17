document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('signupForm');
  const err   = document.getElementById('formError');
  const ok    = document.getElementById('successMessage');

  // 回饋區塊元素
  const rewardBox  = document.getElementById('emotionReward');
  const rewardImg  = document.getElementById('rewardImg');
  const rewardTit  = document.getElementById('rewardTitle');
  const rewardDesc = document.getElementById('rewardDesc');

  // 依情緒定義不同的圖與文案（把路徑換成你的檔名）
  const EMOTIONS = [
    { key: 'love',  label: 'Love',   src: 'image/fox-love1.png', desc: '溫柔而有力量，今天的你很適合把關愛分享出去。' },
    { key: 'love2', label: 'Love 2', src: 'image/fox-love2.png', desc: '細膩的感受力讓你看見更多小確幸。' },
    { key: 'anger', label: 'Anger',  src: 'image/fox-anger.png', desc: '把能量化成行動；深呼吸三次，開始出發。' },
    { key: 'sad',   label: 'Sadness',src: 'image/fox-sad.png',   desc: '給自己一點時間與擁抱，慢慢來，一切都會好起來。' }
  ];

  function showError(msg) {
    err.textContent = msg || '';
    err.hidden = !msg;
  }

  function pickEmotionFromSelection() {
    // 讀取使用者勾選的情緒
    const checked = [...document.querySelectorAll('input[name="mood"]:checked')].map(el => el.value);
    // 若有勾選：只在已勾選的情緒中挑；若沒勾選：全情緒中隨機挑
    const pool = checked.length ? EMOTIONS.filter(e => checked.includes(e.key)) : EMOTIONS;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showError('');
    ok.hidden = true;
    rewardBox.hidden = true; // 先收起回饋區

    // 簡單驗證
    const name  = document.getElementById('name')?.value.trim()  || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';

    if (!name)  return showError('請輸入姓名');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('請輸入有效的 email');
    if (!/^[0-9\-+\s]{8,}$/.test(phone))          return showError('請輸入有效的電話');

    // 顯示成功訊息
    ok.hidden = false;

    // 依情緒顯示不同的圖與文案
    const emo = pickEmotionFromSelection();
    rewardImg.src = emo.src;
    rewardImg.alt = `${emo.label} 回饋圖`;
    rewardTit.textContent = `你的今日情緒：${emo.label}`;
    rewardDesc.textContent = emo.desc;
    rewardBox.hidden = false;

    // 捲動到回饋區
    rewardBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 若你想保留表單內容就不要 reset
    form.reset();
  });
});