declare module '*.css' {
  const content: any;
  export default content;
}

// Explicitly declare Swiper CSS modules
declare module 'swiper/css' {}
declare module 'swiper/css/pagination' {}
declare module 'swiper/css/navigation' {}