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
      <div className="overflow-x-auto">
  <table className={`${styles.txnSection} min-w-full divide-y divide-gray-200`}>
    <thead>
      <tr className={styles.txnTitle}>
        <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Hash</th>
        <th className="pl-11 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
        <th className="pl-20 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
        <th className="pl-24 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
        <th className="pl-28 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
        <th className="pl-44 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        <th className="pl-12 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
        <th className="pl-24 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
        <th className="pl-28 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn Fee</th>
      </tr>
    </thead>
    <tbody className=" divide-y divide-gray-200">
      {props.result.result.map((txn) => {
        return (
          <tr className={styles.txn} key={txn.key}>
            <td className="px-6 py-4 whitespace-nowrap text-blue-300">{txn.hash.slice(0, 12)}...</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={styles.transfer}>Transfer</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-blue-300">{txn.block_number}</td>
            <td className="px-6 py-4 whitespace-nowrap text-white">{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-white">
              {txn.from_address.slice(0, 6)}...{txn.from_address.slice(36)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`${
                  txn.from_address.toLowerCase() !== props.result.searchInput.toLowerCase()
                    ? styles.inTxn
                    : styles.outTxn
                }`}
              >
                {txn.from_address.toLowerCase() !== props.result.searchInput.toLowerCase() ? "IN" : "OUT"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-blue-300">
              {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-white">{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
            <td className="px-6 py-4 whitespace-nowrap text-white">{(txn.gas_price / 10 ** 18).toFixed(12)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    </section>
  );
}