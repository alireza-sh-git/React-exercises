import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.purpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
        state.isLoading = false;
      },
    },
    payLoan(state) {
      if (state.loan > 0) return;
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.purpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  else
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      const res = await fetch("https://api.frankfurter.dev/v1/latest?base=USD");
      const data = await res.json();
      const converted = data.rates[currency] * amount;
      return dispatch({ type: "account/deposit", payload: converted });
    };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//         isLoading: false,
//       };
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/requestLoan":
//       return {
//         ...state,
//         loan: action.payload.amount,
//         purpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//         isLoading: false,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   else
//     return async function (dispatch, getState) {
//       dispatch({ type: "account/convertingCurrency" });
//       const res = await fetch("https://api.frankfurter.dev/v1/latest?base=USD");
//       const data = await res.json();
//       const converted = data.rates[currency] * amount;
//       return dispatch({ type: "account/deposit", payload: converted });
//     };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { purpose, amount },
//   };
// }
// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
