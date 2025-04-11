export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (!userStore.isAuthenticated && to.path !== '/login') {
      return navigateTo('/login'); 
    }
  });