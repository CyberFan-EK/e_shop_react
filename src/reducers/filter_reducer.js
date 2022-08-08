import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let arrPrice = action.payload.map((p) => p.price);
    let maxPrice = Math.max(...arrPrice);
    let minPrice = Math.min(...arrPrice);

    return {
      ...state,
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: {
        ...state.filters,
        min_price: minPrice,
        price: maxPrice,
        max_price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    const tempsortProducts = [...filtered_products];

    if (sort === "price-lowest") {
      return {
        ...state,
        filtered_products: tempsortProducts.sort((a, b) => {
          return a.price - b.price;
        }),
      };
    } else if (sort === "price-highest") {
      return {
        ...state,
        filtered_products: tempsortProducts.sort((a, b) => {
          return b.price - a.price;
        }),
      };
    } else if (sort === "name-a") {
      return {
        ...state,
        filtered_products: tempsortProducts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        }),
      };
    } else {
      return {
        ...state,
        filtered_products: tempsortProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        ),
      };
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    let tempProducts = [...all_products];

    const { text, category, company, colors, price, shipping } = state.filters;
    console.log(state);
    if (text) {
      tempProducts = tempProducts.filter((item) => {
        // we can use also methos startsWith() instead of includes
        return item.name.toLowerCase().includes(state.filters.text);
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.company === company;
      });
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.category === category;
      });
    }
    if (colors !== "all") {
      tempProducts = tempProducts.filter((item) => {
        return item.colors.includes(colors);
      });
    }

    tempProducts = tempProducts.filter((item) => {
      return item.price <= price;
    });
    if (shipping) {
      tempProducts = tempProducts.filter((item) => {
        return item.shipping === true;
      });
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filtered_products: state.all_products,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        colors: "all",

        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
