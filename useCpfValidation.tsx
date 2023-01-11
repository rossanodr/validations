

export function useCpfValidation(strCPF: string): boolean {
  // Verifica se a string é composta apenas por dígitos
  if (/^\d+$/.test(strCPF) === false) return false;

  // Verifica se a string tem pelo menos 11 dígitos
  if (strCPF.length < 11) return false;

  let Soma: number;
  let Resto: number;
  Soma = 0;
  // Verifica se a string é igual a "00000000000". 
  if (strCPF === "00000000000") return false;

  // Inicializa a variável Soma com o valor 0.
  // Itera pelos dígitos do primeiro pedaço (da primeira posição até a nona). Para cada dígito, a função:
  // Converte o dígito para um número inteiro.
  // Multiplica o dígito pelo resultado da expressão (11 - i).
  // Adiciona o resultado da multiplicação à variável Soma.
  // Calcula o resto da divisão de Soma por 11 usando a operação % e armazena o resultado na variável Resto.
  // Verifica se Resto é igual a 10 ou 11. Se for, armazena 0 em Resto.
  // Verifica se Resto é igual ao décimo dígito do primeiro pedaço. Se não for, a função retorna false.
  // A segunda regra de validação é aplicada ao segundo pedaço de 2 dígitos.
  // Para validar esse pedaço, a função realiza os mesmos passos descritos acima, mas iterando pelos 10 dígitos do primeiro pedaço mais o primeiro dígito do segundo pedaço.
  
  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
}
