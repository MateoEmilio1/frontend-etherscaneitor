import styles from "@/styles/home.module.css";
import moment from "moment";

export default function SearchResults(props) {
  return (
    <section className={styles.searchResults}>
      <p className={styles.amountOfTransactions}>
        Latest 25 from a total of{" "}
        <span className="text-white">{props.result.result.length}</span>{" "}
        transactions
      </p>
      <table className={styles.txnSection}>
        <thead>
          <tr className={styles.txnTitle}>
            <th>Transaction Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th></th>
            <th>To</th>
            <th>Value</th>
            <th>Txn Fee</th>
          </tr>
        </thead>
        {props.result.result.map((txn) => {
          return (
            <tr className={styles.txn} key={txn.key}>
              <td className="text-blue-300">{txn.hash.slice(0, 12)}...</td>
              <td>
                <span className={styles.transfer}>Transfer</span>
              </td>
              <td className="text-blue-300">{txn.block_number}</td>
              <td className="text-white">{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</td>
              <td className="text-white">
                {txn.from_address.slice(0, 6)}...{txn.from_address.slice(36)}
              </td>
              <td>
                <span
                  className={`${
                    txn.from_address.toLowerCase() !==
                    props.result.searchInput.toLowerCase()
                      ? styles.inTxn
                      : styles.outTxn
                  }`}
                >
                  {txn.from_address.toLowerCase() !==
                  props.result.searchInput.toLowerCase()
                    ? "IN"
                    : "OUT"}
                </span>
              </td>
              <td className="text-blue-300">
                {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
              </td>
              <td className="text-white">{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
              <td className="text-white">{(txn.gas_price / 10 ** 18).toFixed(12)}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}