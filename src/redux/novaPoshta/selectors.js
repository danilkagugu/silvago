export const selectCities = (state) => state.delivery.cities;
export const selectCurrentCity = (state) => state.delivery.currentCity;
export const selectOffices = (state) => state.delivery.offices;
export const selectCurrentOffice = (state) => state.delivery.currentOffice;
export const selectLoadingCities = (state) => state.delivery.loading.cities;
export const selectLoadingOffices = (state) => state.delivery.loading.offices;
export const selectError = (state) => state.delivery.error;
