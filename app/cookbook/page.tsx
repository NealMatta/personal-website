export default function Cookbook() {
  const recipes = fetch('/cookbook/allRecipes');
  return (
    <>
      <div>
        <h1>Cookbook</h1>
        <pre>{JSON.stringify(recipes, null, 2)}</pre>
      </div>
    </>
  );
}
