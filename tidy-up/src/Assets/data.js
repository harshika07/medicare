// const data = {
//   products: [
//     {
//       id: "1",
//       name: "cbc",
//       price: 1200,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "2",
//       name: "CBC",
//       price: 1800,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "3",
//       name: "ESR",
//       price: 1200,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "4",
//       name: "Lipid Profile",
//       price: 1900,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "5",
//       name: "Lipid Profile",
//       price: 1100,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "6",
//       name: "Covid2",
//       price: 500,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//     {
//       id: "7",
//       name: "Covid3",
//       price: 200,
//       description:
//         "Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.",
//       paragraph: "this is also a random para dont see here",
//     },
//   ],
// };

// export default data;

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
var result = range(400001, 400099);
console.log(result);

const pincodes = [
  230532,
  400101,
  400102,
  400103,
  400104,
  400603,
  400610,
  400610,
  400615,
  400708,
  ...result,

  // 400029, 400065, 400011, 400099, 400004, 400053, 400069, 400058, 400037,
  // 400005, 400053, 400003, 400051, 400050, 400051, 400090, 400001, 400012,
  // 400007, 400028, 400091, 400066, 400092, 400013, 400020, 400030, 400093,
  // 400012, 400067, 400004, 400009, 400011, 400020, 400005, 400033, 400026,
  // 400014, 400068, 400052, 400066, 400013, 400017, 400010, 400026, 400008,
  // 400004, 400028, 400062, 400063,
];
//Cumballa Hill
export default pincodes;
