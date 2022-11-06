import { notionClient } from 'lib/notion-client'
import { myNotion } from 'consts'

type Rate = { rate: string }
type Params = {
  rates: Record<'UAH' | 'GBP' | 'EUR', Rate>
}

type UpdateExchangeRates = (params: Params) => Promise<Array<object>>

export const updateExchangeRates: UpdateExchangeRates = async ({ rates }) => {
  return Promise.all([
    notionClient.pages.update({
      page_id: myNotion.page.currencies.uah,
      properties: { Rate: { number: formatRate(rates.UAH.rate) } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.currencies.gbp,
      properties: { Rate: { number: formatRate(rates.GBP.rate) } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.currencies.eur,
      properties: { Rate: { number: formatRate(rates.EUR.rate) } },
    }),
  ])
}

const formatRate = (rate: Rate['rate']) => Math.floor(Number(rate) * 10) / 10
