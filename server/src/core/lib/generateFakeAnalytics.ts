import { faker } from '@faker-js/faker';
export function generateFakeAnalyticsData(year: 2022 | 2023) {
  if (year === 2022)
    return {
      January: faker.number.int({ min: 10, max: 50 }),
      February: faker.number.int({ min: 10, max: 50 }),
      March: faker.number.int({ min: 10, max: 50 }),
      April: faker.number.int({ min: 10, max: 50 }),
      May: faker.number.int({ min: 10, max: 50 }),
      June: faker.number.int({ min: 10, max: 50 }),
      July: faker.number.int({ min: 10, max: 50 }),
      August: faker.number.int({ min: 10, max: 50 }),
      September: faker.number.int({ min: 10, max: 50 }),
      October: faker.number.int({ min: 10, max: 50 }),
      November: faker.number.int({ min: 10, max: 50 }),
      December: faker.number.int({ min: 10, max: 50 }),
    };

  return {
    January: faker.number.int({ min: 10, max: 50 }),
    February: faker.number.int({ min: 10, max: 50 }),
    March: faker.number.int({ min: 10, max: 50 }),
    April: faker.number.int({ min: 10, max: 50 }),
    May: faker.number.int({ min: 10, max: 50 }),
    June: faker.number.int({ min: 10, max: 50 }),
    July: faker.number.int({ min: 10, max: 50 }),
  };
}
