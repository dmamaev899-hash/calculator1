// ============ ПЕРЕМЕННЫЕ ============
let display = '';
let currentUnit = 'm';

// ============ ЕДИНИЦЫ ИЗМЕРЕНИЯ ============
const unitConversions = {
    'm': { name: 'Метр', mm: 1000, cm: 100, ft: 3.28084, inch: 39.3701 },
    'cm': { name: 'Сантиметр', mm: 10, m: 0.01, ft: 0.0328084, inch: 0.393701 },
    'mm': { name: 'Миллиметр', cm: 0.1, m: 0.001, ft: 0.00328084, inch: 0.0393701 },
    'ft': { name: 'Фут', m: 0.3048, cm: 30.48, mm: 304.8, inch: 12 },
    'inch': { name: 'Дюйм', m: 0.0254, cm: 2.54, mm: 25.4, ft: 0.0833333 }
};

// ============ СМЕНА РЕЖИМА ============
function switchMode(mode) {
    // Скрываем все режимы
    document.querySelectorAll('.mode-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));

    // Показываем выбранный режим
    document.getElementById(mode).classList.add('active');
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    // Очищаем дисплей
    clearDisplay();
}

// ============ ОБНОВЛЕНИЕ ЕДИНИЦЫ ============
function updateUnit() {
    currentUnit = document.getElementById('unit').value;
    updateUnitInfo();
}

function updateUnitInfo() {
    const unit = currentUnit;
    const unitSymbols = { 'm': 'м', 'cm': 'см', 'mm': 'мм', 'ft': 'ft', 'inch': 'in' };
    
    document.getElementById('area-unit-info').textContent = `Результат в ${unitSymbols[unit]}²`;
    document.getElementById('volume-unit-info').textContent = `Результат в ${unitSymbols[unit]}³`;
    document.getElementById('perimeter-unit-info').textContent = `Результат в ${unitSymbols[unit]}`;
}

// ============ БАЗОВЫЙ КАЛЬКУЛЯТОР ============
function appendNumber(num) {
    display += num;
    updateDisplay();
}

function appendOperator(operator) {
    if (display && !display.endsWith(operator)) {
        display += operator;
        updateDisplay();
    }
}

function calculate() {
    try {
        display = eval(display).toString();
    } catch (e) {
        display = 'Ошибка';
    }
    updateDisplay();
}

function clearDisplay() {
    display = '';
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    if (displayElement) {
        displayElement.value = display;
    }
}

// ============ РАСЧЁТ ПЛОЩАДИ ============
function calculateArea() {
    const length = parseFloat(document.getElementById('area-length').value);
    const width = parseFloat(document.getElementById('area-width').value);

    if (!length || !width || length <= 0 || width <= 0) {
        showResult('area', 'Введите корректные значения!', 'error');
        return;
    }

    const area = length * width;
    const unitSymbols = { 'm': 'м²', 'cm': 'см²', 'mm': 'мм²', 'ft': 'ft²', 'inch': 'in²' };
    showResult('area', `<span class=\"success\">Площадь: ${area.toFixed(2)} ${unitSymbols[currentUnit]}</span>`, 'success');
}

// ============ РАСЧЁТ ОБЪЁМА ============
function calculateVolume() {
    const length = parseFloat(document.getElementById('volume-length').value);
    const width = parseFloat(document.getElementById('volume-width').value);
    const height = parseFloat(document.getElementById('volume-height').value);

    if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
        showResult('volume', 'Введите корректные значения!', 'error');
        return;
    }

    const volume = length * width * height;
    const unitSymbols = { 'm': 'м³', 'cm': 'см³', 'mm': 'мм³', 'ft': 'ft³', 'inch': 'in³' };
    showResult('volume', `<span class=\"success\">Объём: ${volume.toFixed(2)} ${unitSymbols[currentUnit]}</span>`, 'success');
}

// ============ РАСЧЁТ ПЕРИМЕТРА ============
function calculatePerimeter() {
    const length = parseFloat(document.getElementById('perimeter-length').value);
    const width = parseFloat(document.getElementById('perimeter-width').value);

    if (!length || !width || length <= 0 || width <= 0) {
        showResult('perimeter', 'Введите корректные значения!', 'error');
        return;
    }

    const perimeter = 2 * (length + width);
    const unitSymbols = { 'm': 'м', 'cm': 'см', 'mm': 'мм', 'ft': 'ft', 'inch': 'in' };
    showResult('perimeter', `<span class=\"success\">Периметр: ${perimeter.toFixed(2)} ${unitSymbols[currentUnit]}</span>`, 'success');
}

// ============ КОНВЕРТАЦИЯ ЕДИНИЦ ============
function convertUnits() {
    const value = parseFloat(document.getElementById('convert-value').value);
    const fromUnit = document.getElementById('convert-from').value;
    const toUnit = document.getElementById('convert-to').value;

    if (!value || value < 0) {
        showResult('convert', 'Введите корректное значение!', 'error');
        return;
    }

    if (fromUnit === toUnit) {
        showResult('convert', `<span class=\"success\">${value} = ${value} ${fromUnit}</span>`, 'success');
        return;
    }

    // Конвертируем в метры как базовую единицу
    let valueInMeters = value;
    if (fromUnit === 'cm') valueInMeters = value / 100;
    else if (fromUnit === 'mm') valueInMeters = value / 1000;
    else if (fromUnit === 'ft') valueInMeters = value * 0.3048;
    else if (fromUnit === 'inch') valueInMeters = value * 0.0254;

    // Конвертируем из метров в целевую единицу
    let result = valueInMeters;
    if (toUnit === 'cm') result = valueInMeters * 100;
    else if (toUnit === 'mm') result = valueInMeters * 1000;
    else if (toUnit === 'ft') result = valueInMeters / 0.3048;
    else if (toUnit === 'inch') result = valueInMeters / 0.0254;

    const unitNames = { 'm': 'м', 'cm': 'см', 'mm': 'мм', 'ft': 'ft', 'inch': 'in' };
    showResult('convert', 
        `<span class=\"success\">${value} ${unitNames[fromUnit]} = ${result.toFixed(4)} ${unitNames[toUnit]}</span>`, 
        'success');
}

// ============ ПОКАЗ РЕЗУЛЬТАТОВ ============
function showResult(mode, message, type) {
    const resultElement = document.getElementById(`${mode}-result`);
    resultElement.innerHTML = message;
    resultElement.className = `result ${type}`;
}