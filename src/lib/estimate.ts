export function estimateFromFile(name: string, size: number) {
  // hash simples
  let h = 0; const s = name + size;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const kcal = 100 + (h % 800); // 100-900
  const protein = Math.round((kcal * 0.25) / 4);
  const carbs = Math.round((kcal * 0.45) / 4);
  const fat = Math.round((kcal * 0.30) / 9);
  const ingredientsPool = ["frango","arroz","salada","ovos","banana","aveia","atum","massa","legumes","iogurte"];
  const pick = (i: number) => ingredientsPool[(h + i) % ingredientsPool.length];
  const ingredients = [pick(1), pick(2), pick(3)];
  const suggestions = [
    { title: "Receita equilibrada", calories_est: kcal-50, ingredients: [pick(4), pick(5), "azeite"] },
    { title: "Receita gourmet", calories_est: kcal+80, ingredients: [pick(6), pick(7), "ervas"] },
    { title: "Receita leve", calories_est: Math.max(100, kcal-150), ingredients: [pick(8), pick(9), "limão"] }
  ];
  return { calories: kcal, nutrients: { protein, carbs, fat }, ingredients, suggestions };
}