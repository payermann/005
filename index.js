import { question, questionInt, keyInSelect } from "readline-sync";

const products = {
  Laptop: 999.99,
  Smartphone: 499.99,
  Kopfhoerer: 99.99,
  Monitor: 199.99,
  Tastatur: 49.99,
  Maus: 29.99,
  Mauspad: 9.99,
  "USB-Stick": 19.99,
  "Externe Festplatte": 79.99,
  Drucker: 149.99,
};
let sum = 0;
let products_bought = {};
const products_names = Object.keys(products);
let products_names_with_prices = [];
for (const product_name of products_names) {
  products_names_with_prices.push(
    `${product_name} - ${products[product_name]} EUR`
  );
}
const products_length = products_names.length;

console.log("Willkommen im Online-Shop!");
const name = question("Wie lautet dein Name? ");
console.log(`Hallo ${name}! Hier sind unsere Produkte:`);

while (true) {
  const product = keyInSelect(
    products_names_with_prices,
    "Welches Produkt kaufst du?"
  );
  if (product === -1) {
    break;
  }
  if (product >= 0 && product < products_length) {
    console.log(
      `Du hast ${products_names[product]} für ${
        products[products_names[product]]
      }€ ausgewählt.`
    );
    const amount = questionInt("Wie viele kaufst du? ");
    sum =
      Math.ceil((sum + products[products_names[product]] * amount) * 100) / 100;
    console.log(
      `Du hast ${amount}x ${products_names[product]} für ${
        products[products_names[product]] * amount
      }€ gekauft.`
    );

    if (products_bought[products_names[product]]) {
      products_bought[products_names[product]] = {
        quantity: products_bought[products_names[product]].quantity + amount,
        price: products[products_names[product]],
        amount:
          Math.ceil(
            (products_bought[products_names[product]].amount +
              amount * products[products_names[product]]) *
              100
          ) / 100,
      };
    } else {
      products_bought[products_names[product]] = {
        quantity: amount,
        price: products[products_names[product]],
        amount: amount * products[products_names[product]],
      };
    }
  } else {
    console.log("Fehler: Ungültige Produktauswahl!");
    continue;
  }

  console.log("Dein Warenkorb:");
  console.table(products_bought);
  console.log(`Gesamtsumme: ${sum}€`);

  const buy_more = keyInSelect(["Ja", "Nein"], "Weitere Produkte kaufen?");
  if (buy_more === 1) {
    console.log(`Vielen Dank für deinen Einkauf, ${name}!`);
    if (sum > 1000) {
      console.log(
        `Rabatt-Aktion!: 10% Rabatt!\n\
        Neuer Gesamtpreis nach Rabatt: ${Math.ceil(sum * 0.9 * 100) / 100}€`
      );
    }
    break;
  }
}
