let addRowButton = document.getElementById('addrow');
let remRowButton = document.getElementById('remrow')
let meanButton = document.getElementById('meanbutton');
let weightedButton = document.getElementById('weightedbutton');
let rowCount = 1;

addRowButton.addEventListener('click', addRow);
remRowButton.addEventListener('click', remRow);

meanButton.addEventListener('mousedown', function (event) {
    meanButton.style.backgroundColor = "darkred";
    try {
        computeMean();
    } catch (e) {
        document.getElementById('result').innerHTML = e.message;
    }
});
meanButton.addEventListener('mouseover', function (event) {
    meanButton.style.backgroundColor = "pink";
})
meanButton.addEventListener('mouseleave', function (event) {
    meanButton.style.backgroundColor = "darkred";
});
meanButton.addEventListener('mouseup', function (event) {
    meanButton.style.backgroundColor = "pink";
});
weightedButton.addEventListener('mousedown', function (event) {
    weightedButton.style.backgroundColor = "darkred";
    try {
        computeWeighted();
    } catch (e) {
        document.getElementById('result').innerHTML = e.message;
    }
});
weightedButton.addEventListener('mouseover', function (event) {
    weightedButton.style.backgroundColor = "pink";
})
weightedButton.addEventListener('mouseleave', function (event) {
    weightedButton.style.backgroundColor = "darkred";
});
weightedButton.addEventListener('mouseup', function (event) {
    weightedButton.style.backgroundColor = "pink";
});

/**
 * Description: This checks the denominator to see if it is zero
 * Throws Error when denominator == 0
 */
function dividesZero() {
    let denominator = 0;
    for (let i = 1; i <= rowCount; i++) {
        denominator = document.getElementById('graded' + i).value;
        if (denominator == 0) {
            throw new Error('Cannot divide by zero!');
        }
    }
}

/**
 * Description: This checks for negative inputs
 * Throws Error when input < 0
 */
function negativeValueCheck() {
    let numerator = 0;
    let denominator = 0;
    let weight = 0;
    for (let i = 1; i <= rowCount; i++) {
        numerator = document.getElementById('graden' + i).value;
        denominator = document.getElementById('graded' + i).value;
        weight = document.getElementById('weight' + i).value;
        if (numerator < 0 || denominator < 0 || weight < 0) {
            throw new Error('Input cannot be negative!');
        }
    }
}

/**
 * Description: This function injects an html script to make a new row
 */
function addRow() {
    rowCount++;
    let row = '<tr id="tablerow' + rowCount + '">' +
        '<td class = tabledata1>Activity ' + rowCount + '</td>' +
        '<td class = tabledata1>A' + rowCount + '</td>' +
        '<td class = tabledata1>' +
        '<input class="number" id="weight' + rowCount + '" type="number" value="" min="0" />' +
        '</td>' +
        '<td class = tabledata1>' +
        '<input class="number" id="graden' + rowCount + '" type="number" value="" min="0" /> / ' +
        '<input class="number" id="graded' + rowCount + '" type="number" value="" min="0" />' +
        '</td>' +
        '<td class = tabledata1 id="percent' + rowCount + '"></td>' +
        '</tr>';
    document.getElementById('tablebody').innerHTML += row;
}

/**
 * Description: This function removes a row in the table
 */
function remRow() {
    if (rowCount > 1) {
        let element = document.getElementById('tablerow' + rowCount);
        element.remove();
        rowCount--;
    }
}

/**
 * Description: Computes the mean with provided input
 * Precondition: input is not negative and denominator is not zero
 */
function computeMean() {
    dividesZero();
    negativeValueCheck();
    let sum = 0;
    let numerator = 0;
    let denominator = 0;
    let percent = 0;
    for (let i = 1; i <= rowCount; i++) {
        numerator = document.getElementById('graden' + i).value * 1;
        denominator = document.getElementById('graded' + i).value * 1;
        percent = numerator / denominator;
        document.getElementById('percent' + i).innerHTML = Math.round(percent * 10000) / 100 + '%';
        sum += percent;
    }
    document.getElementById('result').innerHTML = Math.round((sum / rowCount) * 10000) / 100 + '%';
}

/**
 * Description: Computes the mean with provided input
 * Precondition: input is not negative and denominator is not zero
 */
function computeWeighted() {
    dividesZero();
    negativeValueCheck();
    let sum = 0;
    let totalWeight = 0;
    let weight = 0;
    let numerator = 0;
    let denominator = 0;
    let percent = 0;
    for (let i = 1; i <= rowCount; i++) {
        numerator = document.getElementById('graden' + i).value * 1;
        denominator = document.getElementById('graded' + i).value * 1;
        weight = document.getElementById('weight' + i).value * 1;
        totalWeight += weight;
        percent = numerator / denominator;
        document.getElementById('percent' + i).innerHTML = Math.round(percent * 10000) / 100 + '%';
        sum += percent * weight;
    }
    if (totalWeight == 0) {
        document.getElementById('result').innerHTML = 0 + '%';
    } else {
        document.getElementById('result').innerHTML = Math.round((sum / totalWeight) * 10000) / 100 + '%';
    }
}