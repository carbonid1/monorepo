import { IWorkItem } from '.'

export const workExpAchievements: Record<
  'ss' | 'suprise-dev' | 'surprise-lead',
  IWorkItem['achievements']
> = {
  'surprise-lead': [
    "became a team lead after the old front-end team slowly disintegrated and right before the app's next version had to be released. My responsibilities slowly shifted to making more high-level decisions like using Next.js for our landing page, looking for refactoring possibilities, interviewing new engineers, reviewing pull requests, helping junior and middle developers,  etc.",
    'worked with the team on our UI library to substitute Antd because the design was too custom, and there was no point to override a lot of styles. Under the hood, Antd also used another large library for working with dates - Moment. As a result, we achieved -60% bundle size, from 4.6Mb to 1.9Mb.',
  ],
  'suprise-dev': [
    'worked on caching backend state in Redux but ended up with code that only a senior engineer and I understood. After watching a few videos on react-query library and proof of concept on the weekend, I took a risk and rewritten the most complex parts of the app. Later on, after the team had approved the approach, we created a few tickets and migrated the whole app to the new state management library. It reduced complexity while providing new features like caching for free.',
  ],
  ss: [
    'was working on the next feature when I noticed that our selects started freezing because of enormous data. I talked to senior engineers, and we decided to rewrite the existing select into a virtual one to fix the performance. After a few tries to use a library, I had created a new select from scratch, and we gradually migrated all the forms to use it.',
    "wrote a complex encapsulated, highly reusable table module. Initially, it had been a myriad of tables that were reducing maintainability. Also, The table had used Redux under the hood, but after the client approved my idea of saving filters into the browser's URL, I reworked the module to use React Context API. The refactoring solved a busyness need to save filters while moving between pages, and the table became a line of function invocation plus a config object.",
    'worked on a Git submodule to move the frontend shared codebase there as we had the copypaste problem. There were a few backend Ruby on Rails gems, so some frontend packs had to be with them. As a result, we removed thousands of code lines.',
  ],
}
