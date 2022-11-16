export default function MenuItem({ name, ingredients, price }) {
  console.log({ ingredients });

  return (
    <ul className="list-group list-group-horizontal-xl">
      <li className="list-group-item">{name}</li>

      <li className="list-group-item">{ingredients.join(", ")}</li>
      <li className="list-group-item">{price}</li>
    </ul>
  );
}
