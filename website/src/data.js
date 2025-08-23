// src/data.js

const placeholder = (width, height, text) => `https://placehold.co/${width}x${height}/222/FFF?text=${text}`;

export const worksData = {
  atmos: {
    "2024": {
      coverImage: "/images/atmos-2024-cover.jpg", 
      images: [
        { id: 1, src: placeholder(600, 800, 'Atmos 24'), alt: "Artwork 1", width: 600, height: 800 },
        { id: 2, src: placeholder(800, 600, 'Atmos 24'), alt: "Artwork 2", width: 800, height: 600 },
        { id: 3, src: placeholder(600, 700, 'Atmos 24'), alt: "Artwork 3", width: 600, height: 700 },
        { id: 4, src: placeholder(700, 800, 'Atmos 24'), alt: "Artwork 4", width: 700, height: 800 },
        { id: 5, src: placeholder(600, 600, 'Atmos 24'), alt: "Artwork 5", width: 600, height: 600 },
        { id: 6, src: placeholder(800, 700, 'Atmos 24'), alt: "Artwork 6", width: 800, height: 700 },
      ],
    },
    "2023": {
      coverImage: "/images/atmos-2023-cover.jpg",
      images: [
        { id: 1, src: placeholder(600, 800, 'Atmos 23'), alt: "Artwork 1", width: 600, height: 800 },
        { id: 2, src: placeholder(800, 600, 'Atmos 23'), alt: "Artwork 2", width: 800, height: 600 },
        { id: 3, src: placeholder(700, 600, 'Atmos 23'), alt: "Artwork 3", width: 700, height: 600 },
      ],
    },
    "2022": {
      coverImage: "/images/atmos-2022-cover.jpg",
      images: [
        { id: 1, src: placeholder(800, 800, 'Atmos 22'), alt: "Artwork 1", width: 800, height: 800 },
        { id: 2, src: placeholder(600, 800, 'Atmos 22'), alt: "Artwork 2", width: 600, height: 800 },
        { id: 3, src: placeholder(800, 600, 'Atmos 22'), alt: "Artwork 3", width: 800, height: 600 },
        { id: 4, src: placeholder(600, 700, 'Atmos 22'), alt: "Artwork 4", width: 600, height: 700 },
      ],
    },
  },
  arena: {
    "2024": {
      coverImage: "/images/arena-2024-cover.jpg",
      images: [
        { id: 1, src: placeholder(600, 800, 'Arena 24'), alt: "Artwork 1", width: 600, height: 800 },
        { id: 2, src: placeholder(800, 600, 'Arena 24'), alt: "Artwork 2", width: 800, height: 600 },
      ],
    },
    "2023": {
      coverImage: "/images/arena-2023-cover.jpg",
      images: [
        { id: 1, src: placeholder(600, 800, 'Arena 23'), alt: "Artwork 1", width: 600, height: 800 },
        { id: 2, src: placeholder(800, 600, 'Arena 23'), alt: "Artwork 2", width: 800, height: 600 },
        { id: 3, src: placeholder(600, 700, 'Arena 23'), alt: "Artwork 3", width: 600, height: 700 },
        { id: 4, src: placeholder(700, 800, 'Arena 23'), alt: "Artwork 4", width: 700, height: 800 },
      ],
    },
  },
  pearl: {
    "2024": {
        coverImage: "/images/pearl-2024-cover.jpg",
        images: [
            { id: 1, src: placeholder(600, 800, 'Pearl 24'), alt: "Artwork 1", width: 600, height: 800 },
            { id: 2, src: placeholder(800, 600, 'Pearl 24'), alt: "Artwork 2", width: 800, height: 600 },
            { id: 3, src: placeholder(600, 700, 'Pearl 24'), alt: "Artwork 3", width: 600, height: 700 },
        ],
    },
  },
  other: {
    "2024": {
        coverImage: "/images/other-2024-cover.jpg",
        images: [
            { id: 1, src: placeholder(600, 800, 'Other 24'), alt: "Artwork 1", width: 600, height: 800 },
        ],
    },
  }
};