function random(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

// eslint-disable-next-line import/prefer-default-export
export function randomNameGenerator(): string {
  const prefix = [
    '귀여운',
    '깜찍한',
    '굉장한',
    '무서운',
    '흔한',
    '재빠른',
    '느린',
    '말 많은',
  ];
  const postfix = [
    '고양이',
    '강아지',
    '미어캣',
    '너구리',
    '비둘기',
    '고슴도치',
    '앵무새',
  ];
  return `${prefix[random(prefix.length)]} ${postfix[random(postfix.length)]}`;
}
