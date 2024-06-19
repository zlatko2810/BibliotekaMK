import bookConstants from "./constants";

export const onBookChange = () => ({
  type: bookConstants.CHANGE_ON_BOOK,
});

export const onBookResetChange = () => ({
  type: bookConstants.RESET_CHANGE_ON_BOOK,
});