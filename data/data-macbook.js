// =========================
const iMacs = [
  {
    id: 11,
    name: 'iMac 24 inch M3',
    image: [
      'https://shopdunk.com/images/thumbs/0022757_silver_550.jpeg',
      'https://shopdunk.com/images/thumbs/0022758_silver_550.jpeg',
      'https://shopdunk.com/images/thumbs/0022759_silver_550.jpeg',
      'https://shopdunk.com/images/thumbs/0022765_silver_550.jpeg',
      'https://shopdunk.com/images/thumbs/0022764_silver_550.jpeg',
    ],
    price: 1446,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  },
  {
    id: 12,
    name: 'Apple MacBook Pro M3 512GB 2023',
    image: [
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/318228/s16/mac-topzone-spacegray-650x650.png',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/318228/s16/apple-macbook-pro-m3-2023-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/318228/s16/apple-macbook-pro-m3-2023-3-650x650.jpg',
      'https://shopdunk.com/images/thumbs/0022637_silver_550.jpeg',
      'https://shopdunk.com/images/thumbs/0022633_silver_550.jpeg',
    ], 
    price: 1170,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  },
  {
    id: 13,
    name: 'Apple MacBook Pro M2 512GB 2023',
    image: [
      'https://shopdunk.com/images/thumbs/0000635_macbook-pro-16-m1-pro-16-core16gb512ssd_550.png',
      'https://shopdunk.com/images/thumbs/0022034_macbook-pro-16-m1-pro-16-core16gb512ssd_550.jpeg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-3-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-4-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-5-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-6-650x650.jpg',
    ], 
    price: 1305,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  },
  {
    id: 14,
    name: 'Apple MacBook Air M3 256GB 2023',
    image: [
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/mac-air-15-xam-new-650x650.png',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-1-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-3-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-4-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-5-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/309016/s16/macbook-air-15-inch-m2-2023-70w-6-650x650.jpg',
    ],
    price: 1106,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  },
  {
    id: 15,
    name: 'Apple MacBook Air M2 512GB 2022',
    image: [
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/mac-air-m2-13-xanh-new-650x650.png',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/apple-macbook-air-m2-2022-16gb-256gb-2-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/apple-macbook-air-m2-2022-16gb-256gb-3-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/apple-macbook-air-m2-2022-16gb-256gb-4-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/apple-macbook-air-m2-2022-16gb-256gb-5-2-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/289472/s16/apple-macbook-air-m2-2022-16gb-256gb-6-2-650x650.jpg',
    ],
    price: 1255,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  },
  {
    id: 16,
    name: 'Apple MacBook Air M1 256GB 2020',
    image: [
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/231244/s16/mac-air-m1-13-xam-new-650x650.png',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/231244/s16/macbook-air-m1-spgry-01-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/231244/s16/macbook-air-m1-spgry-02-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/231244/s16/macbook-air-m1-spgry-03-650x650.jpg',
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/231244/s16/macbook-air-m1-spgry-04-650x650.jpg',
    ],
    price: 2042,
    inCart: false,
    inStar: false,
    TheLoai: 'MacBook'
  }
];

export default iMacs;