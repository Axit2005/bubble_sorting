async function sortNumbers() {
    var numberInput = document.getElementById('numberInput').value;
    var numbers = numberInput.split(',').map(Number);
    var barsContainer = document.getElementById('bars-container');
    var resultDiv = document.getElementById('result');

    // Display initial bars
    barsContainer.innerHTML = '';
    numbers.forEach((number, index) => {
        var barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        var bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = number * 5 + 'px';
        barContainer.appendChild(bar);

        var indexLabel = document.createElement('div');
        indexLabel.className = 'index';
        indexLabel.textContent = index;
        barContainer.appendChild(indexLabel);

        barsContainer.appendChild(barContainer);
    });

    // Bubble sort with visualization
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            // Highlight comparison
            highlightBar(j, 'white');
            highlightBar(j + 1, 'white');

            // Delay for visualization
            await sleep(500);

            if (numbers[j] > numbers[j + 1]) {
                // Swap numbers
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;

                // Update bars
                updateBarHeight(j, numbers[j]);
                updateBarHeight(j + 1, numbers[j + 1]);
            }

            // Remove highlight after comparison
            highlightBar(j, '#000000');
            highlightBar(j + 1, '#000000');
        }
    }

    // Final sorted result
    resultDiv.innerHTML = 'Sorted Numbers: ' + numbers.join(', ');
}

function highlightBar(index, color) {
    var bars = document.getElementsByClassName('bar');
    bars[index].style.backgroundColor = color;
}

function updateBarHeight(index, height) {
    var bars = document.getElementsByClassName('bar');
    bars[index].style.height = height * 5 + 'px';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}