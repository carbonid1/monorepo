import { notionClient } from 'lib/notion-client'
import { myNotionIds } from 'consts'

type Params = {
  rates: Record<'UAH' | 'GBP' | 'EUR' | 'PLN', string>
}

type UpdateExchangeRates = (params: Params) => Promise<Array<object>>

export const updateExchangeRates: UpdateExchangeRates = async ({ rates }) => {
  return Promise.all([
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.uah,
      properties: { Rate: { number: formatRate(rates.UAH) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.gbp,
      properties: { Rate: { number: formatRate(rates.GBP) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.eur,
      properties: { Rate: { number: formatRate(rates.EUR) } },
    }),
    notionClient.pages.update({
      page_id: myNotionIds.page.currencies.pln,
      properties: { Rate: { number: formatRate(rates.PLN) } },
    }),
  ])
}

const formatRate = (rate: string) => Number(rate)
