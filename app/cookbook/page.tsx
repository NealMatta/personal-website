export default async function Cookbook() {
  const res = await fetch('http://localhost:3000/api/cookbook/allRecipes');
  const recipes = await res.json();

  return (
    <>
      <div>
        <h1>Cookbook</h1>
        <pre>{JSON.stringify(recipes, null, 2)}</pre>
      </div>
    </>
  );
}
