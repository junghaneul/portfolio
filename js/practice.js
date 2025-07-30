document.addEventListener('DOMContentLoaded', function() {
    const allToggleButtons = document.querySelectorAll('button.button1');

    const ANIMATION_DURATION = 700; // CSS transition 지속 시간과 일치

    allToggleButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const clickedButton = this;
            const parentListItem = clickedButton.closest('li');
            const firstP = parentListItem.querySelector('p:nth-of-type(2)');
            const firstA = parentListItem.querySelector('a:nth-of-type(1)');

            if (!parentListItem) {
                return;
            }

            const isContentCurrentlyVisible = parentListItem.classList.contains('display-block');

            // 버튼 텍스트와 클래스 토글
            if (isContentCurrentlyVisible) { // 현재 열려있다면 닫는 동작
                clickedButton.textContent = '+';
                clickedButton.classList.remove('button-close');
                clickedButton.classList.add('button-open');
                
                // ✅ 닫을 때 display-block 제거하여 CSS 애니메이션 시작
                parentListItem.classList.remove('display-block');

            } else { // 현재 닫혀있다면 여는 동작
                clickedButton.textContent = 'X';
                clickedButton.classList.remove('button-open');
                clickedButton.classList.add('button-close');
                
                // ✅ 열 때 display-block 추가하여 CSS 애니메이션 시작
                parentListItem.classList.add('display-block');
            }
        });
    });
});