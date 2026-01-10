const lottoNumbersDiv = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  lottoNumbersDiv.innerHTML = '';
  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  for (const number of sortedNumbers) {
    const numberSpan = document.createElement('span');
    numberSpan.className = 'lotto-number';
    numberSpan.textContent = number;
    lottoNumbersDiv.appendChild(numberSpan);
  }
});