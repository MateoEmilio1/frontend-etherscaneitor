export const CustomTooltip = (props) => {
    const { payload, active } = props;

    if (!active || !payload) return null;

    const seenValues = new Set();
    const uniquePayload = payload.filter((category) => {
        if (seenValues.has(category.value)) {
            return false;
        } else {
            seenValues.add(category.value);
            return true;
        }
    });

    return (
        <div className="w-56 mt-14 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
            {uniquePayload.map((category) => (
                <div key={category.value} className="flex flex-1 space-x-2.5">
                    <div
                        className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
                    />
                    <div className="space-y-1">
                        <p className="text-tremor-content">{category.dataKey}</p>
                        <p className="font-medium text-tremor-content-emphasis">
                            {category.value}{" "}
                            {/* <button onClick={copyBlockNumberToClipboard(category.value)}>
                  {" "}
                </button> */}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};