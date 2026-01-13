document.addEventListener('DOMContentLoaded', () => {
  const aEl = document.getElementById('vstup1');
  const bEl = document.getElementById('vstup2');
  const out = document.getElementById('vysledek');
  const opSpan = document.getElementById('opSymbol');

  const btnPlus = document.getElementById('tlPlus');
  const btnMinus = document.getElementById('tlMinus');
  const btnKrat = document.getElementById('tlKrat');
  const btnDeleno = document.getElementById('tlDeleno');

  if (!opSpan.textContent.trim()) opSpan.textContent = '+';

  function parseNum(s){
    if (typeof s !== 'string') return NaN;
    s = s.trim().replace(',', '.');
    if (s === '') return NaN;
    return Number(s);
  }

  function show(text, isError = false){
    out.textContent = text;
    out.classList.toggle('error', !!isError);
  }

  function format(n){
    if (!isFinite(n)) return String(n);
    if (Number.isInteger(n)) return String(n);
    return Number(n.toFixed(6)).toString();
  }

  function calc(op){
    opSpan.textContent = op;
    const a = parseNum(aEl.value);
    const b = parseNum(bEl.value);

    if (isNaN(a) || isNaN(b)){
      show('Chybný vstup', true);
      return;
    }
    if (op === '÷' && b === 0){
      show('Nelze dělit nulou', true);
      return;
    }

    let r;
    switch(op){
      case '+': r = a + b; break;
      case '−': r = a - b; break;
      case '×': r = a * b; break;
      case '÷': r = a / b; break;
      default: r = NaN;
    }
    show(format(r), false);
  }

  btnPlus.addEventListener('click', () => calc('+'));
  btnMinus.addEventListener('click', () => calc('−'));
  btnKrat.addEventListener('click', () => calc('×'));
  btnDeleno.addEventListener('click', () => calc('÷'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
      const s = opSpan.textContent || '+';
      calc(s);
    }
  });
});
