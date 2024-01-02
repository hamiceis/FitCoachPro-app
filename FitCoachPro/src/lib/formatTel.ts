export function formatTel(tel: string) {
  const telefone = tel.replace(/\D/g, "")
  const format = /(\d{2})(\d{4,5})(\d{4})/

  const result = telefone.match(format)

  return result ? `(${result[1]})${result[2]}-${result[3]}` : tel
}