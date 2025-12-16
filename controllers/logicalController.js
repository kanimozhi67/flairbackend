const shapes = ["🔺", "⭕", "⬛", "⭐", "🔶", "🔵"];

export function generateLogic(req, res) {

  const A = Math.floor(Math.random() * shapes.length);
  const B = Math.floor(Math.random() * shapes.length);
  const C = Math.floor(Math.random() * shapes.length);

  const n = Math.floor(Math.random() * 3) + 1; // repeat 1 or 2 times

  // Base pattern
  const Xarr = [shapes[A], shapes[B], shapes[C]];
console.log(Xarr)
  // Repeat pattern
  let result = Array(n).fill().flatMap(() => Xarr);
console.log(result)
  const len = result.length;

  // Pick safe index
  const fill = Math.floor(Math.random() * (len - 1));

  // Store correct answers (optional)
  const p = result[fill];
  const q = result[fill + 1];

  // Hide two elements
  result[fill] = "❓";
  result[fill + 1] = "❓";

  res.json({
    pattern: result
   });
}
