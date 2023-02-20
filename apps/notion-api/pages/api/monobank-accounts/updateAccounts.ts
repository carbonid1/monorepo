import { notionClient } from 'lib/notion-client'
import { currencyCodes, myNotion } from 'consts'

type Account = {
  currencyCode: number
  balance: number
  type: 'fop' | 'black' | 'eAid'
}

type Params = {
  accounts: Account[]
}

type UpdateAccounts = (params: Params) => Promise<Array<object>>

export const updateAccounts: UpdateAccounts = async ({ accounts }) => {
  const blackUAHBalance =
    accounts.find(account => account.type === 'black' && account.currencyCode === currencyCodes.uah)
      ?.balance ?? 0
  const blackUSDBalance =
    accounts.find(account => account.type === 'black' && account.currencyCode === currencyCodes.usd)
      ?.balance ?? 0
  const blackEURBalance =
    accounts.find(account => account.type === 'black' && account.currencyCode === currencyCodes.eur)
      ?.balance ?? 0
  const fopUAHBalance =
    accounts.find(account => account.type === 'fop' && account.currencyCode === currencyCodes.uah)
      ?.balance ?? 0
  const fopUSDBalance =
    accounts.find(account => account.type === 'fop' && account.currencyCode === currencyCodes.usd)
      ?.balance ?? 0

  return Promise.all([
    notionClient.pages.update({
      page_id: myNotion.page.bankAccounts.monobank.blackUAH,
      properties: { Amount: { number: blackUAHBalance / 100 } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.bankAccounts.monobank.blackUSD,
      properties: { Amount: { number: blackUSDBalance / 100 } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.bankAccounts.monobank.blackEUR,
      properties: { Amount: { number: blackEURBalance / 100 } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.bankAccounts.monobank.fopUAH,
      properties: { Amount: { number: fopUAHBalance / 100 } },
    }),
    notionClient.pages.update({
      page_id: myNotion.page.bankAccounts.monobank.fopUSD,
      properties: { Amount: { number: fopUSDBalance / 100 } },
    }),
  ])
}
