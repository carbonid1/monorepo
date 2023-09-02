import { notionClient } from 'lib/notion-client'
import { myNotionIds } from 'consts'

type Rate = { rate: string }
type Params = {
  rates: Record<'UAH' | 'GBP' | 'EUR' | 'PLN', Rate>
}

type UpdateExchangeRates = (params: Params) => Promise<Array<object>>

export const updateExchangeRates: UpdateExchangeRates = async ({ rates }) => {
  return Promise.all([
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.uah,
      properties: { Rate: { number: formatRate(rates.UAH.rate) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.gbp,
      properties: { Rate: { number: formatRate(rates.GBP.rate) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.eur,
      properties: { Rate: { number: formatRate(rates.EUR.rate) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.pln,
      properties: { Rate: { number: formatRate(rates.PLN.rate) } },
    }),
  ])
}

const formatRate = (rate: Rate['rate']) => Number(rate)
