export default function RestockItem({ name, unit, quantity, low, price }) {
    return (
        <ul className="list-group list-group-horizontal-xl">
            <button className="col-2 themed-grid-col">{name}</button>
            <button className="col-2 themed-grid-col">{unit}</button>
            <button className="col-2 themed-grid-col">{quantity}</button>
            <button className="col-2 themed-grid-col">{low}</button>
            <button className="col-2 themed-grid-col">{price}</button>
        </ul>
    );
}