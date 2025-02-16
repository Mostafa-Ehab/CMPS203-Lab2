var items = [],
    transactions = [],
    categories = [],
    fields = {};

const Action = {
    ADD: "add",
    EDIT: "edit",
    REMOVE: "remove",
    SELL: "sell",
    RESTOCK: "restock",
    SEARCH: "search",
}
//rename
function doStaff(action, parameter) {
    switch (action) {
        case Action.ADD:
            addItem(parameter);
            break;
        case Action.EDIT:
            editItem(parameter);
            break;
        case Action.REMOVE:
            removeItem(parameter);
            break;
        case Action.SEARCH:
            searchItem(parameter);
            break;
    }
}

function addItem(item) {
    items.push(item)
    if (!categories.includes(item.category)) {
        categories.push(item.category)
    };

    transactions.push({
        type: "Add",
        item: { ...item }
    });
}

function editItem(item, index) {
    items[index] = { ...items[index], ...item }
    transactions.push({
        type: "edit",
        old: index,
        new: { ...items[index] }
    })
}

function removeItem(index) {
    let item = items[index]
    items = items.splice(index, 1)
    transactions.push({
        type: "delete",
        itm: { ...item }
    })
}

function searchItem(queryItem) {
    let item = items.filter(item => [item.name, item.category, item.price]
        .some(item => item
            .toString()
            .toLowerCase()
            .includes(
                queryItem.toLowerCase()
            )
        )
    );
    console.log(item);
    return item;
}

function viewItems() {
    console.log(`=== Inv ===\n${items}`);
}

function exportAll() {
    console.log(
        "CSV:\n" +
        ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(
            items.map(item => Object.values(item).join(','))
        ).join('\n')
    );
}

function viewAllTransactions() {
    console.log(`Transactions:\n${transactions}`);
}

function viewIAg() {
    console.log(
        items.map(
            item => `${item.name}: ${Math.floor(
                (new Date() - new Date(item.added)) / (1000 * 60 * 60 * 24)
            )}d`
        ).join('\n')
    );
}

function importItem(itemsToAdd) {
    itemsToAdd.forEach(
        item => addItem(item)
    )
}

function addField(field) {
    fields[field] = null;
}

function sell(itemName, quantity) {
    let itemIndex = searchItem(itemName);
    let item = items[itemIndex];
    editItem(item, { quantity: item.quantity - quantity })
    console.log(`Sold ${quantity} ${item.unit} of ${item.name}`);

    if (item.quantity < 10) {
        console.log(`**ALERT: Item ${item.name} is below 10 units! Current quantity: ${item.quantity}**`)
    }
}

function restock(itemName, quantity) {
    let itemIndex = searchItem(itemName);
    let item = items[itemIndex];
    editItem(item, { quantity: item.quantity + quantity })
    console.log(`Restocked ${quantity} ${item.unit} of ${item.name}`);
}
