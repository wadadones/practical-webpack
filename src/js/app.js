import $ from 'jquery'; // ./node_modules/jquery/dist/jquery.js が読み込まれているわね！
import add from './modules/add'; // export const add = (n1, n2) => n1 + n2;
import tax from './modules/tax';

import '../scss/style.scss';

const item1Price = 400;
const item2Price = 600;
const totalPrice = add(item1Price, item2Price);

const salesTax = 1.08;
const priceIncludeTax = tax(totalPrice, salesTax);

$('.body').text(priceIncludeTax);
