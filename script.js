// ---------------------------------------------------------------------------
// Prefecture geometry data.
// Each entry: { id, name, path, transform? }
// - path/coordinates are derived from a real geographic source (not hand
//   drawn approximations).
// - Okinawa's coordinates sit far outside the main archipelago in true
//   relative position, so (like on almost every printed map of Japan) it is
//   shown as a scaled inset in the corner via its own "transform".
// - state: 0 = grey, 1 = yellow, 2 = yellow/red stripes, 3 = red
// ---------------------------------------------------------------------------

const SVG_NS = "http://www.w3.org/2000/svg";

const PREFECTURES = [
  { id: "hokkaido", name: "Hokkaido", path: "M591 250l-1 6h-3v-9l6 -2zM620 271l-1 -11 -4 -7 -5 -1 -2 -5 -4 -1 -2 -5 4 -8 -1 -11 2 -3 8 -2 6 -9 3 4 2 -1 4 -9 6 -5 -9 -13v-7l7 -3 14 11 10 -3v3l7 2 6 -2 5 -10 -5 -24 2 -5 8 -4 4 -5 -1 -23 4 -8 1 -11 -3 -17 -8 -19 3 -10 -1 -6 2 3h5l6 -8 26 28 8 13 16 17 29 18 28 6 1 4 6 5h19l22 -27 2 5 -11 24v9l4 6 9 3 -2 2 2 -3h-6l4 13 6 6 5 1 6 -8 8 -1 -11 8 -1 7 -17 3 -2 6 -5 5h-5l-2 -2 1 -2 -2 -1 -4 6 3 2 -15 1 -8 -3 -15 8 -14 16 -8 14 -3 8v16l-2 8 -14 -12 -23 -8 -28 -18 -13 -2 4 -2 -16 8 -15 15 -4 -2 4 -1 -5 -1 -2 -6 -8 -7h-10l-6 8 -3 9 1 5 12 8 10 -1 10 12 8 4 2 3 -6 5 -4 1 -9 -4 -3 3v-5h-3l-2 5 -7 4v9l-8 3 -3 6 -8 -3 -2 -7 1 -9zM659 58l2 -2 4 1 2 5 -4 4 -4 -4zM653 45v-1l2 2 -1 9 -4 -10zM957 29l-2 -5h-2l-2 4 2 7 -1 3 -5 1 -2 8 -7 -2 1 7 -10 10 -1 4 -5 -1v3l4 1v4l-4 4 -4 -1 1 5 -3 -4 1 5 -3 7 4 1 4 -9 6 -1 4 -9 10 -9 3 -10 5 2 6 -1 15 -18 13 -9 9 -1 1 -4 -2 -3 2 -4 -5 -2 -6 2 -12 17 -11 3zM878 110l5 -6 8 -2 5 -6 3 1 3 -7 -11 3 -7 -5 -4 2 -3 11 -10 14v3l-13 15 2 7 5 -1v5l1 -14 8 -4 1 -6h3v-7zM910 136l11 -9 -4 -3 -4 3 1 2 -7 1v4l2 -1zM888 154l3 -5 -6 1zM878 157l2 -2h-4z" },
  { id: "aomori", name: "Aomori", path: "M613 358v-7l-4 -4 7 -8h5l7 -4 2 -16 -3 -5 3 -1 1 -7 6 5 4 -3 4 2 2 15 3 7 6 -3 -1 -4 2 -4 11 8 3 -2 4 -16 -4 -7 -6 6 -14 3 6 -26 17 12 9 -5 -3 31 3 14 4 11 4 -1 5 5 -6 7 -5 -1 -4 2 -2 -2 -14 10 -3 -2 1 -11 -5 1v-6l-11 7 -3 -2 -2 2 -7 -5 -3 3 -13 -1 -2 3z" },
  { id: "iwate", name: "Iwate", path: "M698 447l-7 -1 -2 13 -7 -2 -3 5 -7 -5 2 -3h-7l-11 -5 2 -6 -3 -5 2 -3 -8 -13 4 -11 4 -5 -2 -5 3 -4 -3 -5h4l-1 -19 4 -5 3 2 14 -10 2 2 4 -2 5 1 6 -7 7 12 -1 4 4 3 -2 5 7 5 2 14 -2 11 4 -5v5l2 2 -5 5 1 2 4 -3 -1 4h-3l-1 4 -2 1 4 -1 -5 3 2 3 -2 1h4l-6 7 4 2h-5l3 3h-3l2 2 -6 1v-3l1 4h-2v4l-1 -4z" },
  { id: "miyagi", name: "Miyagi", path: "M666 515l-4 1 1 5h-5l1 2 -5 -1 -1 -6h-9l-4 -5h-6l-1 -5 7 -1 3 -7v-5l7 -12 -5 -11 3 -1 2 -8 -5 -7h5l6 -5 11 5h7l-2 3 7 5 3 -5 7 2 2 -13 7 1 2 7 -5 -3 2 5 -4 4 2 5 -2 -2 -4 3 5 2 -4 6h4v3l-3 -2 2 5h-3l1 3h4l-3 1 3 3 -1 4 -4 -3 1 -2h-2l2 -1 -2 -2 -17 2 -2 4 3 1 -4 2h2l-5 10zM676 487l1 1h-2z" },
  { id: "akita", name: "Akita", path: "M656 449l-6 5h-5l-4 -2 -2 -4 -13 -4 -5 -5 -9 1 2 -9 5 -9 1 -23 -7 -7 -8 2 -3 -8 6 2 6 -8 4 -8v-8l-5 -6 4 1 2 -3 13 1 3 -3 7 5 2 -2 3 2 11 -7v6l5 -1 -1 11 -4 5 1 19h-4l3 5 -3 4 2 5 -4 5 -4 11 8 13 -2 3 3 5z" },
  { id: "yamagata", name: "Yamagata", path: "M612 440l9 -1 5 5 13 4 2 4 4 2 5 7 -2 8 -3 1 5 11 -7 12v5l-3 7 -7 1 1 5 -1 9 2 2 -3 4 -6 1 -3 -3 -3 1 -3 -4 -6 2 -7 -3 -2 -4 3 -9 -1 -7 9 -4 2 -4 -10 -6 1 -7 -9 -3 13 -22z" },
  { id: "fukushima", name: "Fukushima", path: "M661 580l-10 -5v5l-6 5 -10 -8 -1 -6 -6 -5 -12 -3 -25 16 -8 -2 1 -14 -5 -4 4 -7 -2 -4 1 -3h9l1 -4h8l-2 -8 9 -11 -3 -2 7 3 6 -2 3 4 3 -1 3 3 6 -1 3 -4 -2 -2 1 -9h6l4 5h9l1 6 5 1 -1 -2h5l-1 -5 4 -1 6 15v26l-2 17z" },
  { id: "ibaraki", name: "Ibaraki", path: "M611 630v0h-2l-2 -7 6 -3 2 -4 3 1 3 -5 11 -2 3 -7 -2 -11 3 -2 -2 -3 1 -10 10 8 6 -5v-5l10 5 -8 24 1 7 -3 6 2 11 5 8 -2 3 2 3 1 -5 7 13 -17 -13 -1 3 -17 5 -11 -6z" },
  { id: "tochigi", name: "Tochigi", path: "M607 623h-1l-2 -4h-9l-5 -7 6 -13 -8 -2 1 -9 3 -4 -3 -1 2 -4 25 -16 12 3 6 5 1 6 -1 10 2 3 -3 2 2 11 -3 7 -11 2 -3 5 -3 -1 -2 4z" },
  { id: "gunma", name: "Gunma", path: "M606 623l-11 1 -5 -4 -11 -2 -5 10 -16 9 -4 -2v-6l-3 -3h3l-2 -7 3 -2 -1 -6h-9l-3 -5 1 -7 5 -4 -1 -2 9 -3 12 -6v-3l3 -1 -1 -5 4 -1 2 -4 7 7 8 2 -2 4 3 1 -3 4 -1 9 8 2 -6 13 5 7h9z" },
  { id: "saitama", name: "Saitama", path: "M606 623h1l2 7h2v0l7 13v6l-7 -2 -1 2 -4 -1 -6 3v-3l-8 3 -4 -5 -15 -3 -4 2 -10 -3 -1 -5 16 -9 5 -10 11 2 5 4z" },
  { id: "chiba", name: "Chiba", path: "M617 658l2 -4 -1 -5v-6l-7 -13 9 9 11 6 17 -5 1 -3 17 13 1 3 -10 1 -11 10 -3 22 -13 4 -11 14 -7 -4 5 -2 -3 -2 2 -3 -1 -6 2 -4 -4 -5 3 -4 3 1v-4l6 -2 5 -7 -7 -7 -5 4z" },
  { id: "tokyo", name: "Tokyo", path: "M618 815v5l-5 -6zM603 756l-2 2 -3 -2 3 -3zM581 746l2 2 -3 1zM588 740l-2 -2 2 -4zM592 717v-6l4 2v5zM618 649l1 5 -2 4 -6 -1 2 5h-4h4v3l-14 -7 -4 2 3 2h-1l-1 5 -3 -5 -14 -5 -5 -3 -5 -9 4 -2 15 3 4 5 8 -3v3l6 -3 4 1 1 -2z" },
  { id: "kanagawa", name: "Kanagawa", path: "M579 657l14 5 3 5 1 -5h1l-3 -2 4 -2 14 7 -4 4h-4l3 4 -3 -1v8l6 2 -5 5 2 2h-4l1 -4 -3 -5 -7 -2 -12 3 -3 3 1 6h-2l-7 -4 1 -12h-5l10 -9z" },
  { id: "niigata", name: "Niigata", path: "M510 589l-3 -11 -4 -3 14 -5 9 -7h7l15 -12 10 -15 5 -13 19 -13 1 3 -1 -2 7 -6 8 -29 9 3 -1 7 10 6 -2 4 -9 4 1 7 -3 9 2 4 3 2 -9 11 2 8h-8l-1 4h-9l-1 3 2 4 -4 7 5 4 -1 14 -7 -7 -2 4 -4 1 1 5 -3 1v3l-12 6v-7l-5 -4v-4l-3 -3 -7 2 -5 6v4l-4 -2 -8 5 -2 -2v-5l-7 -1v3zM539 522l-8 1 7 -9 -2 -3 -3 2v-5l4 -9 10 -8 -4 15 7 1 -4 9z" },
  { id: "toyama", name: "Toyama", path: "M501 612l-10 -4 -4 2v-2l-5 2 -3 -2 -9 11 -1 -4 -4 -2 -4 5 -1 -9 2 -7 -2 -4 3 -4 -2 -3 3 -2 2 -10 8 -3 -3 7 12 7 8 -4 2 -8 10 -3 4 3 3 11 -1 11 -3 1 1 3z" },
  { id: "ishikawa", name: "Ishikawa", path: "M470 567l-3 -3h7zM461 618l3 3 -5 10 -5 1 -5 -5 -10 -1 -6 -9 14 -14 12 -18 1 -11 -2 -4v-5l-3 -1 5 -13 25 -10 4 1 1 4 -6 1 -1 9 -4 -1 -7 7 -2 -3 -3 1 -2 9 6 2 3 -4v9l-8 3 -2 10 -3 2 2 3 -3 4 2 4 -2 7z" },
  { id: "fukui", name: "Fukui", path: "M433 617l6 9 10 1 5 5 5 -1 -2 6 5 8 -2 4h-13l-1 3 -7 -3 -5 8 -6 -2 1 8 -3 -1 -1 3 -5 3 -3 -2 -3 7 -4 -1 -2 4 -12 -2 -4 -6 2 -5 2 4 7 -3 -4 3 6 1 3 -3h-2l-1 -3 6 3 -1 -3 3 -1 -2 -3 8 1 -1 -6 3 -3v6l3 1 1 -7 -7 -13 9 -13v-4z" },
  { id: "yamanashi", name: "Yamanashi", path: "M533 659l-2 -5 3 -2 -3 -3 9 -11 6 5 6 -2 4 4 3 -3 10 3 5 9 5 3 -1 8 -10 9 -12 3 -5 -6 -3 8 1 7 -5 2 -4 -9 -6 -1 1 -11z" },
  { id: "nagano", name: "Nagano", path: "M556 590l-9 3 1 2 -5 4 -1 7 3 5h9l1 6 -3 2 2 7h-3l3 3v6l4 2 1 5 -3 3 -4 -4 -6 2 -6 -5 -9 11 3 3 -3 2 2 5 -4 5v12l-16 10 -8 -2 -5 3 -1 -6 2 -3 -1 -4h3l-2 -3 2 -4 -6 -6 2 -3 -5 -7 -7 -3 3 -5h5l6 -7 1 -4 -3 -4 5 -10 -3 -6 6 -8 -1 -3 3 -1 1 -11 5 -7v-3l7 1v5l2 2 8 -5 4 2v-4l5 -6 7 -2 3 3v4l5 4z" },
  { id: "gifu", name: "Gifu", path: "M501 612l3 6 -5 10 3 4 -1 4 -6 7h-5l-3 5 7 3 5 7 -2 3 6 6 -2 4 2 3h-3l1 4 -2 3 -6 4 -7 -4 -6 2 -5 -2 -6 -8 -10 3 -5 8v6l-7 -7 -6 2 -2 -2 3 -9v-3l-3 -7h-3l-2 -7 5 -8 7 3 1 -3h13l2 -4 -5 -8 2 -6 5 -10 -3 -3 4 -5 4 2 1 4 9 -11 3 2 5 -2v2l4 -2z" },
  { id: "shizuoka", name: "Shizuoka", path: "M568 674h5l-1 12 7 4 -3 5 5 6 -1 4 -7 10v5l-8 4 -5 -6 2 -14 -1 -3 1 -4 6 -1 -11 -6 -7 3 -3 4 1 3 -8 4 -3 9 -5 7 1 4 -13 -4 -25 -1v-8l8 -5 10 -20 16 -10v-12l4 -5 2 8 -1 11 6 1 4 9 5 -2 -1 -7 3 -8 5 6z" },
  { id: "aichi", name: "Aichi", path: "M495 719l-24 6 3 -5 2 2 9 -6 1 3 3 -3 -1 -3 -6 -3 -2 4 -8 -1 -4 -3 2 -8 -4 11 3 4h-2l-5 -3 2 -5 -3 -3v-5l4 -7 -6 3 -5 -7v-6l5 -8 10 -3 6 8 5 2 6 -2 7 4 6 -4 1 6 5 -3 8 2 -10 20 -8 5z" },
  { id: "mie", name: "Mie", path: "M418 778l-5 -3 -2 -7 1 1v-3h1l6 -3 -1 -3 6 -1v-3l-1 -7 2 -4 -2 -3 2 -1 -3 -5 9 -6 -10 -6 2 -3 -2 -2h2l-1 -4 -2 -4 4 -1 1 -6 7 3 6 -3 4 -10 -1 -9 6 -2 7 7 5 7 -6 2v4l-7 12v8l16 7 2 5 2 -2v5h-5h5l-1 6h-3l1 -1 -3 -2v2h-6l2 -3h-3l-3 5 -1 -2 -2 2 -2 -1v3l-2 -2 -8 3 -2 3 1 4h-3l1 -2 -3 3 4 3 -2 1 1 3 -3 -2 1 3 -7 4z" },
  { id: "shiga", name: "Shiga", path: "M434 657l2 7h3l3 7v3l-3 9 2 2 1 9 -4 10 -6 3 -7 -3 -1 6 -4 1 -4 -6h-4l-2 -10 2 -15 -4 -4 2 -4 4 1 3 -7 3 2 5 -3 1 -3 3 1 -1 -8z" },
  { id: "kyoto", name: "Kyoto", path: "M405 712l-2 -8 -4 -2v-2l-3 3 -9 -8 1 -6 -9 -2 -2 -6 -5 1 -7 -5v-6l6 1v-7v-2l-6 2 -3 -5 1 -4 2 3 -1 -3 17 -7 4 7 -8 6 2 2 3 -4 -1 4 5 1 -1 4 2 -2 2 1 -3 -5 7 -3 1 3 -2 5 4 6 12 2 4 4 -2 15 2 10h4l4 6 2 4 -2 1 -5 -3 -4 3z" },
  { id: "osaka", name: "Osaka", path: "M387 695l9 8 3 -3v2l4 2 2 8 -4 10 2 10 -2 4 -26 6 -3 -2 6 -2 7 -6 3 -10 3 3 -3 -9 3 -2 -2 -11 3 -1 -6 -2 -1 -5z" },
  { id: "hyogo", name: "Hyogo", path: "M360 744l-7 3 -1 -4 -3 1v-4l19 -19 1 3 -7 9 2 9zM333 713l1 -3 -4 -5 2 -3 -2 -7 8 -9v-5l6 -2v-5l-7 -17 9 -3 17 2 -1 4 3 5 6 -2v2v7l-6 -1v6l7 5 5 -1 2 6 9 2 -1 6h-2l1 5 6 2 -3 1 2 11 -3 2 -5 -1 -13 5 -15 -9h-14l-1 -3 -2 5 -3 -2z" },
  { id: "nara", name: "Nara", path: "M418 760l-4 2 -1 4h-1v3l-1 -1 -14 -2 2 -5 -4 -7 5 -7 4 -1 -3 -10 2 -4 -2 -10 4 -10 6 4 4 -3 5 3 2 -1 1 4h-2l2 2 -2 3 10 6 -9 6 3 5 -2 1 2 3 -2 4 1 7v3z" },
  { id: "wakayama", name: "Wakayama", path: "M411 768l2 7 5 3 -4 5 2 4 -9 5 -1 3h-1v-2l-16 -5 -6 -8 4 -3 -9 -4 -5 -6h-4l3 -5 -2 -1 5 -3 -4 -3 3 -2 -1 -2 5 -1 -8 -7 2 -3 3 2 26 -6 3 10 -4 1 -5 7 4 7 -2 5zM418 760l1 3 -6 3 1 -4z" },
  { id: "tottori", name: "Tottori", path: "M280 690l-7 -2 3 -5 -2 -4 8 -2 1 -9 -6 -8 3 -1 2 4 6 2 8 -4 11 2 21 -1 9 -5 7 17v5l-6 2 -12 4 -1 -7 -7 -2 1 -3 -10 6 -4 -4 -8 -2 -2 6 -3 1 1 3 -6 -1v4l-6 1z" },
  { id: "shimane", name: "Shimane", path: "M269 624l5 -2 -3 5 -3 -2 1 3 -3 -3zM275 626l-3 2v-4l3 -1 2 3zM279 615l5 -6 5 5 -1 4 -3 1 2 2h-5zM198 709l8 -2 14 -14 11 -6 6 -8 11 -5 2 -6 -2 -3 18 -5 6 -5 3 3h8l-3 1 -3 1 6 8 -1 9 -8 2 2 4 -3 5 -13 -2 -7 9 -6 3 3 4 -8 2 -6 -2 -2 3 -8 -2 -6 5 2 2 -2 6 -5 5 1 2 -3 2v4l-3 4 -2 -2 -5 2 -3 -4 2 -5h-5l-1 -4 3 -5z" },
  { id: "okayama", name: "Okayama", path: "M338 681v5l-8 9 2 7 -2 3 4 5 -1 3 -7 -1 3 2 -7 7 -9 -1 5 2 -2 4 -2 -1 -2 4 -5 -2 -2 3 -3 -6v4l-3 -5 -4 4 -6 -3 2 4 -4 -2 -4 -16 2 -4 -4 -6 1 -7 -2 -3 1 -3 6 -1v-4l6 1 -1 -3 3 -1 2 -6 8 2 4 4 10 -6 -1 3 7 2 1 7z" },
  { id: "hiroshima", name: "Hiroshima", path: "M287 726v2l-3 -2 3 3h-2l-2 4 -6 -2v-3l-9 2 -2 5h-13l-2 4 -6 3 -2 -2 -3 2 1 -3 -3 -6 1 -2h-8l-7 6 1 3 -6 -2v-6l-3 -2v-7l-1 -2 5 -5 2 -6 -2 -2 6 -5 8 2 2 -3 6 2 8 -2 -3 -4 6 -3 7 -9 13 2 7 2 2 3 -1 7 4 6 -2 4zM260 740l-3 2 -2 -2 5 -3zM236 740l-1 -4 3 1 -1 8h-3l1 -3 -4 -5zM229 734l1 2 -4 3zM249 744l-2 -2h4zM239 744h2l-2 3h3l-2 2 -5 -1 3 -6h2zM273 735l1 3 -3 -3zM271 736l-4 3 1 -3zM275 730l1 1 -3 2z" },
  { id: "yamaguchi", name: "Yamaguchi", path: "M198 709l1 6 -3 5 1 4h5l-2 5 3 4 5 -2 2 2 3 -4v-4l3 -2v7l3 2v6l6 2 -1 5h-2v8l-5 3 1 7 -4 -6h-5l-5 -6 -4 2 2 -3 -4 -3 -10 4 -4 -3 -2 3v-2l-2 2v-4l-2 5 -5 2 -2 -2 -2 2 -2 -5 -5 -4 -7 7v-7l-2 -4 4 -6 -3 -5 2 -4h7l-5 -2 2 -3 8 2 1 3h8l6 -2 -1 -3 11 -11 3 1zM217 763l-5 2 2 -4zM228 759l7 -2 -5 2v3l-4 -3 -5 3 -1 -5 2 -2zM171 724l-1 -2 5 1zM204 755h-3l3 -3z" },
  { id: "tokushima", name: "Tokushima", path: "M346 745l2 -1 -1 3zM338 745l7 -1v2l3 1 -4 9 7 7 -4 5 6 1 -19 11 -5 6 -5 -1 -3 -4 2 -3 -6 -1 -1 -9 -6 2 -13 -6 1 -8 10 -5 6 2 10 -6 12 2z" },
  { id: "kagawa", name: "Kagawa", path: "M298 756l-4 -2 3 -9 -5 -5 6 3 14 -10 7 3 4 -3 1 4 2 -2 3 2v3l9 5 -2 4 -12 -2 -10 6 -6 -2zM319 728l-1 -1h3zM333 723h2l-2 8 -3 -1 1 -2 -4 4 1 -4 -4 -2z" },
  { id: "ehime", name: "Ehime", path: "M243 757l-2 -1 4 -3zM264 742h-4l4 -6 3 3zM269 741l2 1 -2 1 -3 -1zM267 746l-3 2 1 -5 4 1zM242 821l-8 -2 1 3h-3l1 -5 4 1 -6 -5 2 -1 -2 -4h4l-4 -1 2 -2 -3 -2 4 3 4 -4 -1 -3h-3l2 -3h-8l3 -2 -2 -2 2 -5 -6 -1 -8 6 -7 1 34 -20 7 -18 8 -4 -1 -4 2 -1 9 14 10 -4 10 2 5 -4 4 2 -1 8 -25 4 -6 9 -4 10 -11 1 5 9 -6 3 -5 8 -4 -3 3 13z" },
  { id: "kochi", name: "Kochi", path: "M297 764l13 6 6 -2 1 9 6 1 -2 3 3 4 5 1 -7 19 -12 -16 -10 -3 -9 2 -1 -3 1 3 -12 4h6l-6 1 -1 3 -2 -3 -3 5 1 4 -2 6h-3l-4 8 -5 1v8l-3 3 3 7 -4 -5 -7 3 -5 -4 -4 2 2 -6 3 -1v-3h-3l2 -3 -3 -13 4 3 5 -8 6 -3 -5 -9 11 -1 4 -10 6 -9zM237 833l-2 2v-4z" },
  { id: "fukuoka", name: "Fukuoka", path: "M148 804l-8 -5 -2 4 -4 -1 -4 4v3l-5 -1v-5l-2 -3 1 -7 9 -5v-6l-6 2 -7 -6h-12l6 -4 -3 -3 6 -5 3 6 7 -1 2 -5 -4 2 -3 -3 5 1 4 -3 1 -8 10 -1 1 -3 6 1 -3 3 3 1 1 -3 4 2 7 -4 -4 8 2 2 -1 1 5 10 5 1 -1 7 -8 -1 -7 4 -4 6 2 5 -2 1 3 4z" },
  { id: "saga", name: "Saga", path: "M108 778h12l7 6 6 -2v6l-9 5 -1 7 -6 -5 -5 5 2 10 -7 -2 -7 -7 1 -5 -6 -2 -3 -6 2 -3 4 4 -2 -4 3 -4 -5 -3 2 -2 2 2v-6l1 2h5v4z" },
  { id: "nagasaki", name: "Nagasaki", path: "M81 700l3 -2 2 3 -4 3 2 4 -6 6 -1 4 3 -2 -3 4 3 -1 -3 4v-5l-2 3v-4l-2 3 -3 -1 3 -1v-4l2 -1 -2 -1 4 -3 -2 -3 2 -5 4 1zM75 727l-3 6 -6 1 3 -14 1 3 3 1 -1 -3 2 3 2 -1zM95 758l1 2 -4 2 -3 -5 2 1 -2 -3 3 -3 4 1 -2 3 3 1zM56 809l-3 5 2 -6 -4 -2 3 -1v-4h2l2 -9 -2 11 5 1 -2 3 -2 -2zM52 810h-3v-2l2 1 -1 -3zM47 812l1 -3v5l-4 -4zM35 817l3 -2 1 2 2 -3 3 10 -6 -1v4l-9 -3 1 -2 1 3 1 -2h-1l2 -2 -1 -7zM94 778l-3 2 2 -4zM96 781l2 2 -3 1zM58 786l2 -2 1 2zM83 775h-3l3 -2zM94 785l-2 3 3 6 6 2 -1 5 7 7 7 2 -7 6 13 1 2 5 -2 6 -10 5 -1 -6 4 -4 -1 -3h-5l-7 1 -3 6 -9 5 4 -5 -1 -2h3l2 -3 -3 1 -2 -6 -4 -1 -3 -6 3 -11 4 4 -1 3 1 -2 3 3 -2 7 11 3 -3 -6 1 -5 -4 -4 -3 2v-7l-4 1v-3l-3 4 2 -2 -4 -2 1 -4 -1 2 -4 -2 4 -5 -3 -1 1 -4 5 -1 1 3h5zM78 786l-1 5 -6 1 4 -2 -1 -2 2 -6 5 1 1 -4 1 4zM43 814l1 -3 2 3 -3 2zM92 799v4l-2 -4 2 -2z" },
  { id: "kumamoto", name: "Kumamoto", path: "M108 836h4v11l-8 9 -4 1v-6l4 -1 -5 -2 5 -9 -2 -3zM119 846h-6l-1 -4 6 -4h8l-4 8zM123 832l3 1 -1 4 -2 -1zM137 866l-5 -6 -9 4 -4 -4 12 -16 -2 -5 2 1 -1 -2 6 -6 -10 1 8 -6 1 -5 -9 -8 -1 -6 5 1v-3l4 -4 4 1 2 -4 8 5 7 5 2 -4 -1 -6 6 1 7 13v6l3 3 -3 1 -9 14 -5 2 -1 7 5 7 -4 5 3 5z" },
  { id: "oita", name: "Oita", path: "M148 804l3 -5 -3 -4 2 -1 -2 -5 4 -6 7 -4 8 1 1 -7 12 4 5 -7 9 4 2 6 -2 8 -4 -1 1 3 -8 2v4l4 2 17 -1 -6 9h5l-3 2 3 2 5 -2 1 3h-5l-2 4 10 4h-6l2 2 -4 3 4 1 -7 1v4h-2l1 -5 -5 -1 -3 4h-8l-4 -5 -6 1 -2 -2 -3 -3v-6l-7 -13 -6 -1 1 6 -2 4z" },
  { id: "miyazaki", name: "Miyazaki", path: "M172 822l2 2 6 -1 4 5h8l3 -4 5 1 -1 5h2l-11 10 -1 4 3 1 -4 1 -1 2 2 1 -5 8 -6 17 -3 23 -5 5 -2 12 -5 -2 -5 -5 2 -3v-7l-7 -1 -3 -9 -5 -2 2 -5 -6 -5 -5 -7 1 -2 21 -3 -3 -5 4 -5 -5 -7 1 -7 5 -2 9 -14z" },
  { id: "kagoshima", name: "Kagoshima", path: "M4 1148l-4 2v-5l9 -1zM21 1126v-8l4 -1v5l3 3 -1 3 -5 3 -2 -4zM82 1097l-2 2 -1 -3 6 -3zM64 1089l-13 9 3 2 -4 4 -3 -2 1 4 -5 -5 1 -2 -8 -3h7l2 -1 -5 -2 14 -5 2 2 3 -5h4l-2 3 2 -2 2 2 2 -6 1 6zM43 1107l-1 -2 -3 2 -1 -7 5 2 -2 3 6 1 -2 3v-2zM103 965l3 2h-3zM113 976l-1 -6 7 -4 9 6 -1 5 -6 4 -6 -1zM144 969v5l-6 1v-8l3 -3 2 -9 7 -10 1 9zM119 860l4 4 9 -4 5 6 -1 2 5 7 6 5 -2 5 5 2 3 9 7 1v7l-2 3 -3 -1 -5 6 5 3 -2 3h3l-6 3 -4 5 -16 8v-5l5 -3 4 -13 -5 -8v-6l-6 -2 5 -2 1 4h3l4 -6 -7 -5 -4 2 -6 13 2 11 5 3 -2 5 -6 1 -3 -6 -13 -1 1 -3 -3 -2 2 -1 -5 -5 9 1 4 -11 -3 -8 -5 -5 3 -7 -2 -11 4 -2 3 2zM112 853l2 -1 -1 2zM107 863l-2 -5 4 -3 2 5zM85 884l2 -3 1 2 -6 8 -2 -1zM93 880l-4 -3h6zM75 1012l-3 4v-3zM81 1001l2 -2 2 4z" },
  {
    id: "okinawa", name: "Okinawa",
    path: "M-321 1283l3 1 -2 1 -5 -1zM-276 1295l6 3 -4 6 -11 -5 2 -2 3 2 1 -7zM-198 1281l-1 -4 3 2zM-192 1287l-3 -2h2l-1 -3 2 -2 -1 -5 3 8 7 6zM-100 1198v5l-5 -5 3 -2zM143 1255l-1 -3h2zM-45 1183v-2l3 2zM-31 1187v2l-2 -2zM-252 1292l5 -6 1 2 -6 6v7h-6l-2 -2 2 -2 -3 -3 8 1zM-37 1195l3 -3 -5 -2v-6l6 1 1 4 6 -1 -1 -2 10 -10 3 4 -1 5 -5 6 -5 -1 -1 5 -5 -1 1 2 -7 5 -6 -1 4 9 -4 -2 -5 7 4 3 -10 4 -1 -8 7 -6 -2 -8 5 1z",
    // Okinawa's true relative position is far southwest of the rest of the
    // archipelago. Rather than blow out the viewBox, it is scaled into an
    // inset box in the corner - the same convention almost every printed
    // map of Japan uses.
    transform: "translate(253.33,-957.84) scale(0.8102)"
  }
];

// ---------------------------------------------------------------------------
// Build the SVG
// ---------------------------------------------------------------------------

const svg = document.getElementById("japan-map");
const prefsLayer = document.getElementById("prefectures");
const labelsLayer = document.getElementById("labels-layer");
const mapWrap = document.getElementById("map-wrap");

const STATE_NAMES = ["grey (unmarked)", "yellow", "yellow with red stripes", "red"];

// slug -> { state, group, path, label, hovered, hoverTimer }
const registry = new Map();

function buildPrefecture(entry) {
  const group = document.createElementNS(SVG_NS, "g");
  group.setAttribute("class", "pref-group");
  group.setAttribute("data-id", entry.id);
  if (entry.transform) {
    group.setAttribute("transform", entry.transform);
  }

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("class", "prefecture state-0");
  path.setAttribute("d", entry.path);
  path.setAttribute("tabindex", "0");
  path.setAttribute("role", "button");
  path.setAttribute("aria-label", `${entry.name}, ${STATE_NAMES[0]}`);
  path.dataset.id = entry.id;

  group.appendChild(path);
  prefsLayer.appendChild(group);

  const label = document.createElement("div");
  label.className = "pref-label";
  label.textContent = entry.name;
  labelsLayer.appendChild(label);

  registry.set(entry.id, {
    name: entry.name,
    state: 0,
    group,
    path,
    label,
    hovered: false,
    hoverTimer: null,
    active: false,
    idleTimer: null
  });
}

PREFECTURES.forEach(buildPrefecture);

// Static display-space centre of each prefecture, used to draw the rough
// travel lines. Computed directly from the path data itself (the same
// bounding-box math used to lay out the map in the first place) rather than
// via getBBox()/getCTM() - those are reliable for most prefectures, but
// their exact coordinate space once an ancestor transform is involved
// (Okinawa's inset) isn't worth the risk when we can just compute it
// ourselves. Only the LARGEST subpath (by bounding-box area) counts towards
// the centre, so small offshore islands (Kagoshima's, Nagasaki's, etc.)
// don't drag it away from the main landmass.
function splitSubpaths(d) {
  return d.split(/(?=[Mm])/).filter((p) => p.trim().length > 0);
}

function subpathBBox(d) {
  const tokens = d.match(/[MLHVZmlhvz]|-?\d+(?:\.\d+)?/g) || [];
  let i = 0;
  let cmd = null;
  let cx = 0, cy = 0, sx = 0, sy = 0;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const consider = () => {
    if (cx < minX) minX = cx;
    if (cx > maxX) maxX = cx;
    if (cy < minY) minY = cy;
    if (cy > maxY) maxY = cy;
  };
  while (i < tokens.length) {
    const t = tokens[i];
    if (/^[MLHVZmlhvz]$/.test(t)) {
      cmd = t;
      i++;
      continue;
    }
    if (cmd === "M" || cmd === "m") {
      const x = parseFloat(tokens[i]);
      const y = parseFloat(tokens[i + 1]);
      i += 2;
      if (cmd === "M") { cx = x; cy = y; } else { cx += x; cy += y; }
      sx = cx; sy = cy;
      cmd = cmd === "M" ? "L" : "l";
    } else if (cmd === "L" || cmd === "l") {
      const x = parseFloat(tokens[i]);
      const y = parseFloat(tokens[i + 1]);
      i += 2;
      if (cmd === "L") { cx = x; cy = y; } else { cx += x; cy += y; }
    } else if (cmd === "H" || cmd === "h") {
      const x = parseFloat(tokens[i]);
      i += 1;
      cx = cmd === "H" ? x : cx + x;
    } else if (cmd === "V" || cmd === "v") {
      const y = parseFloat(tokens[i]);
      i += 1;
      cy = cmd === "V" ? y : cy + y;
    } else if (cmd === "Z" || cmd === "z") {
      cx = sx; cy = sy;
      consider();
      continue;
    } else {
      i++;
      continue;
    }
    consider();
  }
  return { minX, minY, maxX, maxY };
}

function pathBBoxCenter(d) {
  const subpaths = splitSubpaths(d);
  let best = null;
  let bestArea = -1;
  subpaths.forEach((sub) => {
    const b = subpathBBox(sub);
    if (!isFinite(b.minX)) return;
    const area = (b.maxX - b.minX) * (b.maxY - b.minY);
    if (area > bestArea) {
      bestArea = area;
      best = b;
    }
  });
  if (!best) return { x: 0, y: 0 };
  return { x: (best.minX + best.maxX) / 2, y: (best.minY + best.maxY) / 2 };
}



const centerOf = new Map();
PREFECTURES.forEach((entry) => {
  let c = pathBBoxCenter(entry.path);
  if (entry.transform) {
    // Parsed with plain string ops (no regex) - entry.transform is always
    // exactly "translate(TX,TY) scale(S)" for our data.
    const tStart = entry.transform.indexOf("translate(") + "translate(".length;
    const tEnd = entry.transform.indexOf(")", tStart);
    const sStart = entry.transform.indexOf("scale(", tEnd) + "scale(".length;
    const sEnd = entry.transform.indexOf(")", sStart);
    const parts = entry.transform.slice(tStart, tEnd).split(",");
    const tx = parseFloat(parts[0]);
    const ty = parseFloat(parts[1]);
    const s = parseFloat(entry.transform.slice(sStart, sEnd));
    c = { x: s * c.x + tx, y: s * c.y + ty };
  }
  centerOf.set(entry.id, c);
});

// ---------------------------------------------------------------------------
// Label positioning
// ---------------------------------------------------------------------------

function positionLabel(record) {
  const pathRect = record.path.getBoundingClientRect();
  const wrapRect = mapWrap.getBoundingClientRect();
  const x = pathRect.left + pathRect.width / 2 - wrapRect.left;
  const y = pathRect.top + pathRect.height / 2 - wrapRect.top;
  record.label.style.left = `${x}px`;
  record.label.style.top = `${y}px`;
}

function refreshLabelVisibility(record) {
  const shouldShow = record.active || record.hovered;
  if (shouldShow) {
    positionLabel(record);
    record.label.classList.add("visible");
  } else {
    record.label.classList.remove("visible");
  }
}

function repositionAllVisibleLabels() {
  registry.forEach((record) => {
    if (record.label.classList.contains("visible")) {
      positionLabel(record);
    }
  });
}

let resizeRaf = null;
window.addEventListener("resize", () => {
  if (resizeRaf) return;
  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = null;
    repositionAllVisibleLabels();
  });
});

// ---------------------------------------------------------------------------
// Click cycle: grey -> yellow -> stripes -> red -> grey
//
// Every click marks the prefecture "active": its name shows immediately,
// and (unless it's Hokkaido/Okinawa) it pops up to its enlarged size. That
// active state - name AND size together - only reverts once 0.5s passes
// with no further click, including the click that lands back on grey. So
// nothing about it is tied to colour any more; it's purely "have you
// clicked it in the last half second".
// ---------------------------------------------------------------------------

const IDLE_DELAY = 500;

// Hokkaido and Okinawa are already large/prominent enough on the map as
// drawn - they still cycle through colours and still show their name like
// every other prefecture, they just skip the size change.
const NO_ENLARGE = new Set(["hokkaido", "okinawa"]);

function activatePresentation(record, id) {
  record.active = true;
  if (!NO_ENLARGE.has(id)) {
    // bring above neighbouring prefectures, then enlarge on the following
    // frame so the size change always transitions (rather than risking the
    // browser coalescing the reorder + the style change into one
    // un-animated paint)
    prefsLayer.appendChild(record.group);
    void record.group.getBoundingClientRect();
    requestAnimationFrame(() => record.group.classList.add("selected"));
  }
  refreshLabelVisibility(record);
}

function deactivatePresentation(record, id) {
  record.active = false;
  if (!NO_ENLARGE.has(id)) {
    record.group.classList.remove("selected");
  }
  refreshLabelVisibility(record);
}

function scheduleIdleDeactivate(record, id) {
  clearTimeout(record.idleTimer);
  record.idleTimer = setTimeout(() => deactivatePresentation(record, id), IDLE_DELAY);
}

function activate(id) {
  const record = registry.get(id);
  if (!record) return;

  const prevState = record.state;
  const nextState = (prevState + 1) % 4;
  record.state = nextState;

  record.path.classList.remove(`state-${prevState}`);
  record.path.classList.add(`state-${nextState}`);
  record.path.setAttribute("aria-label", `${record.name}, ${STATE_NAMES[nextState]}`);

  activatePresentation(record, id);
  scheduleIdleDeactivate(record, id);
}

// ---------------------------------------------------------------------------
// Hover tooltip (500ms delay) - independent of the click/idle mechanism
// above, purely from the mouse
// ---------------------------------------------------------------------------

const HOVER_DELAY = 500;

function onEnter(id) {
  const record = registry.get(id);
  if (!record) return;
  clearTimeout(record.hoverTimer);
  record.hoverTimer = setTimeout(() => {
    record.hovered = true;
    refreshLabelVisibility(record);
  }, HOVER_DELAY);
}

function onLeave(id) {
  const record = registry.get(id);
  if (!record) return;
  clearTimeout(record.hoverTimer);
  record.hovered = false;
  refreshLabelVisibility(record);
}

// ---------------------------------------------------------------------------
// Wire up listeners
// ---------------------------------------------------------------------------

registry.forEach((record, id) => {
  record.path.addEventListener("click", () => activate(id));
  record.path.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      activate(id);
    }
  });
  record.path.addEventListener("mouseenter", () => onEnter(id));
  record.path.addEventListener("mouseleave", () => onLeave(id));
});

// ---------------------------------------------------------------------------
// Season tracker: loads season-data.json and drives the episode selector,
// the challenge balls, the team hand panels, and the map's colouring.
//
// Map colour meaning in this mode is no longer an arbitrary 4-state cycle -
// it's driven by data: grey = nobody's cleared it yet, yellow = the yellow
// team alone, red = the red team alone, striped = both teams have cleared
// it. Clicking a prefecture still works (still useful for a quick manual
// look), but selecting a different episode re-applies that episode's
// recorded data over the top.
// ---------------------------------------------------------------------------

let seasonEpisodes = [];
let seasonTeams = [];
let currentEpisodeIndex = 0;

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function parseISODate(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(s) {
  const d = parseISODate(s);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Pick whichever episode was most recently released on YouTube (falling
// back to Nebula, then to the first episode, if nothing's out yet).
function pickDefaultEpisodeIndex(episodes, today) {
  let bestIdx = -1;
  let bestDate = null;
  episodes.forEach((ep, i) => {
    const yt = parseISODate(ep.youtubeDate);
    if (yt && yt <= today && (!bestDate || yt > bestDate)) {
      bestDate = yt;
      bestIdx = i;
    }
  });
  if (bestIdx === -1) {
    episodes.forEach((ep, i) => {
      const nb = parseISODate(ep.nebulaDate);
      if (nb && nb <= today && (!bestDate || nb > bestDate)) {
        bestDate = nb;
        bestIdx = i;
      }
    });
  }
  return bestIdx === -1 ? 0 : bestIdx;
}

function setPrefectureStateDirect(record, newState) {
  record.path.classList.remove(`state-${record.state}`);
  record.state = newState;
  record.path.classList.add(`state-${newState}`);
  record.path.setAttribute("aria-label", `${record.name}, ${STATE_NAMES[newState]}`);
}

const TEAM_COLOR_TO_STATE = { yellow: 1, red: 3 };

// Once a team unlocks a prefecture it stays unlocked for the rest of the
// season, so the map/stats for episode N need the union of every episode
// up to and including N - not just that episode's own delta.
function computeCumulativeUnlocked(uptoIdx) {
  const result = new Map(); // teamId -> Set(prefecture slug)
  seasonTeams.forEach((team) => result.set(team.id, new Set()));
  for (let i = 0; i <= uptoIdx; i++) {
    const ep = seasonEpisodes[i];
    seasonTeams.forEach((team) => {
      const epTeam = ep.teams && ep.teams[team.id];
      if (!epTeam) return;
      (epTeam.unlocked || []).forEach((slug) => result.get(team.id).add(slug));
    });
  }
  return result;
}

function applyEpisodeToMap(cumulativeUnlocked) {
  // clean baseline: nothing enlarged, nothing hovered, no timers left over
  // from whatever was clicked before switching episodes
  registry.forEach((record) => {
    clearTimeout(record.idleTimer);
    clearTimeout(record.hoverTimer);
    record.hovered = false;
    record.active = false;
    record.group.classList.remove("selected");
  });

  const owners = new Map(); // prefecture slug -> [team colour, ...]
  seasonTeams.forEach((team) => {
    cumulativeUnlocked.get(team.id).forEach((slug) => {
      if (!owners.has(slug)) owners.set(slug, []);
      owners.get(slug).push(team.color);
    });
  });

  registry.forEach((record, id) => {
    const claims = owners.get(id) || [];
    let newState = 0;
    if (claims.length >= 2) newState = 2;
    else if (claims.length === 1) newState = TEAM_COLOR_TO_STATE[claims[0]] || 0;
    setPrefectureStateDirect(record, newState);
  });

  registry.forEach(refreshLabelVisibility);
}

function renderRoutes(uptoIdx) {
  const container = document.getElementById("routes");
  container.innerHTML = "";
  seasonTeams.forEach((team) => {
    // Concatenate every episode's leg from episode 0 up to the one being
    // viewed into one whole-game line, and remember each episode's last
    // point so we can mark it with a stop circle.
    const allPoints = [];
    const episodeEndPoints = [];
    for (let i = 0; i <= uptoIdx; i++) {
      const epTeam = seasonEpisodes[i].teams && seasonEpisodes[i].teams[team.id];
      const route = (epTeam && epTeam.route) || [];
      const points = route.map((slug) => centerOf.get(slug)).filter(Boolean);
      points.forEach((p) => allPoints.push(p));
      if (points.length > 0) episodeEndPoints.push(points[points.length - 1]);
    }

    if (allPoints.length >= 2) {
      const d = allPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

      const casing = document.createElementNS(SVG_NS, "path");
      casing.setAttribute("d", d);
      casing.setAttribute("class", "route-casing");
      container.appendChild(casing);

      const line = document.createElementNS(SVG_NS, "path");
      line.setAttribute("d", d);
      line.setAttribute("class", `route-line route-${team.color}`);
      line.setAttribute("marker-end", `url(#route-arrow-${team.color})`);
      container.appendChild(line);
    }

    episodeEndPoints.forEach((p) => {
      const stop = document.createElementNS(SVG_NS, "circle");
      stop.setAttribute("cx", p.x.toFixed(1));
      stop.setAttribute("cy", p.y.toFixed(1));
      stop.setAttribute("r", "7");
      stop.setAttribute("class", `route-stop route-stop-${team.color}`);
      container.appendChild(stop);
    });
  });
}

function renderChallenges(challenges) {
  const container = document.getElementById("challenge-balls");
  container.innerHTML = "";
  if (!challenges || challenges.length === 0) {
    container.innerHTML = '<p class="board-empty-note">No challenges recorded for this episode yet.</p>';
    return;
  }
  challenges.forEach((c) => {
    const ball = document.createElement("div");
    ball.className = "challenge-ball";
    const reward = Number(c.rewardCards) || 0;
    ball.innerHTML =
      `<div class="cb-title">${escapeHtml(c.title || "Untitled challenge")}</div>` +
      `<div class="cb-reward">${reward} card${reward === 1 ? "" : "s"}</div>`;
    container.appendChild(ball);
  });
}

function renderTeamPanels(episode, cumulativeUnlocked) {
  const root = document.getElementById("team-panels");
  root.innerHTML = "";

  seasonTeams.forEach((team) => {
    const epTeam = (episode.teams && episode.teams[team.id]) || { hand: [] };
    const clearedCount = cumulativeUnlocked.get(team.id).size;

    const panel = document.createElement("div");
    panel.className = "team-panel";
    panel.style.setProperty(
      "--team-accent",
      team.color === "yellow" ? "var(--yellow)" : team.color === "red" ? "var(--red)" : "#999"
    );

    panel.innerHTML =
      `<div class="team-panel-header">
         <div>
           <div class="team-name">${escapeHtml(team.name)}</div>
           <div class="team-members">${escapeHtml((team.members || []).join(" & "))}</div>
         </div>
       </div>
       <div class="team-stat">${clearedCount} of 46 prefectures cleared</div>`;

    const hand = document.createElement("div");
    hand.className = "hand";
    const cards = (epTeam.hand || []).slice(0, 5);
    for (let i = 0; i < 5; i++) {
      const cardEl = document.createElement("div");
      const card = cards[i];
      if (card) {
        cardEl.className = "card";
        const emojis = (card.emojis || []).slice(0, 3).join(" ");
        cardEl.innerHTML =
          `<div class="card-title">${escapeHtml(card.title || "")}</div>` +
          `<div class="card-emojis">${emojis}</div>` +
          `<div class="card-blurb">${card.blurb ? escapeHtml(card.blurb) : ""}</div>`;
      } else {
        cardEl.className = "card empty-slot";
      }
      hand.appendChild(cardEl);
    }
    panel.appendChild(hand);
    root.appendChild(panel);
  });
}

function renderEpisode(idx) {
  currentEpisodeIndex = idx;
  const ep = seasonEpisodes[idx];
  const today = new Date();
  const nebula = parseISODate(ep.nebulaDate);
  const youtube = parseISODate(ep.youtubeDate);

  document.getElementById("ep-number").textContent = `Episode ${ep.number}`;
  document.getElementById("ep-title").textContent = ep.title;
  document.getElementById("ep-summary").textContent = ep.summary || "";

  const nebulaFuture = nebula && nebula > today;
  const youtubeFuture = youtube && youtube > today;
  document.getElementById("ep-dates").innerHTML =
    !nebula && !youtube
      ? ""
      : `<span class="date-badge nebula${nebulaFuture ? " future" : ""}">Nebula ${formatDate(ep.nebulaDate)}${nebulaFuture ? " (scheduled)" : ""}</span>` +
        `<span class="date-badge youtube${youtubeFuture ? " future" : ""}">YouTube ${formatDate(ep.youtubeDate)}${youtubeFuture ? " (scheduled)" : ""}</span>`;

  document.getElementById("ep-prev").disabled = idx === 0;
  document.getElementById("ep-next").disabled = idx === seasonEpisodes.length - 1;

  const cumulativeUnlocked = computeCumulativeUnlocked(idx);
  applyEpisodeToMap(cumulativeUnlocked);
  renderRoutes(idx);
  renderChallenges(ep.challenges);
  renderTeamPanels(ep, cumulativeUnlocked);
}

document.getElementById("ep-prev").addEventListener("click", () => {
  if (currentEpisodeIndex > 0) renderEpisode(currentEpisodeIndex - 1);
});
document.getElementById("ep-next").addEventListener("click", () => {
  if (currentEpisodeIndex < seasonEpisodes.length - 1) renderEpisode(currentEpisodeIndex + 1);
});

fetch("season-data.json")
  .then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  })
  .then((data) => {
    seasonEpisodes = data.episodes || [];
    seasonTeams = (data.meta && data.meta.teams) || [];
    if (seasonEpisodes.length === 0) throw new Error("season-data.json has no episodes");
    renderEpisode(pickDefaultEpisodeIndex(seasonEpisodes, new Date()));
  })
  .catch((err) => {
    const box = document.getElementById("load-error");
    box.hidden = false;
    box.textContent =
      `Couldn't load season-data.json (${err.message}). If you opened this file directly ` +
      `(a file:// URL), browsers block that fetch for local files. Run a quick local server ` +
      `in this folder - e.g. "python3 -m http.server" - then open http://localhost:8000/index.html.`;
    document.getElementById("ep-title").textContent = "No season data loaded";
  });