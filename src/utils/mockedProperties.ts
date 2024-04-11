const mockedProperties = {
  properties: [
    {
      id: "1",
      image: "https://picsum.photos/id/100/1400/933",
      thumbnail: "https://picsum.photos/id/100/450/338",
      title: "Cozy Cottage Retreat",
      description:
        "Escape to this charming cottage nestled in the woods. Enjoy the tranquility of nature in this cozy retreat. Perfect for a weekend getaway or a longer stay. Unwind and relax in this peaceful setting.",
      pricePerDay: 120,
      bookedPeriods: [
        {
          startDate: "2024-04-12",
          endDate: "2024-04-15",
          userId: null,
          id: "b1",
        },
        {
          startDate: "2024-05-16",
          endDate: "2024-05-17",
          userId: null,
          id: "b2",
        },
      ],
    },
    {
      id: "2",
      image: "https://picsum.photos/id/101/1400/933",
      thumbnail: "https://picsum.photos/id/101/450/338",
      title: "Modern City Loft",
      description:
        "Experience urban living in this stylish loft apartment. Located in the heart of the city, this modern space offers convenience and comfort. Ideal for business travelers or those looking to explore the city.",
      pricePerDay: 150,
      bookedPeriods: [
        {
          startDate: "2024-04-10",
          endDate: "2024-04-15",
          userId: null,
          id: "b3",
        },
        {
          startDate: "2024-05-15",
          endDate: "2024-05-20",
          userId: null,
          id: "b4",
        },
      ],
    },
    {
      id: "3",
      image: "https://picsum.photos/id/102/1400/933",
      thumbnail: "https://picsum.photos/id/102/450/338",
      title: "Seaside Villa Escape",
      description:
        "Indulge in luxury at this stunning seaside villa. Breathtaking ocean views, private beach access, and exquisite amenities await you. Treat yourself to a lavish getaway in this exclusive retreat.",
      pricePerDay: 300,
      bookedPeriods: [
        {
          startDate: "2024-04-15",
          endDate: "2024-04-20",
          userId: null,
          id: "b5",
        },
        {
          startDate: "2024-05-20",
          endDate: "2024-05-25",
          userId: null,
          id: "b6",
        },
      ],
    },
    {
      id: "4",
      image: "https://picsum.photos/id/103/1400/933",
      thumbnail: "https://picsum.photos/id/103/450/338",
      title: "Mountain Lodge Adventure",
      description:
        "Experience the thrill of the mountains at this cozy lodge. Perfect for outdoor enthusiasts, this retreat offers easy access to hiking trails, ski slopes, and other adventure activities.",
      pricePerDay: 200,
      bookedPeriods: [
        {
          startDate: "2024-04-20",
          endDate: "2024-04-25",
          userId: null,
          id: "b7",
        },
        {
          startDate: "2024-05-25",
          endDate: "2024-05-30",
          userId: null,
          id: "b8",
        },
      ],
    },
    {
      id: "5",
      image: "https://picsum.photos/id/104/1400/933",
      thumbnail: "https://picsum.photos/id/104/450/338",
      title: "Lakeside Cabin Getaway",
      description:
        "Escape to this peaceful lakeside cabin and enjoy the serene beauty of nature. Perfect for a romantic retreat or a family vacation, this cabin offers a cozy and comfortable stay.",
      pricePerDay: 180,
      bookedPeriods: [
        {
          startDate: "2024-04-25",
          endDate: "2024-04-30",
          userId: null,
          id: "b9",
        },
        {
          startDate: "2024-05-30",
          endDate: "2024-06-04",
          userId: null,
          id: "b10",
        },
      ],
    },
    {
      id: "6",
      image: "https://picsum.photos/id/115/1400/933",
      thumbnail: "https://picsum.photos/id/115/450/338",
      title: "Desert Oasis Escape",
      description:
        "Experience the unique beauty of the desert at this luxurious oasis. Enjoy the stunning views, peaceful atmosphere, and exquisite amenities in this exclusive retreat.",
      pricePerDay: 250,
      bookedPeriods: [
        {
          startDate: "2024-04-30",
          endDate: "2024-05-05",
          userId: null,
          id: "b11",
        },
        {
          startDate: "2024-06-04",
          endDate: "2024-06-09",
          userId: null,
          id: "b12",
        },
      ],
    },
    {
      id: "7",
      image: "https://picsum.photos/id/106/1400/933",
      thumbnail: "https://picsum.photos/id/106/450/338",
      title: "Urban Penthouse Luxury",
      description:
        "Experience the ultimate in urban luxury at this stunning penthouse. Located in the heart of the city, this modern space offers breathtaking views, exquisite amenities, and unmatched convenience.",
      pricePerDay: 400,
      bookedPeriods: [
        {
          startDate: "2024-05-05",
          endDate: "2024-05-10",
          userId: null,
          id: "b13",
        },
        {
          startDate: "2024-06-09",
          endDate: "2024-06-14",
          userId: null,
          id: "b14",
        },
      ],
    },
    {
      id: "8",
      image: "https://picsum.photos/id/107/1400/933",
      thumbnail: "https://picsum.photos/id/107/450/338",
      title: "Rustic Farmhouse Stay",
      description:
        "Experience the charm of country living at this rustic farmhouse. Enjoy the fresh air, open spaces, and peaceful atmosphere in this cozy and comfortable retreat.",
      pricePerDay: 160,
      bookedPeriods: [
        {
          startDate: "2024-05-10",
          endDate: "2024-05-15",
          userId: null,
          id: "b15",
        },
        {
          startDate: "2024-06-14",
          endDate: "2024-06-19",
          userId: null,
          id: "b16",
        },
      ],
    },
    {
      id: "9",
      image: "https://picsum.photos/id/108/1400/933",
      thumbnail: "https://picsum.photos/id/108/450/338",
      title: "Tropical Beach Villa",
      description:
        "Experience the ultimate beach vacation at this stunning tropical villa. Enjoy the white sand beaches, crystal-clear water, and exquisite amenities in this exclusive retreat.",
      pricePerDay: 450,
      bookedPeriods: [
        {
          startDate: "2024-05-15",
          endDate: "2024-05-20",
          userId: null,
          id: "b17",
        },
        {
          startDate: "2024-06-19",
          endDate: "2024-06-24",
          userId: null,
          id: "b18",
        },
      ],
    },
    {
      id: "10",
      image: "https://picsum.photos/id/109/1400/933",
      thumbnail: "https://picsum.photos/id/109/450/338",
      title: "Historic Castle Experience",
      description:
        "Experience the magic of history at this stunning castle. Enjoy the grandeur, luxury, and exquisite amenities in this exclusive retreat. Perfect for a once-in-a-lifetime experience.",
      pricePerDay: 500,
      bookedPeriods: [
        {
          startDate: "2024-05-20",
          endDate: "2024-05-25",
          userId: null,
          id: "b19",
        },
        {
          startDate: "2024-06-24",
          endDate: "2024-06-29",
          userId: null,
          id: "b20",
        },
      ],
    },
  ],
};

export default mockedProperties;
