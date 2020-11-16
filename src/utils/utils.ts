export function insertString(Oldstr: string, match: string, str: string) {
  let index = Oldstr.indexOf(match);
  Oldstr = Oldstr.slice(0, index) + str + Oldstr.slice(index)
  return Oldstr
}