export default function SalesReportItem({ name, count }) {
    return (
        <li>
            <button className="col-2 themed-grid-col">{name}</button>
            <button className="col-2 themed-grid-col">{count}</button>
        </li>
    );
}