document.addEventListener('DOMContentLoaded', function() {
    const allToggleButtons = document.querySelectorAll('button.button1');

    // --- 중요: 이 값은 CSS의 transition 지속 시간(예: 0.7s)과 정확히 일치해야 합니다. ---
    const ANIMATION_DURATION = 700;

    allToggleButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const clickedButton = this;
            const parentListItem = clickedButton.closest('li');
            const contentParagraph = parentListItem.querySelector('p:nth-child(2)');
            const contentLink = parentListItem.querySelector('a:nth-child(3)');

            // 현재 내용이 보이는 상태인지 확인 (display-block 클래스 유무로 판단)
            const isContentCurrentlyVisible = contentParagraph.classList.contains('display-block');

            // --- 버튼 텍스트와 클래스 토글 (이전과 동일) ---
            if (isContentCurrentlyVisible) { // 내용이 현재 보이는 상태라면 (닫는 동작)
                clickedButton.textContent = '+';
                clickedButton.classList.remove('button-close');
                clickedButton.classList.add('button-open');
            } else { // 내용이 현재 숨겨진 상태라면 (여는 동작)
                clickedButton.textContent = 'X';
                clickedButton.classList.remove('button-open');
                clickedButton.classList.add('button-close');
            }

            // --- 간소화된 내용 애니메이션 로직 ---
            if (isContentCurrentlyVisible) { // 닫는 동작: 애니메이션 시작 후 일정 시간 뒤에 display: none;
                if (contentParagraph) {
                    contentParagraph.classList.remove('display-block'); // CSS 애니메이션 (숨겨짐) 시작
                    // 애니메이션 지속 시간만큼 기다린 후 display: none;으로 완전히 숨김
                    setTimeout(() => {
                        contentParagraph.style.display = 'none';
                    }, ANIMATION_DURATION);
                }
                if (contentLink) {
                    contentLink.classList.remove('display-block');
                    setTimeout(() => {
                        contentLink.style.display = 'none';
                    }, ANIMATION_DURATION);
                }
            } else { // 여는 동작: display: block; 설정 후 애니메이션 시작
                if (contentParagraph) {
                    contentParagraph.style.display = 'block'; // 요소를 즉시 문서 흐름에 포함 (아직 높이 0)
                    // 아주 짧은 시간(10ms) 대기 후 애니메이션 시작.
                    // 'display: block'이 먼저 적용될 시간을 줍니다.
                    setTimeout(() => {
                        contentParagraph.classList.add('display-block'); // CSS 애니메이션 (보임) 시작
                    }, 10); // 10ms 정도의 작은 딜레이면 충분합니다.
                }
                if (contentLink) {
                    contentLink.style.display = 'block';
                    setTimeout(() => {
                        contentLink.classList.add('display-block');
                    }, 10);
                }
            }
        });
    });
});