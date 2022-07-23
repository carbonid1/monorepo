const emojis = ['💔', '💜', '💛', '💚', '💙']

export const getRandomEmoji = (): any => {
  const index = Math.floor(Math.random() * emojis.length)
  return emojis[index]
}
