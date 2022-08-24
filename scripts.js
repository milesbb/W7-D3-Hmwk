let isFiltered = false;

const loadBooks = async () => {
  const response = await fetch("https://striveschool-api.herokuapp.com/books", {
    method: "GET",
  });
  const data = await response.json();
  const books = data;
  console.log(books);

  if (isFiltered) {
    let query = document.getElementById("queryInput").value;
    document.getElementById("queryInput").value = "";
    let newBooks = [];
    if (query.length > 3) {
      for (let i = 0; i < books.length; i++) {
        if (books[i].title.includes(query)) {
          newBooks.push(books[i]);
        }
      }
      console.log("FILTERED!!");
      console.log(newBooks);
      const MAIN_ROW = document.querySelectorAll("#mainRow");
      MAIN_ROW.innerHTML = "";
      setCards(newBooks);
    } else {
      alert("Please type more than 3 characters");
    }
  } else if (isFiltered == false) {
    setCards(books);
  }
};

const filterBooks = async () => {
  isFiltered = true;
  console.log("FILTER REQUEST");
  await loadBooks();
};

let shoppingCart = [];

const setCards = (books) => {
  const MAIN_ROW = document.querySelectorAll("#mainRow");
  MAIN_ROW.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    MAIN_ROW[0].innerHTML += `
        <div class="col-md-4">
        
        <div class="card mt-3" style="width: 18rem">
        <span class="badge badge-success position-absolute display-6 d-none">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-basket"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
              />
            </svg>
        </span>
          <img class="card-img-top" src="..." alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              <p class="category">Category: </p>
              <p class="price">Price: </p>
            </p>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-basket mr-2 mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                Add to Cart
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
        `;
  }

  const CARD_IMGS = document.querySelectorAll(".card > img");
  const CARD_TITLES = document.querySelectorAll(".card-title");
  const CARD_PRICES = document.querySelectorAll(".price");
  const CARD_CATEGORY = document.querySelectorAll(".category");

  CARD_IMGS.forEach((elem, i) => {
    elem.src = books[i].img;
  });
  CARD_TITLES.forEach((elem, i) => {
    elem.innerHTML = books[i].title;
  });
  CARD_PRICES.forEach((elem, i) => {
    elem.innerHTML = "Price: £" + books[i].price.toString();
  });
  CARD_CATEGORY.forEach((elem, i) => {
    elem.innerHTML = "Category: " + books[i].category;
  });

  const ADD_BUTTONS = document.querySelectorAll(
    ".btn-group > .btn:first-child"
  );
  const ADDED_BADGES = document.querySelectorAll(".badge");

  ADD_BUTTONS.forEach((elem, i) => {
    elem.addEventListener("click", () => {
      ADDED_BADGES[i].classList.toggle("d-none");
      shoppingCart.push(books[i]);
      const LIST_CONT = document.getElementById("shopListCont");
      LIST_CONT.innerHTML = "";
      for (let v = 0; v < shoppingCart.length; v++) {
        LIST_CONT.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">${books[v].title}</div>
                    ${books[v].category}
                  </div>
                  <span class="badge bg-primary rounded-pill text-white">£${books[
                    v
                  ].price.toString()}</span>
        </li>
        `;
      }
      const CART_TOTAL = document.getElementById("cartItems");
      CART_TOTAL.innerText = "Cart Items: " + shoppingCart.length.toString();
    });
  });

  const SKIP_BUTTONS = document.querySelectorAll(
    ".btn-group > .btn:last-child"
  );
  const CARDS = document.querySelectorAll(".card");
  SKIP_BUTTONS.forEach((elem, i) => {
    elem.addEventListener("click", () => {
      CARDS[i].remove();
    });
  });
};

const EMPTY_BUTTON = document.getElementById("emptyCart");
EMPTY_BUTTON.addEventListener("click", () => {
  shoppingCart = [];
  const LIST_CONT = document.getElementById("shopListCont");
  LIST_CONT.innerHTML = "";
  const ADDED_BADGES = document.querySelectorAll(".badge");
  ADDED_BADGES.forEach((elem) => elem.classList.add("d-none"));
});

window.onload = () => {
  loadBooks();
};

console.log("Loaded");
