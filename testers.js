let d1 = 0;
let i;
for (i = 0; i < arr.length; i++) {
  d1 += arr[i][i];
}

let d2 = 0;
let j;
let k;
for (j = 0, k = arr.length - 1; j < arr.length; j++, k--) {
  d2 += arr[j][k];
}

return Math.abs(d1 - d2);
