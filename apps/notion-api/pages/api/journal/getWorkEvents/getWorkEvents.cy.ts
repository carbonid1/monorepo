import { getFormattedDates } from './getWorkEvents'

it('should return correct event time', () => {
  const result = getFormattedDates('2024-05-03T11:00:00+03:00', '2024-05-03T11:30:00+03:00')
  expect(result).to.eq('11:00 - 11:30')
})
