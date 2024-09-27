// 選取卡片容器和按鈕
const cardContainer = document.getElementById('card-container');
const showFrontButton = document.getElementById('show-front');
const showBackButton = document.getElementById('show-back');
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game'); // 選取返回按鈕
const themeSelect = document.getElementById('theme-select'); // 選取下拉選單

// 根據選擇的主題創建卡片
const createCards = (theme) => {
    let frontImageSrc, backImageSrc;
    if (theme === 'onepiece') {
        frontImageSrc = 'image/onepiece9.png'; // One Piece 的正面
        backImageSrc = (i) => `image/onepiece${i}.png`; // One Piece 的反面 1~8
    } else if (theme === 'historical') {
        frontImageSrc = 'image/historical figures 9.png'; // 歷史人物的正面
        backImageSrc = (i) => `image/historical figures ${i}.png`; // 歷史人物的反面 1~8
    }

    // 動態生成兩組，每組8張卡片
    for (let group = 1; group <= 2; group++) {
        for (let i = 1; i <= 8; i++) {
            // 創建卡片元素
            const card = document.createElement('div');
            card.classList.add('card');

            // 創建正面
            const frontFace = document.createElement('div');
            frontFace.classList.add('card-face', 'front');
            const frontImage = document.createElement('img');
            frontImage.src = frontImageSrc; // 正面圖片
            frontFace.appendChild(frontImage);

            // 創建反面
            const backFace = document.createElement('div');
            backFace.classList.add('card-face', 'back');
            const backImage = document.createElement('img');
            backImage.src = backImageSrc(i); // 反面圖片
            backFace.appendChild(backImage);

            // 將正面和反面添加到卡片
            card.appendChild(frontFace);
            card.appendChild(backFace);

            // 點擊事件，控制翻轉
            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
            });

            // 將卡片添加到容器
            cardContainer.appendChild(card);
        }
    }
};

// 隨機排列卡片
function shuffleCards(container) {
    const cards = Array.from(container.children);
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => container.appendChild(card)); // 重新加入容器以更新順序
}

// 按鈕事件 - 開始遊戲
startGameButton.addEventListener('click', () => {
    const selectedTheme = themeSelect.value; // 獲取選擇的主題
    cardContainer.style.display = 'grid';
    startGameButton.style.display = 'none';
    themeSelect.style.display = 'none'; // 開始遊戲後隱藏下拉選單
    restartGameButton.style.display = 'inline-block'; // 顯示返回按鈕
    showFrontButton.style.display = 'inline-block';
    showBackButton.style.display = 'inline-block';

    // 清空卡片容器並生成新卡片
    cardContainer.innerHTML = '';
    createCards(selectedTheme); // 根據選擇的主題創建卡片

    // 隨機排列卡片
    shuffleCards(cardContainer);

    // 顯示背面並倒數10秒
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('is-flipped'); // 顯示背面
    });

    // 倒數10秒
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('is-flipped'); // 翻回正面
        });
    }, 10000); // 10秒後翻回正面
});

// 按鈕事件 - 顯示正面
showFrontButton.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('is-flipped'); // 顯示正面
    });
});

// 按鈕事件 - 顯示背面，依序翻轉
showBackButton.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('is-flipped'); // 顯示背面
        }, index * 300); // 每張卡片翻轉間隔300毫秒
    });
});

// 按鈕事件 - 返回開始畫面
restartGameButton.addEventListener('click', () => {
    // 隱藏卡片容器和功能按鈕，顯示開始遊戲按鈕和下拉選單
    cardContainer.style.display = 'none';
    showFrontButton.style.display = 'none';
    showBackButton.style.display = 'none';
    restartGameButton.style.display = 'none'; // 隱藏返回按鈕
    startGameButton.style.display = 'inline-block';
    themeSelect.style.display = 'inline-block'; // 顯示下拉選單
    cardContainer.innerHTML = ''; // 清空卡片
});
