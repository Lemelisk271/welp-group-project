# Redux State

```Javascript
session: {
  user: {
    id: 31,
    birthday: "Sat, 29 Aug 1987 00:00:00 GMT",
    email: "demo@aa.io",
    first_name: "Demo",
    last_name: "User",
    profile_image: "https://picsum.photos/800/600.jpg",
    zip_code: 17064
  }
},

business: {
  allBusiness: {
    1: {
      id: 1,
      name: "Strickland-Hernandez",
      about: "Current coach edge thought several film social.",
      address: "57500 Bradford Manor",
      city: "Kathleenmouth",
      state: "HI",
      zip_code: 96748,
      phone: "(076) 289-8082",
      price: 2,
      url: "evans-duffy.net",
      ownerId: 1,
      amenities: [
        {
          id: 6,
          amenity: "Accepts Android Pay",
          icon_url: "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/android_pay.png"
        },
        {
          id: 10,
          amenity: "Free Wi-Fi",
          icon_url: "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/wi_fi.png"
        }
      ],
      categories: [
        {
          id: 24,
          category: "Sushi"
        },
        {
          id: 31,
          category: "Diner"
        }
      ],
      hours: [
        {
          id: 1,
          day: "Mon",
          open_time: null,
          close_time: null
        },
        {
          id: 2,
          day: "Tue",
          open_time: null,
          close_time: null
        },
        {
          id: 3,
          day: "Wed",
          open_time: "09:00:00",
          close_time: "21:00:00"
        },
        {
          id: 4,
          day: "Thu",
          open_time: "09:00:00",
          close_time: "21:00:00"
        },
        {
          id: 5,
          day: "Fri",
          open_time: "09:00:00",
          close_time: "21:00:00"
        },
        {
          id: 6,
          day: "Sat",
          open_time: "09:00:00",
          close_time: "21:00:00"
        },
        {
          id: 7,
          day: "Sun",
          open_time: "09:00:00",
          close_time: "21:00:00"
        }
      ],
      images: [
        {
          id: 1,
          url: "https://picsum.photos/1280/720.jpg?random=2",
          preview: true,
          businessId: 1,
          ownerId: 1
        },
        {
          id: 2,
          url: "https://picsum.photos/1280/720.jpg?random=3",
          preview: false,
          businessId: 1,
          ownerId: 6
        }
      ],
      owner: {
        id:1,
        birthday: "Thu, 26 Oct 1933 00:00:00 GMT",
        email:"bdennis@yahoo.com",
        first_name:"Michelle",
        last_name:"Becker",
        profile_image:"https://picsum.photos/1280/720.jpg?random=2",
        zip_code:14650
      },
      preview_image: {
        id: 1,
        url: "https://picsum.photos/1280/720.jpg?random=2",
        preview: true,
        businessId: 1,
        ownerId: 1
      },
      reviews: [
        {
          id: 22,
          date: "Tue, 06 Jun 2023 00:00:00 GMT",
          review: "Anything region I. Civil tonight plant return. Worker system nature important organization. Serve stock power common. Six admit order choice. Focus mouth name speak season morning.",
          stars: 2,
          businessId: 1,
          userId: 3
        },
        {
          id: 70,
          date: "Tue, 11 Oct 2022 00:00:00 GMT",
          review: "Agree maybe thing large at job light strategy. Raise two dinner special close PM. Edge professional or evening serious.",
          stars: 4,
          businessId: 1,
          userId: 7
        }
      ]
    }
  },

  singleBusiness: {
    id: 15,
    name: "Cummings, Callahan and Gonzalez"
    about: "Wide view drug city college structure. Number ready direction machine. Such future statement health involve series. Not low education everyone nor million.",
    address: "7504 Jose Brook",
    city: "Lake Paul",
    state: "FL",
    zip_code: 33013,
    phone: "(287) 998-0505",
    price: 3,
    url: "bennett-nelson.com"
    ownerId: 2,
    amenities: [
      {
        id: 4,
        amenity: "Staff wear masks",
        icon_url: "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/staff_mask.png"
      },
      {
        id: 5,
        amenity: "Accepts Credit Cards",
        icon_url: "https://welp-group-project.s3.us-west-2.amazonaws.com/amenities/credit_cards.png"
      }
    ],
    categories: [
      {
        id: 26,
        category: "Vegan"
      },
      {
        id: 30,
        category: "Barbecue"
      }
    ],
    hours: [
        {
          id: 99,
          day: "Mon",
          open_time: null,
          close_time: null,
          closed: true
        },
        {
          id: 100,
          day: "Tue",
          open_time: null,
          close_time: null,
          closed: true
        },
        {
          id: 101,
          day: "Wed",
          open_time: "09:00:00",
          close_time: "21:00:00",
          closed: false
        },
        {
          id: 102,
          day: "Thu",
          open_time: "09:00:00",
          close_time: "21:00:00",
          closed: false
        },
        {
          id: 103,
          day: "Fri",
          open_time: "09:00:00",
          close_time: "21:00:00",
          closed: false
        },
        {
          id: 104,
          day: "Sat",
          open_time: "09:00:00",
          close_time: "21:00:00",
          closed: false
        },
        {
          id: 105,
          day: "Sun",
          open_time: "09:00:00",
          close_time: "21:00:00",
          closed: false
        }
      ],
      images: [
        {
          id: 85,
          url: "https://picsum.photos/1280/720.jpg?random=86",
          preview: true,
          businessId: 15,
          ownerId: 2
        },
        {
          id: 86,
          url: "https://picsum.photos/1280/720.jpg?random=87",
          preview: false,
          businessId: 15,
          ownerId: 21
        }
      ],
      questions: {
        id: 15,
        question: "Worry idea once computer since different ten how part anything decision single goal light three almost sometimes mouth?"
        date: "Sat, 02 Sep 2023 00:00:00 GMT"
        businessId: 15,
        userId: 6,
        answers: [
          id: 15,
          answer: "Piece new seven west role would into. Stock because board suggest lead meet. Ball ever American the money. Would game room democratic special budget north.",
          date: "Fri, 01 Sep 2023 00:00:00 GMT",
          questionId: 15,
          userId: 20
        ]
      },
      reviews: [
        {
          id: 6,
          date: "Mon, 10 Jul 2023 00:00:00 GMT",
          review: "One hospital fire board. Conference station control us. Establish reality case general. First about score door long service.",
          stars: 4,
          businessId: 15,
          userId: 1
        },
        {
          id: 44,
          date: "Scientist claim key from agency. Stage report pass many clear sort both. House year human before help. However know use between character rock south. Fact home relationship claim campaign.",
          stars: 1,
          businessId: 15,
          userId: 5
        }
      ]
  }
}
```
