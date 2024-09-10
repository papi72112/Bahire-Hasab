const ameteFida = 5500;

const ethiopianMonths = {
  1: 'መስክረም',
  2: 'ጥቅምት',
  3: 'ህዳር',
  4: 'ታህሳስ',
  5: 'ጥር',
  6: 'የካቲት',
  7: 'መጋቢት',
  8: 'ሚያዝያ',
  9: 'ግንቦት',
  10: 'ሰኔ',
  11: 'ሐምሌ',
  12: 'ነሐሴ',
  13: 'ጷጉሜ'
};

const ethiopianElete = {
  monday: 'ሰኞ',
  tuesday: 'ማክሰኞ',
  wednesday: 'ዕሮብ',
  thursday: 'ሐሙስ',
  friday: 'ዓርብ',
  saturday: 'ቅዳሜ',
  sunday: 'እሁድ'
};

const awedeAbekte = {
  1: 0,
  2: 11,
  3: 22,
  4: 3,
  5: 14,
  6: 25,
  7: 6,
  8: 17,
  9: 28,
  10: 9,
  11: 20,
  12: 1,
  13: 12,
  14: 23,
  15: 4,
  16: 15,
  17: 26,
  18: 7,
  19: 18
};

const wengel = ['ዮሐንስ', 'ማቴዎስ', 'ማርቆስ', 'ሉቃስ'];

function getElete (day, month, year) {
  const elete = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];
  const noOfDays = day + (month - 1) * 30;
  const meteneRabit = Math.floor((year + ameteFida) / 4);
  const dayRemainder = (meteneRabit + year + ameteFida + noOfDays - 1) % 7;

  return elete[dayRemainder];
}

function getWengel (year) {
  const ameteAlem = ameteFida + year;
  return wengel[ameteAlem % 4];
}

function getAbekete (year) {
  const ameteAlem = ameteFida + year;
  const wember = (ameteAlem % 19 === 0 ? 19 : ameteAlem % 19) - 1;
  const abekte = awedeAbekte[wember + 1];

  return abekte;
}

function getMetke (year, abekte) {
  const metkeDay = 30 - abekte;
  const metkeMonth = metkeDay >= 15 ? 1 : 2;
  const metkeElete = getElete(metkeDay, metkeMonth, year);

  return { day: metkeDay, month: metkeMonth, elete: metkeElete };
}

function getMebagaHamer (metkeDay, metkeMonth, metkeElete) {
  const dayTwesak = {
    saturday: 8,
    sunday: 7,
    monday: 6,
    tuesday: 5,
    wednesday: 4,
    thursday: 3,
    friday: 2
  };
  const metkeTwesak = metkeDay + dayTwesak[metkeElete];

  let mebagaHamerDay = metkeTwesak;
  let mebagaHamerMonth = 6; // የካቲቲ

  if (metkeMonth === 1 && mebagaHamerDay > 30) {
    mebagaHamerDay -= 30;
  } else if (metkeMonth === 1) {
    mebagaHamerMonth -= 1;
  }

  return { name: 'የነነዌ ጾም', day: mebagaHamerDay, month: mebagaHamerMonth };
}

function getEthiopianEvents (year, mebagaHamer) {
  const ameteAlem = ameteFida + year;

  const leapYear = ameteAlem % 4 === 0;
  const staticEvents = [
    { name: 'የዘመነ መለወጫ ቀነ', day: 1, month: 1 },
    { name: 'መስቀል', day: 17, month: 1 },
    { name: 'ጾም ጽጌ', day: 26, month: 1 },
    { name: 'የነቢያት ጾም', day: 15, month: 3 },
    { name: 'ገና', day: leapYear ? 28 : 29, month: 4 },
    { name: 'ጥምቀት', day: 11, month: 5 }
  ];

  const dynamicEvents = [
    { name: 'ዓብይ ጾም', day: null, month: null, tewsak: 14 },
    { name: 'ደብረ ዘይት', day: null, month: null, tewsak: 41 },
    { name: 'ሆሣዕና', day: null, month: null, tewsak: 62 },
    { name: 'ስቅለት', day: null, month: null, tewsak: 67 },
    { name: 'ትንሣኤ', day: null, month: null, tewsak: 69 },
    { name: 'ርክበ ካህናት', day: null, month: null, tewsak: 93 },
    { name: 'ዕርገት', day: null, month: null, tewsak: 108 },
    { name: 'ጰራቅሊጦስ', day: null, month: null, tewsak: 118 },
    { name: 'ጾመ ሐዋርያት', day: null, month: null, tewsak: 119 },
    { name: 'ጾመ ድህነት', day: null, month: null, tewsak: 121 }
  ];

  const lastEvent = { name: 'ጾመ ፍልሰታ', day: 1, month: 12 };

  // Get the day and month of each dynamic event
  for (const dynEvent of dynamicEvents) {
    let eventDay = dynEvent.tewsak + mebagaHamer.day;
    let eventMonth = mebagaHamer.month;

    if (eventDay > 30) {
      eventMonth += Math.floor(eventDay / 30);
      eventDay %= 30;
    }
    dynEvent.day = eventDay;
    dynEvent.month = eventMonth;
  }

  // Combine all events in the right order
  const allEvents = [].concat(staticEvents, mebagaHamer, dynamicEvents, lastEvent);

  // Get the Elete of each event
  for (const eventItem of allEvents) {
    eventItem.elete = ethiopianElete[getElete(eventItem.day, eventItem.month, year)];
  }
  return allEvents;
}

export {
  ameteFida,
  awedeAbekte,
  wengel,
  ethiopianMonths,
  ethiopianElete,
  getElete,
  getWengel,
  getAbekete,
  getMetke,
  getMebagaHamer,
  getEthiopianEvents
};