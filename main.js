const lottoNumbersDiv = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

function getNumberRange(number) {
  if (number <= 10) return '1-10';
  if (number <= 20) return '11-20';
  if (number <= 30) return '21-30';
  if (number <= 40) return '31-40';
  return '41-45';
}

generateBtn.addEventListener('click', () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  // Clear previous numbers
  lottoNumbersDiv.innerHTML = '';
  
  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  // Animate numbers appearing one by one
  sortedNumbers.forEach((number, index) => {
    setTimeout(() => {
        const numberSpan = document.createElement('span');
        numberSpan.className = 'lotto-number';
        numberSpan.textContent = number;
        numberSpan.setAttribute('data-range', getNumberRange(number));
        
        // Simple pop-in animation via CSS or just appending
        numberSpan.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        lottoNumbersDiv.appendChild(numberSpan);
    }, index * 200); // 200ms delay between each ball
  });
});

// Add animation keyframes to document if not present
if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
