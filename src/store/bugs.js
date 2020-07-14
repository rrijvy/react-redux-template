import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: 1,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs.splice(index, 1);
    },
    bugAssignedToUser: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.bugId);
      bugs[index].userId = action.payload.userId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
} = slice.actions;
export default slice.reducer;

// Selectors - created with reselect with memoization feature
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.resolved !== true)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// // Actions
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // Reducer
// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: 1,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },
//   [bugRemoved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state.splice(index, 1);
//   },
// });
